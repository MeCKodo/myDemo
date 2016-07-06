/**
 * Created by kodoo on 2016/2/11.
 */

var dateBoxWith = $("#date").width();
var dateBox = $('#dateBox');

var NOWMONTH = 7;  //当前月份
var BEGINMONTH = 5; //开始月份
var ENDMONTH = 2;   //结束月份
var MOUTHARR = [];  //月份数组

var nowX = null;  //当前点击的位置
var ulIndex = null;  //当前ul的月份 用作之后在数组里获取index
var halfFlag = null; //1 left 2 right

function getDayArr(year,month){
    var recentArr = [];
    var recentFirstDay = new Date(year,month-1,1).getDay();
    var recentMonthDate = new Date(year,month,0).getDate();
    //console.log(year,month);
    var lastMonth = new Date(year,month-1,0).getDate();
    if(recentFirstDay == 0) {
        var temp = 7;
    } else {
        var temp = recentFirstDay;
    }
    recentArr.push(year);
    for(var i = temp ; i > 1; i--) {
        recentArr.push(lastMonth - i + 2 + 'c');
    }
    for(var i = 1 ; i <= recentMonthDate ; i++) {
        recentArr.push(i);
    }
    if((recentFirstDay + recentMonthDate - 1) % 7 != 0){
        for(var i = 0 ; i <(7-(recentFirstDay + recentMonthDate - 1) % 7) ; i++) {
            recentArr.push(i + 1 + 'c');
        }
    }
    recentArr.push(month);
    return recentArr;
}
function getDayObj(year,month) {
    var lastYear = new Date(year,month-2,1).getFullYear();
    var lastMonth = new Date(year,month-2,1).getMonth()+1;
    var lastArray = getDayArr(lastYear,lastMonth);
    //console.log(lastArray);

    var recentArray = getDayArr(year,month);
    //console.log(recentArray);

    var nextYear =  new Date(year,month,1).getFullYear();
    var nextMonth = new Date(year,month,1).getMonth()+1;
    var nextArray = getDayArr(nextYear,nextMonth);
    //console.log(nextArray);

    return {
        before : lastArray,
        now : recentArray,
        after : nextArray
    }
}

function initDate() {
    initMouthArr();
    var uls = $("#dateBox ul");
    var index = MOUTHARR.indexOf(NOWMONTH);

    if(NOWMONTH == BEGINMONTH) { //当前时间等于开始时间
        var datesObj = getDayObj(new Date().getFullYear(),NOWMONTH + 1);
    } else if(NOWMONTH == ENDMONTH) { //当前时间等于结束时间
        var datesObj = getDayObj(new Date().getFullYear(),NOWMONTH - 1);
        dateBox.css('-webkit-transform','translate3d('+ 9 * -dateBoxWith +'px,0,0)');
    } else { //当前时间都不等的情况
        var datesObj = getDayObj(new Date().getFullYear(),NOWMONTH);
        dateBox.css('-webkit-transform','translate3d('+ index * -dateBoxWith +'px,0,0)');
    }

    uls.eq(0).data("year", datesObj.before.shift());
    uls.eq(0).data("month", datesObj.before.pop());
    $.each(datesObj.before, function (index, item) {
        setColor(0,item);
    });

    uls.eq(1).data("year", datesObj.now.shift());
    uls.eq(1).data("month", datesObj.now.pop());
    $.each(datesObj.now, function (index, item) {
        setColor(1,item);
    });

    uls.eq(2).data("year", datesObj.after.shift());
    uls.eq(2).data("month", datesObj.after.pop());
    $.each(datesObj.after, function (index, item) {
        setColor(2,item);
    });

    function setColor(index,item) {
        if(String(item).indexOf('c') > 0) {
            uls.eq(index).append('<li class="other">'+ String(item).replace('c', '') +'</li>');
            return;
        }
        uls.eq(index).append('<li>'+ item +'</li>')
    }

    swiperEndHeight();
    initUlPosition();
}
initDate();

function initUlPosition() {
    $.each($("#dateBox ul"), function (index, item) {
        var idx = MOUTHARR.indexOf($(item).data("month"));
        $(item).css('-webkit-transform','translate3d('+ idx * dateBoxWith +'px,0,0)');
    });
}
function initMouthArr() {
    var month = BEGINMONTH;
    for(var i = 0;i < 10; i++) {
        if(month == 13) { month = 1; }
        MOUTHARR.push(month);
        month++;
    }
}
function createUlDate(arr) {
    var ul = $("<ul></ul>");

    ul.data("year", arr.shift());
    ul.data("month", arr.pop());
    var index = MOUTHARR.indexOf(ul.data("month"));
    ul.css('-webkit-transform', 'translate3d('+ dateBoxWith * index +'px,0,0)');
    $.each(arr,function(index,item) {
        if(String(item).indexOf('c') > 0) {
            ul.append('<li class="other">'+ String(item).replace('c', '') +'</li>');
            return;
        }
        ul.append('<li>'+ item +'</li>')
    });
    return ul;
}
function appendUlDate(arr) {
    var ul = createUlDate(arr);
    dateBox.append(ul);
}
function beforeUlDate(arr) {
    var ul = createUlDate(arr);
    dateBox.prepend(ul);
}



dateBox.on('touchstart','ul', function () {
    ulIndex = $(this).data("month");
});
dateBox.on('touchstart',function() {
    var reg=/\-?[0-9]+/g;
    nowX = parseInt(getComputedStyle(dateBox[0],null).webkitTransform.match(reg)[4]);
    dateBox.removeClass("trans");
});
function swiperEndHeight() {
    var reg = /\-?[0-9]+/g;
    var arr = [];
    var x = null;
    setTimeout(function () {
        x = parseInt(getComputedStyle(dateBox[0],null).webkitTransform.match(reg)[4]);
        $.each($("#dateBox ul"), function (index, item) {
            arr.push(parseInt($(item).css("-webkit-transform").split(",")[0].substring(12)));
        });
        initContainerHeight(arr.indexOf(-x));
        if(arr.indexOf(-x) != -1)
            initYearMonth(arr.indexOf(-x));
    }, 450);
    function initContainerHeight(index) {
        var h = $("#dateBox ul").eq(index).height();
        $("#date,#dateBox").height(h);
    }

    function initYearMonth(index) {
        var ul = $("#dateBox ul").eq(index);
        console.log(index);
        console.log(ul);
        var MONTH = ['Jan.','Feb.','Mar.','Apr.','May','Jun.','Jul.','Aug.','Sep.','Oct.','Nov.','Dec.'];
        $("#year").html(ul.data("year")+'年');
        $("#month").html('<i>'+ MONTH[ul.data("month") - 1] +'</i>/'+ ul.data("month") +'月');
    }
}
$("body").on("touchend", function () {
    if (halfFlag)
        dateBox.addClass("trans").css('-webkit-transform','translate3d('+ nowX +'px,0,0)');
});
etouch("#dateBox", function(e) {
}).on('swiper',function(e,obj) {
    if(ulIndex == MOUTHARR[0]) { //当前月等于开始月
        if(Math.abs(obj.distanceX) > dateBoxWith / 3 ) {
            if(obj.distanceX < 0) { //左滑
                halfFlag = 1;
            }
        }
    } else if (ulIndex == MOUTHARR[MOUTHARR.length - 1]) { //当前月等于结束月
        if(Math.abs(obj.distanceX) > dateBoxWith / 3 ) {
            if(obj.distanceX > 0) { //右滑
                halfFlag = 2;
            }
        }
    } else {
        //这里有个交互的小bug，不太影响
        if(Math.abs(obj.distanceX) > dateBoxWith / 3 ) {
            if(obj.distanceX < 0) { //左滑
                halfFlag = 1;
            } else {
                halfFlag = 2;
            }
        }
    }
    dateBox.css('-webkit-transform','translate3d('+ (nowX + obj.distanceX) +'px,0,0)');
    $("#log").html(nowX + obj.distanceX);

}).on('left',function() {
    var index;
    dateBox.addClass("trans");
    if(ulIndex == MOUTHARR[MOUTHARR.length - 1]) { //最后一个月
        dateBox.css('-webkit-transform','translate3d('+ -dateBoxWith * 9 +'px,0,0)');
        return;
    }
    if(halfFlag == 1) {
        leftAppend(function () {
            index = MOUTHARR.indexOf(ulIndex);
            dateBox.css('-webkit-transform','translate3d('+ -dateBoxWith * (index + 1) +'px,0,0)');
        });
    } else {
        index = MOUTHARR.indexOf(ulIndex);
        dateBox.css('-webkit-transform','translate3d('+ -dateBoxWith * index +'px,0,0)');
    }
    swiperEndHeight();
    halfFlag = null;
}).on('right',function() {
    dateBox.addClass("trans");
    if(ulIndex == MOUTHARR[0]) { //等于开始月情况
        dateBox.css('-webkit-transform','translate3d(0,0,0)');
        return;
    }
    if(halfFlag == 2) {
        rightAppend(function() {
            dateBox.css('-webkit-transform','translate3d('+ (dateBoxWith + nowX) +'px,0,0)');
        });
    } else {
        dateBox.css('-webkit-transform','translate3d('+ nowX +'px,0,0)');
    }
    swiperEndHeight();
    halfFlag = null;
});

function checkMonth() {
    var arr = [];
    $.each($("#dateBox ul"), function (index, item) {
        arr.push($(item).data("month"));
    });
    return arr.toString() != MOUTHARR.toString();
}

function leftAppend(callback) {
    var uls = $("#dateBox ul");
    if(checkMonth() && uls.last().data("month") != MOUTHARR[MOUTHARR.length - 1]) { //左滑没有append完
        var needMonth = new Date(uls.last().data("year"),uls.last().data("month")).getMonth() + 1;
        var needYear = new Date(uls.last().data("year"),uls.last().data("month")).getFullYear();
        var monthObj = getDayObj(needYear,needMonth);

        appendUlDate(monthObj.now);
    }
    callback && callback();
}
function rightAppend(callback) {
    var uls = $("#dateBox ul");
    if(checkMonth() && uls.first().data("month") != MOUTHARR[0]) {//月份都append完了
        var needMonth = new Date(uls.first().data("year"),uls.first().data("month") - 2).getMonth() + 1;
        var needYear = new Date(uls.first().data("year"),uls.first().data("month") - 2).getFullYear();
        var monthObj = getDayObj(needYear,needMonth);

        beforeUlDate(monthObj.now);
    }
    callback && callback();
}

