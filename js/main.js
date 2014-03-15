
window.onload=function() {
  
  var elems = document.getElementsByClassName('paper');
  var n = elems.length;
  for (i in elems) {
    elems[i].innerHTML = "<span class='num'>[" + n + "]</span> " + elems[i].innerHTML;
    n--;
  }
 
}

