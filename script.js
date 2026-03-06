document.addEventListener('DOMContentLoaded', () => {
    const bookingForm = document.getElementById('bookingForm');
    const dateInput = document.getElementById('arrivalDate');

    // --- 1. حماية حقل التاريخ من السنوات المستحيلة ---
    if (dateInput) {
        const today = new Date();
        const yyyy = today.getFullYear();
        const mm = String(today.getMonth() + 1).padStart(2, '0');
        const dd = String(today.getDate()).padStart(2, '0');
        
        const minDate = `${yyyy}-${mm}-${dd}`;
        const maxDate = `${yyyy + 1}-${mm}-${dd}`;
        
        dateInput.setAttribute('min', minDate);
        dateInput.setAttribute('max', maxDate);

        dateInput.addEventListener('blur', function() {
            if (this.value && this.value < minDate) {
                alert("عذراً، لا يمكن اختيار تاريخ قديم!");
                this.value = minDate;
            } else if (this.value && this.value > maxDate) {
                alert("عذراً، لا يمكن الحجز لأكثر من سنة من الآن!");
                this.value = maxDate;
            }
        });
    }

    // --- 2. التحقق من رقم الهاتف ومعالجة نموذج الحجز ---
    if (bookingForm) {
        bookingForm.addEventListener('submit', (e) => {
            e.preventDefault(); 

            const name = document.getElementById('ownerName').value;
            const phone = document.getElementById('phone').value;
            const phoneRegex = /^(07)[0-9]{8}$/;

            if (!phoneRegex.test(phone)) {
                alert("رقم الهاتف غير صحيح! يجب أن يتكون من 10 أرقام ويبدأ بـ 07.");
                return;
            }

            alert(`شكراً لك يا ${name}!\nتم استلام طلب الحجز بنجاح.\nسنتواصل معك قريباً على الرقم: ${phone}`);
            bookingForm.reset();
        });
    }

    // --- 3. دالة التحكم في زوم الموقع (التكبير والتصغير) ---
    // نبدأ بحجم خط افتراضي 16 بكسل
    let currentFontSize = 16; 

    window.adjustZoom = function(step) {
        // نغير الحجم بمقدار 2 بكسل في كل ضغطة
        currentFontSize += (step * 2);

        // نضع حدوداً للمستخدم (بين 12px و 30px) لمنع تشوه الموقع
        if (currentFontSize < 12) currentFontSize = 12;
        if (currentFontSize > 30) currentFontSize = 30;

        // نطبق التغيير على عنصر HTML الرئيسي ليتأثر الموقع بالكامل
        document.documentElement.style.fontSize = currentFontSize + "px";
        
        console.log("الحجم الحالي للخط: " + currentFontSize + "px");
    };
});