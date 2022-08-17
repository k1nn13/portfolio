//
// var i = 0;
// var images = [];
// var time = 3000;
//
// //image list
// images[0] = '../img/MKII_StealthFighter_00.jpg'
// images[1] = '../img/MKII_StealthFighter_01.jpg'
// images[2] = '../img/MKII_StealthFighter_02.jpg'
// images[3] = '../img/MKII_StealthFighter_03.jpg'
// images[4] = '../img/MKII_StealthFighter_04.jpg'
//
//
// //change images
// function changeImg() {
//   document.slide.src = images[i];
//
//   if(i < images.length - 1){
//     i++;
//   } else {
//     i = 0;
//   }
//
//   setTimeout("changeImg()", time);
// }
//
// window.onload = changeImg;


let slideIndex = 0;
// showSlides();

function showSlides() {
  let i;
  let slides = document.getElementsByClassName("mySlides");
  let dots = document.getElementsByClassName("dot");
  for (i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  slideIndex++;
  if (slideIndex > slides.length) {slideIndex = 1}
  // for (i = 0; i < dots.length; i++) {
  //   dots[i].className = dots[i].className.replace(" active", "");
  // }
  slides[slideIndex-1].style.display = "block";
  // dots[slideIndex-1].className += " active";
  setTimeout(showSlides, 3000); // Change image every 2 seconds
}
