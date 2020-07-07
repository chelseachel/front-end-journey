// 斐波那契
// 特点：第三项等于前面两项之和
// 0、1、1、2、3、5、8、13、21、34、……

fibo[i] = fibo[i-1]+fibo[i-2];


// 生成斐波那契数组的方法
function getFibonacci(n) {  
  var fibarr = [];
  var i = 0;
  while(i < n) {
    if(i <= 1) {
      fibarr.push(i);
    }else{
      fibarr.push(fibarr[i-1] + fibarr[i-2])
    }
    i++;
  }

  return fibarr;
}
