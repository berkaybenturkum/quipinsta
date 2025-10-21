from flask import Flask, render_template, request, jsonify, send_file, make_response
from flask_cors import CORS
from flask_mail import Mail, Message
from PIL import Image
import io
import os
import json
import xml.etree.ElementTree as ET
from xml.dom import minidom
from datetime import datetime
import base64
import smtplib
from email.mime.text import MIMEText
from email.mime.multipart import MIMEMultipart

app = Flask(__name__)
CORS(app)

# Mail Configuration (Gmail SMTP)
app.config['MAIL_SERVER'] = 'smtp.gmail.com'
app.config['MAIL_PORT'] = 587
app.config['MAIL_USE_TLS'] = True
app.config['MAIL_USERNAME'] = 'berkaybenturkum@gmail.com'  # Gönderen mail adresi
app.config['MAIL_PASSWORD'] = ''  # Gmail App Password buraya girilmeli
app.config['MAIL_DEFAULT_SENDER'] = 'berkaybenturkum@gmail.com'

mail = Mail(app)

# XML dosya yolu
EMAIL_DB = 'emails.xml'

def init_email_db():
    """E-posta veritabanını başlat"""
    if not os.path.exists(EMAIL_DB):
        root = ET.Element('emails')
        tree = ET.ElementTree(root)
        with open(EMAIL_DB, 'wb') as f:
            f.write(minidom.parseString(ET.tostring(root)).toprettyxml(indent='  ', encoding='utf-8'))

def save_email(email):
    """E-postayı XML'e kaydet"""
    init_email_db()
    tree = ET.parse(EMAIL_DB)
    root = tree.getroot()
    
    # Zaten var mı kontrol et
    for email_elem in root.findall('email'):
        if email_elem.find('address').text == email:
            # Varsa tarih güncelle
            email_elem.find('last_access').text = datetime.now().isoformat()
            break
    else:
        # Yoksa yeni ekle
        email_elem = ET.SubElement(root, 'email')
        ET.SubElement(email_elem, 'address').text = email
        ET.SubElement(email_elem, 'registered_at').text = datetime.now().isoformat()
        ET.SubElement(email_elem, 'last_access').text = datetime.now().isoformat()
    
    # XML'i güzel formatla ve kaydet
    xml_str = minidom.parseString(ET.tostring(root)).toprettyxml(indent='  ')
    with open(EMAIL_DB, 'w', encoding='utf-8') as f:
        f.write(xml_str)

def email_exists(email):
    """E-posta daha önce kaydedilmiş mi kontrol et"""
    if not os.path.exists(EMAIL_DB):
        return False
    
    tree = ET.parse(EMAIL_DB)
    root = tree.getroot()
    
    for email_elem in root.findall('email'):
        if email_elem.find('address').text == email:
            return True
    return False

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/contact')
def contact():
    return render_template('contact.html')

# İletişim mesajları dosyası
CONTACT_MESSAGES_FILE = 'contact_messages.json'

def init_contact_messages():
    """İletişim mesajları dosyasını başlat"""
    if not os.path.exists(CONTACT_MESSAGES_FILE):
        with open(CONTACT_MESSAGES_FILE, 'w', encoding='utf-8') as f:
            json.dump([], f, ensure_ascii=False, indent=2)

def save_contact_message(name, email, subject, message):
    """İletişim mesajını dosyaya kaydet"""
    init_contact_messages()
    
    # Mevcut mesajları oku
    with open(CONTACT_MESSAGES_FILE, 'r', encoding='utf-8') as f:
        messages = json.load(f)
    
    # Yeni mesajı ekle
    new_message = {
        'id': len(messages) + 1,
        'name': name,
        'email': email,
        'subject': subject,
        'message': message,
        'timestamp': datetime.now().isoformat(),
        'date': datetime.now().strftime('%d/%m/%Y %H:%M:%S')
    }
    
    messages.append(new_message)
    
    # Dosyaya kaydet
    with open(CONTACT_MESSAGES_FILE, 'w', encoding='utf-8') as f:
        json.dump(messages, f, ensure_ascii=False, indent=2)
    
    return new_message

@app.route('/send_contact', methods=['POST'])
def send_contact():
    """İletişim formundan gelen mesajı kaydet"""
    try:
        data = request.get_json()
        name = data.get('name', '').strip()
        email = data.get('email', '').strip()
        subject = data.get('subject', '').strip()
        message = data.get('message', '').strip()
        
        # Validasyon
        if not all([name, email, subject, message]):
            return jsonify({'error': 'Tüm alanlar zorunludur'}), 400
        
        if '@' not in email:
            return jsonify({'error': 'Geçerli bir e-posta adresi girin'}), 400
        
        # Mesajı dosyaya kaydet
        saved_message = save_contact_message(name, email, subject, message)
        
        # Konsola da yazdır
        print(f"\n{'='*50}")
        print(f"🆕 YENİ İLETİŞİM MESAJI #{saved_message['id']}")
        print(f"{'='*50}")
        print(f"👤 İsim: {name}")
        print(f"📧 E-posta: {email}")
        print(f"📋 Konu: {subject}")
        print(f"💬 Mesaj: {message}")
        print(f"🕐 Tarih: {saved_message['date']}")
        print(f"{'='*50}\n")
        
        return jsonify({
            'success': True,
            'message': 'Mesajınız başarıyla kaydedildi!'
        })
            
    except Exception as e:
        print(f"İletişim formu hatası: {e}")
        return jsonify({'error': 'Mesaj kaydedilirken bir hata oluştu'}), 500

@app.route('/view_messages')
def view_messages():
    """Kaydedilen iletişim mesajlarını görüntüle"""
    try:
        init_contact_messages()
        
        with open(CONTACT_MESSAGES_FILE, 'r', encoding='utf-8') as f:
            messages = json.load(f)
        
        # HTML olarak göster
        html = f"""<!DOCTYPE html>
<html lang="tr">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>İletişim Mesajları - QuipInsta</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>body {{ font-family: Inter, sans-serif; }}</style>
</head>
<body class="bg-gray-50">
    <div class="container mx-auto px-4 py-8">
        <div class="max-w-4xl mx-auto">
            <div class="bg-white rounded-lg shadow-lg p-6 mb-6">
                <h1 class="text-3xl font-bold text-gray-900 mb-2">📬 İletişim Mesajları</h1>
                <p class="text-gray-600">Toplam <strong>{len(messages)}</strong> mesaj</p>
            </div>
"""
        
        if not messages:
            html += """
                    <div class="bg-white rounded-lg shadow p-8 text-center">
                        <p class="text-gray-500">Henüz mesaj bulunmuyor.</p>
                    </div>
            """
        else:
            for msg in reversed(messages):  # Son mesajlar önce
                html += f"""
                    <div class="bg-white rounded-lg shadow-md p-6 mb-4 border-l-4 border-indigo-500">
                        <div class="flex justify-between items-start mb-3">
                            <div>
                                <h3 class="text-lg font-bold text-gray-900">#{msg['id']} - {msg['subject']}</h3>
                                <p class="text-sm text-gray-500">{msg['date']}</p>
                            </div>
                        </div>
                        <div class="grid grid-cols-2 gap-4 mb-4 text-sm">
                            <div>
                                <span class="font-semibold text-gray-700">👤 İsim:</span>
                                <span class="text-gray-600">{msg['name']}</span>
                            </div>
                            <div>
                                <span class="font-semibold text-gray-700">📧 E-posta:</span>
                                <a href="mailto:{msg['email']}" class="text-indigo-600 hover:underline">{msg['email']}</a>
                            </div>
                        </div>
                        <div class="bg-gray-50 rounded p-4 border border-gray-200">
                            <p class="text-gray-700 whitespace-pre-wrap">{msg['message']}</p>
                        </div>
                    </div>
                """
        
        html += """
                </div>
            </div>
        </body>
        </html>
        """
        
        return html
        
    except Exception as e:
        return f"Hata: {str(e)}", 500

@app.route('/sitemap.xml')
def sitemap():
    """Sitemap dosyasını sun"""
    return send_file('sitemap.xml', mimetype='application/xml')

@app.route('/robots.txt')
def robots():
    """Robots.txt dosyasını sun"""
    return send_file('robots.txt', mimetype='text/plain')

@app.route('/check_email', methods=['POST'])
def check_email():
    """E-posta kontrolü ve cookie seti"""
    data = request.get_json()
    email = data.get('email', '').strip()
    
    if not email:
        return jsonify({'error': 'E-posta gerekli'}), 400
    
    # E-posta formatı kontrol
    if '@' not in email or '.' not in email.split('@')[1]:
        return jsonify({'error': 'Geçerli bir e-posta adresi girin'}), 400
    
    # E-postayı kaydet
    save_email(email)
    
    response = make_response(jsonify({
        'success': True,
        'message': 'E-posta kaydedildi',
        'is_new': not email_exists(email)
    }))
    
    # Cookie set et (30 gün)
    response.set_cookie('user_email', email, max_age=30*24*60*60)
    
    return response

@app.route('/get_cookie_email', methods=['GET'])
def get_cookie_email():
    """Cookie'den e-posta al"""
    email = request.cookies.get('user_email')
    if email:
        return jsonify({'email': email, 'has_cookie': True})
    return jsonify({'has_cookie': False})

@app.route('/split_image', methods=['POST'])
def split_image():
    """Görseli böl ve parçaları döndür"""
    if 'image' not in request.files:
        return jsonify({'error': 'Görsel bulunamadı'}), 400
    
    file = request.files['image']
    grid_type = int(request.form.get('grid', 3))
    bg_color = request.form.get('bg_color', '#FFFFFF')  # Varsayılan beyaz
    
    if file.filename == '':
        return jsonify({'error': 'Dosya seçilmedi'}), 400
    
    try:
        # Görseli aç
        img = Image.open(file.stream)
        
        # RGBA ise RGB'ye çevir
        if img.mode == 'RGBA':
            background = Image.new('RGB', img.size, (255, 255, 255))
            background.paste(img, mask=img.split()[3])
            img = background
        elif img.mode != 'RGB':
            img = img.convert('RGB')
        
        # Grid yapısını belirle
        if grid_type == 3:
            rows, cols = 1, 3
        elif grid_type == 6:
            rows, cols = 2, 3
        else:
            rows, cols = 3, 3
        
        # Instagram oranı: 4:5 (1080x1350)
        target_width = 1080
        target_height = 1350
        
        # Toplam grid boyutu
        total_width = target_width * cols
        total_height = target_height * rows
        
        # Görselin oranını koru ve grid'e sığdır (CONTAIN mantığı)
        img_aspect = img.width / img.height
        grid_aspect = total_width / total_height
        
        # Görseli sığdır (aspect ratio korunur)
        if img_aspect > grid_aspect:
            # Görsel daha geniş - genişliğe göre ölçekle
            new_width = total_width
            new_height = int(new_width / img_aspect)
        else:
            # Görsel daha dar - yüksekliğe göre ölçekle
            new_height = total_height
            new_width = int(new_height * img_aspect)
        
        # Görseli yeniden boyutlandır (yüksek kalite)
        img_resized = img.resize((new_width, new_height), Image.Resampling.LANCZOS)
        
        # Hex rengi RGB'ye çevir
        def hex_to_rgb(hex_color):
            hex_color = hex_color.lstrip('#')
            return tuple(int(hex_color[i:i+2], 16) for i in (0, 2, 4))
        
        # Seçilen renkte arka plan oluştur
        bg_rgb = hex_to_rgb(bg_color)
        canvas = Image.new('RGB', (total_width, total_height), bg_rgb)
        
        # Görseli ortaya yerleştir
        offset_x = (total_width - new_width) // 2
        offset_y = (total_height - new_height) // 2
        canvas.paste(img_resized, (offset_x, offset_y))
        
        # Parçalara böl
        pieces = []
        for row in range(rows):
            for col in range(cols):
                # Parça koordinatları
                x = col * target_width
                y = row * target_height
                
                # Parçayı kes (beyaz arka plan dahil)
                piece = canvas.crop((x, y, x + target_width, y + target_height))
                
                # Base64'e çevir
                buffer = io.BytesIO()
                piece.save(buffer, format='JPEG', quality=95, optimize=True)
                buffer.seek(0)
                
                img_base64 = base64.b64encode(buffer.getvalue()).decode()
                
                pieces.append({
                    'index': row * cols + col + 1,
                    'data': f'data:image/jpeg;base64,{img_base64}'
                })
        
        return jsonify({
            'success': True,
            'pieces': pieces,
            'grid': grid_type
        })
        
    except Exception as e:
        return jsonify({'error': f'Görsel işlenirken hata: {str(e)}'}), 500

@app.route('/download_piece/<int:index>', methods=['POST'])
def download_piece(index):
    """Tek parçayı indir"""
    data = request.get_json()
    image_data = data.get('data', '')
    
    if not image_data:
        return jsonify({'error': 'Veri bulunamadı'}), 400
    
    try:
        # Base64'ten decode et
        image_data = image_data.split(',')[1]
        image_bytes = base64.b64decode(image_data)
        
        # BytesIO'ya çevir
        buffer = io.BytesIO(image_bytes)
        buffer.seek(0)
        
        return send_file(
            buffer,
            mimetype='image/jpeg',
            as_attachment=True,
            download_name=f'instagram-grid-{index}.jpg'
        )
    except Exception as e:
        return jsonify({'error': str(e)}), 500

if __name__ == '__main__':
    init_email_db()
    # Railway için PORT environment variable kullan
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
