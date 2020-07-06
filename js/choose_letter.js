// JavaScript Document
const POSITION_HIDE = "-100vw";
const DELAY_RESULT = 1000;
const DELAY_COMMENT = 2000;
const POSITION_LETTER_LEFT = ["4.2vw", "6vw"];
const POSITION_LETTER_TOP = ["14vh", "10vh"];
const POSITION_CONGRATULATION_LEFT = "8.5vw";
const POSITION_CONGRATULATION_TOP = "15vh";

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
var objkodi = document.getElementById("kodi"); // Kodi là tên con gấu
var objplay = document.getElementById("playbutton");
var objbgplay = document.getElementById("bghome");

//Biến nội dung trò chơi
var key;
var letter = [];
var stage = 1; // Màn đầu tiên là 1
var limitstage;

//Các hàm
function loadData() {
	var mydata = JSON.parse(data);
	key = mydata[stage-1].key;
	limitstage = mydata.length;
	for(var i = 0; i < objanimal.length; i++) {
		letter[i] = mydata[stage-1].letter[i];
	}
}

function initial(stage) {
	objbgplay.style.left = POSITION_HIDE;
	loadData();
	objbackground.style.backgroundImage = "url('../res/image/background/" + stage + ".png')";
	for(var i = 0; i < objanimal.length; i++) {
		objanimal[i].style = "";
		objletter[i].style = "";
		objanimal[i].style.backgroundImage = "url('../res/image/animal/normal" + stage + ".png')";
		objletter[i].style.left = POSITION_LETTER_LEFT[stage-1];
		objletter[i].style.top = POSITION_LETTER_TOP[stage-1];
		objletter[i].style.backgroundImage = "url('../res/image/letter/usgk$commonassets$collection$alphabet$lowercasecolor" + letter[i] + "@2x.png')";
		audioletterK = new Audio('../res/sound/letter/usgk$kvar001$theletter' + key + ".mp3");
		audioletterV[i] = new Audio("../res/sound/chucaitiengviet/usgk$library$canvas_editor$stickers$images$sticker_lowercasecolor" + letter[i] + ".mp3");
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
	}, DELAY_RESULT);
	setTimeout(function timer() {
		audiogoodjoob.play();
	}, DELAY_COMMENT);
}

function playAudioIncorrect() {
	setTimeout(function timer() {
		audioincorrect.play();
	}, DELAY_RESULT);
	setTimeout(function timer() {
		audiotryagain.play();
	}, DELAY_COMMENT);
}

function changeImageWhenCorrect(i) {
	objanimal[i].style.backgroundImage = "url('../res/image/animal/correct" + stage + ".png')";
}

function zoomInWhenCorrect(i) {
	//Các chỉ số dưới đây là tự căn chỉnh cho phù hợp, vì chúng gắn liền với phép toán và đơn vị
	//nên nếu dùng biến hoặc hằng sẽ rắc rối
	$('#animal' + i).animate(
		{width: "+=7vw", height: "+=7vh", left: "-=3.5vw", top: "-=3.5vh"}, 350
	);
	$('#letter' + i).animate(
		{width: "+=1.85vw", height: "+=2.96vh", left: "+=2vw", top: "+=2.3vh"}, 350
	);
}

function zoomWhenIncorrect(status, i) {
	//Các chỉ số dưới đây là tự căn chỉnh cho phù hợp, vì chúng gắn liền với phép toán và đơn vị
	//nên nếu dùng biến hoặc hằng sẽ rắc rối
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
	objbgcongratulation.style.left = POSITION_CONGRATULATION_LEFT;
	objbgcongratulation.style.top = POSITION_CONGRATULATION_TOP;
}

function changeStage() {
	stage++;
	setTimeout(function timer(){
		if(stage <= limitstage) {
			initial(stage);
		}
		else {
			victory();
		}
	}, 4000);
}

// Hàm main
objplay.onclick = function() {
	initial(stage);
	// Dưới đây xử lý các sự kiện lựa chọn của người chơi
	for(var i = 0; i < objanimal.length; i++) (function(i){
		objanimal[i].onclick = function() {
			audioletterV[i].play();
			if(letter[i] == key){
				playAudioCorrect();
				changeImageWhenCorrect(i);
				zoomInWhenCorrect(i);
				changeStage();
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
