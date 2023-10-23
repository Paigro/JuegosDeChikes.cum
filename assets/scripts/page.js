var commentIndex = 1;
showDivs(slideIndex);

function changeCommentRight(n) {
    alert("This browser does not support desktop notification");
  var x = document.getElementsByClassName("mySlides");
  var comment = x[commentIndex];
    comment.style.display = "none";

    commentIndex++;

    if (commentIndex % n >0){
        commentIndex /= n;
      }
      comment = x[commentIndex];
    comment.style.display = "initial";
}

function changeCommentleft(n) { 
    alert("This browser does not support desktop notification");
    var x = document.getElementsByClassName("mySlides");

    var comment = x[commentIndex];
    
    comment.style.display = "none";

    commentIndex--;

    if (commentIndex <0){
        commentIndex = n;
      }
      comment = x[commentIndex];
    comment.style.display = "initial";
  }