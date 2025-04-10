function openModal(imgElement) {
    var modal = document.getElementById("imageModal");
    var modalImg = document.getElementById("modalImg");
    var downloadBtn = document.getElementById("downloadBtn");

    modal.style.display = "block";
    modalImg.src = imgElement.src;

    // استخراج اسم الملف من الرابط
    var imageName = imgElement.src.split('/').pop();
    downloadBtn.href = imgElement.src;
    downloadBtn.setAttribute('download', imageName);
}

function closeModal() {
    var modal = document.getElementById("imageModal");
    if (modal.style.display !== "none") {  // تحقق من أن المودال مفتوح
        modal.style.display = "none";
    }
}

// الاستماع للضغط على زر Esc في الكيبورد
document.addEventListener('keydown', function(event) {
  if (event.key === "Escape") {
    closeModal();
  }
});

// الاستماع لزر الرجوع في الهاتف
window.addEventListener('popstate', function(event) {
  var modal = document.getElementById("imageModal");
  if (modal.style.display !== "none") {  // إذا كان المودال مفتوحًا
    event.preventDefault();  // إيقاف الرجوع للصفحة السابقة
    closeModal();  // إغلاق المودال
  } else {
    history.back();  // إذا كان المودال مغلقًا، يرجع للصفحة السابقة
  }
});

// الاستماع للضغط على مكان فارغ خارج الصورة لإغلاق المودال
var modal = document.getElementById("imageModal");
modal.addEventListener('click', function(event) {
  if (event.target === modal) {  // تحقق إذا كان الضغط على الخلفية فقط (وليس على الصورة نفسها)
    closeModal();
  }
});
