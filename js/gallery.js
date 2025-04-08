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
  closeModal();
});
