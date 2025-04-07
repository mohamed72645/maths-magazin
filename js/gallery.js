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
    modal.style.display = "none";
  }