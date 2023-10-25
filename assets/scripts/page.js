var commentIndex = 0;

function changeCommentRight(n) {
  var x = document.getElementsByClassName("mySlides");
  var comment = x[commentIndex];
    comment.style.display = "none";
    commentIndex++;
    if(commentIndex % n == 0){
      commentIndex = 0;
    }
    comment = x[commentIndex];
    comment.style.display = "inline";
}

function changeCommentLeft(n) { 
    var x = document.getElementsByClassName("mySlides");
    var comment = x[commentIndex];
    
    comment.style.display = "none";
    
    commentIndex--;
    if(commentIndex < 0){
      commentIndex = n-1;
    }
    comment = x[commentIndex];
    comment.style.display = "inline";
  }

function ad(){
  alert("BUENOS DIAS POR LA MAÑANA CON ALEGRIA Y CON EMOCION GRUMETES!!")
}