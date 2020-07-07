window.onload = function () {
  let container = document.getElementById('container');
  let list = document.getElementById('list');
  let dots = document.getElementById('dots').getElementsByTagName('span');
  let prev = document.getElementById('arrow-left');
  let next = document.getElementById('arrow-right');
  let index = 1;
  let animated = false; //判断动画是否在执行中

  function dotOn() {
    for (let i = 0; i < dots.length; i++) {
      dots[i].className = "";
    }
    dots[index - 1].className = "on";
  }
  
  function slide(offset) {
    animated = true;
    let time = 200; //位移总时间
    let interval = 20; //位移间隔时间
    let speed = offset/(time/interval); //总位移长度除以固定的总时间，得出位移速度（即每次位移量）
    let newLeft = list.offsetLeft + offset;

    function animate() {
      list.style.left = parseInt(list.offsetLeft) + speed + 'px'; 
      if (list.offsetLeft == newLeft) {
        clearInterval(timer1);
        animated = false;
      }  
    
      if(list.offsetLeft == -4320) {
        list.style.left = -720 + 'px';
      } 
      if(list.offsetLeft == 0) {
        list.style.left = -3600 + 'px';
      }
    }
    timer1 = setInterval(animate, interval);
  }

  function play() {
    timer2 = setInterval(function() {
      next.onclick();
    },3000);
  }
  function stop() {
    clearInterval(timer2);
  }

  //点击事件
  next.onclick = function() {
    if(index == 5) {
      index = 1;
    }
    else {
      index += 1;
    }
    dotOn();
    if(!animated) {
      slide(-720);
    } //上一个动画执行完后animated为false，然后才执行下一个动画
  }
  prev.onclick = function() {
    if(index == 1) {
      index = 5;
    } else {
      index -= 1;
    }
    dotOn();
    if(!animated) {
      slide(720);
    }  
  }
  //获得left值:
  //当css样式是内联的时候，JavaScript可以获得 a.style.left、a.offsetLeft
  //当css样式是外联的时候，JavaScript无法获得 a.style.left，只能获得 a.offsetLeft
  //改变left值:
  //无法直接 a.offsetLeft ="10px"; 来改变 left，因为 JavaScript获得的offsetLeft是只读
  //用 a.style.left ="10px”; 来改变 left

  //点击按钮切换
  for (let i = 0; i < dots.length; i++) {
    dots[i].onclick = function() {
      if (this.className == "on") {
        return;
      } //优化性能：如果点击的是已选中的dot，退出此函数，不再往下执行代码
      index = i + 1;
      dotOn();
      offset = -720*index - list.offsetLeft;
      if(!animated) {
        slide(offset);
      }
    }
  }

  //鼠标移入/移出
  container.onmouseover = "stop()";
  container.onmouseout = "play()";

  play();
}
