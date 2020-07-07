// JavaScript Document
const POSITION_HIDE = "-100vw";
const DELAY_RESULT = 1000;
const DELAY_APPEAR_ANIMAL = 500;
const POSITION_LETTER_LEFT = ["4.2vw", "6vw"];
const POSITION_LETTER_TOP = ["14vh", "10vh"];
const POSITION_CONGRATULATION_LEFT = "8.5vw";
const POSITION_CONGRATULATION_TOP = "15vh";

$(document).ready(function(e) {
	//Biến đối tượng âm thanh
	var audioWhichOneHas = new Audio('../res/sound/usgk$kodivoice$whichonehas.mp3');// audio which one has
	var audioLetterKey;
	var audioTapIt = new Audio('../res/sound/usgk$kodivoice$tapit.mp3');
	var audioLetterVN = new Array();
	var audioCorrect = new Audio('../res/sound/correct.mp3');
	var audioIncorrect = new Audio('../res/sound/incorrect.mp3');
	var audioTryAgain = new Audio('../res/sound/usgk$kodivoice$tryagain.mp3');
	var audioGoodJob = new Audio('../res/sound/usgk$kodivoice$goodjob.mp3');
	var audioCongratulation = new Audio('../res/sound/14531226_win_by_deodo_preview.mp3');
	var audioAppear = new Audio('../res/sound/ItemAppear7.mp3');
	var soundtrack = document.getElementById("soundtrack");
	soundtrack.volume = 0.1;

	// Biến đối tượng đồ họa
	var objBackground = document.getElementById("background");
	var objAnimal = document.getElementsByClassName("animal");
	var objLetter = document.getElementsByClassName("letter");
	var objBGCongratulation = document.getElementById("congratulation");
	var objRestart = document.getElementById("restart");
	var objKodi = document.getElementById("kodi"); // Kodi là tên con gấu
	var objPlay = document.getElementById("playbutton");
	var objBGPlay = document.getElementById("bghome");

	//Biến nội dung trò chơi
	var key;
	var letter = [];
	var stage = 1; // Màn đầu tiên là 1
	var limitStage;
	var gameBusy = false;

	//Các hàm
	function loadData() {
		var mydata = JSON.parse(data);
		key = mydata[stage-1].key;
		limitStage = mydata.length;
		for(var i = 0; i < objAnimal.length; i++) {
			letter[i] = mydata[stage-1].letter[i];
		}
	}

	function initial(callback) {
		gameBusy = true;
		objBGPlay.style.left = POSITION_HIDE;
		loadData();
		objBackground.style.backgroundImage = "url('../res/image/background/" + stage + ".png')";
		for(var i = 0; i < objAnimal.length; i++) {
			objAnimal[i].style = "";
			objLetter[i].style = "";
			objAnimal[i].style.backgroundImage = "url('../res/image/animal/normal" + stage + ".png')";
			objLetter[i].style.left = POSITION_LETTER_LEFT[stage-1];
			objLetter[i].style.top = POSITION_LETTER_TOP[stage-1];
			objLetter[i].style.backgroundImage = "url('../res/image/letter/usgk$commonassets$collection$alphabet$lowercasecolor" + letter[i] + "@2x.png')";
			audioLetterKey = new Audio('../res/sound/letter/usgk$kvar001$theletter' + key + ".mp3");
			audioLetterVN[i] = new Audio("../res/sound/chucaitiengviet/usgk$library$canvas_editor$stickers$images$sticker_lowercasecolor" + letter[i] + ".mp3");
		}
		appearAnimal();
		setTimeout(function timer() {
			playAudioIntroduce();
		}, DELAY_APPEAR_ANIMAL*3);
		setTimeout(function timer() {
			gameBusy = false;
			callback();
		}, 5000);
	}

	function playAudioIntroduce() {
		gameBusy = true;
		objKodi.style.backgroundImage = "url('../res/image/Kodi/usgk$library$canvas_editor$stickers$images$sticker005_bearchar_3-ipad@2x.png')";
		audioWhichOneHas.play();
		setTimeout(function timer() {
			audioLetterKey.play();
		}, 1500);
		setTimeout(function timer() {
			audioTapIt.play();
		}, 3000);
		setTimeout(function timer() {
			objKodi.style.backgroundImage = "";
			gameBusy = false;
		}, 4000);
	}

	function playaudioCorrect() {
		gameBusy = true;
		setTimeout(function timer() {
			objKodi.style.backgroundImage = "url('../res/image/Kodi/usgk$library$canvas_editor$stickers$images$sticker005_bearchar_4-ipad@2x.png')";
			audioCorrect.play();
		}, DELAY_RESULT);
		setTimeout(function timer() {
			objKodi.style.backgroundImage = "";
			audioGoodJob.play();
		}, DELAY_RESULT*2);
		setTimeout(function timer() {
			gameBusy = false;
		}, DELAY_RESULT*4);
	}

	function playaudioIncorrect() {
		gameBusy = true;
		setTimeout(function timer() {
			objKodi.style.backgroundImage = "url('../res/image/Kodi/usgk$library$canvas_editor$stickers$images$sticker005_bearchar_2-ipad@2x.png')";
			audioIncorrect.play();
		}, DELAY_RESULT);
		setTimeout(function timer() {
			objKodi.style.backgroundImage = "";
			audioTryAgain.play();
		}, DELAY_RESULT*2);
		setTimeout(function timer() {
			gameBusy = false;
		}, DELAY_RESULT*3);
	}

	function changeImageWhenCorrect(i) {
		objAnimal[i].style.backgroundImage = "url('../res/image/animal/correct" + stage + ".png')";
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
		audioCongratulation.play();
		objBGCongratulation.style.left = POSITION_CONGRATULATION_LEFT;
		objBGCongratulation.style.top = POSITION_CONGRATULATION_TOP;
		gameBusy = true;
	}

	function changeStage() {
		stage++;
		setTimeout(function timer(){
			if(stage <= limitStage) {
				initial(main);
			}
			else {
				victory();
			}
		}, DELAY_RESULT*4);
	}

	function appearAnimal() {
		objAnimal[0].style.opacity = "1";
		audioAppear.play();
		setTimeout(function timer() {
			objAnimal[1].style.opacity = "1";
			audioAppear.play();
		}, DELAY_APPEAR_ANIMAL);
		setTimeout(function timer() {
			objAnimal[2].style.opacity = "1";
			audioAppear.play();
		}, DELAY_APPEAR_ANIMAL*2);
	}
	
	function loadImage() {
		objAnimal[0].style.backgroundImage = "url('../res/image/animal/correct" + stage + ".png')";
		objKodi.style.backgroundImage = "url('../res/image/Kodi/usgk$library$canvas_editor$stickers$images$sticker005_bearchar_4-ipad@2x.png')";
		objKodi.style.backgroundImage = "url('../res/image/Kodi/usgk$library$canvas_editor$stickers$images$sticker005_bearchar_3-ipad@2x.png')";
		objKodi.style.backgroundImage = "url('../res/image/Kodi/usgk$library$canvas_editor$stickers$images$sticker005_bearchar_2-ipad@2x.png')";
		objKodi.style.backgroundImage = "url('../res/image/Kodi/usgk$library$canvas_editor$stickers$images$sticker005_bearchar_1-ipad@2x.png')";
	}

	function main() {
			for(var i = 0; i < objAnimal.length; i++) (function(i){
				objAnimal[i].onclick = function() {
					if(!gameBusy) {
						audioLetterVN[i].play();
						if(letter[i] == key){
							playaudioCorrect();
							changeImageWhenCorrect(i);
							zoomInWhenCorrect(i);
							changeStage();
						}
						else {
							playaudioIncorrect();
							zoomWhenIncorrect('+', i);
							setTimeout(function timer() {
								zoomWhenIncorrect('-', i)
							}, 200);
						}
					}
				}
			})(i);

			objRestart.onclick = function() {
				window.location = document.URL;
			}

			objKodi.onclick = function() {
				if(!gameBusy) {
					playAudioIntroduce();
				}
			}
	}

	objPlay.onclick = function() {
		loadImage();
		initial(main);
		soundtrack.play();
	}
});