# QuipAI - Instagram Gönderi Bölücü

Instagram için görselleri 3, 6 veya 9 parçaya bölen **Python Backend** destekli, yüksek kaliteli web uygulaması.

## 🚀 Özellikler

### ✅ Python ile Yüksek Kaliteli İşleme
- **PIL/Pillow** kütüphanesi ile profesyonel görsel işleme
- Canvas API yerine sunucu taraflı işleme
- LANCZOS resampling algoritması
- %95 JPEG kalitesi
- Her parça tam **1080x1350px** (Instagram 4:5 oranı)

### ✅ Akıllı E-posta ve Cookie Sistemi
- E-postalar XML veritabanında saklanır
- Cookie ile 30 gün otomatik giriş
- Tekrar ziyarette e-posta girmeye gerek yok
- İlk kayıt ve son erişim takibi

### ✅ Oran Korumalı Bölme
- **3 Parça**: 1x3 grid (3240×1350px toplam)
- **6 Parça**: 2x3 grid (3240×2700px toplam)
- **9 Parça**: 3x3 grid (3240×4050px toplam)
- Otomatik merkeze hizalama ve kırpma
- Görsel kalitesi korunur

### ✅ Kullanıcı Dostu Arayüz
- Modern ve responsive tasarım
- Sürükle-bırak desteği
- Gerçek zamanlı bildirimler
- Loading göstergesi
- Tek tıkla indirme

## 📦 Hızlı Başlangıç

### 1. Python'u Kurun
[python.org](https://www.python.org/downloads/) adresinden Python 3.8+ indirin

### 2. Paketleri Yükleyin
```bash
python -m pip install -r requirements.txt
```

### 3. Sunucuyu Başlatın
```bash
python app.py
```

### 4. Tarayıcıda Açın
```
http://localhost:5000
```

> **Detaylı kurulum için**: `SETUP_GUIDE.md` dosyasına bakın

## 📁 Dosya Yapısı

```
QuipAI/
├── app.py                 # Flask backend (Python)
├── requirements.txt       # Python bağımlılıkları
├── emails.xml            # E-posta veritabanı (otomatik)
├── templates/
│   └── index.html        # Frontend
├── SETUP_GUIDE.md        # Detaylı kurulum kılavuzu
└── README.md             # Bu dosya
```

## 🎯 Kullanım

1. **E-posta Girin**: İlk kullanımda (cookie yoksa)
2. **Görsel Yükleyin**: Tıklayın veya sürükle-bırakın
3. **Grid Seçin**: 3, 6 veya 9 parça
4. **İndirin**: Her parçayı ayrı ayrı

## 💡 Teknik Avantajlar

### Neden Python Backend?

❌ **Canvas API Sorunları:**
- Tarayıcı performansına bağımlı
- Kalite kayıpları olabilir
- Oran hesaplamaları hatalı olabilir
- Büyük görsellerde yavaş

✅ **Python/Pillow Avantajları:**
- Sunucu taraflı güçlü işleme
- Profesyonel görsel kütüphanesi
- %100 doğru oran koruması
- Yüksek kalite garantisi
- LANCZOS resampling

### Görsel İşleme Akışı

```
Görsel Yükleme
    ↓
RGBA → RGB Dönüşümü
    ↓
Grid Boyutu Hesaplama
    ↓
Oran Karşılaştırma
    ↓
LANCZOS Resize
    ↓
Merkeze Hizalama + Kırpma
    ↓
Parçalara Bölme (1080×1350px)
    ↓
Base64 Encode
    ↓
Frontend'e Gönderim
```

## 🗄️ E-posta Veritabanı

E-postalar `emails.xml` dosyasında saklanır:

```xml
<?xml version="1.0" ?>
<emails>
  <email>
    <address>user@example.com</address>
    <registered_at>2025-01-21T10:00:00</registered_at>
    <last_access>2025-01-21T10:30:00</last_access>
  </email>
</emails>
```

- Kayıt tarihi ve son erişim takibi
- Tekrar eden e-postalar kaydedilmez
- Her erişimde son tarih güncellenir

## 🔒 Gizlilik ve Güvenlik

- ✅ Tüm görsel işlemleri geçici
- ✅ Görseller sunucuda saklanmaz
- ✅ E-postalar sadece XML'de
- ✅ Cookie 30 gün sonra otomatik silinir
- ✅ Sunucu taraflı validasyon

## 🛠️ Teknolojiler

**Backend:**
- Python 3.8+
- Flask 3.0
- Pillow (PIL) 10.1
- Flask-CORS

**Frontend:**
- HTML5
- Tailwind CSS (CDN)
- Vanilla JavaScript
- Lucide Icons
- Google Fonts (Inter)

## 📊 API Endpoints

| Method | Endpoint | Açıklama |
|--------|----------|----------|
| GET | `/` | Ana sayfa |
| POST | `/check_email` | E-posta kontrolü ve kayıt |
| GET | `/get_cookie_email` | Cookie'den e-posta al |
| POST | `/split_image` | Görseli böl |
| POST | `/download_piece/<index>` | Parça indir |

## 🐛 Sorun Giderme

### Python Bulunamadı
- Python'u PATH'e ekleyin
- `python --version` ile kontrol edin

### Port Zaten Kullanımda
```python
# app.py'de portu değiştirin
app.run(debug=True, port=5001)
```

### Paket Yükleme Hatası
```bash
python -m pip install --user -r requirements.txt
```

Daha fazla yardım için: `SETUP_GUIDE.md`

## 📝 Gereksinimler

- **Python**: 3.8 veya üzeri
- **RAM**: En az 2GB
- **Disk**: ~50MB (paketler için)
- **Tarayıcı**: Chrome, Firefox, Safari, Edge

## 🚀 Production Deployment

```bash
# Gunicorn ile
pip install gunicorn
gunicorn -w 4 -b 0.0.0.0:5000 app:app
```

## 📄 Lisans

Bu proje açık kaynaklıdır ve özgürce kullanılabilir.

---

**QuipAI** © 2025 - Python Backend ile Profesyonel Instagram Görsel Bölücü

**Özellikler:**
- 🎯 Oran korumalı bölme
- 🖼️ Yüksek kalite çıktı
- 🍪 Cookie sistemi
- 📁 XML veritabanı
- ⚡ Hızlı işleme
- 🔒 Güvenli
