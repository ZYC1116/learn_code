var data = ['iphone', 'ipad', 'computer', 'phone', 'printer', 'thanks', '$100'],
	timer = null,
	flag = 0;
window.onload = function() {
	var play = document.getElementById('play'),
		stop = document.getElementById('stop');
	//开始抽奖
	play.onclick = playFun;
	stop.onclick = stopFun;

	//键盘事件
	document.onkeyup = function(event) {
		event = event || window.event;
		if (event.keyCode == 32) {
			if (flag) {
				stopFun();
				flag = 0;
			} else {
				playFun();
				flag = 1;
			}
		}
	}
}

function playFun() {
	var title = document.getElementById('title');
	//清除定时器，避免重复点击开多个定时器
	clearInterval(timer);
	timer = setInterval(function() {
		var random = Math.floor(Math.random() * data.length);
		title.innerHTML = data[random];
	}, 50);
	//使用this在键盘时会报错，因为这时的this是document。
	var play = document.getElementById('play');
	play.style.background = "#999";
}

function stopFun() {
	clearInterval(timer);
	var play = document.getElementById('play');
	play.style.background = "#036";
}