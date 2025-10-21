# 🚀 Railway Deployment Rehberi - Adım Adım

Railway.app ile QuipInsta projenizi canlıya alın!

---

## 📋 Ön Hazırlık (Tamamlandı ✅)

Aşağıdaki dosyalar hazırlandı:
- ✅ `.gitignore` - Git'e dahil edilmeyecek dosyalar
- ✅ `Procfile` - Railway'e nasıl başlatılacağını söyler
- ✅ `requirements.txt` - Gunicorn eklendi

---

## 🎯 Adım 1: GitHub Hesabı Oluştur (Yoksa)

1. https://github.com adresine git
2. "Sign up" ile hesap oluştur
3. Email doğrula

---

## 🎯 Adım 2: Yeni Repository Oluştur

### GitHub'da:
1. https://github.com/new adresine git
2. Repository name: `quipinsta` veya `instagram-grid-splitter`
3. Description: "Instagram Grid Splitter - QuipInsta"
4. ✅ Public (veya Private)
5. ❌ README, .gitignore ekleme (zaten var)
6. "Create repository" butonuna tıkla

---

## 🎯 Adım 3: Projeyi GitHub'a Yükle

### Terminal'de (Git Bash veya CMD):

```bash
# 1. Proje klasörüne git
cd c:\Users\3D\Desktop\Test

# 2. Git başlat (eğer başlatmadıysanız)
git init

# 3. Tüm dosyaları ekle
git add .

# 4. İlk commit
git commit -m "Initial commit - QuipInsta project"

# 5. GitHub repository'nizi bağlayın (YOUR_USERNAME'i değiştirin)
git remote add origin https://github.com/YOUR_USERNAME/quipinsta.git

# 6. Main branch oluştur
git branch -M main

# 7. GitHub'a yükle
git push -u origin main
```

### ⚠️ Dikkat:
- `YOUR_USERNAME` yerine kendi GitHub kullanıcı adınızı yazın
- Git ilk kullanımda kullanıcı adı/şifre isteyecek

### Git Config (İlk Kullanım):
```bash
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

---

## 🎯 Adım 4: Railway Hesabı Oluştur

1. https://railway.app/ adresine git
2. "Login" → "Login with GitHub" seç
3. GitHub hesabınızla giriş yapın
4. Railway'in GitHub erişimi için izin verin

---

## 🎯 Adım 5: Railway'de Proje Oluştur

### Railway Dashboard'da:

1. **"New Project"** butonuna tıkla

2. **"Deploy from GitHub repo"** seç

3. **Repository seç:**
   - `quipinsta` repository'nizi bulun ve seçin
   - Eğer görmüyorsanız: "Configure GitHub App" → Repository erişimi verin

4. **Otomatik Deploy Başlar! 🎉**
   - Railway otomatik olarak:
     - ✅ requirements.txt'i bulur
     - ✅ Bağımlılıkları yükler
     - ✅ Procfile'ı çalıştırır
     - ✅ Uygulamanızı başlatır

5. **Deployment İzle:**
   - "View Logs" ile deployment sürecini izleyin
   - Yeşil tick (✓) görünce deployment tamamlanmıştır

---

## 🎯 Adım 6: Domain Ayarla

### Railway Dashboard'da:

1. Project'e tıklayın

2. **Settings** sekmesi

3. **Networking** bölümü

4. **Generate Domain** butonuna tıkla

5. Domain oluşturulur: `your-project-name.up.railway.app`

6. Bu URL'yi kaydedin!

---

## 🎯 Adım 7: Environment Variables (Opsiyonel)

### Mail özelliği için:

1. Project → **Variables** sekmesi

2. **New Variable** ekle:
```
MAIL_PASSWORD=your_gmail_app_password
```

3. Save

4. Deploy yeniden başlar (otomatik)

---

## ✅ Adım 8: Test Edin!

### Tarayıcıda:
```
https://your-project-name.up.railway.app/
```

### Test Listesi:
- ✅ Ana sayfa açılıyor mu?
- ✅ E-posta girişi çalışıyor mu?
- ✅ Görsel yükleme çalışıyor mu?
- ✅ Crop modal açılıyor mu?
- ✅ Görsel bölme çalışıyor mu?
- ✅ İndirme çalışıyor mu?
- ✅ İletişim sayfası açılıyor mu?
- ✅ İletişim formu çalışıyor mu?
- ✅ Dil değiştirme (TR/ENG) çalışıyor mu?

---

## 🔄 Güncellemeler (Sonraki Değişiklikler)

### Kod değişikliği yaptığınızda:

```bash
# 1. Değişiklikleri kaydet
git add .
git commit -m "Açıklama: Ne değiştirdin"

# 2. GitHub'a yükle
git push

# 3. Railway OTOMATIK güncellenir! 🎉
```

Railway her push'da otomatik deploy yapar (CI/CD)!

---

## 🌐 Custom Domain Bağlama (Opsiyonel)

### quipinsta.com domain'inizi bağlamak için:

1. Railway → Settings → Networking

2. **Custom Domain** ekle: `quipinsta.com`

3. Railway size DNS kayıtları verir:
```
Type: CNAME
Name: @
Value: your-project.up.railway.app
```

4. Domain paneline (Godaddy, Namecheap, vs.) giriş yapın

5. DNS kayıtlarını ekleyin

6. 24 saat içinde aktif olur

---

## 💰 Fiyatlandırma

### Railway Ücretsiz Plan:
- ✅ $5 ücretsiz kredi/ay
- ✅ 500 saat çalışma süresi
- ✅ Küçük projeler için yeterli

### Tahmini Kullanım:
- Düşük trafik: $0-2/ay
- Orta trafik: $3-5/ay
- Yüksek trafik: $5+/ay

---

## 🔧 Sorun Giderme

### Deployment Başarısız:

1. **Logs kontrol et:**
   - Railway Dashboard → Deployments → View Logs
   - Hata mesajlarını oku

2. **Yaygın hatalar:**
   - `ModuleNotFoundError`: requirements.txt eksik paket
   - `Port hatası`: Railway otomatik PORT verir, değiştirmeyin
   - `Gunicorn hatası`: Procfile kontrolü

### Port Sorunu (Önemli!):

app.py son satırını kontrol edin:
```python
if __name__ == '__main__':
    port = int(os.environ.get('PORT', 5000))
    app.run(host='0.0.0.0', port=port, debug=False)
```

### Logları İzleme:
```bash
# Railway CLI ile (opsiyonel)
railway logs
```

---

## 📊 Railway vs FTP Karşılaştırması

| Özellik | Railway | FTP (Şu Anki) |
|---------|---------|---------------|
| **Backend** | ✅ Python | ❌ Yok |
| **Görsel İşleme** | ✅ Server+Client | ✅ Client-side |
| **Mail Sistemi** | ✅ Flask-Mail | ✅ FormSubmit |
| **Mesaj Kayıt** | ✅ JSON dosya | ❌ Sadece mail |
| **/view_messages** | ✅ Çalışır | ❌ Çalışmaz |
| **Otomatik Deploy** | ✅ Git push | ❌ Manuel FTP |
| **HTTPS** | ✅ Otomatik | ✅ (var ise) |
| **Ücret** | $5 kredi/ay | Hosting ücreti |

---

## 🎓 Öğrenecekleriniz

Railway ile:
- ✅ Git workflow
- ✅ GitHub kullanımı
- ✅ CI/CD pipeline
- ✅ Environment variables
- ✅ Cloud deployment
- ✅ Log monitoring
- ✅ Domain management

---

## 📝 Hızlı Komutlar Özeti

```bash
# İlk yükleme
git init
git add .
git commit -m "Initial commit"
git remote add origin https://github.com/USERNAME/quipinsta.git
git branch -M main
git push -u origin main

# Sonraki güncellemeler
git add .
git commit -m "Update: açıklama"
git push
```

---

## ✨ Sonraki Adımlar

1. ✅ GitHub'a yükle
2. ✅ Railway'e deploy et
3. ✅ Test et
4. 🎯 Custom domain bağla (opsiyonel)
5. 🎯 Analytics ekle (opsiyonel)
6. 🎯 Monitoring kur (opsiyonel)

---

## 🆘 Yardım Gerekirse

- Railway Docs: https://docs.railway.app/
- Railway Discord: https://discord.gg/railway
- Railway Status: https://status.railway.app/

**Herhangi bir adımda takılırsanız, size yardımcı olabilirim!** 🚀
