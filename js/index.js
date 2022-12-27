// Code for game | prevent arrow keys moving page

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
