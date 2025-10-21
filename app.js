// QuipInsta - Instagram Gönderi Bölücü
// Tamamen client-side çalışan, tüm özellikleri içeren versiyon

class ImageSplitterBackend {
    constructor() {
        this.emailSubmitted = false;
        this.currentGrid = 3;
        this.splitImages = [];
        this.currentFile = null;
        this.cropper = null;
        this.originalFile = null;
        this.currentBgColor = '#F5F5F5';
        this.init();
    }

    async init() {
        // Cookie kontrolü
        await this.checkCookie();
        
        // E-posta formu
        const emailForm = document.getElementById('emailForm');
        if (emailForm) {
            emailForm.addEventListener('submit', (e) => this.handleEmailSubmit(e));
        }

        // Grid butonları
        const gridButtons = document.querySelectorAll('.grid-btn');
        gridButtons.forEach(btn => {
            btn.addEventListener('click', (e) => this.handleGridSelect(e));
        });

        // Dosya yükleme
        const fileInput = document.getElementById('fileInput');
        const dropZone = document.getElementById('dropZone');
        
        if (fileInput) {
            fileInput.addEventListener('change', (e) => this.handleFileSelect(e));
        }
        
        if (dropZone) {
            dropZone.addEventListener('click', () => fileInput?.click());
            dropZone.addEventListener('dragover', (e) => this.handleDragOver(e));
            dropZone.addEventListener('dragleave', (e) => this.handleDragLeave(e));
            dropZone.addEventListener('drop', (e) => this.handleDrop(e));
        }

        // Crop modal butonları
        const closeCropModal = document.getElementById('closeCropModal');
        const cancelCrop = document.getElementById('cancelCrop');
        const applyCrop = document.getElementById('applyCrop');
        const zoomIn = document.getElementById('zoomIn');
        const zoomOut = document.getElementById('zoomOut');
        const resetCrop = document.getElementById('resetCrop');
        const cropModeFree = document.getElementById('cropModeFree');
        const cropModeFixed = document.getElementById('cropModeFixed');
        const generatePreview = document.getElementById('generatePreview');
        const applyColorChange = document.getElementById('applyColorChange');

        if (closeCropModal) closeCropModal.addEventListener('click', () => this.closeCropModal());
        if (cancelCrop) cancelCrop.addEventListener('click', () => this.closeCropModal());
        if (applyCrop) applyCrop.addEventListener('click', () => this.applyCrop());
        if (zoomIn) zoomIn.addEventListener('click', () => this.cropper?.zoom(0.1));
        if (zoomOut) zoomOut.addEventListener('click', () => this.cropper?.zoom(-0.1));
        if (resetCrop) resetCrop.addEventListener('click', () => this.cropper?.reset());
        if (cropModeFree) cropModeFree.addEventListener('click', () => this.toggleCropMode(false));
        if (cropModeFixed) cropModeFixed.addEventListener('click', () => this.toggleCropMode(true));
        if (generatePreview) generatePreview.addEventListener('click', () => this.generatePreview());
        if (applyColorChange) applyColorChange.addEventListener('click', () => this.applyColorChange());
    }

    toggleCropMode(isFixed) {
        if (!this.cropper) return;
        
        const freeBtn = document.getElementById('cropModeFree');
        const fixedBtn = document.getElementById('cropModeFixed');
        
        if (isFixed) {
            // Sabit oran modu
            let aspectRatio;
            if (this.currentGrid === 3) {
                aspectRatio = 3240 / 1350;
            } else if (this.currentGrid === 6) {
                aspectRatio = 3240 / 2700;
            } else {
                aspectRatio = 3240 / 4050;
            }
            this.cropper.setAspectRatio(aspectRatio);
            
            fixedBtn.classList.remove('bg-gray-200');
            fixedBtn.classList.add('bg-indigo-600', 'text-white');
            freeBtn.classList.remove('bg-indigo-600', 'text-white');
            freeBtn.classList.add('bg-gray-200');
        } else {
            // Serbest oran modu
            this.cropper.setAspectRatio(NaN);
            
            freeBtn.classList.remove('bg-gray-200');
            freeBtn.classList.add('bg-indigo-600', 'text-white');
            fixedBtn.classList.remove('bg-indigo-600', 'text-white');
            fixedBtn.classList.add('bg-gray-200');
        }
    }

    generatePreview() {
        if (!this.cropper) return;
        
        const bgColor = document.getElementById('bgColorPicker').value;
        const previewSection = document.getElementById('cropPreviewSection');
        const previewGrid = document.getElementById('cropPreviewGrid');
        
        // Önizleme bölümünü göster
        previewSection.classList.remove('hidden');
        previewGrid.innerHTML = '<div class="col-span-3 text-center text-sm text-gray-500">Önizleme oluşturuluyor...</div>';
        
        // Grid yapısını belirle
        let rows, cols;
        if (this.currentGrid === 3) {
            rows = 1;
            cols = 3;
        } else if (this.currentGrid === 6) {
            rows = 2;
            cols = 3;
        } else {
            rows = 3;
            cols = 3;
        }
        
        const targetWidth = 1080;
        const targetHeight = 1350;
        
        // Crop edilmiş görseli al
        const croppedCanvas = this.cropper.getCroppedCanvas({
            width: targetWidth * cols,
            height: targetHeight * rows,
            imageSmoothingQuality: 'high',
            fillColor: bgColor,
        });
        
        // Parçalara böl
        previewGrid.innerHTML = '';
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const canvas = document.createElement('canvas');
                canvas.width = targetWidth;
                canvas.height = targetHeight;
                const ctx = canvas.getContext('2d');
                
                // Parçayı çiz
                ctx.drawImage(
                    croppedCanvas,
                    col * targetWidth, row * targetHeight,
                    targetWidth, targetHeight,
                    0, 0,
                    targetWidth, targetHeight
                );
                
                const img = document.createElement('img');
                img.src = canvas.toDataURL('image/jpeg', 0.8);
                img.className = 'w-full h-auto rounded border border-gray-300';
                
                previewGrid.appendChild(img);
            }
        }
        
        // İkonları güncelle
        if (window.lucide) {
            window.lucide.createIcons();
        }
    }

    applyColorChange() {
        // Önizlemeyi yeniden oluştur
        this.generatePreview();
        this.showNotification('Renk güncellendi!', 'success');
    }

    async checkCookie() {
        const cookieEmail = this.getCookie('user_email');
        if (cookieEmail) {
            document.getElementById('emailInput').value = cookieEmail;
            this.showNotification('Hoş geldiniz! E-postanız cookie\'den yüklendi.', 'success');
            setTimeout(() => {
                this.emailSubmitted = true;
                this.enableStep2();
            }, 1000);
        }
    }

    getCookie(name) {
        const value = `; ${document.cookie}`;
        const parts = value.split(`; ${name}=`);
        if (parts.length === 2) return parts.pop().split(';').shift();
    }

    setCookie(name, value, days) {
        let expires = "";
        if (days) {
            const date = new Date();
            date.setTime(date.getTime() + (days * 24 * 60 * 60 * 1000));
            expires = "; expires=" + date.toUTCString();
        }
        document.cookie = name + "=" + (value || "") + expires + "; path=/";
    }

    async handleEmailSubmit(e) {
        e.preventDefault();
        const emailInput = document.getElementById('emailInput');
        const email = emailInput.value.trim();

        // E-posta validasyonu
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
            this.showNotification('Geçerli bir e-posta adresi girin', 'error');
            return;
        }

        // Cookie'ye kaydet
        this.setCookie('user_email', email, 30);
        
        this.emailSubmitted = true;
        this.showNotification('E-posta kaydedildi!', 'success');
        this.enableStep2();
    }

    enableStep2() {
        const step2Section = document.getElementById('step2Section');
        if (step2Section) {
            step2Section.classList.remove('opacity-40', 'cursor-not-allowed');
            step2Section.querySelector('.ml-11').classList.remove('pointer-events-none');
            
            const step2Badge = step2Section.querySelector('.bg-gray-300');
            if (step2Badge) {
                step2Badge.classList.remove('bg-gray-300', 'text-gray-600');
                step2Badge.classList.add('bg-indigo-600', 'text-white');
            }
            
            const step2Title = step2Section.querySelector('.text-gray-500');
            if (step2Title) {
                step2Title.classList.remove('text-gray-500');
                step2Title.classList.add('text-gray-800');
            }
        }
    }

    handleGridSelect(e) {
        if (!this.emailSubmitted) {
            this.showNotification('Önce e-posta adresinizi girin', 'error');
            return;
        }

        const button = e.target.closest('.grid-btn');
        const newGrid = parseInt(button.dataset.grid);
        
        if (newGrid !== this.currentGrid) {
            this.currentGrid = newGrid;

            document.querySelectorAll('.grid-btn').forEach(btn => {
                btn.classList.remove('grid-btn-active');
            });
            button.classList.add('grid-btn-active');
            
            if (this.currentFile) {
                this.showNotification(`${this.currentGrid} parçaya yeniden bölünüyor...`, 'info');
                this.processFile(this.currentFile);
            }
        }
    }

    handleFileSelect(e) {
        if (!this.emailSubmitted) {
            this.showNotification('Önce e-posta adresinizi girin', 'error');
            return;
        }

        const file = e.target.files[0];
        this.openCropModal(file);
    }

    handleDragOver(e) {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.add('border-indigo-500', 'bg-indigo-50');
    }

    handleDragLeave(e) {
        e.preventDefault();
        e.stopPropagation();
        e.currentTarget.classList.remove('border-indigo-500', 'bg-indigo-50');
    }

    handleDrop(e) {
        e.preventDefault();
        e.stopPropagation();
        
        if (!this.emailSubmitted) {
            this.showNotification('Önce e-posta adresinizi girin', 'error');
            return;
        }

        e.currentTarget.classList.remove('border-indigo-500', 'bg-indigo-50');
        
        const file = e.dataTransfer.files[0];
        this.openCropModal(file);
    }

    openCropModal(file) {
        if (!file || !file.type.match('image.*')) {
            this.showNotification('Lütfen geçerli bir görsel dosyası seçin', 'error');
            return;
        }

        if (file.size > 50 * 1024 * 1024) {
            this.showNotification('Dosya boyutu 50MB\'dan küçük olmalıdır', 'error');
            return;
        }

        this.originalFile = file;
        const reader = new FileReader();
        
        reader.onload = (e) => {
            const cropImage = document.getElementById('cropImage');
            cropImage.src = e.target.result;
            
            document.getElementById('cropModal').classList.add('active');
            
            if (this.cropper) {
                this.cropper.destroy();
            }
            
            let aspectRatio;
            if (this.currentGrid === 3) {
                aspectRatio = 3240 / 1350;
            } else if (this.currentGrid === 6) {
                aspectRatio = 3240 / 2700;
            } else {
                aspectRatio = 3240 / 4050;
            }
            
            this.cropper = new Cropper(cropImage, {
                aspectRatio: aspectRatio,
                viewMode: 0,
                dragMode: 'move',
                autoCropArea: 0.8,
                restore: false,
                guides: true,
                center: true,
                highlight: false,
                cropBoxMovable: true,
                cropBoxResizable: true,
                toggleDragModeOnDblclick: false,
                background: false,
                modal: true,
                scalable: true,
                zoomable: true,
                zoomOnWheel: false,
                minContainerWidth: 200,
                minContainerHeight: 200,
            });
            
            if (window.lucide) {
                window.lucide.createIcons();
            }
        };
        
        reader.readAsDataURL(file);
    }

    closeCropModal() {
        document.getElementById('cropModal').classList.remove('active');
        if (this.cropper) {
            this.cropper.destroy();
            this.cropper = null;
        }
        
        document.getElementById('cropPreviewSection').classList.add('hidden');
        document.getElementById('cropPreviewGrid').innerHTML = '';
        
        const fileInput = document.getElementById('fileInput');
        if (fileInput) {
            fileInput.value = '';
        }
    }

    applyCrop() {
        if (!this.cropper) return;
        
        const bgColor = document.getElementById('bgColorPicker').value;
        
        this.cropper.getCroppedCanvas({
            width: this.currentGrid === 3 ? 3240 : this.currentGrid === 6 ? 3240 : 3240,
            height: this.currentGrid === 3 ? 1350 : this.currentGrid === 6 ? 2700 : 4050,
            imageSmoothingQuality: 'high',
            fillColor: bgColor,
        }).toBlob((blob) => {
            const croppedFile = new File([blob], this.originalFile.name, {
                type: 'image/jpeg',
                lastModified: Date.now()
            });
            
            this.currentBgColor = bgColor;
            this.closeCropModal();
            this.processFile(croppedFile);
        }, 'image/jpeg', 0.95);
    }

    async processFile(file) {
        if (!file) return;

        if (!file.type.match('image.*')) {
            this.showNotification('Lütfen geçerli bir görsel dosyası seçin', 'error');
            return;
        }

        if (file.size > 50 * 1024 * 1024) {
            this.showNotification('Dosya boyutu 50MB\'dan küçük olmalıdır', 'error');
            return;
        }

        this.currentFile = file;

        document.getElementById('loadingSection').classList.remove('hidden');
        document.getElementById('previewSection').classList.add('hidden');

        // Client-side görsel işleme
        const img = await this.loadImage(file);
        const splitImages = await this.splitImageClientSide(img);
        
        this.splitImages = splitImages;
        this.displaySplitImages();
        
        document.getElementById('loadingSection').classList.add('hidden');
    }

    loadImage(file) {
        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = (e) => {
                const img = new Image();
                img.onload = () => resolve(img);
                img.onerror = reject;
                img.src = e.target.result;
            };
            reader.readAsDataURL(file);
        });
    }

    async splitImageClientSide(img) {
        const results = [];
        
        let rows, cols;
        if (this.currentGrid === 3) {
            rows = 1;
            cols = 3;
        } else if (this.currentGrid === 6) {
            rows = 2;
            cols = 3;
        } else {
            rows = 3;
            cols = 3;
        }
        
        const targetWidth = 1080;
        const targetHeight = 1350;
        const totalWidth = targetWidth * cols;
        const totalHeight = targetHeight * rows;
        
        const imgAspect = img.width / img.height;
        const gridAspect = totalWidth / totalHeight;
        
        let newWidth, newHeight;
        if (imgAspect > gridAspect) {
            newWidth = totalWidth;
            newHeight = Math.floor(newWidth / imgAspect);
        } else {
            newHeight = totalHeight;
            newWidth = Math.floor(newHeight * imgAspect);
        }
        
        const canvas = document.createElement('canvas');
        canvas.width = totalWidth;
        canvas.height = totalHeight;
        const ctx = canvas.getContext('2d');
        
        ctx.fillStyle = this.currentBgColor;
        ctx.fillRect(0, 0, totalWidth, totalHeight);
        
        const offsetX = Math.floor((totalWidth - newWidth) / 2);
        const offsetY = Math.floor((totalHeight - newHeight) / 2);
        ctx.drawImage(img, offsetX, offsetY, newWidth, newHeight);
        
        for (let row = 0; row < rows; row++) {
            for (let col = 0; col < cols; col++) {
                const pieceCanvas = document.createElement('canvas');
                pieceCanvas.width = targetWidth;
                pieceCanvas.height = targetHeight;
                const pieceCtx = pieceCanvas.getContext('2d');
                
                const x = col * targetWidth;
                const y = row * targetHeight;
                
                pieceCtx.drawImage(
                    canvas,
                    x, y,
                    targetWidth, targetHeight,
                    0, 0,
                    targetWidth, targetHeight
                );
                
                const dataUrl = pieceCanvas.toDataURL('image/jpeg', 0.95);
                
                results.push({
                    index: row * cols + col + 1,
                    data: dataUrl
                });
            }
        }
        
        return results;
    }

    displaySplitImages() {
        const previewSection = document.getElementById('previewSection');
        const previewGrid = document.getElementById('previewGrid');
        
        previewGrid.innerHTML = '';

        this.splitImages.forEach((imgData) => {
            const div = document.createElement('div');
            div.className = 'flex flex-col items-center gap-3 group';
            div.innerHTML = `
                <img src="${imgData.data}" class="w-full h-auto rounded-lg shadow-sm transition-transform duration-300 group-hover:scale-105" alt="Grid Parçası ${imgData.index}">
                <button class="download-btn w-full text-center bg-indigo-500 text-white py-2.5 px-4 rounded-md hover:bg-indigo-600 transition-colors text-sm font-semibold shadow transform hover:scale-105" data-index="${imgData.index}" data-img="${imgData.data}">
                    <i data-lucide="download" class="inline-block w-4 h-4 -mt-1 mr-1.5"></i> İndir ${imgData.index}
                </button>
            `;
            
            const downloadBtn = div.querySelector('.download-btn');
            downloadBtn.addEventListener('click', () => this.downloadImage(imgData));
            
            previewGrid.appendChild(div);
        });

        if (window.lucide) {
            window.lucide.createIcons();
        }

        previewSection.classList.remove('hidden');
        previewSection.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
        
        this.showNotification('Görsel başarıyla bölündü!', 'success');
    }

    downloadImage(imgData) {
        const link = document.createElement('a');
        link.href = imgData.data;
        link.download = `instagram-grid-${imgData.index}.jpg`;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        
        this.showNotification(`Parça ${imgData.index} indiriliyor...`, 'success');
    }

    showNotification(message, type = 'info') {
        const existingNotif = document.getElementById('notification');
        if (existingNotif) {
            existingNotif.remove();
        }

        const notification = document.createElement('div');
        notification.id = 'notification';
        notification.className = `fixed top-24 right-4 px-6 py-3 rounded-lg shadow-lg z-50 transform transition-all duration-300 translate-x-96 ${
            type === 'success' ? 'bg-green-500' : 
            type === 'error' ? 'bg-red-500' : 
            'bg-blue-500'
        } text-white font-medium`;
        notification.textContent = message;

        document.body.appendChild(notification);

        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 10);

        setTimeout(() => {
            notification.style.transform = 'translateX(400px)';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ImageSplitterBackend();
});
