// customers.js - الملف الموحد لجميع صفحات العملاء (بدون اختصار)

// ==================== البدء: كشف الصفحة الحالية ====================
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من حالة المصادقة
    if (!checkAuthStatus()) {
        window.location.href = 'login.html';
        return;
    }
    
    // تحديث التاريخ (دالة مشتركة)
    updateDate();
    
    // تهيئة القائمة الجانبية (دالة مشتركة)
    initSidebar();
    
    // تحديد الصفحة الحالية من اسم الملف
    const path = window.location.pathname;
    const page = path.substring(path.lastIndexOf('/') + 1);
    
    // توجيه حسب الصفحة
    switch(page) {
        case 'customers.html':
            initCustomersPage();
            loadCustomersData();
            initCustomersEvents();
            break;
        case 'customersleads.html':
            loadLeads();
            // يمكن إضافة أحداث خاصة بالصفحة إذا لزم الأمر
            break;
        case 'customersgroups.html':
            loadCustomerGroups();
            break;
        case 'customerscommunications.html':
            loadCommunications();
            break;
        case 'customersreports.html':
            loadCustomerReports();
            break;
        default:
            // إذا كانت الصفحة غير معروفة، نحمّل العملاء افتراضياً
            initCustomersPage();
            loadCustomersData();
            initCustomersEvents();
            break;
    }
});

// ==================== الدوال المشتركة ====================

// تحديث التاريخ
function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('ar-SA', options);
    }
}

// تهيئة القائمة الجانبية (إذا كانت هناك دوال تهيئة)
function initSidebar() {
    // يمكن إضافة كود تهيئة القائمة الجانبية هنا إن وجد
    // مثال: toggle sidebar
    const sidebarToggle = document.getElementById('sidebarToggle');
    if (sidebarToggle) {
        sidebarToggle.addEventListener('click', function() {
            document.querySelector('.sidebar').classList.toggle('collapsed');
        });
    }
}

// ==================== دوال صفحة العملاء (customers.html) ====================
// (من الكود الأصلي الذي أرسلته في أول رسالة - بالكامل)

// تهيئة صفحة العملاء
function initCustomersPage() {
    // تهيئة التبويبات (تم استبدالها بصفحات منفصلة، لكن نبقي الدالة تحسباً)
    // initCustomersTabs(); // لا حاجة لها الآن لأن التبويبات أصبحت روابط
    // لكن سنبقي الدالة فارغة أو نلغيها
}

// تهيئة الأحداث الخاصة بالعملاء
function initCustomersEvents() {
    // تهيئة البحث
    initCustomersSearch();
    // تهيئة التصفية
    initCustomerFilters();
}

// تحميل بيانات العملاء
function loadCustomersData() {
    loadCustomers();
}

// تحميل العملاء
function loadCustomers() {
    // بيانات تجريبية
    const customers = [
        {
            id: 'CUST-001',
            name: 'محمد أحمد',
            phone: '0551234567',
            email: 'mohammed@example.com',
            type: 'individual',
            registrationDate: '2023-01-15',
            totalPurchases: 1250000,
            lastPurchase: '2024-01-15',
            status: 'active',
            balance: 0,
            creditLimit: 500000,
            notes: 'عميل دائم، يفضل السيارات الفاخرة'
        },
        {
            id: 'CUST-002',
            name: 'شركة النجاح للمقاولات',
            phone: '0112345678',
            email: 'info@alnajah.com',
            type: 'company',
            registrationDate: '2023-03-20',
            totalPurchases: 3200000,
            lastPurchase: '2024-01-14',
            status: 'active',
            balance: 90000,
            creditLimit: 1000000,
            notes: 'شركة مقاولات، تشتري سيارات للموظفين'
        }
    ];
    
    renderCustomersTable(customers);
}

// عرض جدول العملاء
function renderCustomersTable(customers) {
    const tableBody = document.querySelector('#customersTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    customers.forEach(customer => {
        const row = document.createElement('tr');
        
        // حساب استخدام الائتمان
        const creditUsage = customer.creditLimit > 0 ? 
            Math.round((customer.balance / customer.creditLimit) * 100) : 0;
        
        // تحديد حالة الائتمان
        let creditStatus, creditClass;
        if (customer.balance === 0) {
            creditStatus = 'جيد';
            creditClass = 'success';
        } else if (creditUsage < 50) {
            creditStatus = 'مقبول';
            creditClass = 'warning';
        } else if (creditUsage < 80) {
            creditStatus = 'مرتفع';
            creditClass = 'danger';
        } else {
            creditStatus = 'مخاطر';
            creditClass = 'danger';
        }
        
        row.innerHTML = `
            <td>
                <div class="customer-info">
                    <div class="customer-avatar">
                        <i class="fas fa-user"></i>
                    </div>
                    <div class="customer-details">
                        <h5 class="customer-name">${customer.name}</h5>
                        <p class="customer-id">${customer.id}</p>
                    </div>
                </div>
            </td>
            <td>
                <div class="contact-info">
                    <p><i class="fas fa-phone"></i> ${customer.phone}</p>
                    ${customer.email ? `<p><i class="fas fa-envelope"></i> ${customer.email}</p>` : ''}
                </div>
            </td>
            <td>
                <span class="customer-type ${customer.type}">
                    ${customer.type === 'individual' ? 'فرد' : 'شركة'}
                </span>
            </td>
            <td>${customer.registrationDate}</td>
            <td>
                <div class="purchase-info">
                    <p class="total-purchases">${utils.formatCurrency(customer.totalPurchases)}</p>
                    ${customer.lastPurchase ? `
                        <p class="last-purchase">آخر شراء: ${customer.lastPurchase}</p>
                    ` : '<p class="no-purchase">لا يوجد مشتريات</p>'}
                </div>
            </td>
            <td>
                <div class="credit-info">
                    <div class="credit-limit">
                        <span>الحد: ${utils.formatCurrency(customer.creditLimit)}</span>
                        <span>المستخدم: ${utils.formatCurrency(customer.balance)}</span>
                    </div>
                    <div class="progress-bar">
                        <div class="progress-fill" style="width: ${Math.min(creditUsage, 100)}%"></div>
                    </div>
                    <span class="credit-status ${creditClass}">${creditStatus}</span>
                </div>
            </td>
            <td>
                <span class="status-badge ${customer.status}">
                    ${customer.status === 'active' ? 'نشط' : 
                      customer.status === 'inactive' ? 'غير نشط' : 'عميل محتمل'}
                </span>
            </td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" onclick="viewCustomer('${customer.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit" onclick="editCustomer('${customer.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn message" onclick="messageCustomer('${customer.id}')">
                        <i class="fas fa-comment"></i>
                    </button>
                    <button class="action-btn history" onclick="viewCustomerHistory('${customer.id}')">
                        <i class="fas fa-history"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// تهيئة البحث
function initCustomersSearch() {
    const searchInput = document.getElementById('customerSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        searchCustomers(this.value);
    });
}

// البحث في العملاء
function searchCustomers(searchTerm) {
    console.log('البحث في العملاء:', searchTerm);
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
}

// تهيئة التصفية
function initCustomerFilters() {
    const typeFilter = document.getElementById('typeFilter');
    const statusFilter = document.getElementById('statusFilter');
    const creditFilter = document.getElementById('creditFilter');
    
    if (typeFilter) {
        typeFilter.addEventListener('change', applyCustomerFilters);
    }
    
    if (statusFilter) {
        statusFilter.addEventListener('change', applyCustomerFilters);
    }
    
    if (creditFilter) {
        creditFilter.addEventListener('change', applyCustomerFilters);
    }
}

// تطبيق التصفية
function applyCustomerFilters() {
    const type = document.getElementById('typeFilter').value;
    const status = document.getElementById('statusFilter').value;
    const credit = document.getElementById('creditFilter').value;
    
    console.log('تطبيق تصفية العملاء:', { type, status, credit });
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
}

// فتح نموذج عميل جديد
function openNewCustomerModal() {
    const modal = document.getElementById('customerModal');
    const modalBody = modal.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <form id="customerForm" onsubmit="saveCustomer(event)">
            <div class="form-tabs">
                <button type="button" class="form-tab active" data-tab="basic">البيانات الأساسية</button>
                <button type="button" class="form-tab" data-tab="contact">معلومات الاتصال</button>
                <button type="button" class="form-tab" data-tab="financial">المعلومات المالية</button>
                <button type="button" class="form-tab" data-tab="additional">بيانات إضافية</button>
            </div>
            
            <div class="form-tab-content active" id="basic-tab">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>الاسم الكامل <span class="required">*</span></label>
                            <input type="text" class="form-control" id="customerName" required>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>رقم العميل</label>
                            <input type="text" class="form-control" id="customerCode" 
                                   value="CUST-${Date.now().toString().slice(-6)}" readonly>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>نوع العميل <span class="required">*</span></label>
                            <select class="form-control" id="customerType" required>
                                <option value="">اختر النوع</option>
                                <option value="individual">فرد</option>
                                <option value="company">شركة</option>
                                <option value="government">جهة حكومية</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>تاريخ التسجيل</label>
                            <input type="date" class="form-control" id="registrationDate" 
                                   value="${new Date().toISOString().split('T')[0]}">
                        </div>
                    </div>
                </div>
                
                <!-- معلومات الهوية (تظهر للأفراد) -->
                <div id="individualInfo" style="display: none;">
                    <div class="row">
                        <div class="col-md-4">
                            <div class="form-group">
                                <label>نوع الهوية</label>
                                <select class="form-control" id="idType">
                                    <option value="">اختر نوع الهوية</option>
                                    <option value="national_id">هوية وطنية</option>
                                    <option value="iqama">إقامة</option>
                                    <option value="passport">جواز سفر</option>
                                </select>
                            </div>
                        </div>
                        <div class="col-md-8">
                            <div class="form-group">
                                <label>رقم الهوية</label>
                                <input type="text" class="form-control" id="idNumber">
                            </div>
                        </div>
                    </div>
                </div>
                
                <!-- معلومات الشركة (تظهر للشركات) -->
                <div id="companyInfo" style="display: none;">
                    <div class="row">
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>السجل التجاري</label>
                                <input type="text" class="form-control" id="crNumber">
                            </div>
                        </div>
                        <div class="col-md-6">
                            <div class="form-group">
                                <label>الرقم الضريبي</label>
                                <input type="text" class="form-control" id="taxNumber">
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="form-tab-content" id="contact-tab">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>رقم الهاتف الأساسي <span class="required">*</span></label>
                            <input type="tel" class="form-control" id="primaryPhone" required>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>رقم هاتف إضافي</label>
                            <input type="tel" class="form-control" id="secondaryPhone">
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>البريد الإلكتروني</label>
                            <input type="email" class="form-control" id="email">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>الموقع الإلكتروني</label>
                            <input type="url" class="form-control" id="website">
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>العنوان</label>
                    <textarea class="form-control" id="address" rows="3"></textarea>
                </div>
                
                <div class="form-group">
                    <label>المدينة</label>
                    <input type="text" class="form-control" id="city">
                </div>
            </div>
            
            <div class="form-tab-content" id="financial-tab">
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>الحد الائتماني</label>
                            <input type="number" class="form-control" id="creditLimit" 
                                   min="0" step="1000" placeholder="0">
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>شروط الدفع</label>
                            <select class="form-control" id="paymentTerms">
                                <option value="cash">نقدي</option>
                                <option value="net30">صافي 30 يوم</option>
                                <option value="net60">صافي 60 يوم</option>
                                <option value="custom">مخصص</option>
                            </select>
                        </div>
                    </div>
                </div>
                
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>فئة السعر</label>
                            <select class="form-control" id="priceCategory">
                                <option value="retail">سعر التجزئة</option>
                                <option value="wholesale">سعر الجملة</option>
                                <option value="special">سعر خاص</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>نسبة الخصم (%)</label>
                            <input type="number" class="form-control" id="discountPercentage" 
                                   min="0" max="100" placeholder="0">
                        </div>
                    </div>
                </div>
                
                <div class="form-group">
                    <label>الحساب البنكي</label>
                    <input type="text" class="form-control" id="bankAccount">
                </div>
            </div>
            
            <div class="form-tab-content" id="additional-tab">
                <div class="form-group">
                    <label>مجموعة العملاء</label>
                    <select class="form-control" id="customerGroup">
                        <option value="">بدون مجموعة</option>
                        <option value="vip">عملاء VIP</option>
                        <option value="regular">عملاء منتظمون</option>
                        <option value="corporate">عملاء مؤسسات</option>
                        <option value="government">جهات حكومية</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>مصدر العميل</label>
                    <select class="form-control" id="customerSource">
                        <option value="">اختر المصدر</option>
                        <option value="walkin">زيارة المعرض</option>
                        <option value="referral">توصية</option>
                        <option value="social_media">وسائل التواصل</option>
                        <option value="website">الموقع الإلكتروني</option>
                        <option value="advertisement">إعلان</option>
                    </select>
                </div>
                
                <div class="form-group">
                    <label>المهنة</label>
                    <input type="text" class="form-control" id="occupation">
                </div>
                
                <div class="form-group">
                    <label>تاريخ الميلاد</label>
                    <input type="date" class="form-control" id="birthDate">
                </div>
                
                <div class="form-group">
                    <label>ملاحظات</label>
                    <textarea class="form-control" id="customerNotes" rows="4"></textarea>
                </div>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-outline" onclick="closeCustomerModal()">
                    إلغاء
                </button>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save"></i>
                    حفظ العميل
                </button>
            </div>
        </form>
    `;
    
    modal.style.display = 'flex';
    
    // تهيئة تبويبات النموذج
    initCustomerFormTabs();
    
    // إظهار/إخفاء الحقول حسب نوع العميل
    const customerType = document.getElementById('customerType');
    if (customerType) {
        customerType.addEventListener('change', function() {
            toggleCustomerTypeFields(this.value);
        });
    }
}

// تهيئة تبويبات نموذج العميل
function initCustomerFormTabs() {
    const modal = document.getElementById('customerModal');
    const formTabs = modal.querySelectorAll('.form-tab');
    const formTabContents = modal.querySelectorAll('.form-tab-content');
    
    formTabs.forEach(tab => {
        tab.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            formTabs.forEach(t => t.classList.remove('active'));
            formTabContents.forEach(c => c.classList.remove('active'));
            
            this.classList.add('active');
            
            const targetContent = modal.querySelector(`#${tabId}-tab`);
            if (targetContent) {
                targetContent.classList.add('active');
            }
        });
    });
}

// تبديل الحقول حسب نوع العميل
function toggleCustomerTypeFields(type) {
    const modal = document.getElementById('customerModal');
    const individualInfo = modal.querySelector('#individualInfo');
    const companyInfo = modal.querySelector('#companyInfo');
    
    if (individualInfo) {
        individualInfo.style.display = type === 'individual' ? 'block' : 'none';
    }
    
    if (companyInfo) {
        companyInfo.style.display = type === 'company' ? 'block' : 'none';
    }
}

// حفظ العميل
function saveCustomer(event) {
    event.preventDefault();
    
    const modal = document.getElementById('customerModal');
    const customerData = {
        name: modal.querySelector('#customerName').value,
        code: modal.querySelector('#customerCode').value,
        type: modal.querySelector('#customerType').value,
        registrationDate: modal.querySelector('#registrationDate').value,
        
        primaryPhone: modal.querySelector('#primaryPhone').value,
        secondaryPhone: modal.querySelector('#secondaryPhone').value,
        email: modal.querySelector('#email').value,
        website: modal.querySelector('#website').value,
        address: modal.querySelector('#address').value,
        city: modal.querySelector('#city').value,
        
        creditLimit: parseFloat(modal.querySelector('#creditLimit').value) || 0,
        paymentTerms: modal.querySelector('#paymentTerms').value,
        priceCategory: modal.querySelector('#priceCategory').value,
        discountPercentage: parseFloat(modal.querySelector('#discountPercentage').value) || 0,
        bankAccount: modal.querySelector('#bankAccount').value,
        
        customerGroup: modal.querySelector('#customerGroup').value,
        customerSource: modal.querySelector('#customerSource').value,
        occupation: modal.querySelector('#occupation').value,
        birthDate: modal.querySelector('#birthDate').value,
        notes: modal.querySelector('#customerNotes').value
    };
    
    if (customerData.type === 'individual') {
        customerData.idType = modal.querySelector('#idType').value;
        customerData.idNumber = modal.querySelector('#idNumber').value;
    } else if (customerData.type === 'company') {
        customerData.crNumber = modal.querySelector('#crNumber').value;
        customerData.taxNumber = modal.querySelector('#taxNumber').value;
    }
    
    console.log('حفظ العميل:', customerData);
    
    utils.showNotification('تم حفظ العميل بنجاح', 'success');
    closeCustomerModal();
    loadCustomers();
}

// إغلاق نموذج العميل
function closeCustomerModal() {
    document.getElementById('customerModal').style.display = 'none';
}

// عرض تفاصيل العميل
function viewCustomer(customerId) {
    console.log('عرض العميل:', customerId);
}

// تحرير العميل
function editCustomer(customerId) {
    console.log('تحرير العميل:', customerId);
}

// إرسال رسالة للعميل
function messageCustomer(customerId) {
    console.log('إرسال رسالة للعميل:', customerId);
}

// عرض سجل العميل
function viewCustomerHistory(customerId) {
    console.log('عرض سجل العميل:', customerId);
}

// تصدير العملاء
function exportCustomers() {
    utils.showNotification('جاري تصدير بيانات العملاء...', 'info');
}

// ==================== دوال صفحة العملاء المحتملين (customersleads.html) ====================

// تحميل العملاء المحتملين
function loadLeads() {
    const leads = [
        {
            id: 'LEAD-001',
            name: 'ناصر سليمان',
            phone: '0553344556',
            email: 'naser@example.com',
            source: 'walkin',
            interest: 'سيارة تويوتا كامري',
            status: 'new',
            assignedTo: 'أحمد السليم',
            nextFollowUp: '2024-01-20',
            notes: 'يحتاج سيارة عائلية'
        },
        {
            id: 'LEAD-002',
            name: 'يوسف علي',
            phone: '0556677889',
            email: 'yousef@example.com',
            source: 'referral',
            interest: 'سيارة BMW X5',
            status: 'contacted',
            assignedTo: 'محمد أحمد',
            nextFollowUp: '2024-01-18',
            notes: 'تم الاتصال به، مهتم بسعر التمويل'
        }
    ];
    
    renderLeadsTable(leads);
}

// عرض جدول العملاء المحتملين
function renderLeadsTable(leads) {
    const tableBody = document.querySelector('#leadsTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    leads.forEach(lead => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${lead.name}</td>
            <td>${lead.phone}</td>
            <td>${lead.email || '-'}</td>
            <td>
                <span class="lead-source ${lead.source}">
                    ${lead.source === 'walkin' ? 'زيارة المعرض' : 
                      lead.source === 'referral' ? 'توصية' : 
                      lead.source === 'social_media' ? 'وسائل التواصل' : lead.source}
                </span>
            </td>
            <td>${lead.interest}</td>
            <td>
                <span class="status-badge ${lead.status}">
                    ${lead.status === 'new' ? 'جديد' : 
                      lead.status === 'contacted' ? 'تم الاتصال' : 
                      lead.status === 'qualified' ? 'مؤهل' : lead.status}
                </span>
            </td>
            <td>${lead.assignedTo}</td>
            <td>${lead.nextFollowUp}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn followup" onclick="scheduleFollowUp('${lead.id}')">
                        <i class="fas fa-calendar-plus"></i>
                    </button>
                    <button class="action-btn convert" onclick="convertLead('${lead.id}')">
                        <i class="fas fa-user-check"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// فتح نموذج عميل محتمل جديد
function openNewLeadModal() {
    const modal = document.getElementById('leadModal');
    if (!modal) return;
    modal.style.display = 'flex';
}

// إغلاق نموذج العميل المحتمل
function closeLeadModal() {
    const modal = document.getElementById('leadModal');
    if (modal) modal.style.display = 'none';
}

// حفظ عميل محتمل جديد
function saveLead(event) {
    event.preventDefault();
    
    const leadData = {
        name: document.getElementById('leadName').value,
        phone: document.getElementById('leadPhone').value,
        email: document.getElementById('leadEmail').value,
        source: document.getElementById('leadSource').value,
        interest: document.getElementById('leadInterest').value,
        notes: document.getElementById('leadNotes').value,
        status: 'new',
        assignedTo: 'أحمد السليم', // يمكن أخذه من المستخدم الحالي
        nextFollowUp: new Date().toISOString().split('T')[0]
    };
    
    console.log('حفظ عميل محتمل:', leadData);
    // هنا يمكن إرسال البيانات إلى API
    
    closeLeadModal();
    loadLeads(); // إعادة تحميل الجدول
    utils.showNotification('تم إضافة العميل المحتمل بنجاح', 'success');
}

// جدولة متابعة
function scheduleFollowUp(leadId) {
    console.log('جدولة متابعة للعميل المحتمل:', leadId);
    // فتح نافذة جدولة
}

// تحويل عميل محتمل إلى عميل فعلي
function convertLead(leadId) {
    if (confirm('هل تريد تحويل هذا العميل المحتمل إلى عميل فعلي؟')) {
        console.log('تحويل العميل المحتمل:', leadId);
        // استدعاء API للتحويل
        utils.showNotification('تم تحويل العميل المحتمل بنجاح', 'success');
        loadLeads();
    }
}

// ==================== دوال صفحة مجموعات العملاء (customersgroups.html) ====================

// تحميل مجموعات العملاء
function loadCustomerGroups() {
    const groups = [
        { id: 1, name: 'عملاء VIP', description: 'العملاء الدائمين والمميزين', memberCount: 25 },
        { id: 2, name: 'عملاء منتظمون', description: 'العملاء الذين يشترون بشكل منتظم', memberCount: 150 },
        { id: 3, name: 'عملاء مؤسسات', description: 'الشركات والمؤسسات', memberCount: 45 },
        { id: 4, name: 'جهات حكومية', description: 'الوزارات والمؤسسات الحكومية', memberCount: 12 }
    ];
    
    renderCustomerGroups(groups);
}

// عرض مجموعات العملاء
function renderCustomerGroups(groups) {
    const container = document.getElementById('customerGroups');
    if (!container) return;
    
    let html = '<div class="groups-grid">';
    
    groups.forEach(group => {
        html += `
            <div class="group-card">
                <div class="group-header">
                    <h4>${group.name}</h4>
                    <span class="member-count">${group.memberCount} عضو</span>
                </div>
                <div class="group-body">
                    <p>${group.description}</p>
                </div>
                <div class="group-footer">
                    <button class="btn btn-outline btn-sm" onclick="viewGroupMembers(${group.id})">
                        <i class="fas fa-users"></i>
                    </button>
                    <button class="btn btn-outline btn-sm" onclick="editCustomerGroup(${group.id})">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-outline btn-sm" onclick="sendGroupMessage(${group.id})">
                        <i class="fas fa-envelope"></i>
                    </button>
                </div>
            </div>
        `;
    });
    
    html += '</div>';
    container.innerHTML = html;
}

// حفظ مجموعة جديدة
function saveGroup(event) {
    event.preventDefault();
    
    const groupName = document.getElementById('groupName').value;
    const groupDesc = document.getElementById('groupDescription').value;
    const groupDiscount = document.getElementById('groupDiscount').value;
    
    console.log('حفظ مجموعة جديدة:', { name: groupName, description: groupDesc, discount: groupDiscount });
    
    // هنا يمكن إرسال البيانات إلى API
    
    utils.showNotification('تم حفظ المجموعة بنجاح', 'success');
    document.getElementById('groupForm').reset();
    loadCustomerGroups(); // إعادة تحميل القائمة
}

// عرض أعضاء المجموعة
function viewGroupMembers(groupId) {
    console.log('عرض أعضاء المجموعة:', groupId);
}

// تعديل المجموعة
function editCustomerGroup(groupId) {
    console.log('تعديل المجموعة:', groupId);
}

// إرسال رسالة للمجموعة
function sendGroupMessage(groupId) {
    console.log('إرسال رسالة للمجموعة:', groupId);
}

// ==================== دوال صفحة الاتصالات (customerscommunications.html) ====================

// تحميل الاتصالات
function loadCommunications() {
    const communications = [
        {
            id: 'COMM-001',
            customer: 'محمد أحمد',
            type: 'phone',
            direction: 'outgoing',
            date: '2024-01-15 10:30',
            subject: 'متابعة تسليم السيارة',
            notes: 'تم الاتصال لتأكيد موعد التسليم',
            user: 'أحمد السليم'
        },
        {
            id: 'COMM-002',
            customer: 'شركة النجاح',
            type: 'email',
            direction: 'incoming',
            date: '2024-01-14 14:15',
            subject: 'طلب عرض أسعار',
            notes: 'طلب عرض أسعار لـ 5 سيارات',
            user: 'محمد أحمد'
        }
    ];
    
    renderCommunicationsTable(communications);
}

// عرض جدول الاتصالات
function renderCommunicationsTable(communications) {
    const tableBody = document.querySelector('#communicationsTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    communications.forEach(comm => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${comm.customer}</td>
            <td>
                <span class="comm-type ${comm.type}">
                    <i class="fas fa-${comm.type === 'phone' ? 'phone' : 'envelope'}"></i>
                    ${comm.type === 'phone' ? 'هاتف' : 'بريد إلكتروني'}
                </span>
            </td>
            <td>
                <span class="comm-direction ${comm.direction}">
                    ${comm.direction === 'outgoing' ? 'صادر' : 'وارد'}
                </span>
            </td>
            <td>${comm.date}</td>
            <td>${comm.subject}</td>
            <td>${comm.notes}</td>
            <td>${comm.user}</td>
            <td>
                <button class="btn btn-outline btn-sm" onclick="viewCommunication('${comm.id}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// فتح نموذج اتصال جديد
function openNewCommunicationModal() {
    const modal = document.getElementById('communicationModal');
    if (modal) modal.style.display = 'flex';
}

// إغلاق نموذج الاتصال
function closeCommunicationModal() {
    const modal = document.getElementById('communicationModal');
    if (modal) modal.style.display = 'none';
}

// حفظ اتصال جديد
function saveCommunication(event) {
    event.preventDefault();
    // جمع البيانات وإرسالها
    closeCommunicationModal();
    loadCommunications();
    utils.showNotification('تم حفظ الاتصال', 'success');
}

// عرض تفاصيل الاتصال
function viewCommunication(commId) {
    console.log('عرض الاتصال:', commId);
}

// ==================== دوال صفحة تقارير العملاء (customersreports.html) ====================

// تحميل تقارير العملاء
function loadCustomerReports() {
    renderCustomerAcquisitionChart();
    renderCustomerSegmentationChart();
    loadCustomerActivity();
}

// إنشاء مخطط اكتساب العملاء
function renderCustomerAcquisitionChart() {
    const canvas = document.getElementById('acquisitionChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'bar',
        data: {
            labels: ['أكتوبر', 'نوفمبر', 'ديسمبر', 'يناير'],
            datasets: [{
                label: 'عملاء جدد',
                data: [15, 22, 18, 25],
                backgroundColor: '#3498db',
                borderColor: '#2980b9',
                borderWidth: 1
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    display: false
                }
            },
            scales: {
                y: {
                    beginAtZero: true,
                    ticks: {
                        stepSize: 5
                    }
                }
            }
        }
    });
}

// إنشاء مخطط تجزئة العملاء
function renderCustomerSegmentationChart() {
    const canvas = document.getElementById('segmentationChart');
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    new Chart(ctx, {
        type: 'pie',
        data: {
            labels: ['أفراد', 'شركات', 'جهات حكومية', 'عملاء محتملين'],
            datasets: [{
                data: [65, 25, 5, 5],
                backgroundColor: [
                    '#2ecc71',
                    '#3498db',
                    '#f39c12',
                    '#e74c3c'
                ],
                borderWidth: 2
            }]
        },
        options: {
            responsive: true,
            plugins: {
                legend: {
                    position: 'bottom',
                    rtl: true,
                    labels: {
                        font: {
                            family: 'Cairo'
                        }
                    }
                }
            }
        }
    });
}

// تحميل نشاط العملاء
function loadCustomerActivity() {
    const activity = [
        { customer: 'محمد أحمد', activity: 'شراء سيارة', amount: 250000, date: '2024-01-15' },
        { customer: 'شركة النجاح', activity: 'طلب عرض أسعار', amount: 0, date: '2024-01-14' },
        { customer: 'عبدالله سعيد', activity: 'دفع قسط تمويل', amount: 32000, date: '2024-01-13' },
        { customer: 'فهد خالد', activity: 'زيارة المعرض', amount: 0, date: '2024-01-12' },
        { customer: 'سارة عبدالله', activity: 'صيانة سيارة', amount: 5000, date: '2024-01-10' }
    ];
    
    renderCustomerActivityTable(activity);
}

// عرض جدول نشاط العملاء
function renderCustomerActivityTable(activity) {
    const tableBody = document.querySelector('#activityTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    activity.forEach(item => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.customer}</td>
            <td>${item.activity}</td>
            <td>${item.amount > 0 ? utils.formatCurrency(item.amount) : '-'}</td>
            <td>${item.date}</td>
            <td>
                <button class="btn btn-outline btn-sm" onclick="viewCustomerActivity('${item.customer}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// عرض نشاط عميل معين
function viewCustomerActivity(customerName) {
    console.log('عرض نشاط العميل:', customerName);
}