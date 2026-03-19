// ============================================
// ملف القوائم المالية - نسخة مستقلة ومحسنة
// ============================================

document.addEventListener('DOMContentLoaded', function() {
    console.log('صفحة القوائم المالية جاهزة');
    
    // تحديث التاريخ
    updateCurrentDate();
    
    // تهيئة التبويبات
    initTabs();
    
    // تحميل الميزانية العمومية افتراضياً
    loadBalanceSheet();
});

// تحديث التاريخ في الشريط العلوي
function updateCurrentDate() {
    const now = new Date();
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    const dateEl = document.getElementById('currentDate');
    if (dateEl) {
        dateEl.textContent = now.toLocaleDateString('ar-SA', options);
    }
}

// تهيئة التبويبات (إصلاح المشكلة الأساسية)
function initTabs() {
    const tabs = document.querySelectorAll('.tab-btn');
    const panes = document.querySelectorAll('.tab-pane');
    
    if (tabs.length === 0) {
        console.error('لم يتم العثور على أزرار التبويبات');
        return;
    }
    
    console.log('عدد التبويبات:', tabs.length);
    
    // إزالة أي أحداث سابقة (لضمان عدم التكرار)
    tabs.forEach(tab => {
        tab.removeEventListener('click', handleTabClick);
        tab.addEventListener('click', handleTabClick);
    });
    
    function handleTabClick(e) {
        e.preventDefault();
        const tab = e.currentTarget;
        const tabId = tab.getAttribute('data-tab');
        
        console.log('نقر على التبويب:', tabId);
        
        if (!tabId) return;
        
        // إزالة الفئة active من جميع الأزرار واللوحات
        tabs.forEach(btn => btn.classList.remove('active'));
        panes.forEach(pane => pane.classList.remove('active'));
        
        // تفعيل الزر الحالي
        tab.classList.add('active');
        
        // تفعيل اللوحة المقابلة
        const targetPane = document.getElementById(tabId + '-tab');
        if (targetPane) {
            targetPane.classList.add('active');
            
            // تحميل البيانات المناسبة للتبويب
            switch(tabId) {
                case 'balance-sheet':
                    loadBalanceSheet();
                    break;
                case 'income-statement':
                    loadIncomeStatement();
                    break;
                case 'cash-flow':
                    loadCashFlow();
                    break;
                case 'equity':
                    loadEquity();
                    break;
                default:
                    console.warn('تبويب غير معروف:', tabId);
            }
        } else {
            console.error('لم يتم العثور على اللوحة:', tabId + '-tab');
        }
    }
}

// دالة مساعدة لتنسيق العملة (بدون الاعتماد على utils)
function formatCurrency(amount) {
    return new Intl.NumberFormat('ar-SA', {
        style: 'currency',
        currency: 'SAR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0
    }).format(amount);
}

// ============================================
// الميزانية العمومية
// ============================================
function loadBalanceSheet() {
    console.log('تحميل الميزانية العمومية');
    
    // بيانات تجريبية
    const assets = {
        current: [
            { name: 'النقدية والبنوك', amount: 450000 },
            { name: 'الذمم المدينة (عملاء)', amount: 320000 },
            { name: 'المخزون', amount: 1850000 }
        ],
        fixed: [
            { name: 'الأصول الثابتة (صافي)', amount: 2500000 }
        ],
        other: [
            { name: 'مصروفات مدفوعة مقدماً', amount: 85000 }
        ]
    };
    
    const liabilities = {
        current: [
            { name: 'الذمم الدائنة (موردون)', amount: 450000 },
            { name: 'قروض قصيرة الأجل', amount: 200000 }
        ],
        longTerm: [
            { name: 'قروض طويلة الأجل', amount: 800000 }
        ]
    };
    
    const equity = [
        { name: 'رأس المال', amount: 3000000 },
        { name: 'الأرباح المحتجزة', amount: 670000 }
    ];
    
    let totalAssets = 0, totalLiabilities = 0, totalEquity = 0;
    let html = '<table class="statement-table">';
    
    // الأصول
    html += '<tr class="section-title"><th colspan="2">الأصول</th></tr>';
    assets.current.forEach(item => {
        html += `<tr><td class="indent-1">${item.name}</td><td class="amount positive">${formatCurrency(item.amount)}</td></tr>`;
        totalAssets += item.amount;
    });
    assets.fixed.forEach(item => {
        html += `<tr><td class="indent-1">${item.name}</td><td class="amount positive">${formatCurrency(item.amount)}</td></tr>`;
        totalAssets += item.amount;
    });
    assets.other.forEach(item => {
        html += `<tr><td class="indent-1">${item.name}</td><td class="amount positive">${formatCurrency(item.amount)}</td></tr>`;
        totalAssets += item.amount;
    });
    html += `<tr class="total-row"><td>إجمالي الأصول</td><td class="amount positive">${formatCurrency(totalAssets)}</td></tr>`;
    
    // الخصوم
    html += '<tr class="section-title"><th colspan="2">الخصوم</th></tr>';
    liabilities.current.forEach(item => {
        html += `<tr><td class="indent-1">${item.name}</td><td class="amount negative">${formatCurrency(item.amount)}</td></tr>`;
        totalLiabilities += item.amount;
    });
    liabilities.longTerm.forEach(item => {
        html += `<tr><td class="indent-1">${item.name}</td><td class="amount negative">${formatCurrency(item.amount)}</td></tr>`;
        totalLiabilities += item.amount;
    });
    html += `<tr class="total-row"><td>إجمالي الخصوم</td><td class="amount negative">${formatCurrency(totalLiabilities)}</td></tr>`;
    
    // حقوق الملكية
    html += '<tr class="section-title"><th colspan="2">حقوق الملكية</th></tr>';
    equity.forEach(item => {
        html += `<tr><td class="indent-1">${item.name}</td><td class="amount positive">${formatCurrency(item.amount)}</td></tr>`;
        totalEquity += item.amount;
    });
    html += `<tr class="total-row"><td>إجمالي حقوق الملكية</td><td class="amount positive">${formatCurrency(totalEquity)}</td></tr>`;
    
    // إجمالي الخصوم وحقوق الملكية
    const totalLiabEquity = totalLiabilities + totalEquity;
    html += `<tr class="total-row"><td>إجمالي الخصوم وحقوق الملكية</td><td class="amount positive">${formatCurrency(totalLiabEquity)}</td></tr>`;
    
    html += '</table>';
    
    const container = document.getElementById('balanceSheetContent');
    if (container) container.innerHTML = html;
}

// ============================================
// قائمة الدخل
// ============================================
function loadIncomeStatement() {
    console.log('تحميل قائمة الدخل');
    
    const revenues = [
        { name: 'مبيعات سيارات', amount: 2100000 },
        { name: 'مبيعات قطع غيار', amount: 320000 },
        { name: 'إيرادات صيانة', amount: 180000 }
    ];
    const costOfSales = 1850000;
    const expenses = [
        { name: 'رواتب وبدلات', amount: 150000 },
        { name: 'إيجار المعرض', amount: 50000 },
        { name: 'مصاريف إدارية', amount: 30000 },
        { name: 'مصاريف تسويق', amount: 25000 },
        { name: 'إهلاك', amount: 40000 }
    ];
    
    let totalRevenue = revenues.reduce((acc, r) => acc + r.amount, 0);
    let totalExpenses = expenses.reduce((acc, e) => acc + e.amount, 0);
    let grossProfit = totalRevenue - costOfSales;
    let netIncome = grossProfit - totalExpenses;
    
    let html = '<table class="statement-table">';
    
    // الإيرادات
    html += '<tr class="section-title"><th colspan="2">الإيرادات</th></tr>';
    revenues.forEach(r => {
        html += `<tr><td class="indent-1">${r.name}</td><td class="amount positive">${formatCurrency(r.amount)}</td></tr>`;
    });
    html += `<tr class="sub-total"><td>إجمالي الإيرادات</td><td class="amount positive">${formatCurrency(totalRevenue)}</td></tr>`;
    
    // تكلفة المبيعات
    html += '<tr class="section-title"><th colspan="2">تكلفة المبيعات</th></tr>';
    html += `<tr><td class="indent-1">تكلفة المبيعات</td><td class="amount negative">${formatCurrency(costOfSales)}</td></tr>`;
    html += `<tr class="sub-total"><td>إجمالي الربح</td><td class="amount positive">${formatCurrency(grossProfit)}</td></tr>`;
    
    // المصروفات
    html += '<tr class="section-title"><th colspan="2">المصاريف التشغيلية</th></tr>';
    expenses.forEach(e => {
        html += `<tr><td class="indent-1">${e.name}</td><td class="amount negative">${formatCurrency(e.amount)}</td></tr>`;
    });
    html += `<tr class="sub-total"><td>إجمالي المصاريف</td><td class="amount negative">${formatCurrency(totalExpenses)}</td></tr>`;
    
    // صافي الدخل
    html += `<tr class="total-row"><td>صافي الدخل</td><td class="amount ${netIncome >= 0 ? 'positive' : 'negative'}">${formatCurrency(netIncome)}</td></tr>`;
    
    html += '</table>';
    
    const container = document.getElementById('incomeStatementContent');
    if (container) container.innerHTML = html;
}

// ============================================
// قائمة التدفقات النقدية
// ============================================
function loadCashFlow() {
    console.log('تحميل قائمة التدفقات النقدية');
    
    const operating = {
        netIncome: 420000,
        adjustments: 50000,
        changeReceivables: -30000,
        changeInventory: -120000,
        changePayables: 80000
    };
    const investing = {
        purchaseAssets: -200000
    };
    const financing = {
        loanPayment: -100000,
        dividends: -50000
    };
    
    let operatingTotal = operating.netIncome + operating.adjustments + operating.changeReceivables + operating.changeInventory + operating.changePayables;
    let investingTotal = investing.purchaseAssets;
    let financingTotal = financing.loanPayment + financing.dividends;
    let netChange = operatingTotal + investingTotal + financingTotal;
    let beginningCash = 400000;
    let endingCash = beginningCash + netChange;
    
    let html = '<table class="statement-table">';
    
    html += '<tr class="section-title"><th colspan="2">التدفقات النقدية من الأنشطة التشغيلية</th></tr>';
    html += `<tr><td class="indent-1">صافي الدخل</td><td class="amount positive">${formatCurrency(operating.netIncome)}</td></tr>`;
    html += `<tr><td class="indent-1">إهلاك ومخصصات</td><td class="amount positive">${formatCurrency(operating.adjustments)}</td></tr>`;
    html += `<tr><td class="indent-1">(زيادة)/نقصان الذمم المدينة</td><td class="amount negative">${formatCurrency(operating.changeReceivables)}</td></tr>`;
    html += `<tr><td class="indent-1">(زيادة)/نقصان المخزون</td><td class="amount negative">${formatCurrency(operating.changeInventory)}</td></tr>`;
    html += `<tr><td class="indent-1">زيادة/(نقصان) الذمم الدائنة</td><td class="amount positive">${formatCurrency(operating.changePayables)}</td></tr>`;
    html += `<tr class="sub-total"><td>صافي التدفقات التشغيلية</td><td class="amount positive">${formatCurrency(operatingTotal)}</td></tr>`;
    
    html += '<tr class="section-title"><th colspan="2">التدفقات من الأنشطة الاستثمارية</th></tr>';
    html += `<tr><td class="indent-1">شراء أصول ثابتة</td><td class="amount negative">${formatCurrency(investing.purchaseAssets)}</td></tr>`;
    html += `<tr class="sub-total"><td>صافي التدفقات الاستثمارية</td><td class="amount negative">${formatCurrency(investingTotal)}</td></tr>`;
    
    html += '<tr class="section-title"><th colspan="2">التدفقات من الأنشطة التمويلية</th></tr>';
    html += `<tr><td class="indent-1">سداد قروض</td><td class="amount negative">${formatCurrency(financing.loanPayment)}</td></tr>`;
    html += `<tr><td class="indent-1">توزيعات أرباح</td><td class="amount negative">${formatCurrency(financing.dividends)}</td></tr>`;
    html += `<tr class="sub-total"><td>صافي التدفقات التمويلية</td><td class="amount negative">${formatCurrency(financingTotal)}</td></tr>`;
    
    html += `<tr class="total-row"><td>صافي التغير في النقدية</td><td class="amount ${netChange >= 0 ? 'positive' : 'negative'}">${formatCurrency(netChange)}</td></tr>`;
    html += `<tr><td class="indent-1">النقدية أول الفترة</td><td class="amount positive">${formatCurrency(beginningCash)}</td></tr>`;
    html += `<tr class="total-row"><td>النقدية آخر الفترة</td><td class="amount positive">${formatCurrency(endingCash)}</td></tr>`;
    
    html += '</table>';
    
    const container = document.getElementById('cashFlowContent');
    if (container) container.innerHTML = html;
}

// ============================================
// قائمة الأرباح المحتجزة
// ============================================
function loadEquity() {
    console.log('تحميل قائمة الأرباح المحتجزة');
    
    const beginningRetained = 550000;
    const netIncome = 420000;
    const dividends = 300000;
    const endingRetained = beginningRetained + netIncome - dividends;
    
    let html = '<table class="statement-table">';
    html += `<tr><td class="indent-1">رصيد الأرباح المحتجزة أول الفترة</td><td class="amount positive">${formatCurrency(beginningRetained)}</td></tr>`;
    html += `<tr><td class="indent-1">صافي الدخل خلال الفترة</td><td class="amount positive">${formatCurrency(netIncome)}</td></tr>`;
    html += `<tr><td class="indent-1">توزيعات أرباح</td><td class="amount negative">${formatCurrency(dividends)}</td></tr>`;
    html += `<tr class="total-row"><td>رصيد الأرباح المحتجزة آخر الفترة</td><td class="amount positive">${formatCurrency(endingRetained)}</td></tr>`;
    html += '</table>';
    
    const container = document.getElementById('equityContent');
    if (container) container.innerHTML = html;
}

// دوال التحديث (يمكن استدعاؤها من أزرار "تحديث")
window.loadBalanceSheet = loadBalanceSheet;
window.loadIncomeStatement = loadIncomeStatement;
window.loadCashFlow = loadCashFlow;
window.loadEquity = loadEquity;