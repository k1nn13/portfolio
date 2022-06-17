// const navToggle = document.querySelector('.nav-toggle');
// const navLinks = document.querySelectorAll('.nav__link')
//
//
// navToggle.addEventListener('click', () => {
//   document.body.classList.toggle('nav-open');
// });
//
// navLinks.forEach(link => {
//   link.addEventListener('click', () => {
//     document.body.classList.remove('nav-open');
//   })
// });

window.addEventListener('keydown', function(e) {
  if(e.keyCode == 32 && e.target == document.body) {
    e.preventDefault();
  }

  if(e.keyCode == 38 && e.target == document.body) {
    e.preventDefault();
  }

  if(e.keyCode == 40 && e.target == document.body) {
    e.preventDefault();
  }
});
