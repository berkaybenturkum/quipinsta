// Çoklu dil çevirileri
const translations = {
    tr: {
        // Header
        contact: 'İletişim',
        
        // Hero
        heroTitle: 'Instagram Gönderinizi',
        heroHighlight: '3, 6 veya 9',
        heroTitleEnd: 'Parçaya Bölün',
        heroSubtitle: 'Görsel yükleyin, grid yapısını seçin, parçaları tek tek indirin. Python ile yüksek kaliteli işleme.',
        
        // Step 1
        step1Title: 'E-posta Adresinizi Girin',
        step1Subtitle: 'Cookie ile bir sonraki ziyaretinizde otomatik giriş yapılacak.',
        emailPlaceholder: 'E-posta adresiniz (zorunlu)',
        continueBtn: 'Devam Et',
        
        // Step 2
        step2Title: 'Fotoğraf Yükle & Grid Seç',
        uploadText: 'Fotoğraf Yükle veya sürükleyip bırak',
        uploadLimit: 'PNG, JPG, GIF (maksimum 50MB)',
        recommendedSize: 'Önerilen boyut: 3240×1350px (3 parça için)',
        gridOptions: 'Grid Bölme Seçenekleri',
        pieces3: '3 Parça',
        pieces6: '6 Parça',
        pieces9: '9 Parça',
        
        // Processing
        processing: 'Görsel işleniyor...',
        
        // Features
        feature1Title: 'Python Güçlü İşleme',
        feature1Desc: 'PIL/Pillow kütüphanesi ile profesyonel kalitede görsel işleme.',
        feature2Title: 'Oran Korumalı',
        feature2Desc: 'Her parça tam 1080x1350px, Instagram 4:5 oranına uygun.',
        feature3Title: 'Cookie Sistemi',
        feature3Desc: 'E-postanız cookie\'de saklanır, bir sonraki ziyarette otomatik giriş.',
        
        // Preview
        previewTitle: 'Bölünmüş Görseller',
        download: 'İndir',
        
        // Crop Modal
        cropTitle: 'Görseli Ayarla',
        cropMode: 'Crop Modu:',
        freeRatio: 'Serbest Oran',
        fixedRatio: 'Sabit Oran',
        bgColorLabel: 'Boş Alan Rengi:',
        instagramWhite: '(Instagram beyaz: #F5F5F5)',
        applyColor: 'Rengi Uygula',
        piecePreview: 'Parça Önizleme',
        preview: 'Önizle',
        cancel: 'İptal',
        apply: 'Tamam',
        
        // Notifications
        welcomeCookie: 'Hoş geldiniz! E-postanız cookie\'den yüklendi.',
        emailSaved: 'E-posta kaydedildi!',
        welcomeBack: 'Tekrar hoş geldiniz!',
        enterEmailFirst: 'Önce e-posta adresinizi girin',
        selectValidImage: 'Lütfen geçerli bir görsel dosyası seçin',
        fileSizeLimit: 'Dosya boyutu 50MB\'dan küçük olmalıdır',
        splitting: 'parçaya yeniden bölünüyor...',
        splitSuccess: 'Görsel başarıyla bölündü!',
        downloading: 'indiriliyor...',
        colorUpdated: 'Renk güncellendi!',
        
        // Footer
        privacy: 'Gizlilik',
        contactFooter: 'İletişim',
        
        // Contact Page
        home: 'Ana Sayfa',
        contactTitle: 'İletişim',
        contactSubtitle: 'Sorularınız, önerileriniz veya geri bildirimleriniz için bize ulaşın.',
        sendMessage: 'Mesaj Gönderin',
        nameLabel: 'İsminiz',
        namePlaceholder: 'Adınız Soyadınız',
        emailLabel: 'E-posta Adresiniz',
        subjectLabel: 'Konu',
        subjectPlaceholder: 'Mesajınızın konusu',
        messageLabel: 'Mesajınız',
        messagePlaceholder: 'Mesajınızı buraya yazın...',
        sendButton: 'Gönder',
        sending: 'Gönderiliyor...',
        contactInfo: 'İletişim Bilgileri',
        responseTime: 'Mesajlarınıza en kısa sürede yanıt vermeye çalışacağız.',
        successMessage: 'Mesajınız başarıyla gönderildi!',
        errorMessage: 'Bir hata oluştu. Lütfen tekrar deneyin.',
    },
    en: {
        // Header
        contact: 'Contact',
        
        // Hero
        heroTitle: 'Split Your Instagram Post into',
        heroHighlight: '3, 6 or 9',
        heroTitleEnd: 'Pieces',
        heroSubtitle: 'Upload image, select grid layout, download pieces individually. High-quality processing with Python.',
        
        // Step 1
        step1Title: 'Enter Your Email',
        step1Subtitle: 'Auto-login on your next visit with cookie.',
        emailPlaceholder: 'Your email (required)',
        continueBtn: 'Continue',
        
        // Step 2
        step2Title: 'Upload Photo & Select Grid',
        uploadText: 'Upload Photo or drag & drop',
        uploadLimit: 'PNG, JPG, GIF (max 50MB)',
        recommendedSize: 'Recommended size: 3240×1350px (for 3 pieces)',
        gridOptions: 'Grid Split Options',
        pieces3: '3 Pieces',
        pieces6: '6 Pieces',
        pieces9: '9 Pieces',
        
        // Processing
        processing: 'Processing image...',
        
        // Features
        feature1Title: 'Python Powered',
        feature1Desc: 'Professional image processing with PIL/Pillow library.',
        feature2Title: 'Aspect Preserved',
        feature2Desc: 'Each piece exactly 1080x1350px, Instagram 4:5 ratio compliant.',
        feature3Title: 'Cookie System',
        feature3Desc: 'Email saved in cookie, auto-login on next visit.',
        
        // Preview
        previewTitle: 'Split Images',
        download: 'Download',
        
        // Crop Modal
        cropTitle: 'Adjust Image',
        cropMode: 'Crop Mode:',
        freeRatio: 'Free Ratio',
        fixedRatio: 'Fixed Ratio',
        bgColorLabel: 'Empty Space Color:',
        instagramWhite: '(Instagram white: #F5F5F5)',
        applyColor: 'Apply Color',
        piecePreview: 'Piece Preview',
        preview: 'Preview',
        cancel: 'Cancel',
        apply: 'Apply',
        
        // Notifications
        welcomeCookie: 'Welcome! Your email loaded from cookie.',
        emailSaved: 'Email saved!',
        welcomeBack: 'Welcome back!',
        enterEmailFirst: 'Please enter your email first',
        selectValidImage: 'Please select a valid image file',
        fileSizeLimit: 'File size must be less than 50MB',
        splitting: 'Re-splitting into pieces...',
        splitSuccess: 'Image split successfully!',
        downloading: 'downloading...',
        colorUpdated: 'Color updated!',
        
        // Footer
        privacy: 'Privacy',
        contactFooter: 'Contact',
        
        // Contact Page
        home: 'Home',
        contactTitle: 'Contact',
        contactSubtitle: 'Reach out to us with your questions, suggestions, or feedback.',
        sendMessage: 'Send Message',
        nameLabel: 'Your Name',
        namePlaceholder: 'Your Name',
        emailLabel: 'Your Email',
        subjectLabel: 'Subject',
        subjectPlaceholder: 'Subject of your message',
        messageLabel: 'Your Message',
        messagePlaceholder: 'Write your message here...',
        sendButton: 'Send',
        sending: 'Sending...',
        contactInfo: 'Contact Information',
        responseTime: 'We will try to respond to your messages as soon as possible.',
        successMessage: 'Your message has been sent successfully!',
        errorMessage: 'An error occurred. Please try again.',
    }
};

// Mevcut dil
let currentLang = 'tr';

// Dil değiştirme fonksiyonu
function setLanguage(lang) {
    currentLang = lang;
    localStorage.setItem('preferredLang', lang);
    updatePageText();
    
    // Bayrak butonlarını güncelle
    document.querySelectorAll('.lang-btn').forEach(btn => {
        btn.classList.remove('ring-2', 'ring-indigo-500');
    });
    document.querySelector(`[data-lang="${lang}"]`).classList.add('ring-2', 'ring-indigo-500');
}

// Sayfa metinlerini güncelle
function updatePageText() {
    const t = translations[currentLang];
    
    // Data-i18n attribute'larına göre güncelle
    document.querySelectorAll('[data-i18n]').forEach(elem => {
        const key = elem.getAttribute('data-i18n');
        if (t[key]) {
            if (elem.tagName === 'INPUT' || elem.tagName === 'TEXTAREA') {
                elem.placeholder = t[key];
            } else {
                elem.textContent = t[key];
            }
        }
    });
    
    // data-i18n-placeholder attribute'larına göre placeholder güncelle
    document.querySelectorAll('[data-i18n-placeholder]').forEach(elem => {
        const key = elem.getAttribute('data-i18n-placeholder');
        if (t[key]) {
            elem.placeholder = t[key];
        }
    });
}

// Tarayıcı dilini algıla
function detectLanguage() {
    const saved = localStorage.getItem('preferredLang');
    if (saved) return saved;
    
    const browserLang = navigator.language || navigator.userLanguage;
    return browserLang.startsWith('tr') ? 'tr' : 'en';
}

// Sayfa yüklendiğinde dili ayarla
document.addEventListener('DOMContentLoaded', () => {
    const detectedLang = detectLanguage();
    setLanguage(detectedLang);
});
