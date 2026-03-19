// أدوات مساعدة عامة للنظام

// تحويل التاريخ إلى صيغة عربية
function formatDate(date, format = 'ar-SA') {
    if (!date) return '';
    
    const d = new Date(date);
    return d.toLocaleDateString(format, {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        weekday: 'long'
    });
}

// تنسيق الأرقام (فواصل آلاف)
function formatNumber(number) {
    if (number === null || number === undefined) return '0';
    return new Intl.NumberFormat('ar-SA').format(number);
}

// تنسيق العملة
function formatCurrency(amount, currency = 'SAR') {
    if (amount === null || amount === undefined) return '٠ ر.س';
    return new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: currency,
        minimumFractionDigits: 2,
        maximumFractionDigits: 2
    }).format(amount);
}

// تقصير النص مع إضافة ثلاث نقاط
function truncateText(text, maxLength = 100) {
    if (!text) return '';
    if (text.length <= maxLength) return text;
    return text.substring(0, maxLength) + '...';
}

// إنشاء معرف فريد
function generateId(prefix = '') {
    const timestamp = Date.now().toString(36);
    const random = Math.random().toString(36).substr(2, 5);
    return `${prefix}${timestamp}${random}`.toUpperCase();
}

// التحقق من صحة الرقم الوطني السعودي
function validateSaudiID(id) {
    if (!id) return false;
    
    // التحقق من الطول (10 أرقام)
    if (!/^\d{10}$/.test(id)) return false;
    
    // التحقق من أن الرقم الأول إما 1 أو 2
    const firstDigit = id.charAt(0);
    if (firstDigit !== '1' && firstDigit !== '2') return false;
    
    // خوارزمية التحقق من صحة الرقم الوطني
    let sum = 0;
    for (let i = 0; i < 10; i++) {
        const digit = parseInt(id.charAt(i));
        if (i % 2 === 0) {
            const doubled = digit * 2;
            sum += doubled > 9 ? doubled - 9 : doubled;
        } else {
            sum += digit;
        }
    }
    
    return sum % 10 === 0;
}

// التحقق من صحة البريد الإلكتروني
function isValidEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

// التحقق من صحة رقم الهاتف السعودي
function isValidSaudiPhone(phone) {
    const regex = /^(05|5)(5|0|3|6|4|9|1|8|7)([0-9]{7})$/;
    return regex.test(phone);
}

// إنشاء كلمة مرور عشوائية
function generatePassword(length = 12) {
    const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*';
    let password = '';
    
    for (let i = 0; i < length; i++) {
        password += chars.charAt(Math.floor(Math.random() * chars.length));
    }
    
    return password;
}

// تحويل الرقم إلى كلمات (بالعربية)
function numberToArabicWords(number) {
    if (number === 0) return 'صفر';
    
    const units = ['', 'واحد', 'اثنان', 'ثلاثة', 'أربعة', 'خمسة', 'ستة', 'سبعة', 'ثمانية', 'تسعة'];
    const teens = ['عشرة', 'أحد عشر', 'اثنا عشر', 'ثلاثة عشر', 'أربعة عشر', 'خمسة عشر', 'ستة عشر', 'سبعة عشر', 'ثمانية عشر', 'تسعة عشر'];
    const tens = ['', 'عشرة', 'عشرون', 'ثلاثون', 'أربعون', 'خمسون', 'ستون', 'سبعون', 'ثمانون', 'تسعون'];
    const hundreds = ['', 'مائة', 'مئتان', 'ثلاثمائة', 'أربعمائة', 'خمسمائة', 'ستمائة', 'سبعمائة', 'ثمانمائة', 'تسعمائة'];
    
    const scales = ['', 'ألف', 'مليون', 'مليار', 'تريليون'];
    
    function convertThreeDigits(num) {
        let result = '';
        const hundred = Math.floor(num / 100);
        const ten = Math.floor((num % 100) / 10);
        const unit = num % 10;
        
        if (hundred > 0) {
            result += hundreds[hundred];
            if (ten > 0 || unit > 0) result += ' و';
        }
        
        if (ten === 1 && unit > 0) {
            result += teens[unit];
        } else {
            if (unit > 0) {
                result += units[unit];
                if (ten > 0) result += ' و';
            }
            if (ten > 0) {
                result += tens[ten];
            }
        }
        
        return result.trim();
    }
    
    if (number < 1000) {
        return convertThreeDigits(number);
    }
    
    let result = '';
    let scaleIndex = 0;
    
    while (number > 0) {
        const threeDigits = number % 1000;
        if (threeDigits > 0) {
            let scaleWord = scales[scaleIndex];
            if (scaleIndex > 0 && threeDigits > 2) {
                scaleWord += 'ات';
            }
            
            const part = convertThreeDigits(threeDigits) + ' ' + scaleWord;
            result = part + (result ? ' و ' + result : '');
        }
        
        number = Math.floor(number / 1000);
        scaleIndex++;
    }
    
    return result.trim();
}

// تحويل النص إلى عنوان URL صالح
function slugify(text) {
    return text
        .toString()
        .toLowerCase()
        .trim()
        .replace(/\s+/g, '-')
        .replace(/[^\w\-]+/g, '')
        .replace(/\-\-+/g, '-')
        .replace(/^-+/, '')
        .replace(/-+$/, '');
}

// إظهار إشعار للمستخدم
function showNotification(message, type = 'info', duration = 5000) {
    // إنصراف العنصر
    const notification = document.createElement('div');
    notification.className = `notification notification-${type}`;
    notification.innerHTML = `
        <div class="notification-content">
            <i class="fas fa-${type === 'success' ? 'check-circle' : type === 'error' ? 'exclamation-circle' : type === 'warning' ? 'exclamation-triangle' : 'info-circle'}"></i>
            <span>${message}</span>
        </div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;
    
    // إضافة الأنماط
    if (!document.querySelector('#notification-styles')) {
        const style = document.createElement('style');
        style.id = 'notification-styles';
        style.textContent = `
            .notification {
                position: fixed;
                top: 20px;
                left: 20px;
                right: 20px;
                background: white;
                border-radius: 8px;
                padding: 1rem 1.5rem;
                box-shadow: 0 4px 12px rgba(0,0,0,0.15);
                display: flex;
                align-items: center;
                justify-content: space-between;
                z-index: 9999;
                animation: slideIn 0.3s ease-out;
                max-width: 500px;
                margin: 0 auto;
            }
            
            .notification-success {
                border-right: 4px solid #2ecc71;
                background: #d4edda;
                color: #155724;
            }
            
            .notification-error {
                border-right: 4px solid #e74c3c;
                background: #f8d7da;
                color: #721c24;
            }
            
            .notification-warning {
                border-right: 4px solid #f39c12;
                background: #fff3cd;
                color: #856404;
            }
            
            .notification-info {
                border-right: 4px solid #3498db;
                background: #d1ecf1;
                color: #0c5460;
            }
            
            .notification-content {
                display: flex;
                align-items: center;
                gap: 0.75rem;
                flex: 1;
            }
            
            .notification-close {
                background: none;
                border: none;
                color: inherit;
                cursor: pointer;
                font-size: 1.1rem;
                opacity: 0.7;
                transition: opacity 0.2s;
            }
            
            .notification-close:hover {
                opacity: 1;
            }
            
            @keyframes slideIn {
                from {
                    transform: translateY(-100%);
                    opacity: 0;
                }
                to {
                    transform: translateY(0);
                    opacity: 1;
                }
            }
        `;
        document.head.appendChild(style);
    }
    
    // إضافة الإشعار إلى الصفحة
    document.body.appendChild(notification);
    
    // إضافة مستمع الأحداث للإغلاق
    notification.querySelector('.notification-close').addEventListener('click', () => {
        notification.remove();
    });
    
    // إزالة الإشعار تلقائياً بعد المدة المحددة
    setTimeout(() => {
        if (notification.parentNode) {
            notification.style.animation = 'slideOut 0.3s ease-out';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.remove();
                }
            }, 300);
        }
    }, duration);
    
    // إضافة أنيميشن الإغلاق
    if (!document.querySelector('#notification-close-styles')) {
        const closeStyle = document.createElement('style');
        closeStyle.id = 'notification-close-styles';
        closeStyle.textContent = `
            @keyframes slideOut {
                from {
                    transform: translateY(0);
                    opacity: 1;
                }
                to {
                    transform: translateY(-100%);
                    opacity: 0;
                }
            }
        `;
        document.head.appendChild(closeStyle);
    }
}

// حفظ البيانات في localStorage مع انتهاء الصلاحية
function setLocalStorageWithExpiry(key, value, ttl) {
    const item = {
        value: value,
        expiry: new Date().getTime() + ttl
    };
    localStorage.setItem(key, JSON.stringify(item));
}

// قراءة البيانات من localStorage مع التحقق من انتهاء الصلاحية
function getLocalStorageWithExpiry(key) {
    const itemStr = localStorage.getItem(key);
    
    if (!itemStr) return null;
    
    const item = JSON.parse(itemStr);
    
    if (new Date().getTime() > item.expiry) {
        localStorage.removeItem(key);
        return null;
    }
    
    return item.value;
}

// تصدير البيانات كملف
function exportToFile(data, fileName, type = 'application/json') {
    const blob = new Blob([JSON.stringify(data, null, 2)], { type });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = fileName;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
}

// تحميل ملف
function importFromFile(inputId, callback) {
    const input = document.getElementById(inputId);
    if (!input) return;
    
    input.onchange = function(e) {
        const file = e.target.files[0];
        if (!file) return;
        
        const reader = new FileReader();
        reader.onload = function(e) {
            try {
                const data = JSON.parse(e.target.result);
                if (callback) callback(data);
            } catch (error) {
                showNotification('خطأ في قراءة الملف', 'error');
            }
        };
        reader.readAsText(file);
    };
    
    input.click();
}

// التحقق من دعم المتصفح للميزات الحديثة
function checkBrowserSupport() {
    const features = {
        localStorage: typeof localStorage !== 'undefined',
        sessionStorage: typeof sessionStorage !== 'undefined',
        fetch: typeof fetch !== 'undefined',
        promise: typeof Promise !== 'undefined',
        serviceWorker: 'serviceWorker' in navigator,
        notification: 'Notification' in window,
        geolocation: 'geolocation' in navigator
    };
    
    return features;
}

// إضافة صيغة الجمع العربية
function arabicPlural(number, singular, dual, plural) {
    if (number === 1) return singular;
    if (number === 2) return dual;
    if (number >= 3 && number <= 10) return plural;
    return singular;
}

// تصدير الوظائف للاستخدام في ملفات أخرى
window.utils = {
    formatDate,
    formatNumber,
    formatCurrency,
    truncateText,
    generateId,
    validateSaudiID,
    isValidEmail,
    isValidSaudiPhone,
    generatePassword,
    numberToArabicWords,
    slugify,
    showNotification,
    setLocalStorageWithExpiry,
    getLocalStorageWithExpiry,
    exportToFile,
    importFromFile,
    checkBrowserSupport,
    arabicPlural
};