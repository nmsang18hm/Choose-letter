// JavaScript Document

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
var objbgcongratulation = document.getElementById("congratulation");
var objrestart = document.getElementById("restart");
var objkodi = document.getElementById("kodi");
var objplay = document.getElementById("playbutton");
var objbgplay = document.getElementById("bghome");

//Biến nội dung trò chơi
var key = ['b', 'f'];
var letter = ['a', 'b', 'c', 'd', 'c', 'f'];
var stage = 1;
var limitstage = 2;

//Các hàm
function initial(stage) {
	objbgplay.style.left = "-100vw";
	objbackground.style.backgroundImage = "url('../res/image/background/" + stage + ".png')";
	for(var i = 0; i < 3; i++) {
		objanimal[i].style = "";
		objletter[i].style = "";
		objanimal[i].style.backgroundImage = "url('../res/image/animal/normal" + stage + ".png')";
		if(stage == 2) {
			objletter[i].style.left = "6vw";
			objletter[i].style.top = "10vh";
		}
		objletter[i].style.backgroundImage = "url('../res/image/letter/usgk$commonassets$collection$alphabet$lowercasecolor" + letter[(stage-1)*3 + i] + "@2x.png')";
		audioletterK = new Audio('../res/sound/letter/usgk$kvar001$theletter' + key[(stage-1)] + ".mp3");
		audioletterV[i] = new Audio("../res/sound/chucaitiengviet/usgk$library$canvas_editor$stickers$images$sticker_lowercasecolor" + letter[(stage-1)*3 + i] + ".mp3");
	}
	playAudioIntroduce();
}

function playAudioIntroduce() {
	audiowoh.play();
	setTimeout(function timer() {
		audioletterK.play();
	}, 1500);
	setTimeout(function timer() {
		audiotapit.play();
	}, 3000);
}

function playAudioCorrect() {
	setTimeout(function timer() {
		audiocorrect.play();
	}, 1000);
	setTimeout(function timer() {
		audiogoodjoob.play();
	}, 2000);
}

function playAudioIncorrect() {
	setTimeout(function timer() {
		audioincorrect.play();
	}, 1000);
	setTimeout(function timer() {
		audiotryagain.play();
	}, 2000);
}

function changeImageWhenCorrect(i) {
	objanimal[i].style.backgroundImage = "url('../res/image/animal/correct" + stage + ".png')";
}

function zoomInWhenCorrect(i) {
	$('#animal' + i).animate(
		{width: "+=7vw", height: "+=7vh", left: "-=3.5vw", top: "-=3.5vh"}, 350
	);
	$('#letter' + i).animate(
		{width: "+=1.85vw", height: "+=2.96vh", left: "+=2vw", top: "+=2.3vh"}, 350
	);
}

function zoomWhenIncorrect(status, i) {
	if(status == '+') {
		$('#animal' + i).animate(
			{width: "+=4vw", height: "+=4vh", left: "-=2vw", top: "-=2vh"}, 200
		);
		$('#letter' + i).animate(
			{width: "+=1.06vw", height: "+=1.69vh", left: "+=1vw", top: "+=1.16vh"}, 200
		);
	} else if(status == '-') {
		$('#animal' + i).animate(
			{width: "-=4vw", height: "-=4vh", left: "+=2vw", top: "+=2vh"}, 200
		);
		$('#letter' + i).animate(
			{width: "-=1.06vw", height: "-=1.69vh", left: "-=1vw", top: "-=1.16vh"}, 200
		);
	}
}

function victory() {
	audiocongratulation.play();
	objbgcongratulation.style.left = "8.5vw";
	objbgcongratulation.style.top = "15vh";
}

// Hàm main
objplay.onclick = function() {
	initial(stage);

	// Xử lý các sự kiện lựa chọn của người chơi
	for(var i = 0; i < objanimal.length; i++) (function(i){
		objanimal[i].onclick = function() {
			audioletterV[i].play();
			if(letter[(stage-1)*3 + i] == key[stage-1]){
				playAudioCorrect();
				changeImageWhenCorrect(i);
				zoomInWhenCorrect(i);
				
				
				//Dưới đây là phần chuyển màn chơi
				stage++;
				setTimeout(function timer(){
					if(stage <= limitstage) {
						initial(stage);
					}
					else {
						victory();
					}
				}, 4000)
			}
			else {
				playAudioIncorrect();
				
				zoomWhenIncorrect('+', i);
				
				setTimeout(function timer() {
					zoomWhenIncorrect('-', i)
				}, 200);
			}
		}
	})(i);

	objrestart.onclick = function() {
		window.location = document.URL;
	}

	objkodi.onclick = function() {
		playAudioIntroduce();
	}
}