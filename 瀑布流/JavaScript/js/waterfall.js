window.onload = function(){
    waterfall('main', 'box');
    //后台传过来的数据
    var dataInt = {"data": [{"src": '0.jpg'}, {"src": '1.jpg'}, {"src": '2.jpg'}, {"src": '3.jpg'}]};
    window.onscroll = function(){
        if(checkScrollSlide()){
            var oParent = document.getElementById('main');
            //将数据块渲染到当前页面的尾部
            for(var i = 0; i < dataInt.data.length; i++){
                var oBox = document.createElement('div');
                oBox.className = 'box';
                oParent.appendChild(oBox);
                var oPic = document.createElement('div');
                oPic.className = 'pic';
                oBox.appendChild(oPic);
                var oImg = document.createElement('img');
                oImg.src = 'images/' + dataInt.data[i].src;
                oPic.appendChild(oImg);
            }
            waterfall('main', 'box');
        }
    }
}

function getByClass(parent, clsName){
    var result = [];
    var oElements = parent.getElementsByTagName('*');
    for(var i = 0; i < oElements.length; i++){
        if(oElements[i].className == clsName){
            result.push(oElements[i]);
        }
    }
    return result;
}

function waterfall(parent, box){
    //将main下的所有class="box"取出来
    var oParent = document.getElementById(parent);
    var oBoxs = getByClass(oParent, box);
    //计算整个界面显示的列数（页面宽/box的宽）
    var oBoxW = oBoxs[0].offsetWidth;
    var cols = Math.floor(document.documentElement.clientWidth/oBoxW);
    //设置main的宽
    oParent.style.cssText = 'width:' + oBoxW*cols + 'px; margin:0 auto';

    //图片排序
    var h = [];
    for(var i = 0; i < oBoxs.length; i++){
        if(i<cols){
            h.push(oBoxs[i].offsetHeight);
        }else{
            var minH = Math.min.apply(null, h);
            var index = getMinHIndex(h, minH);
            oBoxs[i].style.position = 'absolute';
            oBoxs[i].style.top = minH + 'px';
            oBoxs[i].style.left = oBoxW*index + 'px';
            //oBoxs[i].style.left = oBoxs[index].offsetLeft + 'px';
            h[index] += oBoxs[i].offsetHeight;
        }
    }
}

function getMinHIndex(arr, val){
    for(var i = 0; i< arr.length; i++){
        if(arr[i] === val){
            return i;
        }
    }
}

//检测是否具备滚动条加载数据的条件
function checkScrollSlide(){
    var oParent = document.getElementById('main');
    var oBoxs = getByClass(oParent, 'box');
    var lastBoxH = oBoxs[oBoxs.length - 1].offsetTop + Math.floor(oBoxs[oBoxs.length-1].offsetHeight/2);
    var scrollTop = document.body.scrollTop || document.documentElement.scrollTop;
    var height = document.body.clientHeight || document.documentElement.clientHeight;
    return lastBoxH < (scrollTop+height) ? true : false;
}