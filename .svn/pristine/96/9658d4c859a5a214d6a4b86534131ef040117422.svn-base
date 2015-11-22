var setTimeType = 1;
var ktop, kleft;
$(document).ready(function() {
	var winW = $(window).width();
	var nowW = winW - 320;
	var needH = (nowW * (11/55)) + 64;
	$("#andSvg").height(needH);
	var nowTime = getTime();
	$("#time").attr('value',nowTime);
	/*$("#itemsTpl li").each(function(index,dom) {
		$(dom).attr('class','items-'+ index +'');
	});*/
});
$(document).on('touchmove', function(e) {
	e.preventDefault();
});
var myScroll = new IScroll('#wrapper', {
	bounceTime: 500,
	deceleration: 0.003,
	tap: true,
	scrollbars: 'custom' ,
	shrinkScrollbars: 'scale',
	resizeScrollbars: true,
	fadeScrollbars: true
});
function scaleRound() {
	$(".kodo").css({
		'top': ktop,
		'left': kleft,
		'width': 40,
		'height': 40
	});
	setTimeout(function() {
		$(".kodo").addClass('kodo-on');
	}, 0);
}
function initDetailDom(leftT,precent) {
	$("#detail").css('z-index', 100);
	$("#round").css('stroke-dashoffset', precent*1145);
	$(".watch-svg").addClass('watch-svg-on');
	$(".detail-main").addClass('detail-main-on');
	var numAnim = new CountUp("leftTime",0,leftT,'',3.5,{separator : ''});
		numAnim.start();
	var len = $("#leftTime").html().length;
	if (len == 4) {
		$("#leftTime").css('font-size','38px');
	} else if(len >= 5) {
		$("#leftTime").css('font-size','32px');
	}
}
function detailGetItemsData(cls) {  //直接进入详情页调用的方法
	var leftT = $(cls).find('span').html(),
		time = $(cls).find('b').html(),
		info = $(cls).find('.item-detail').html(),
		day = $(cls).find('time').html(),
		tpw = $(cls).find('.item-progress').width(),
		pw = $(cls).find('.progress-now').width(),
		needp = pw/tpw;
	scaleRound();
	initDetailData(time, info, day);
	setTimeout(function() {
		initDetailDom(leftT,needp);
	}, 500);
}
function initDetailData(time, info, day) {
	var data = {
		time: time,
		info: info,
		day: day
	};
	var html = template('detailDom', data);
	$("#mask").before(html);
}
$("#wrapper").on('tap', 'li', function(e) {
	var day = $(this).find('.J_day').html(),
		hour = $(this).find('.J_hour').html(),
		minu = $(this).find('.J_minutes').html(),
		info = $(this).find('.item-detail').html(),
		year = $(this).find('time').html(),
		tpw = $(this).find('.item-progress').width(),
		pw = $(this).find('.progress-now').width(),
		needp = pw/tpw;
	var minutes = day * 24 * 60 + parseInt(hour) * 60 + parseInt(minu);
	console.log(minutes);
	scaleRound();
	initDetailData('分', info, year);
	setTimeout(function() {
		initDetailDom(minutes,needp);
	}, 500);
});
$("body").on('touchstart', '.detail-back', function(e) {
	$("#detail").addClass('detail-off');
	$(".kodo").removeClass('kodo-on').css({
		'width': 0,
		'height': 0
	});
	setTimeout(function() {
		$(".watch-svg").removeClass('watch-svg-on');
		$("#round").css('stroke-dashoffset', 1145);
	}, 500);
	setTimeout(function() {
		$("#detail").remove();
	}, 700);
});
$("#itemsTpl").on('touchstart', 'li', function(e) {
	ktop = e.touches[0].pageY,
	kleft = e.touches[0].pageX;
});

$("#timeAdd").on('touchstart', function() {
	openAdd();
	var len = $(".home-items li").length;
	if (len < 4) {
		$("#timeAdd").addClass('time-add-4');
	}
});
$("#secondAdd").on('touchstart',function() {
	closeAdd();
	closeDeatilNav();
	var len = $(".home-items li").length;
	if (len < 4) {
		$("#timeAdd").removeClass('time-add-4');
	}
});
$("#mask").on('touchstart', closeAdd);
function openAdd() {
	$("#timeAdd").css('z-index',1000);
	$("#mask").show();
	$(".time-add").addClass('time-add-on');
	$(".svg").css('z-index',1000).addClass('svg-on');
	$("#andSvg").show();
	setTimeout(function() {
		$(".svg").css('opacity', 1);
	}, 500);
}
function closeAdd() {
	$(".svg").css('opacity', 0);
	setTimeout(function() {
		$("#mask").hide();
		$(".time-add").removeClass('time-add-on');
		$(".svg").css('z-index',50).removeClass('svg-on');
		$("#andSvg").hide();
		$("#timeAdd").css('z-index',50);
	}, 500)
}
/*$(".item-time span").each(function(index, dom) {
	var len = $(dom).html().length;
	if (len == 4) {
		$(dom).next().css('font-size','20px');
		$(dom).next().next().css('padding','9px 0 0 0');
		$(dom).css('font-size', '38px');
	} else if (len >= 5) {
		$(dom).next().next().css('padding','7px 0 0 0');
		$(dom).css('font-size', '32px');
	} else if (len < 4) {
		$(dom).next().css('font-size','22px');
	}
});*/
function getTime() {
	var now = new Date();
	var minutes,month;
	if(now.getMinutes().toString().length == 1) {
		minutes = '0'+ now.getMinutes() +'';
	} else {
		minutes = now.getMinutes();
	}
	if (now.getMonth().toString().length == 1) {
		month = '0' + (now.getMonth() + 1) + '';
	} else {
		month = now.getMonth() + 1;
	}
	return  now.getFullYear() + '-' +
			month + '-' +
			now.getDate() + 'T'	+
			now.getHours() + ':'+
			minutes;
}
$("#sub").on('touchstart', function() {
	var dVal = $("#time").val();
	var end = dateTime_to_unix(dVal); //返回时间戳
	console.log(dVal); //返回 yyyy-mm-ddThh:mm
	
	var len = $(".home-items li").length;
	if (len < 4) {
		$("#timeAdd").removeClass('time-add-4');
	}
});
function resetSub() {
	
	$("#title").val('');
	$("#setTime").html('设置时间');
	
}
function surplusTime(endD) {
	var now = new Date(); 
	var endDate = endD;
	var leftTime = endD-now.getTime(); //相差的时间戳
	var leftsecond = Math.floor(leftTime/1000); //相差的秒数
	var day1 = Math.floor(leftsecond/(60*60*24)); //相差的天数
	var hour = Math.floor((leftsecond%(60*60*24))/3600);  //相差的小时
	var minute = Math.floor((leftsecond-day1*24*60*60-hour*3600)/60); //分钟
	var str = '还有'+ day1 +'天，'+ hour +'小时，'+ minute +'分';
	return str;
}
function dateTime_to_unix(datetime) {
	var tmp_datetime = datetime.replace(/:/g, '-');
	tmp_datetime = tmp_datetime.replace(/T/g,"-");
	tmp_datetime = tmp_datetime.replace(/ /g, '-');
	var arr = tmp_datetime.split("-");
	var now = new Date(Date.UTC(arr[0], arr[1] - 1, arr[2], arr[3] - 8, arr[4]));
	var setTime = parseInt(now.getTime());
	var nowTime = +new Date();
	if (setTime < nowTime) {
		alert('你要穿越吗？！');
	} else {
		subAnimate();
		$("#setTime").html(surplusTime(setTime));
		return setTime;
	}
}

function subAnimate() {
	var $sub = $("#sub");
	$sub.html('&#xe609;').addClass('sub-on');
	setTimeout(function() {
		$sub.addClass('rotate');
	}, 700);
	setTimeout(function() {
		$sub.html('&#xe608;');
	}, 2200);
	setTimeout(function() {
		closeAdd();
	}, 2700);
	setTimeout(function() {
		$sub.removeClass('sub-on rotate').html('确　定');
		 resetSub();
	}, 3400);
}
//详情页面包按钮
$("body").on('touchstart', '.detail-nav', function() {
	var change = $(".detail-nav").data('change');
	if (change == 1) {
		$(".detail-nav").addClass('detail-nav-on').data('change', '2').html('&#xe604;');
		$(".footer-box").addClass('on');
	} else {
		closeDeatilNav();
	}
});
$("body").on('touchstart', '.detail-edit', function() {
	openAdd();
});
$("body").on('touchstart', '.detail-del', function() {
	if (confirm('真的要删除吗？')) {
		alert('ok');
		closeDeatilNav();
	} else {
		closeDeatilNav();
		return;
	}
});
$("body").on('touchstart', '.detail-share', function() {
	shareMask();
});
$("body").on('touchstart','#shareMask',function() {
	$("#shareMask").hide();
	$(".detail-back").removeClass('detail-back-on');
	closeDeatilNav();
});
function closeDeatilNav() {
	$(".detail-nav").removeClass('detail-nav-on').data('change', '1').html('&#xe600;');
	$(".footer-box").removeClass('on');
}
function shareMask() {
	$("#shareMask").show();
	$(".detail-back").addClass('detail-back-on');
}
