// JavaScript Document

// Biến đối tượng đồ họa
var objbackground = document.getElementById("background");
var objanimal = document.getElementsByClassName("animal");
var objletter = document.getElementsByClassName("letter");

// Gán lại các giá trị animation(chưa biết cách khắc phục)
for(var i = 0; i < 3; i++) {
	objanimal[i].style.width = "17vw";
	objanimal[i].style.height = "32vh";
	objletter[i].style.width = "4.5vw";
	objletter[i].style.height = "13.5vh";
	objletter[i].style.left = "4.2vw";
	objletter[i].style.top = "14vh";
}
objanimal[0].style.left = "13vw";
objanimal[0].style.top = "31vh";
objanimal[1].style.left = "40vw";
objanimal[1].style.top = "31vh";
objanimal[2].style.left = "67vw";
objanimal[2].style.top = "31vh";

//Biến nội dung trò chơi
var key = 'b';
var letter = ['a', 'b', 'c'];

for(var i = 0; i < objanimal.length; i++) (function(i){
	objanimal[i].onclick = function() {
		if(letter[i] == key){
			objanimal[i].style.backgroundImage = "url('../res/image/animal/usgk$library$canvas_editor$stickers$images$sticker023_goat-ipad@2x$white.png')";
			for(let k=1; k<700; k++) {
    			setTimeout(function timer(){
				objanimal[i].style.width = parseFloat(objanimal[i].style.width) + 0.01 + "vw";
				objanimal[i].style.left = parseFloat(objanimal[i].style.left) - 0.005 + "vw";
				objletter[i].style.width = parseFloat(objletter[i].style.width) + 0.00265 + "vw";
				objletter[i].style.left = parseFloat(objletter[i].style.left) + 0.003675 + "vw";
				objanimal[i].style.height = parseFloat(objanimal[i].style.height) + 0.01 + "vh";
				objanimal[i].style.top = parseFloat(objanimal[i].style.top) - 0.005 + "vh";
				objletter[i].style.height = parseFloat(objletter[i].style.height) + 0.00422 + "vh";
				objletter[i].style.top = parseFloat(objletter[i].style.top) + 0.00289 + "vh";
    			}, k*0.5 );
			}
			setTimeout(function timer(){
				objbackground.style.backgroundImage = "url('../res/image/background/usgk$library$canvas_editor$backgrounds$images$22purplebg@2x.png')";
				for(var j = 0; j < 3; j++) {
					objanimal[j].style.backgroundImage = "url('../res/image/animal/usgk$library$canvas_editor$stickers$images$sticker024_hog-ipad@2x.png')";
				}
			}, 3000)
		}
		else {
			//Đoạn code dưới đây là animation phóng to rồi thu nhỏ con vật
			for(let k=1; k<400; k++) {
    			setTimeout(function timer(){
				objanimal[i].style.width = parseFloat(objanimal[i].style.width) + 0.01 + "vw";
				objanimal[i].style.left = parseFloat(objanimal[i].style.left) - 0.005 + "vw";
				objletter[i].style.width = parseFloat(objletter[i].style.width) + 0.00265 + "vw";
				objletter[i].style.left = parseFloat(objletter[i].style.left) + 0.003675 + "vw";
				objanimal[i].style.height = parseFloat(objanimal[i].style.height) + 0.01 + "vh";
				objanimal[i].style.top = parseFloat(objanimal[i].style.top) - 0.005 + "vh";
				objletter[i].style.height = parseFloat(objletter[i].style.height) + 0.00422 + "vh";
				objletter[i].style.top = parseFloat(objletter[i].style.top) + 0.00289 + "vh";
    			}, k*0.5 );
			}
			setTimeout(function timer() {
				for(let k=1; k<400; k++) {
    			setTimeout(function timer(){
				objanimal[i].style.width = parseFloat(objanimal[i].style.width) - 0.01 + "vw";
				objanimal[i].style.left = parseFloat(objanimal[i].style.left) + 0.005 + "vw";
				objletter[i].style.width = parseFloat(objletter[i].style.width) - 0.00265 + "vw";
				objletter[i].style.left = parseFloat(objletter[i].style.left) - 0.003675 + "vw";
				objanimal[i].style.height = parseFloat(objanimal[i].style.height) - 0.01 + "vh";
				objanimal[i].style.top = parseFloat(objanimal[i].style.top) + 0.005 + "vh";
				objletter[i].style.height = parseFloat(objletter[i].style.height) - 0.00422 + "vh";
				objletter[i].style.top = parseFloat(objletter[i].style.top) - 0.00289 + "vh";
    			}, k*0.5 );
			}
			},175);
		}
	}
})(i);