# FTP Yükleme Rehberi - quipinsta.com

## 📤 FTP'ye Yüklenecek Dosyalar

### Ana Dizin (public_html veya www):
```
/index.html
/contact.html
/app.js
/robots.txt
/sitemap.xml
```

### static/ Klasörü:
```
/static/translations.js
```

## 🌐 Erişim URL'leri

Site yüklendikten sonra:
- Ana sayfa: http://quipinsta.com/ veya http://quipinsta.com/index.html
- İletişim: http://quipinsta.com/contact.html

## ✅ Kontrol Listesi

1. [ ] FTP'ye bağlan
2. [ ] Ana dizine (public_html / www / htdocs) git
3. [ ] Dosyaları yükle:
   - index.html
   - contact.html  
   - app.js
   - robots.txt
   - sitemap.xml
4. [ ] static/ klasörü oluştur
5. [ ] static/translations.js dosyasını yükle
6. [ ] Test et:
   - http://quipinsta.com/
   - http://quipinsta.com/contact.html

## 🔧 Olası Sorunlar ve Çözümleri

### Sorun 1: contact.html bulunamıyor (404)
**Çözüm:** 
- Dosyanın doğru dizine yüklendiğini kontrol et
- Dosya adının küçük harf olduğundan emin ol: `contact.html`
- Dosya izinlerini kontrol et (644 veya 755)

### Sorun 2: static/translations.js yüklenemiyor
**Çözüm:**
- static/ klasörünün oluşturulduğundan emin ol
- translations.js dosyasını bu klasöre yükle
- Klasör izinlerini kontrol et (755)

### Sorun 3: Görsel işleme çalışmıyor
**Not:** 
- FTP'de Python backend yok, bu normal
- Görsel işleme özelliği sadece localhost'ta (Flask) çalışır
- FTP'de sadece iletişim formu çalışır (FormSubmit.co ile)

## 📧 İletişim Formu

FTP'de iletişim formu **FormSubmit.co** servisi ile çalışır:
- Mesajlar doğrudan **berkaybenturkum@gmail.com** adresine gönderilir
- İlk gönderimde FormSubmit doğrulama maili gönderecek
- Maildeki linke tıklayarak doğrulama yapın
- Sonraki tüm mesajlar otomatik gelecek

## 🚀 İlk Kurulum Adımları

1. FTP'ye dosyaları yükle
2. http://quipinsta.com/contact.html sayfasına git
3. Test mesajı gönder
4. FormSubmit'ten gelen doğrulama mailini kontrol et
5. Doğrulama linkine tıkla
6. Artık sistem hazır!

## 📝 Notlar

- Flask backend sadece local development için
- FTP'de Python çalışmaz, bu normal
- Görsel işleme özelliği için VPS/hosting gerekli
- İletişim formu FTP'de FormSubmit ile çalışır
