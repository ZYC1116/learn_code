function getByClass(clsName, parent) {
  //传递id或class名称均可
  var oParent = parent ? document.getElementById(parent) : document,
    eles = [],
    elements = oParent.getElementsByTagName('*');
  for (var i = 0, l = elements.length; i < l; i++) {
    if (elements[i].className == clsName) {
      eles.push(elements[i]);
    }
  }
  return eles;
}

window.onload = drag;

function drag() {
  //在标题区域按下，在页面移动，释放鼠标时停止
  var oTitle = getByClass('login_logo_webqq', 'loginPanel')[0];
  oTitle.onmousedown = fnDown;
  //关闭
  var oClose = document.getElementById('ui_boxyClose');
  oClose.onclick = function() {
    document.getElementById('loginPanel').style.display = 'none';
  }
  var loginState = document.getElementById('loginState'),
    stateList = document.getElementById('loginStatePanel'),
    lis = stateList.getElementsByTagName('li'),
    stateText = document.getElementById('login2qq_state_txt'),
    loginStateShow = document.getElementById('loginStateShow');
  loginState.onclick = function(e) {
    e = e || window.event;
    if (e.stopPropagation) {
      e.stopPropagation();
    } else if (e.cancelBubble) {
      e.cancelBubble();
    }
    stateList.style.display = 'block';
  }
  //鼠标滑过、离开和点击状态列表
  for (var i = 0, l = lis.length; i < l; i++) {
    lis[i].onmouseover = function() {
      this.style.background = '#C9BFBF';
    }
    lis[i].onmouseout = function() {
      this.style.background = '#FFF';
    }
    lis[i].onclick = function(e) {
      e = e || window.event;
      if (e.stopPropagation) {
        e.stopPropagation();
      } else if (e.cancelBubble) {
        e.cancelBubble();
      }
      stateList.style.display = 'none';
      var id = this.id;
      stateText.innerHTML = getByClass('stateSelect_text', id)[0].innerHTML;
      loginStateShow.className = '';
      loginStateShow.className = 'login-state-show ' + id;
    }
  }
  document.onclick = function() {
    stateList.style.display = 'none';
  }
}

function fnDown(event) {
  event = event || window.event;
  var oDrag = document.getElementById('loginPanel'),
    disX = event.clientX - oDrag.offsetLeft,
    disY = event.clientY - oDrag.offsetTop;
  document.onmousemove = function(event) {
    event = event || window.event;
    fnMove(event, disX, disY);
  }
  document.onmouseup = function() {
    document.onmousemove = null;
    document.onmouseup = null;
  }
}

function fnMove(e, posX, posY) {
  var oDrag = document.getElementById('loginPanel'),
    l = e.clientX - posX,
    t = e.clientY - posY,
    winw = document.documentElement.clientWidth || document.body.clientWidth,
    winh = document.documentElement.clientHeight || document.body.clientHeight;
  maxw = winw - oDrag.offsetWidth - 10,
    maxh = winh - oDrag.offsetHeight;
  if (l < 0) {
    l = 0;
  } else if (l > maxw) {
    l = maxw;
  }
  if (t < 10) {
    t = 10;
  } else if (t > maxh) {
    t = maxh;
  }
  oDrag.style.left = l + 'px';
  oDrag.style.top = t + 'px';
}