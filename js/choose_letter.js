// JavaScript Document
var objbackground = document.getElementById("background");
var objanimal = document.getElementsByClassName("animal");

objanimal[0].onclick = function() {
	alert("True");
	objbackground.style.backgroundImage = "url('../res/image/background/usgk$library$canvas_editor$backgrounds$images$22purplebg@2x.png')";
	for(var i = 0; i < 3; i++) {
		objanimal[i].style.backgroundImage = "url('../res/image/animal/usgk$library$canvas_editor$stickers$images$sticker024_hog-ipad@2x.png')";
	}
}

objanimal[1].onclick = function() {
	alert("False");
}

objanimal[2].onclick = function() {
	alert("False");
}