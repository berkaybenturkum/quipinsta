# QuipAI Instagram Gönderi Bölücü - Kurulum ve Kullanım Kılavuzu

## 🔧 Gereksinimler

Bu uygulama Python backend kullandığı için sisteminizde Python 3.8 veya üzeri yüklü olmalıdır.

### Python Kurulumu

1. **Python İndirme**: [python.org](https://www.python.org/downloads/) adresinden Python'un son sürümünü indirin
2. **Kurulum Sırasında**: "Add Python to PATH" seçeneğini işaretlemeyi unutmayın
3. **Kontrol**: Kurulumu test etmek için terminalde şunu yazın:
   ```
   python --version
   ```

## 📦 Kurulum Adımları

### 1. Gerekli Python Paketlerini Yükleyin

Proje klasöründe terminal açın ve şu komutu çalıştırın:

```bash
python -m pip install -r requirements.txt
```

Bu komut şu paketleri yükleyecek:
- **Flask**: Web sunucusu
- **flask-cors**: Cross-origin istekler için
- **Pillow**: Yüksek kaliteli görsel işleme

### 2. Uygulamayı Başlatın

```bash
python app.py
```

Sunucu başladığında şu mesajı göreceksiniz:
```
* Running on http://127.0.0.1:5000
```

### 3. Tarayıcıda Açın

Tarayıcınızda şu adresi açın:
```
http://localhost:5000
```

## 🎯 Özellikler

### ✅ E-posta Cookie Sistemi
- İlk ziyaretinizde e-posta girmeniz gerekir
- E-postanız `emails.xml` dosyasına kaydedilir
- Cookie ile 30 gün boyunca otomatik giriş
- Bir sonraki ziyaretinizde e-posta otomatik yüklenir

### ✅ Python ile Görsel İşleme
- **PIL/Pillow** kütüphanesi kullanılır
- Canvas API yerine sunucu taraflı işleme
- Her parça tam **1080x1350px** (Instagram 4:5 oranı)
- LANCZOS resampling ile yüksek kalite
- %95 JPEG kalitesi

### ✅ Oran Koruma
- 3 Parça: 1 satır × 3 sütun (3240×1350px toplam)
- 6 Parça: 2 satır × 3 sütun (3240×2700px toplam)
- 9 Parça: 3 satır × 3 sütun (3240×4050px toplam)
- Görseller otomatik olarak doğru orana getirilir
- Merkeze hizalama ve kırpma

## 📁 Dosya Yapısı

```
QuipAI/
├── app.py                  # Python Flask backend
├── requirements.txt        # Python bağımlılıkları
├── emails.xml             # E-posta veritabanı (otomatik oluşur)
├── templates/
│   └── index.html         # Frontend HTML
├── SETUP_GUIDE.md         # Bu dosya
└── README.md              # Genel bilgiler
```

## 🔄 Kullanım Akışı

1. **Sunucuyu Başlatın**: `python app.py`
2. **Tarayıcıda Açın**: http://localhost:5000
3. **E-posta Girin**: İlk kullanımda veya cookie yoksa
4. **Görsel Yükleyin**: Tıklayarak veya sürükle-bırak
5. **Grid Seçin**: 3, 6 veya 9 parça
6. **İndirin**: Her parçayı ayrı ayrı indirin

## 🗄️ E-posta Veritabanı (emails.xml)

Uygulamayı ilk çalıştırdığınızda otomatik olarak `emails.xml` dosyası oluşur:

```xml
<?xml version="1.0" ?>
<emails>
  <email>
    <address>kullanici@example.com</address>
    <registered_at>2025-01-21T10:00:00</registered_at>
    <last_access>2025-01-21T10:00:00</last_access>
  </email>
</emails>
```

- **address**: E-posta adresi
- **registered_at**: İlk kayıt tarihi
- **last_access**: Son erişim tarihi

## 🔒 Gizlilik ve Güvenlik

- ✅ E-postalar sadece XML dosyasında saklanır
- ✅ Görseller sunucuda saklanmaz (geçici işleme)
- ✅ Cookie'ler sadece e-posta için kullanılır
- ✅ 30 gün sonra cookie otomatik silinir

## 🐛 Sorun Giderme

### Python Bulunamadı Hatası
```bash
# Python PATH'e eklenmemiş olabilir
# Windows'ta Python'u yeniden kurun ve "Add to PATH" seçin
```

### Port 5000 Kullanımda Hatası
```python
# app.py dosyasının son satırını değiştirin:
app.run(debug=True, port=5001)  # Farklı port kullanın
```

### Paket Yükleme Hatası
```bash
# Yönetici olarak çalıştırın veya şunu deneyin:
python -m pip install --user -r requirements.txt
```

### PIL Import Hatası
```bash
# Pillow tekrar yükleyin:
python -m pip uninstall Pillow
python -m pip install Pillow
```

## 📊 Teknik Detaylar

### Backend API Endpoint'leri

- `GET /` - Ana sayfa
- `POST /check_email` - E-posta kontrolü ve kayıt
- `GET /get_cookie_email` - Cookie'den e-posta al
- `POST /split_image` - Görseli böl
- `POST /download_piece/<index>` - Parça indir

### Görsel İşleme Algoritması

1. Görseli aç (PIL.Image)
2. RGBA → RGB dönüşümü (gerekirse)
3. Grid boyutunu hesapla (rows × cols)
4. Görsel oranını grid oranıyla karşılaştır
5. LANCZOS ile yeniden boyutlandır
6. Merkeze hizala ve kırp
7. Parçalara böl (her biri 1080×1350px)
8. Base64'e çevir ve gönder

## 💻 Sistem Gereksinimleri

- **OS**: Windows, macOS, Linux
- **Python**: 3.8 veya üzeri
- **RAM**: En az 2GB (büyük görseller için daha fazla)
- **Disk**: 50MB (paketler için)

## 🚀 Production Deployment

Canlı ortamda kullanmak için:

```python
# app.py'de debug=False yapın
if __name__ == '__main__':
    init_email_db()
    app.run(debug=False, host='0.0.0.0', port=5000)
```

Gunicorn ile:
```bash
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## 📞 Destek

Herhangi bir sorun yaşarsanız:
1. `emails.xml` dosyasını silin ve tekrar deneyin
2. Tarayıcı cache'ini temizleyin
3. Python ve paketlerin güncel olduğundan emin olun

---

**QuipAI** © 2025 - Python Backend ile Instagram Görsel Bölücü
