// 动态生成banner高度
function bannerHeight(){
    var banner = document.getElementById("banner");
    var li = document.getElementById("list").getElementsByTagName("li")[0];
    var liLen = window.getComputedStyle(li,null).getPropertyValue("height");
    banner.style.height = liLen;
}
window.onload = bannerHeight();
// 判断obj是否有此class
function hasClass(obj,cls){
    return obj.className.match(new RegExp('(\\s|^)' + cls + '(\\s|$)'));
}
// 给obj添加class
function addClass(obj,cls){
    if(!this.hasClass(obj,cls)){
        obj.className += cls;
    }
}
// 移除obj对应的class
function removeClass(obj,cls){
    if(hasClass(obj,cls)){
        var reg = new RegExp('(\\s|^)' + cls + '(\\s|$)');
        obj.className = obj.className.replace(reg,'');
    }
}
function setOpacity(elem,level){
        elem.style.opacity = level / 100;
}
// 淡入处理函数
function fadeIn(curImg, tarImg){
    curImg.style.opacity = '0';
    tarImg.style.opacity = '1';
}
//淡出处理函数
// function fadeOut(elem){
//     for(var i = 0; i <= 20; i++){
//         (function(){
//             var level = 100 - i * 5;
//             setTimeout(function(){
//                 setOpacity(elem,level);
//             },i * 25);
//         })(i);
//     }
// }
// 变换处理函数
function changeTo(num){
    var curImg = document.getElementsByClassName("show")[0];
    //fadeOut(curImg);
    removeClass(curImg, "show");
    addClass(imgArr[num],"show");
    fadeIn(curImg, imgArr[num]);
    var _curIndex = document.getElementsByClassName("active")[0];
    removeClass(_curIndex, "active");
    addClass(indexArr[num], "active");
}
// index添加事件处理
function addEvent(){
    for(var i = 0; i < imgLen; i++){
        (function(_i){
            indexArr[_i].onmousedown = function(){
                clearTimeout(autoChange);
                changeTo(_i);
                curIndex = _i;
            };
            // indexArr[_i].onmouseout = function(){
            //     autoChange = setInterval(function(){
            //         if(curIndex < imgLen - 1){
            //             curIndex++;
            //         }else{
            //             curIndex = 0;
            //         }
            //         changeTo(curIndex);
            //     },5000);
            // };
        })(i);
    }
}
// 悬停暂停
function stop(){
    clearInterval(autoChange);
}
var curIndex = 0;
var banner = document.getElementById("banner");
var imgArr = document.getElementById("list").getElementsByTagName("li");
var imgLen = imgArr.length;
var indexArr = document.getElementById("pointer").getElementsByTagName("li");

var autoChange = setInterval(function(){
    if(curIndex < imgLen - 1){
        curIndex++;
    }else{
        curIndex = 0;
    }
    changeTo(curIndex);
},5000);
addEvent();
banner.addEventListener('mouseover', stop, false);
banner.addEventListener('mouseout', function(){
    autoChange = setInterval(function(){
        if(curIndex < imgLen - 1){
            curIndex++;
        }else{
            curIndex = 0;
        }
        changeTo(curIndex);
    },5000);
}, false);
