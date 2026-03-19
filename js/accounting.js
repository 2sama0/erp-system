// ============================================
// ملف accounting.js - إدارة الحسابات
// يحتوي على جميع دوال صفحة الحسابات مع دعم التبويبات
// ============================================

// تهيئة صفحة الحسابات
document.addEventListener('DOMContentLoaded', function() {
    // التحقق من حالة المصادقة
    if (typeof checkAuthStatus === 'function' && !checkAuthStatus()) {
        window.location.href = 'login.html';
        return;
    }
    
    // تهيئة العناصر
    initAccountingPage();
    
    // تحميل البيانات
    loadAccountingData();
    
    // تهيئة الأحداث
    initAccountingEvents();
});

// تهيئة صفحة الحسابات
function initAccountingPage() {
    // تحديث التاريخ
    updateDate();
    
    // تهيئة القائمة الجانبية (إذا كانت الدالة موجودة)
    if (typeof initSidebar === 'function') {
        initSidebar();
    }
    
    // تهيئة التبويبات
    initAccountingTabs();
    
    // تهيئة البحث
    initAccountingSearch();
    
    // تهيئة نموذج الحساب
    initAccountForm();
    
    // تحميل شجرة الحسابات
    loadAccountsTree();
}

// تهيئة الأحداث الإضافية (يمكن تركها فارغة)
function initAccountingEvents() {
    // يمكن إضافة أحداث مخصصة هنا إن لزم الأمر
}

// تحديث التاريخ
function updateDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateElement = document.getElementById('currentDate');
    if (dateElement) {
        dateElement.textContent = now.toLocaleDateString('ar-SA', options);
    }
}

// تهيئة تبويبات الحسابات
function initAccountingTabs() {
    const tabButtons = document.querySelectorAll('.tab-btn');
    const tabPanes = document.querySelectorAll('.tab-pane');
    
    tabButtons.forEach(button => {
        button.addEventListener('click', function() {
            const tabId = this.getAttribute('data-tab');
            
            // إزالة النشاط من جميع الأزرار
            tabButtons.forEach(btn => btn.classList.remove('active'));
            
            // إخفاء جميع المحتويات
            tabPanes.forEach(pane => pane.classList.remove('active'));
            
            // إضافة النشاط للزر المختار
            this.classList.add('active');
            
            // إظهار المحتوى المختار
            const targetPane = document.getElementById(`${tabId}-tab`);
            if (targetPane) {
                targetPane.classList.add('active');
                
                // تحميل بيانات التبويب عند النقر
                switch(tabId) {
                    case 'journal':
                        loadJournalEntries();
                        break;
                    case 'ledger':
                        loadLedger();
                        break;
                    case 'trial-balance':
                        loadTrialBalance();
                        break;
                    case 'accounts':
                        loadAccounts();
                        break;
                    case 'reconciliation':
                        loadBankReconciliation();
                        break;
                }
            }
        });
    });
}

// تحميل بيانات الحسابات
function loadAccountingData() {
    // تحميل دفتر اليومية
    loadJournalEntries();
    
    // تحميل الحسابات
    loadAccounts();
    
    // تحميل المطابقة البنكية
    loadBankReconciliation();
}

// -------------------- دفتر اليومية --------------------
function loadJournalEntries() {
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
    
    // بيانات تجريبية
    const journalEntries = [
        {
            id: 'JRN-2024-0015',
            date: '2024-01-15',
            description: 'بيع سيارة BMW X5 للعميل محمد أحمد',
            debitAccount: 'النقدية',
            debitAmount: 250000,
            creditAccount: 'المبيعات',
            creditAmount: 250000,
            user: 'أحمد السليم'
        },
        {
            id: 'JRN-2024-0014',
            date: '2024-01-14',
            description: 'شراء سيارة مرسيدس من المورد',
            debitAccount: 'المخزون',
            debitAmount: 320000,
            creditAccount: 'حسابات الدفع',
            creditAmount: 320000,
            user: 'محمد أحمد'
        },
        {
            id: 'JRN-2024-0013',
            date: '2024-01-13',
            description: 'دفع راتب موظف',
            debitAccount: 'مصاريف الرواتب',
            debitAmount: 15000,
            creditAccount: 'النقدية',
            creditAmount: 15000,
            user: 'فهد خالد'
        },
        {
            id: 'JRN-2024-0012',
            date: '2024-01-12',
            description: 'بيع قطع غيار',
            debitAccount: 'النقدية',
            debitAmount: 75000,
            creditAccount: 'المبيعات',
            creditAmount: 75000,
            user: 'سارة عبدالله'
        },
        {
            id: 'JRN-2024-0011',
            date: '2024-01-11',
            description: 'دفع إيجار المعرض',
            debitAccount: 'مصاريف الإيجار',
            debitAmount: 50000,
            creditAccount: 'النقدية',
            creditAmount: 50000,
            user: 'أحمد السليم'
        },
        {
            id: 'JRN-2024-0010',
            date: '2024-01-10',
            description: 'تحصيل دفعة من عميل',
            debitAccount: 'النقدية',
            debitAmount: 50000,
            creditAccount: 'ذمم العملاء',
            creditAmount: 50000,
            user: 'محمد أحمد'
        },
        {
            id: 'JRN-2024-0009',
            date: '2024-01-09',
            description: 'دفع فاتورة كهرباء',
            debitAccount: 'مصاريف المرافق',
            debitAmount: 8000,
            creditAccount: 'النقدية',
            creditAmount: 8000,
            user: 'فهد خالد'
        },
        {
            id: 'JRN-2024-0008',
            date: '2024-01-08',
            description: 'شراء اكسسوارات',
            debitAccount: 'المخزون',
            debitAmount: 45000,
            creditAccount: 'حسابات الدفع',
            creditAmount: 45000,
            user: 'سارة عبدالله'
        }
    ];
    
    renderJournalTable(journalEntries);
}

// عرض جدول دفتر اليومية
function renderJournalTable(entries) {
    const tableBody = document.querySelector('#journalTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    let totalDebit = 0;
    let totalCredit = 0;
    
    entries.forEach(entry => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${entry.date}</td>
            <td>
                <a href="#" class="entry-link" onclick="viewJournalEntry('${entry.id}')">
                    ${entry.id}
                </a>
            </td>
            <td>${entry.description}</td>
            <td>${entry.debitAccount}</td>
            <td class="debit-amount">${utils.formatCurrency(entry.debitAmount)}</td>
            <td>${entry.creditAccount}</td>
            <td class="credit-amount">${utils.formatCurrency(entry.creditAmount)}</td>
            <td>${entry.user}</td>
            <td>
                <div class="action-buttons">
                    <button class="action-btn view" onclick="viewJournalEntry('${entry.id}')">
                        <i class="fas fa-eye"></i>
                    </button>
                    <button class="action-btn edit" onclick="editJournalEntry('${entry.id}')">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="action-btn delete" onclick="deleteJournalEntry('${entry.id}')">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </td>
        `;
        
        tableBody.appendChild(row);
        
        totalDebit += entry.debitAmount;
        totalCredit += entry.creditAmount;
    });
    
    // تحديث المجاميع
    document.getElementById('totalDebit').textContent = utils.formatCurrency(totalDebit);
    document.getElementById('totalCredit').textContent = utils.formatCurrency(totalCredit);
}

// -------------------- البحث --------------------
function initAccountingSearch() {
    const searchInput = document.getElementById('journalSearch');
    if (!searchInput) return;
    
    searchInput.addEventListener('input', function() {
        searchJournalEntries(this.value);
    });
    
    const accountSearch = document.getElementById('accountSearch');
    if (accountSearch) {
        accountSearch.addEventListener('input', function() {
            searchAccounts(this.value);
        });
    }
}

// البحث في القيود المحاسبية
function searchJournalEntries(searchTerm) {
    console.log('البحث في القيود:', searchTerm);
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
}

// -------------------- الحسابات --------------------
function loadAccounts() {
    // بيانات تجريبية للحسابات
    const accounts = [
        {
            id: '1',
            code: '101',
            name: 'النقدية',
            type: 'asset',
            parent: null,
            balance: 450000,
            description: 'النقدية في الصندوق والحسابات البنكية'
        },
        {
            id: '2',
            code: '102',
            name: 'البنك الأهلي',
            type: 'asset',
            parent: '101',
            balance: 250000,
            description: 'الحساب الجاري في البنك الأهلي'
        },
        {
            id: '3',
            code: '103',
            name: 'البنك الراجحي',
            type: 'asset',
            parent: '101',
            balance: 200000,
            description: 'الحساب الجاري في البنك الراجحي'
        },
        {
            id: '4',
            code: '201',
            name: 'المخزون',
            type: 'asset',
            parent: null,
            balance: 1850000,
            description: 'قيمة المخزون من سيارات وقطع غيار'
        },
        {
            id: '5',
            code: '301',
            name: 'ذمم العملاء',
            type: 'asset',
            parent: null,
            balance: 320000,
            description: 'المبالغ المستحقة من العملاء'
        },
        {
            id: '6',
            code: '401',
            name: 'حسابات الدفع',
            type: 'liability',
            parent: null,
            balance: 450000,
            description: 'المبالغ المستحقة للموردين'
        },
        {
            id: '7',
            code: '501',
            name: 'رأس المال',
            type: 'equity',
            parent: null,
            balance: 2000000,
            description: 'رأس المال المدفوع'
        },
        {
            id: '8',
            code: '601',
            name: 'المبيعات',
            type: 'revenue',
            parent: null,
            balance: 2450000,
            description: 'إيرادات المبيعات'
        },
        {
            id: '9',
            code: '701',
            name: 'تكلفة المبيعات',
            type: 'expense',
            parent: null,
            balance: 1850000,
            description: 'تكلفة البضاعة المباعة'
        },
        {
            id: '10',
            code: '702',
            name: 'مصاريف الرواتب',
            type: 'expense',
            parent: '701',
            balance: 150000,
            description: 'رواتب الموظفين'
        },
        {
            id: '11',
            code: '703',
            name: 'مصاريف الإيجار',
            type: 'expense',
            parent: '701',
            balance: 50000,
            description: 'إيجار المعرض والمخازن'
        }
    ];
    
    renderAccountsTree(accounts);
    populateParentAccounts(accounts);
}

// عرض شجرة الحسابات
function renderAccountsTree(accounts) {
    const container = document.getElementById('accountsTree');
    if (!container) return;
    
    let html = '<ul class="accounts-list">';
    
    // تجميع الحسابات حسب النوع
    const accountTypes = {
        asset: { name: 'الأصول', accounts: [] },
        liability: { name: 'الخصوم', accounts: [] },
        equity: { name: 'حقوق الملكية', accounts: [] },
        revenue: { name: 'الإيرادات', accounts: [] },
        expense: { name: 'المصاريف', accounts: [] }
    };
    
    // تصنيف الحسابات
    accounts.forEach(account => {
        if (accountTypes[account.type]) {
            accountTypes[account.type].accounts.push(account);
        }
    });
    
    // عرض الحسابات حسب النوع
    Object.entries(accountTypes).forEach(([type, data]) => {
        if (data.accounts.length > 0) {
            const typeAccounts = data.accounts.filter(acc => !acc.parent);
            const subAccounts = data.accounts.filter(acc => acc.parent);
            
            html += `
                <li class="account-type">
                    <div class="account-type-header">
                        <h4>${data.name}</h4>
                        <span class="type-balance">${utils.formatCurrency(calculateTypeBalance(data.accounts))}</span>
                    </div>
                    <ul class="accounts-sublist">
            `;
            
            typeAccounts.forEach(account => {
                html += renderAccountItem(account, accounts);
            });
            
            html += `
                    </ul>
                </li>
            `;
        }
    });
    
    html += '</ul>';
    container.innerHTML = html;
}

// حساب رصيد النوع
function calculateTypeBalance(accounts) {
    return accounts.reduce((total, account) => total + (account.balance || 0), 0);
}

// عرض عنصر الحساب
function renderAccountItem(account, allAccounts) {
    const subAccounts = allAccounts.filter(acc => acc.parent === account.id);
    let html = `
        <li class="account-item">
            <div class="account-header" onclick="toggleAccountDetails('${account.id}')">
                <div class="account-info">
                    <span class="account-code">${account.code}</span>
                    <span class="account-name">${account.name}</span>
                    <span class="account-balance ${account.balance >= 0 ? 'positive' : 'negative'}">
                        ${utils.formatCurrency(account.balance)}
                    </span>
                </div>
                <div class="account-actions">
                    <button class="btn btn-sm btn-outline" onclick="editAccount('${account.id}', event)">
                        <i class="fas fa-edit"></i>
                    </button>
                    <button class="btn btn-sm btn-danger" onclick="deleteAccount('${account.id}', event)">
                        <i class="fas fa-trash"></i>
                    </button>
                </div>
            </div>
    `;
    
    if (subAccounts.length > 0) {
        html += '<ul class="sub-accounts">';
        subAccounts.forEach(subAccount => {
            html += renderAccountItem(subAccount, allAccounts);
        });
        html += '</ul>';
    }
    
    html += '</li>';
    return html;
}

// تبديل تفاصيل الحساب
function toggleAccountDetails(accountId) {
    const accountElement = document.querySelector(`[onclick="toggleAccountDetails('${accountId}')"]`);
    if (accountElement) {
        const parentLi = accountElement.closest('.account-item');
        if (parentLi) {
            parentLi.classList.toggle('expanded');
        }
    }
}

// تعبئة الحسابات الرئيسية في النموذج
function populateParentAccounts(accounts) {
    const parentSelect = document.getElementById('parentAccount');
    if (!parentSelect) return;
    
    parentSelect.innerHTML = '<option value="">بدون حساب رئيسي</option>';
    
    accounts.forEach(account => {
        const option = document.createElement('option');
        option.value = account.id;
        option.textContent = `${account.code} - ${account.name}`;
        parentSelect.appendChild(option);
    });
}

// تهيئة نموذج الحساب
function initAccountForm() {
    const form = document.getElementById('accountForm');
    if (!form) return;
    
    form.addEventListener('submit', function(event) {
        event.preventDefault();
        saveAccount();
    });
}

// حفظ الحساب
function saveAccount() {
    const accountData = {
        code: document.getElementById('accountCode').value,
        name: document.getElementById('accountName').value,
        type: document.getElementById('accountType').value,
        parent: document.getElementById('parentAccount').value || null,
        description: document.getElementById('accountDescription').value,
        openingBalance: 0
    };
    
    console.log('حفظ الحساب:', accountData);
    
    // في التطبيق الحقيقي، هنا ستكون إرسال البيانات إلى الخادم
    
    utils.showNotification('تم حفظ الحساب بنجاح', 'success');
    document.getElementById('accountForm').reset();
    loadAccounts();
}

// تحرير الحساب
function editAccount(accountId, event) {
    event.stopPropagation();
    console.log('تحرير الحساب:', accountId);
    // في التطبيق الحقيقي، هنا ستكون فتح نموذج التحرير
}

// حذف الحساب
function deleteAccount(accountId, event) {
    event.stopPropagation();
    
    if (confirm('هل أنت متأكد من حذف هذا الحساب؟')) {
        console.log('حذف الحساب:', accountId);
        // في التطبيق الحقيقي، هنا ستكون استدعاء API للحذف
        utils.showNotification('تم حذف الحساب بنجاح', 'success');
        loadAccounts();
    }
}

// البحث في الحسابات
function searchAccounts(searchTerm) {
    console.log('البحث في الحسابات:', searchTerm);
    // في التطبيق الحقيقي، هنا ستكون استدعاء API
}

// -------------------- دفتر الأستاذ --------------------
function loadLedger() {
    // نستخدم حساباً افتراضياً لعرض البيانات
    const selectedAccount = getSelectedAccount();
    if (!selectedAccount) {
        // في حالة عدم وجود تحديد، نستخدم النقدية كحساب افتراضي
        // utils.showNotification('يرجى اختيار حساب أولاً', 'warning');
        // return;
    }
    
    // بيانات تجريبية
    const ledgerEntries = [
        { date: '2024-01-01', entryId: 'JRN-2024-001', description: 'رصيد أول المدة', debit: 200000, credit: 0, balance: 200000 },
        { date: '2024-01-05', entryId: 'JRN-2024-005', description: 'بيع نقدي', debit: 50000, credit: 0, balance: 250000 },
        { date: '2024-01-10', entryId: 'JRN-2024-010', description: 'دفع مصروفات', debit: 0, credit: 20000, balance: 230000 },
        { date: '2024-01-15', entryId: 'JRN-2024-015', description: 'تحصيل من عميل', debit: 30000, credit: 0, balance: 260000 }
    ];
    
    renderLedgerTable(ledgerEntries);
    const accountName = selectedAccount ? selectedAccount.name : 'النقدية';
    document.getElementById('ledgerAccountName').textContent = `دفتر الأستاذ - ${accountName}`;
}

// الحصول على الحساب المختار (يمكن تطويره لاحقاً)
function getSelectedAccount() {
    // في التطبيق الحقيقي، هنا ستكون من شجرة الحسابات
    // نعيد حساب افتراضي
    return { id: '101', name: 'النقدية', code: '101' };
}

// عرض جدول دفتر الأستاذ
function renderLedgerTable(entries) {
    const tableBody = document.querySelector('#ledgerTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    entries.forEach(entry => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${entry.date}</td>
            <td>
                <a href="#" class="entry-link" onclick="viewJournalEntry('${entry.entryId}')">
                    ${entry.entryId}
                </a>
            </td>
            <td>${entry.description}</td>
            <td class="debit-amount">${entry.debit > 0 ? utils.formatCurrency(entry.debit) : '-'}</td>
            <td class="credit-amount">${entry.credit > 0 ? utils.formatCurrency(entry.credit) : '-'}</td>
            <td class="balance-amount ${entry.balance >= 0 ? 'positive' : 'negative'}">
                ${utils.formatCurrency(entry.balance)}
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// -------------------- ميزان المراجعة --------------------
function loadTrialBalance() {
    const period = document.getElementById('trialBalancePeriod')?.value || '2024-01';
    
    // بيانات تجريبية
    const trialBalance = [
        { code: '101', name: 'النقدية', debit: 450000, credit: 0 },
        { code: '201', name: 'المخزون', debit: 1850000, credit: 0 },
        { code: '301', name: 'ذمم العملاء', debit: 320000, credit: 0 },
        { code: '401', name: 'حسابات الدفع', debit: 0, credit: 450000 },
        { code: '501', name: 'رأس المال', debit: 0, credit: 2000000 },
        { code: '601', name: 'المبيعات', debit: 0, credit: 2450000 },
        { code: '701', name: 'تكلفة المبيعات', debit: 1850000, credit: 0 },
        { code: '702', name: 'مصاريف الرواتب', debit: 150000, credit: 0 },
        { code: '703', name: 'مصاريف الإيجار', debit: 50000, credit: 0 }
    ];
    
    renderTrialBalanceTable(trialBalance);
}

// عرض جدول ميزان المراجعة
function renderTrialBalanceTable(data) {
    const tableBody = document.querySelector('#trialBalanceTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    let totalDebit = 0;
    let totalCredit = 0;
    
    data.forEach(item => {
        const row = document.createElement('tr');
        const difference = item.debit - item.credit;
        
        row.innerHTML = `
            <td>${item.code}</td>
            <td>${item.name}</td>
            <td class="debit-amount">${item.debit > 0 ? utils.formatCurrency(item.debit) : '-'}</td>
            <td class="credit-amount">${item.credit > 0 ? utils.formatCurrency(item.credit) : '-'}</td>
            <td class="${difference >= 0 ? 'debit-amount' : 'credit-amount'}">
                ${difference !== 0 ? utils.formatCurrency(Math.abs(difference)) : '-'}
            </td>
        `;
        
        tableBody.appendChild(row);
        
        totalDebit += item.debit;
        totalCredit += item.credit;
    });
    
    // تحديث المجاميع
    document.getElementById('tbTotalDebit').textContent = utils.formatCurrency(totalDebit);
    document.getElementById('tbTotalCredit').textContent = utils.formatCurrency(totalCredit);
    document.getElementById('tbDifference').textContent = utils.formatCurrency(totalDebit - totalCredit);
    
    // التحقق من توازن الميزان
    if (totalDebit === totalCredit) {
        document.getElementById('tbDifference').style.color = '#2ecc71';
    } else {
        document.getElementById('tbDifference').style.color = '#e74c3c';
    }
}

// -------------------- المطابقة البنكية --------------------
function loadBankReconciliation() {
    // بيانات تجريبية
    const reconciliations = [
        {
            bankAccount: 'البنك الأهلي - 123456789',
            lastReconciliation: '2023-12-31',
            bankBalance: 250000,
            bookBalance: 248500,
            difference: 1500,
            status: 'مطابق'
        },
        {
            bankAccount: 'البنك الراجحي - 987654321',
            lastReconciliation: '2024-01-15',
            bankBalance: 200000,
            bookBalance: 201500,
            difference: -1500,
            status: 'غير مطابق'
        }
    ];
    
    renderReconciliationTable(reconciliations);
    renderReconciliationSummary(reconciliations);
}

// عرض جدول المطابقة البنكية
function renderReconciliationTable(data) {
    const tableBody = document.querySelector('#reconciliationTable tbody');
    if (!tableBody) return;
    
    tableBody.innerHTML = '';
    
    data.forEach(item => {
        const row = document.createElement('tr');
        
        row.innerHTML = `
            <td>${item.bankAccount}</td>
            <td>${item.lastReconciliation}</td>
            <td>${utils.formatCurrency(item.bankBalance)}</td>
            <td>${utils.formatCurrency(item.bookBalance)}</td>
            <td class="${item.difference >= 0 ? 'positive' : 'negative'}">
                ${utils.formatCurrency(item.difference)}
            </td>
            <td>
                <span class="status-badge ${item.status === 'مطابق' ? 'completed' : 'pending'}">
                    ${item.status}
                </span>
            </td>
            <td>
                <button class="btn btn-outline btn-sm" onclick="reconcileAccount('${item.bankAccount}')">
                    <i class="fas fa-sync-alt"></i>
                </button>
                <button class="btn btn-outline btn-sm" onclick="viewReconciliation('${item.bankAccount}')">
                    <i class="fas fa-eye"></i>
                </button>
            </td>
        `;
        
        tableBody.appendChild(row);
    });
}

// عرض ملخص المطابقة
function renderReconciliationSummary(data) {
    const container = document.querySelector('.summary-cards');
    if (!container) return;
    
    const reconciled = data.filter(item => item.status === 'مطابق').length;
    const pending = data.filter(item => item.status === 'غير مطابق').length;
    
    container.innerHTML = `
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-university"></i>
            </div>
            <div class="stat-info">
                <span class="stat-title">الحسابات البنكية</span>
                <span class="stat-value">${data.length}</span>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-check-circle"></i>
            </div>
            <div class="stat-info">
                <span class="stat-title">مطابقة</span>
                <span class="stat-value">${reconciled}</span>
            </div>
        </div>
        <div class="stat-card">
            <div class="stat-icon">
                <i class="fas fa-clock"></i>
            </div>
            <div class="stat-info">
                <span class="stat-title">قيد المراجعة</span>
                <span class="stat-value">${pending}</span>
            </div>
        </div>
    `;
}

// -------------------- دوال القيد المحاسبي --------------------
function openNewTransaction() {
    const modal = document.getElementById('transactionModal');
    const modalBody = modal.querySelector('.modal-body');
    
    modalBody.innerHTML = `
        <form id="transactionForm" onsubmit="saveTransaction(event)">
            <div class="row">
                <div class="col-md-6">
                    <div class="form-group">
                        <label>التاريخ <span class="required">*</span></label>
                        <input type="date" class="form-control" id="transactionDate" required 
                               value="${new Date().toISOString().split('T')[0]}">
                    </div>
                </div>
                <div class="col-md-6">
                    <div class="form-group">
                        <label>رقم القيد</label>
                        <input type="text" class="form-control" id="transactionNumber" 
                               value="JRN-${Date.now().toString().slice(-6)}" readonly>
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label>البيان <span class="required">*</span></label>
                <textarea class="form-control" id="transactionDescription" rows="3" required 
                          placeholder="أدخل وصفاً واضحاً للقيد المحاسبي..."></textarea>
            </div>
            
            <div class="form-section">
                <h4>الطرف المدين</h4>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>الحساب المدين <span class="required">*</span></label>
                            <select class="form-control" id="debitAccount" required>
                                <option value="">اختر الحساب المدين</option>
                                <option value="101">101 - النقدية</option>
                                <option value="201">201 - المخزون</option>
                                <option value="301">301 - ذمم العملاء</option>
                                <option value="701">701 - تكلفة المبيعات</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>المبلغ المدين <span class="required">*</span></label>
                            <input type="number" class="form-control" id="debitAmount" required 
                                   min="0" step="0.01" placeholder="0.00">
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="form-section">
                <h4>الطرف الدائن</h4>
                <div class="row">
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>الحساب الدائن <span class="required">*</span></label>
                            <select class="form-control" id="creditAccount" required>
                                <option value="">اختر الحساب الدائن</option>
                                <option value="401">401 - حسابات الدفع</option>
                                <option value="501">501 - رأس المال</option>
                                <option value="601">601 - المبيعات</option>
                                <option value="101">101 - النقدية</option>
                            </select>
                        </div>
                    </div>
                    <div class="col-md-6">
                        <div class="form-group">
                            <label>المبلغ الدائن <span class="required">*</span></label>
                            <input type="number" class="form-control" id="creditAmount" required 
                                   min="0" step="0.01" placeholder="0.00">
                        </div>
                    </div>
                </div>
            </div>
            
            <div class="form-group">
                <label>ملاحظات إضافية</label>
                <textarea class="form-control" id="transactionNotes" rows="2"></textarea>
            </div>
            
            <div class="form-actions">
                <button type="button" class="btn btn-outline" onclick="closeTransactionModal()">
                    إلغاء
                </button>
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-save"></i>
                    حفظ القيد
                </button>
            </div>
        </form>
    `;
    
    modal.style.display = 'flex';
    
    // إضافة مستمعات الأحداث
    initTransactionFormEvents();
}

// تهيئة أحداث نموذج القيد
function initTransactionFormEvents() {
    const debitAmount = document.getElementById('debitAmount');
    const creditAmount = document.getElementById('creditAmount');
    
    // التأكد من تساوي المدين والدائن
    if (debitAmount && creditAmount) {
        debitAmount.addEventListener('input', function() {
            creditAmount.value = this.value;
        });
        
        creditAmount.addEventListener('input', function() {
            debitAmount.value = this.value;
        });
    }
}

// حفظ القيد المحاسبي
function saveTransaction(event) {
    event.preventDefault();
    
    const transactionData = {
        date: document.getElementById('transactionDate').value,
        number: document.getElementById('transactionNumber').value,
        description: document.getElementById('transactionDescription').value,
        debitAccount: document.getElementById('debitAccount').value,
        debitAmount: parseFloat(document.getElementById('debitAmount').value),
        creditAccount: document.getElementById('creditAccount').value,
        creditAmount: parseFloat(document.getElementById('creditAmount').value),
        notes: document.getElementById('transactionNotes').value,
        user: JSON.parse(localStorage.getItem('user'))?.username || 'system'
    };
    
    // التحقق من تساوي المبالغ
    if (transactionData.debitAmount !== transactionData.creditAmount) {
        alert('يجب أن يتساوى المبلغ المدين مع المبلغ الدائن');
        return;
    }
    
    console.log('حفظ القيد:', transactionData);
    
    // في التطبيق الحقيقي، هنا ستكون إرسال البيانات إلى الخادم
    
    utils.showNotification('تم حفظ القيد المحاسبي بنجاح', 'success');
    closeTransactionModal();
    loadJournalEntries();
}

// إغلاق نموذج القيد
function closeTransactionModal() {
    document.getElementById('transactionModal').style.display = 'none';
}

// عرض تفاصيل القيد
function viewJournalEntry(entryId) {
    console.log('عرض القيد:', entryId);
    // في التطبيق الحقيقي، هنا ستكون فتح صفحة تفاصيل القيد
}

// تحرير القيد
function editJournalEntry(entryId) {
    console.log('تحرير القيد:', entryId);
    // في التطبيق الحقيقي، هنا ستكون فتح نموذج التحرير
}

// حذف القيد
function deleteJournalEntry(entryId) {
    if (confirm('هل أنت متأكد من حذف هذا القيد المحاسبي؟')) {
        console.log('حذف القيد:', entryId);
        // في التطبيق الحقيقي، هنا ستكون استدعاء API للحذف
        utils.showNotification('تم حذف القيد بنجاح', 'success');
        loadJournalEntries();
    }
}

// بدء مطابقة بنكية جديدة
function openReconciliation() {
    utils.showNotification('فتح نموذج المطابقة البنكية', 'info');
    // في التطبيق الحقيقي، هنا ستكون فتح نموذج المطابقة
}

// مطابقة حساب بنكي
function reconcileAccount(bankAccount) {
    console.log('مطابقة الحساب:', bankAccount);
    // في التطبيق الحقيقي، هنا ستكون فتح نموذج المطابقة
}

// عرض تفاصيل المطابقة
function viewReconciliation(bankAccount) {
    console.log('عرض المطابقة:', bankAccount);
    // في التطبيق الحقيقي، هنا ستكون فتح صفحة تفاصيل المطابقة
}

// طباعة دفتر اليومية
function printJournal() {
    utils.showNotification('جاري طباعة دفتر اليومية...', 'info');
    // في التطبيق الحقيقي، هنا ستكون استدعاء API للطباعة
}

// طباعة ميزان المراجعة
function printTrialBalance() {
    utils.showNotification('جاري طباعة ميزان المراجعة...', 'info');
    // في التطبيق الحقيقي، هنا ستكون استدعاء API للطباعة
}

// تصدير دفتر اليومية
function exportJournal() {
    utils.showNotification('جاري تصدير بيانات دفتر اليومية...', 'info');
    // في التطبيق الحقيقي، هنا ستكون استدعاء API للتصدير
}