$(window).on('load', function(){
	waterfall();
	var dataInt = {"data": [{"src": '0.jpg'}, {"src": '1.jpg'}, {"src": '2.jpg'}, {"src": '3.jpg'}]};
	$(window).on('scroll', function(){
		if(checkScroll()){
			$.each(dataInt.data, function(key, value){
				var oBox = $('<div>').addClass('box').appendTo($('#main'));
				var oPic = $('<div>').addClass('pic').appendTo($(oBox));
				$('<img>').attr('src', 'images/' + $(value).attr('src')).appendTo($(oPic));
				waterfall();
			})
		}
	})
})

function waterfall(){
	var $boxs = $('#main>div');
	//outerWidth = width + padding + border
	var w = $boxs.eq(0).outerWidth();
	var cols = Math.floor($(window).width()/w);
	$('#main').width(w*cols).css('margin', '0 auto');
	var h = [];
	$boxs.each(function(index, value){
		var temp = $boxs.eq(index).outerHeight();
		if(index<cols){
			h[index] = temp;
		}else{
			var min = Math.min.apply(null, h);
			var minIndex = $.inArray(min, h);
			$(value).css({
				'position':'absolute',
				'top': min + 'px',
				'left': minIndex*w + 'px'
			});
			h[minIndex] += $boxs.eq(index).outerHeight();
		}
	})
}

function checkScroll(){
	var $lastBox = $('#main>div').last();
	var lastBoxDis = $lastBox.offset().top + Math.floor($lastBox.outerHeight()/2);
	var scrollTop = $(window).scrollTop();
	var doch = $(window).height();
	return (lastBoxDis < scrollTop + doch) ? true : false;
}