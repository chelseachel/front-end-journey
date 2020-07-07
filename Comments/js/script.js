window.onload = function() {
  let list = document.getElementById('list');
  let lis = list.children; 
  let timer;

  //删除节点
  function removeNode (node) {
    node.parentNode.removeChild(node);
  }

  //赞分享
  function praiseBox (box, el) {
    let praiseElement = box.getElementsByClassName('praises-total')[0];
    let oldTotal = parseInt(praiseElement.getAttribute('total'));
    let newTotal;
    if (el.className == 'praise') {
      el.className = 'praise on';
      newTotal = oldTotal + 1;
      praiseElement.innerHTML = (newTotal == 1) ? '我觉得很赞' : '我和' + oldTotal + '个人觉得很赞';  
    }
    else {
      el.className = 'praise';
      newTotal = oldTotal - 1;
      praiseElement.innerHTML = (newTotal == 0) ? '' : newTotal + '个人觉得很赞';   
    }
    praiseElement.setAttribute('total', newTotal);
    praiseElement.style.display = (newTotal == 0) ? 'none' : 'block';
  }

  //发表回复
  function replyBox (box) {
    let textarea = box.getElementsByClassName('comment')[0];
    let list = box.getElementsByClassName('comment-list')[0];
    let li = document.createElement('li');
    li.className = 'comment-box clearfix';
    li.setAttribute('user','self');
    let html = '<img class="myhead" src="images/my.jpg" alt="" />' + 
                        '<div class="comment-content">' + 
                            '<p class="comment-text"><span class="user">我：</span>' + textarea.value + '</p>' + 
                            '<p class="comment-time">' + 
                                getTime() + 
                                '<a href="javascript:;" class="comment-praise" total="0" my="0"></a>' + 
                                '<a href="javascript:;" class="comment-operate">删除</a>' + 
                            '</p>' + 
                        '</div>'
    li.innerHTML = html;
    list.appendChild(li);
    textarea.value = ''; 
    textarea.onblur();                   
  }
  //获取日期/时间
  function getTime () {
    let t  = new Date();
    let year = t.getFullYear();
    let month = t.getMonth() + 1;
    let day = t.getDate();
    let h = t.getHours();
    let m = t.getMinutes();
    month = checkTime(month);
    day = checkTime(day);
    m = checkTime(m);
    h = checkTime(h);
    function checkTime(i) {
      i = (i < 10) ? '0' + i : i;
      return i;
    }
    return year + '-' + month + '-' + day + '' + h + ':' + m;
  }

  //赞回复
  function commentPraise (el) {
    let oldTotal = parseInt(el.getAttribute('total'));
    let my = parseInt(el.getAttribute('my'));
    let newTotal;
    //根据my的值来变更样式，另可通过css的on来变更样式：
    if (my == 0) {
      newTotal = oldTotal + 1;
      el.setAttribute('total', newTotal);
      el.setAttribute('my', 1);
      el.innerHTML = newTotal;
      el.style.background = 'url("images/bg3.jpg") no-repeat';//这样操作为修改内联样式，注意图片的路径
    } else {
      newTotal = oldTotal - 1;
      el.setAttribute('total', newTotal);
      el.setAttribute('my', 0);
      el.innerHTML = (newTotal == 0) ? '' : newTotal;
      el.style.background = 'url("images/bg2.jpg") no-repeat';
    }
    el.style.display = (newTotal == 0) ? '' : 'block'; //赞数不为0时，始终显示（display: block;）
  }

  //操作回复（或删除回复）
  function commentOperate (el) {
    let commentBox = el.parentNode.parentNode.parentNode;
    let box = commentBox.parentNode.parentNode.parentNode;
    let textarea = box.getElementsByClassName('comment')[0];
    let user = commentBox.getElementsByClassName('user')[0];
    let txt = el.innerHTML;
    if (txt == '回复') {
      textarea.onfocus();
      textarea.value = '回复' + user.innerHTML;
      textarea.onkeyup();
      textarea.focus();//让文本框获得焦点
    } else {
      //txt == '删除'时
      removeNode(commentBox);
    }
  }


  //事件代理到每条分享的li上
  for (let i = 0; i < lis.length; i++) {
    lis[i].onclick = function (e) {
      e = e || window.event; //浏览器兼容
      let el = e.srcElement || e.target;
      switch (el.className) {
        //关闭
        case 'close': 
          removeNode(el.parentNode);
          break;
        //赞分享
        case 'praise':
          praiseBox(el.parentNode.parentNode.parentNode, el);
          break;
        //赞分享取消
        case 'praise on':
          praiseBox(el.parentNode.parentNode.parentNode, el);
          break;
        //回复按钮灰色
        case 'btn btn-off':
          clearTimeout(timer);
          break;
        //回复按钮蓝色
        case 'btn':
          replyBox(el.parentNode.parentNode.parentNode);
          break;
        //赞回复
        case 'comment-praise':
          commentPraise(el);
          break;
        //操作回复
        case 'comment-operate':
          commentOperate(el);
          break;
      }
    }

    //输入框
    let textarea = lis[i].getElementsByClassName('comment')[0];
    textarea.onfocus = function () {
      this.parentNode.className = 'text-box text-box-on';
      this.value = (this.value == '评论') ? '' : this.value;
      this.onkeyup(); //初次点击输入框时文字为空，此时要将btn的style也设置为'btn-off'
    }
    textarea.onblur = function () {
      if (this.value == '') {
        let me = this;
        timer = setTimeout(function() {
          me.parentNode.className = 'text-box';
          me.value = '评论';
        },100); //这样当点击回复按钮时，可以清除定时器
  
      }
    }
    textarea.onkeyup = function (e) {
      let length = this.value.length;
      let btn = textarea.nextElementSibling;
      let word = btn.nextElementSibling;
      console.log(textarea.children);
      if (length == 0 || length > 140) {
        btn.className = 'btn btn-off';
      } else {
        btn.className = 'btn';
      }
      word.innerHTML = length + '/140';
    }
  }
}
