# Mail Kurulum Rehberi

## Gmail SMTP Kurulumu

İletişim formundan gelen mesajların berkaybenturkum@gmail.com adresine gönderilmesi için Gmail SMTP ayarlarının yapılması gerekiyor.

## Adım 1: Gmail App Password Oluşturma

1. Google hesabınıza giriş yapın: https://myaccount.google.com/
2. **Security** (Güvenlik) bölümüne gidin
3. **2-Step Verification** (İki Aşamalı Doğrulama) aktif olmalı
4. **App passwords** (Uygulama şifreleri) bölümüne gidin
5. Yeni bir uygulama şifresi oluşturun:
   - Select app: **Mail**
   - Select device: **Other** (Custom name) -> "QuipInsta" yazın
6. **Generate** butonuna tıklayın
7. Oluşturulan 16 karakterlik şifreyi kopyalayın (örnek: `abcd efgh ijkl mnop`)

## Adım 2: App Password'ü Projeye Ekleyin

`app.py` dosyasını açın ve şu satırı bulun:

```python
app.config['MAIL_PASSWORD'] = ''  # Gmail App Password buraya girilmeli
```

Oluşturduğunuz app password'ü buraya yapıştırın (boşluksuz):

```python
app.config['MAIL_PASSWORD'] = 'abcdefghijklmnop'  # Örnek
```

## Adım 3: Test Edin

1. Terminalde projeyi çalıştırın:
```bash
python app.py
```

2. Tarayıcıda şu adrese gidin:
```
http://localhost:5000/contact
```

3. Formu doldurup test edin. Başarılı olursa berkaybenturkum@gmail.com adresine mail gelecektir.

## Development Mode

Eğer `MAIL_PASSWORD` boş bırakılırsa, uygulama "Development Mode" olarak çalışır ve mail gerçekten gönderilmez, ancak konsola yazdırılır. Bu test amaçlı kullanışlıdır.

## Güvenlik Notları

⚠️ **ÖNEMLİ**: 
- App password'ü asla GitHub'a commit etmeyin
- Production ortamında environment variable kullanın
- `.gitignore` dosyasına `app.py` veya sadece şifre içeren kısmı ekleyin

## Alternatif: Environment Variable Kullanımı

Daha güvenli bir yöntem için environment variable kullanabilirsiniz:

```python
import os
app.config['MAIL_PASSWORD'] = os.environ.get('GMAIL_APP_PASSWORD', '')
```

Sonra terminalde:

**Windows:**
```cmd
set GMAIL_APP_PASSWORD=abcdefghijklmnop
python app.py
```

**Linux/Mac:**
```bash
export GMAIL_APP_PASSWORD=abcdefghijklmnop
python app.py
```

## Sorun Giderme

### "Authentication failed" hatası
- App password'ün doğru girildiğinden emin olun
- İki aşamalı doğrulamanın aktif olduğunu kontrol edin
- Yeni bir app password oluşturmayı deneyin

### Mail gelmiyor
- Spam klasörünü kontrol edin
- Gmail hesabının "less secure apps" ayarını kontrol edin
- SMTP ayarlarının doğru olduğunu kontrol edin

### "Connection refused" hatası
- İnternet bağlantınızı kontrol edin
- Firewall ayarlarını kontrol edin
- Gmail SMTP server'ın erişilebilir olduğundan emin olun

## Test Komutu

```bash
# Bağımlılıkları yükle
pip install -r requirements.txt

# Uygulamayı çalıştır
python app.py
```

Uygulama çalışınca şu adresleri test edin:
- Ana sayfa: http://localhost:5000/
- İletişim: http://localhost:5000/contact
