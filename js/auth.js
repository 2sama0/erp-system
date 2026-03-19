// تهيئة الصفحة عند التحميل
document.addEventListener('DOMContentLoaded', function() {
    // تهيئة عناصر الصفحة
    initAuthPage();
    
    // تهيئة النماذج
    initLoginForm();
    initRegisterForm();
    
    // تهيئة القائمة المتحركة (للأجهزة المحمولة)
    initMobileMenu();
});

// تهيئة صفحة المصادقة
function initAuthPage() {
    // تبديل عرض كلمة المرور
    const togglePassword = document.getElementById('togglePassword');
    const toggleConfirmPassword = document.getElementById('toggleConfirmPassword');
    
    if (togglePassword) {
        togglePassword.addEventListener('click', function() {
            const passwordInput = document.getElementById('password');
            const icon = this.querySelector('i');
            
            if (passwordInput.type === 'password') {
                passwordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                passwordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }
    
    if (toggleConfirmPassword) {
        toggleConfirmPassword.addEventListener('click', function() {
            const confirmPasswordInput = document.getElementById('confirmPassword');
            const icon = this.querySelector('i');
            
            if (confirmPasswordInput.type === 'password') {
                confirmPasswordInput.type = 'text';
                icon.classList.remove('fa-eye');
                icon.classList.add('fa-eye-slash');
            } else {
                confirmPasswordInput.type = 'password';
                icon.classList.remove('fa-eye-slash');
                icon.classList.add('fa-eye');
            }
        });
    }
    
    // متابعة قوة كلمة المرور (لصفحة التسجيل)
    const passwordInput = document.getElementById('password');
    if (passwordInput) {
        passwordInput.addEventListener('input', function() {
            checkPasswordStrength(this.value);
        });
    }
}

// تهيئة نموذج تسجيل الدخول
function initLoginForm() {
    const loginForm = document.getElementById('loginForm');
    if (!loginForm) return;
    
    loginForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // إعادة تعيين الأخطاء
        clearErrors();
        
        // جمع البيانات
        const formData = {
            username: document.getElementById('username').value.trim(),
            password: document.getElementById('password').value,
            rememberMe: document.getElementById('rememberMe').checked,
            role: document.querySelector('input[name="role"]:checked').value
        };
        
        // التحقق من المدخلات
        let isValid = validateLoginForm(formData);
        
        if (isValid) {
            // عرض حالة التحميل
            showLoading(true);
            
            // محاكاة إرسال البيانات إلى الخادم
            setTimeout(() => {
                simulateLogin(formData);
            }, 1500);
        }
    });
}

// تهيئة نموذج إنشاء حساب
function initRegisterForm() {
    const registerForm = document.getElementById('registerForm');
    if (!registerForm) return;
    
    registerForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // إعادة تعيين الأخطاء
        clearErrors();
        
        // جمع البيانات
        const formData = {
            fullName: document.getElementById('fullName').value.trim(),
            email: document.getElementById('email').value.trim(),
            username: document.getElementById('username').value.trim(),
            password: document.getElementById('password').value,
            confirmPassword: document.getElementById('confirmPassword').value,
            phone: document.getElementById('phone').value.trim(),
            role: document.getElementById('role').value,
            terms: document.getElementById('terms').checked
        };
        
        // التحقق من المدخلات
        let isValid = validateRegisterForm(formData);
        
        if (isValid) {
            // عرض حالة التحميل
            showLoading(true);
            
            // محاكاة إرسال البيانات إلى الخادم
            setTimeout(() => {
                simulateRegistration(formData);
            }, 2000);
        }
    });
}

// التحقق من نموذج تسجيل الدخول
function validateLoginForm(data) {
    let isValid = true;
    
    // التحقق من اسم المستخدم
    if (!data.username) {
        showError('usernameError', 'يرجى إدخال اسم المستخدم أو البريد الإلكتروني');
        isValid = false;
    }
    
    // التحقق من كلمة المرور
    if (!data.password) {
        showError('passwordError', 'يرجى إدخال كلمة المرور');
        isValid = false;
    } else if (data.password.length < 6) {
        showError('passwordError', 'كلمة المرور يجب أن تكون 6 أحرف على الأقل');
        isValid = false;
    }
    
    return isValid;
}

// التحقق من نموذج إنشاء الحساب
function validateRegisterForm(data) {
    let isValid = true;
    
    // التحقق من الاسم الكامل
    if (!data.fullName) {
        showError('fullNameError', 'يرجى إدخال الاسم الكامل');
        isValid = false;
    } else if (data.fullName.length < 3) {
        showError('fullNameError', 'الاسم يجب أن يكون 3 أحرف على الأقل');
        isValid = false;
    }
    
    // التحقق من البريد الإلكتروني
    if (!data.email) {
        showError('emailError', 'يرجى إدخال البريد الإلكتروني');
        isValid = false;
    } else if (!isValidEmail(data.email)) {
        showError('emailError', 'يرجى إدخال بريد إلكتروني صحيح');
        isValid = false;
    }
    
    // التحقق من اسم المستخدم
    if (!data.username) {
        showError('usernameError', 'يرجى إدخال اسم المستخدم');
        isValid = false;
    } else if (data.username.length < 4) {
        showError('usernameError', 'اسم المستخدم يجب أن يكون 4 أحرف على الأقل');
        isValid = false;
    }
    
    // التحقق من كلمة المرور
    if (!data.password) {
        showError('passwordError', 'يرجى إدخال كلمة المرور');
        isValid = false;
    } else if (data.password.length < 8) {
        showError('passwordError', 'كلمة المرور يجب أن تكون 8 أحرف على الأقل');
        isValid = false;
    } else if (!isStrongPassword(data.password)) {
        showError('passwordError', 'كلمة المرور يجب أن تحتوي على أحرف كبيرة وصغيرة وأرقام');
        isValid = false;
    }
    
    // التحقق من تأكيد كلمة المرور
    if (!data.confirmPassword) {
        showError('confirmPasswordError', 'يرجى تأكيد كلمة المرور');
        isValid = false;
    } else if (data.password !== data.confirmPassword) {
        showError('confirmPasswordError', 'كلمتا المرور غير متطابقتين');
        isValid = false;
    }
    
    // التحقق من رقم الهاتف
    if (!data.phone) {
        showError('phoneError', 'يرجى إدخال رقم الهاتف');
        isValid = false;
    } else if (!isValidPhone(data.phone)) {
        showError('phoneError', 'يرجى إدخال رقم هاتف صحيح');
        isValid = false;
    }
    
    // التحقق من الدور
    if (!data.role) {
        showError('roleError', 'يرجى اختيار دور المستخدم');
        isValid = false;
    }
    
    // التحقق من الشروط
    if (!data.terms) {
        showError('termsError', 'يجب الموافقة على الشروط والأحكام');
        isValid = false;
    }
    
    return isValid;
}

// التحقق من صحة البريد الإلكتروني
function isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
}

// التحقق من قوة كلمة المرور
function isStrongPassword(password) {
    const hasUpperCase = /[A-Z]/.test(password);
    const hasLowerCase = /[a-z]/.test(password);
    const hasNumbers = /\d/.test(password);
    
    return hasUpperCase && hasLowerCase && hasNumbers;
}

// التحقق من صحة رقم الهاتف
function isValidPhone(phone) {
    const phoneRegex = /^05\d{8}$/;
    return phoneRegex.test(phone);
}

// التحقق من قوة كلمة المرور وعرض المؤشر
function checkPasswordStrength(password) {
    const strengthBar = document.querySelector('.strength-bar');
    const strengthText = document.querySelector('.strength-text');
    
    if (!strengthBar || !strengthText) return;
    
    let strength = 0;
    let text = 'ضعيفة';
    let color = '#e74c3c';
    
    // التحقق من طول كلمة المرور
    if (password.length >= 8) strength++;
    if (password.length >= 12) strength++;
    
    // التحقق من الأحرف
    if (/[A-Z]/.test(password)) strength++;
    if (/[a-z]/.test(password)) strength++;
    if (/\d/.test(password)) strength++;
    if (/[^A-Za-z0-9]/.test(password)) strength++;
    
    // تحديد مستوى القوة
    if (strength >= 6) {
        text = 'قوية جداً';
        color = '#2ecc71';
    } else if (strength >= 4) {
        text = 'قوية';
        color = '#3498db';
    } else if (strength >= 2) {
        text = 'متوسطة';
        color = '#f39c12';
    }
    
    // تحديث العرض
    const percentage = (strength / 6) * 100;
    strengthBar.style.width = `${percentage}%`;
    strengthBar.style.backgroundColor = color;
    strengthText.textContent = `قوة كلمة المرور: ${text}`;
    strengthText.style.color = color;
}

// محاكاة تسجيل الدخول
function simulateLogin(formData) {
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
    console.log('بيانات تسجيل الدخول:', formData);
    
    // محاكاة الاستجابة الناجحة
    const success = true; // في الحقيقة، هذا يعتمد على استجابة الخادم
    
    if (success) {
        // حفظ بيانات الجلسة (في الحقيقة، سيتم حفظ التوكن)
        localStorage.setItem('user', JSON.stringify({
            username: formData.username,
            role: formData.role,
            loggedIn: true,
            timestamp: new Date().getTime()
        }));
        
        // إذا تم اختيار "تذكرني"
        if (formData.rememberMe) {
            localStorage.setItem('rememberMe', 'true');
        }
        
        // عرض رسالة النجاح
        showMessage('loginError', 'تم تسجيل الدخول بنجاح!', 'success');
        
        // إعادة التوجيه إلى لوحة التحكم بعد تأخير بسيط
        setTimeout(() => {
            window.location.href = 'dashboard.html';
        }, 1000);
    } else {
        // محاكاة فشل تسجيل الدخول
        showMessage('loginError', 'اسم المستخدم أو كلمة المرور غير صحيحة', 'error');
        showLoading(false);
    }
}

// محاكاة إنشاء حساب
function simulateRegistration(formData) {
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
    console.log('بيانات إنشاء حساب:', formData);
    
    // محاكاة الاستجابة الناجحة
    const success = true; // في الحقيقة، هذا يعتمد على استجابة الخادم
    
    if (success) {
        // عرض رسالة النجاح
        const successDiv = document.getElementById('registerSuccess');
        successDiv.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <div>
                <strong>تم إنشاء الحساب بنجاح!</strong><br>
                تم إرسال رابط تفعيل إلى بريدك الإلكتروني.
            </div>
        `;
        successDiv.style.display = 'flex';
        
        // إعادة تعيين النموذج
        document.getElementById('registerForm').reset();
        
        // إخفاء حالة التحميل
        showLoading(false);
        
        // إعادة التوجيه إلى صفحة تسجيل الدخول بعد تأخير
        setTimeout(() => {
            window.location.href = 'login.html';
        }, 3000);
    } else {
        // محاكاة فشل إنشاء الحساب
        showMessage('registerError', 'حدث خطأ أثناء إنشاء الحساب. يرجى المحاولة مرة أخرى.', 'error');
        showLoading(false);
    }
}

// تسجيل الدخول التجريبي
function demoLogin(role) {
    // بيانات تجريبية لكل دور
    const demoUsers = {
        admin: {
            username: 'admin_demo',
            password: 'Admin@123',
            role: 'admin'
        },
        sales: {
            username: 'sales_demo',
            password: 'Sales@123',
            role: 'sales'
        },
        accounting: {
            username: 'accounting_demo',
            password: 'Accounting@123',
            role: 'accounting'
        }
    };
    
    const demoUser = demoUsers[role];
    if (!demoUser) return;
    
    // تعبئة النموذج تلقائياً
    document.getElementById('username').value = demoUser.username;
    document.getElementById('password').value = demoUser.password;
    
    // تحديد الدور
    const roleInput = document.querySelector(`input[value="${role}"]`);
    if (roleInput) {
        roleInput.checked = true;
    }
    
    // تفعيل "تذكرني"
    document.getElementById('rememberMe').checked = true;
    
    // عرض رسالة
    showMessage('loginError', `جاري تسجيل الدخول كـ ${role === 'admin' ? 'مدير نظام' : role === 'sales' ? 'موظف مبيعات' : 'موظف حسابات'}...`, 'info');
    
    // محاكاة تسجيل الدخول
    setTimeout(() => {
        simulateLogin(demoUser);
    }, 1000);
}

// عرض رسالة خطأ أو نجاح
function showMessage(elementId, message, type = 'error') {
    const element = document.getElementById(elementId);
    if (!element) return;
    
    element.innerHTML = `
        <i class="fas fa-${type === 'error' ? 'exclamation-circle' : type === 'success' ? 'check-circle' : 'info-circle'}"></i>
        <span>${message}</span>
    `;
    
    element.className = `alert alert-${type}`;
    element.style.display = 'flex';
    
    // إخفاء الرسالة تلقائياً بعد 5 ثوانٍ
    if (type !== 'error') {
        setTimeout(() => {
            element.style.display = 'none';
        }, 5000);
    }
}

// عرض خطأ في حقل محدد
function showError(fieldId, message) {
    const errorElement = document.getElementById(fieldId);
    if (errorElement) {
        errorElement.textContent = message;
        errorElement.style.display = 'block';
        
        // إضافة صنف خطأ للحقل
        const inputField = errorElement.previousElementSibling;
        if (inputField && inputField.classList.contains('form-control')) {
            inputField.classList.add('error');
        }
    }
}

// مسح جميع الأخطاء
function clearErrors() {
    // مسح رسائل الأخطاء
    const errorElements = document.querySelectorAll('.form-error, .alert');
    errorElements.forEach(el => {
        el.style.display = 'none';
        el.textContent = '';
    });
    
    // إزالة صنف الخطأ من الحقول
    const errorFields = document.querySelectorAll('.form-control.error');
    errorFields.forEach(field => {
        field.classList.remove('error');
    });
}

// عرض/إخفاء حالة التحميل
function showLoading(show) {
    const submitButtons = document.querySelectorAll('button[type="submit"]');
    
    submitButtons.forEach(button => {
        if (show) {
            button.innerHTML = '<i class="fas fa-spinner fa-spin"></i> جاري المعالجة...';
            button.disabled = true;
        } else {
            const formId = button.closest('form').id;
            
            if (formId === 'loginForm') {
                button.innerHTML = '<i class="fas fa-sign-in-alt"></i> تسجيل الدخول';
            } else if (formId === 'registerForm') {
                button.innerHTML = '<i class="fas fa-user-plus"></i> إنشاء حساب جديد';
            }
            
            button.disabled = false;
        }
    });
}

// تهيئة القائمة المتحركة للأجهزة المحمولة
function initMobileMenu() {
    const navToggle = document.getElementById('navToggle');
    const navMenu = document.querySelector('.nav-menu');
    
    if (navToggle && navMenu) {
        navToggle.addEventListener('click', function() {
            navMenu.classList.toggle('active');
            this.querySelector('i').classList.toggle('fa-bars');
            this.querySelector('i').classList.toggle('fa-times');
        });
        
    // إغلاق القائمة عند النقر على رابط
        const navLinks = navMenu.querySelectorAll('a');
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navMenu.classList.remove('active');
                navToggle.querySelector('i').classList.remove('fa-times');
                navToggle.querySelector('i').classList.add('fa-bars');
            });
        });
        
    // إغلاق القائمة عند النقر خارجها
        document.addEventListener('click', function(event) {
            if (!navToggle.contains(event.target) && !navMenu.contains(event.target)) {
                navMenu.classList.remove('active');
                navToggle.querySelector('i').classList.remove('fa-times');
                navToggle.querySelector('i').classList.add('fa-bars');
            }
        });
    }
}

// التحقق مما إذا كان المستخدم مسجلاً بالفعل
function checkAuthStatus() {
    const user = localStorage.getItem('user');
    if (user) {
        const userData = JSON.parse(user);
        const currentTime = new Date().getTime();
        const loginTime = userData.timestamp;
        const hoursSinceLogin = (currentTime - loginTime) / (1000 * 60 * 60);
        
        // إذا مرت أكثر من 24 ساعة، تسجيل الخروج تلقائياً
        if (hoursSinceLogin > 24) {
            localStorage.removeItem('user');
            return false;
        }
        
        // إذا كان المستخدم في صفحة المصادقة، إعادة توجيهه
        if (window.location.pathname.includes('login.html') || 
            window.location.pathname.includes('register.html')) {
            window.location.href = 'dashboard.html';
        }
        
        return true;
    }
    
    return false;
}

// تسجيل الخروج
function logout() {
    localStorage.removeItem('user');
    localStorage.removeItem('rememberMe');
    window.location.href = 'login.html';
}

// تهيئة حالة المصادقة عند تحميل الصفحة
window.addEventListener('load', function() {
    if (checkAuthStatus()) {
        console.log('المستخدم مسجل الدخول');
    } else {
        console.log('المستخدم غير مسجل الدخول');
    }
});