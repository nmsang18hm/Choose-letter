// JavaScript Document

//Các hàm
function initial(stage) {
	for(var i = 0; i < 3; i++) {
		objanimal[i].style.width = "17vw";
		objanimal[i].style.height = "32vh";
		objletter[i].style.width = "4.5vw";
		objletter[i].style.height = "13.5vh";
		objrestart.style.width = "20vw";
		objrestart.style.height = "10vh";
		objrestart.style.left = "30vw";
		objrestart.style.top = "62vh";
		if(stage == 1) {
			objletter[i].style.left = "4.2vw";
			objletter[i].style.top = "14vh";
		}
		else {
			objletter[i].style.left = "6vw";
			objletter[i].style.top = "10vh";
		}
		if(i == 0) {
			objanimal[i].style.left = "13vw";
			objanimal[i].style.top = "31vh";
		}
		else if(i == 1) {
			objanimal[i].style.left = "40vw";
			objanimal[i].style.top = "31vh";
		}
		else {
			objanimal[i].style.left = "67vw";
			objanimal[i].style.top = "31vh";
		}
		objletter[i].style.backgroundImage = "url('../res/image/letter/usgk$commonassets$collection$alphabet$lowercasecolor" + letter[(stage-1)*3 + i] + "@2x.png')";
		audioletterK = new Audio('../res/sound/letter/usgk$kvar001$theletter' + key[(stage-1)] + ".mp3");
		audioletterV[i] = new Audio("../res/sound/chucaitiengviet/usgk$library$canvas_editor$stickers$images$sticker_lowercasecolor" + letter[(stage-1)*3 + i] + ".mp3");
	}
	talkwhichone();
}

function talkwhichone() {
	audiowoh.play();
	setTimeout(function timer() {
		audioletterK.play();
	}, 1500);
	setTimeout(function timer() {
		audiotapit.play();
	}, 3000);
}

//Biến đối tượng âm thanh
var audiowoh = new Audio('../res/sound/usgk$kodivoice$whichonehas.mp3');// audio which one has
var audioletterK;
var audiotapit = new Audio('../res/sound/usgk$kodivoice$tapit.mp3');
var audioletterV = new Array();
var audiocorrect = new Audio('../res/sound/correct.mp3');
var audioincorrect = new Audio('../res/sound/incorrect.mp3');
var audiotryagain = new Audio('../res/sound/usgk$kodivoice$tryagain.mp3');
var audiogoodjoob = new Audio('../res/sound/usgk$kodivoice$goodjob.mp3');
var audiocongratulation = new Audio('../res/sound/14531226_win_by_deodo_preview.mp3');

// Biến đối tượng đồ họa
var objbackground = document.getElementById("background");
var objanimal = document.getElementsByClassName("animal");
var objletter = document.getElementsByClassName("letter");
var objbgvictory = document.getElementById("victory");
var objrestart = document.getElementById("restart");
var objkodi = document.getElementById("kodi");
var objplay = document.getElementById("playbutton");
var objbgplay = document.getElementById("bghome");

//Biến nội dung trò chơi
var key = ['b', 'f'];
var letter = ['a', 'b', 'c', 'd', 'c', 'f'];
var stage = 1;
var limitstage = 2;

objplay.onclick = function() {
	objbgplay.style.left = "-100vw";
	// Gán lại các giá trị animation(chưa biết cách khắc phục)
	initial(stage);

	// Xử lý các sự kiện lựa chọn của người chơi
	for(var i = 0; i < objanimal.length; i++) (function(i){
		objanimal[i].onclick = function() {
			audioletterV[i].play();
			if(letter[(stage-1)*3 + i] == key[stage-1]){
				//Dưới đây là hiệu ứng khi chọn đúng
				setTimeout(function timer() {
					audiocorrect.play();
				}, 1000);
				setTimeout(function timer() {
					audiogoodjoob.play();
				}, 2000);
				if(stage == 1) {
					objanimal[i].style.backgroundImage = "url('../res/image/animal/usgk$library$canvas_editor$stickers$images$sticker023_goat-ipad@2x$white.png')";
				}
				else {
					objanimal[i].style.backgroundImage = "url('../res/image/animal/usgk$library$canvas_editor$stickers$images$sticker024_hog-ipad@2x$white.png')";
				}
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
				//Dưới đây là phần chuyển màn chơi
				stage++;
				setTimeout(function timer(){
					if(stage <= limitstage) {
						initial(stage);
						objbackground.style.backgroundImage = "url('../res/image/background/usgk$library$canvas_editor$backgrounds$images$22purplebg@2x.png')";
						for(var j = 0; j < 3; j++) {
							objanimal[j].style.backgroundImage = "url('../res/image/animal/usgk$library$canvas_editor$stickers$images$sticker024_hog-ipad@2x.png')";
						}
					}
					else {
						audiocongratulation.play();
						objbgvictory.style.left = "8.5vw";
						objbgvictory.style.top = "15vh";
					}
				}, 4000)
			}
			else {
				//Đoạn code dưới đây là animation phóng to rồi thu nhỏ con vật khi chọn sai
				setTimeout(function timer() {
					audioincorrect.play();
				}, 1000);
				setTimeout(function timer() {
					audiotryagain.play();
				}, 2000);
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

	objrestart.onclick = function() {
		window.location = document.URL;
	}

	objkodi.onclick = function() {
		talkwhichone();
	}
}