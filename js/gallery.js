// إعداد Firebase
const firebaseConfig = {
  apiKey: "AIzaSyD6wEUfAQm3RxsU6mEit06utNlyP6p_0B0",
  authDomain: "maths-magazine.firebaseapp.com",
  databaseURL: "https://maths-magazine-default-rtdb.firebaseio.com",
  projectId: "maths-magazine",
  storageBucket: "maths-magazine.firebasestorage.app",
  messagingSenderId: "979802161519",
  appId: "1:979802161519:web:380979e2ce5b3c4cfa689a",
  measurementId: "G-JMD1FR9CL5"
};

firebase.initializeApp(firebaseConfig);
const database = firebase.database();

function loadImages() {
  const gallery = document.getElementById("gallery");

  firebase.database().ref("Images").once("value", function(snapshot) {
    snapshot.forEach(function(childSnapshot) {
      const imageData = childSnapshot.val().image;
      const title = childSnapshot.val().title || "عنوان غير موجود";  // جلب العنوان من Firebase
      const key = childSnapshot.key;

      const card = document.createElement("div");
      card.className = "image-card";

      const img = document.createElement("img");
      img.src = imageData;
      img.onclick = function () {
        openModal(img, title);  // تم تمرير العنوان هنا
      };

      // عرض الكابشن تحت الصورة في المعرض
      const imageCaption = document.createElement("p");
      imageCaption.innerText = title;
      card.appendChild(img);
      card.appendChild(imageCaption);

      gallery.appendChild(card);
    });
  });
}

function openModal(imgElement, caption) {
  var modal = document.getElementById("imageModal");
  var modalImg = document.getElementById("modalImg");
  var downloadBtn = document.getElementById("downloadBtn");
  var modalCaption = document.getElementById("modalCaption");

  modal.style.display = "block";
  modalImg.src = imgElement.src;

  // استخراج اسم الملف من الرابط
  var imageName = imgElement.src.split('/').pop();
  downloadBtn.href = imgElement.src;
  downloadBtn.setAttribute('download', imageName);

  // عرض الكابشن داخل المودال
  modalCaption.innerText = caption;
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

// تحميل الصور عند تحميل الصفحة
window.onload = loadImages;
