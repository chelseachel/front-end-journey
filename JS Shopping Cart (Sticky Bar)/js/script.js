window.onload = function() {
  window.onscroll = function() {
    foot.className = 'foot'; // 滚动时弹出层自动隐藏
  }
  

  var cartTable = document.getElementById('cartTable');
  var tr = cartTable.children[1].rows;
  var checkInputs = document.getElementsByClassName('check');
  var checkAllInputs = document.getElementsByClassName('check-all');
  var selectedTotal = document.getElementById('selectedTotal');
  var priceTotal = document.getElementById('priceTotal');
  var selected = document.getElementById('selected');
  var foot = document.getElementById('foot');
  var selectedViewList = document.getElementById('selectedViewList');
  var deleteAll = document.getElementById('deleteAll');

  // 更新总数和总价格，
  function getTotal() {
    var selectedNum = 0;
    var price = 0;
    var htmlStr = '';
    for (var i = 0; i < tr.length; i++) {
      if (tr[i].getElementsByTagName('input')[0].checked) {
        selectedNum += parseInt(tr[i].getElementsByTagName('input')[1].value);
        price += parseFloat(tr[i].cells[4].innerHTML);
        htmlStr += '<div><div><img src="' + tr[i].getElementsByTagName('img')[0].src + '"><span class="del" index="'+i+'">取消选择</span></div></div>'; // 更新已选商品列表容器的图片等html元素
      }
    }
    selectedTotal.innerHTML = selectedNum; //已选件数
    priceTotal.innerHTML = price.toFixed(2); //总价
    selectedViewList.innerHTML = htmlStr; // 添加图片的html元素到弹出层已选商品列表容器
    if (selectedNum == 0) {
      foot.className = 'foot'; //已选件数变为0时弹出层隐藏
    }
  } 
  // 点击选择框
  for (var i = 0; i < checkInputs.length; i++) {
    checkInputs[i].onclick = function () {
      if (this.className === 'check-all check') { //点击全选
        for (var j = 0; j < checkInputs.length; j++) {
          checkInputs[j].checked = this.checked;
        }
      }
      if (!this.checked) { //如果有一个未勾选，则取消全选框的选中状态
        for (var k = 0; k < checkAllInputs.length; k++) {
          checkAllInputs[k].checked = false;
        }
      }
      getTotal();
    }
  }
  // 已选商品浮层
  selected.onclick = function() {
    if (foot.className == 'foot') {
      if(selectedTotal.innerHTML != 0) {
        foot.className = 'foot show';
      }   
    } else {
      foot.className = 'foot';
    }
  }
  // 事件代理：取消选择浮层商品，代理到父元素electedViewList上
  selectedViewList.onclick = function (e) {
    console.log(e);
    var el = e.target;
    if(el.className =='del') {
      var index = el.getAttribute('index');
      var input = tr[index].getElementsByTagName('input')[0];
      input.checked = false;
      input.onclick();
    }
  }

  // 增减数量、单列删除（事件代理）
  for (var i = 0; i < tr.length; i++) {
    tr[i].onclick = function(e) {
      var el = e.target;
      var countInput = this.getElementsByClassName('count-input')[0];
      var val = parseInt(countInput.value);
      var minus = this.getElementsByClassName('minus')[0];
      switch (el.className) {
        case 'add':
          countInput.value ++;
          minus.className = 'minus reduce';
          break;
        case 'minus reduce':
          if (val > 2) {
            countInput.value --;  
          } 
          else if (val = 2) {
            countInput.value --;
            minus.className = 'minus no-reduce';
          }
          break;
        case 'delete':
          var conf = confirm("确定要删除该宝贝吗？");
          if (conf) {
            this.parentNode.removeChild(this);
          } 
          break;
        default:
          break;
      }
      //保证count是数值，而不包含其他字符串比如“2aaa”：
      val = parseInt(countInput.value);
      countInput.value = val;
      //如果count值为NaN，则设其值为1：
      if (isNaN(val) || val < 1) {
        val = 1
        countInput.value = val;
      }
      //小计
      var price = parseFloat(this.cells[2].innerHTML);
      var count = parseInt(countInput.value);
      var subTotal = parseFloat(price * count).toFixed(2);
      this.cells[4].innerHTML = subTotal;
      //总计
      getTotal();
    }
  }
  //已勾选项统一删除
  deleteAll.onclick = function () {
    if (selectedTotal.innerHTML != 0) {
      var conf = confirm("确定要删除该宝贝吗？");
      if (conf) {
        for (var i = 0; i < tr.length; i++) {
          var input = tr[i].getElementsByTagName('input')[0];
          if(input.checked) {
            tr[i].parentNode.removeChild(tr[i]);
            i--;
          }
        }
      } 
    }
  }
  //页面打开时默认全选
  checkAllInputs[0].checked = true;
  checkAllInputs[0].onclick();

}
