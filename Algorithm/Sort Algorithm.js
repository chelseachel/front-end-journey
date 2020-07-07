//冒泡排序：从头开始两两比较相邻两个数字，只要左边比右边大就将他们交换，这样比一轮，最大的会在队尾；对未排序元素进行下一轮冒泡排序
function bubbleSort(arr) {
  let i, j, temp
  for (i = 0; i < arr.length - 1; i++) {
    for(j = 0; j < arr.length - 1 - i; j++) {  // - i 得到未排序元素的长度
      if (arr[j] > arr[j + 1]) {
        temp = arr[j]
        arr[j] = arr[j+1]
        arr[j + 1] = temp
      }
    }
  }
  return arr // 记得返回该数组
} 
bubbleSort(arr)

// 封装到原型
Array.prototype.bubble_sort = function() {
  var i, j, temp
  for (i = 0; i < this.length - 1; i++)
    for (j = 0; j < this.length - 1 - i; j++)
      if (this[j] > this[j + 1]) {
        temp = this[j]
        this[j] = this[j + 1]
        this[j + 1] = temp
      }
  return this
}
var num = [22, 34, 3, 32, 82, 55, 89, 50, 37, 5, 64, 35, 9, 70]
num.bubble_sort()


// 选择排序：每次在未排序元素中找到最小（大）元素，存放到排序序列的起始位置，直到所有元素均排序完毕。
function selectionSort(arr) {
  let i, j, minIndex, temp
  for (i = 0; i < arr.length - 1; i++) {
    minIndex = i
    for (j = i + 1; j < arr.length; j++) {
      if (arr[minIndex] > arr[j]) {
        minIndex = j
        console.log(arr[minIndex])
      }
    }
    temp = arr[i]
    arr[i] = arr[minIndex]
    arr[minIndex] = temp
  }
  return arr
}
selectionSort([22, 34, 3, 32, 5])

function selectSort(arr){
    var len=arr.length;
    var minIndex,temp;
    for(i=0;i<len-1;i++){
        minIndex=i;
        for(j=i+1;j<len;j++){
            if(arr[j]<arr[minIndex]){
                minIndex=j;
            }
        }
    temp=arr[i];
    arr[i]=arr[minIndex];
    arr[minIndex]=temp;
    }
    console.timeEnd('选择排序耗时');
    return arr;
}
selectSort(example)

// 原型
Array.prototype.selection_sort = function() {
  let min
  for (let i = 0; i < this.length - 1; i++) {
    min = i
    for (let j = i + 1; j < this.length; j++) {
      if (this[min] > this[j]) {
        min = j
      }
    }
    // swap two value without temp variable
    if (min !== i) {
      this[min] = this[min] ^ this[i]
      this[i] = this[min] ^ this[i]
      this[min] = this[min] ^ this[i]
    }
  }
  return this
}

// 对于未排序数据，在已排序序列中从后向前扫描，找到相应位置并插入。
// （和打扑克牌时，从牌桌上逐一拿起扑克牌，在手上排序的过程相同。）
function InsertionSort(arr) {
  for (i = 1; i < arr.length; i ++) {
    let i, key
    key = arr[i]
    while (i >= 1 && arr[i - 1] > key) { // 向前扫描
      arr[i] = arr[i - 1]
      i--
    }
    arr[i] = key
  }
}
InsertionSort([22, 34, 3, 32, 5])



// 快速排序
var quickSort = function(arr) {
  if (arr.length <= 1) { return arr }
  const pivot = arr[0] // 设定基准
  const left = [], 
        right = []
  for (let i = 1; i < arr.length; i++) {
    if (arr[i] < pivot) {
      left.push(arr[i])
    } else {
      right.push(arr[i])
    }
  }
  return quickSort(left).concat(pivot, quickSort(right)) // 递归
}


// ES6
const quickSort = (x, ...xs) => {
  if (xs.length === 0) return [x]

  const sortAgain = fn => arr => { // 传一个 fn 函数判断元素比基数大还是小
    const res = arr.filter(fn)
    return res.length > 0 ? quickSort(...res) : []
  }

  [...sortAgain(v => v < x)(xs), x, ...sortAgain(v => v > x)(xs)]
}
const arr = [7, 2, 6, 1, 2, 8, 4, 9, 0, 9, 7, 5, 4, 2]
const ascendArr = quickSort(...arr)


// 原型
Array.prototype.quickSort = function() {
  const l = this.length
  if (l < 2) return this
  const basic = this[0], // 设定基准
  const left = [], 
        right = []
  for (let i = 1; i < l; i++) {
    this[i] > basic && right.push(this[i])
    this[i] < basic && left.push(this[i])
  }
  return [...left.quickSort(), basic, ...right.quickSort()] // 递归
}
const arr = [5, 3, 7, 4, 1, 9, 8, 6, 2];
const ascendArr = arr.quickSort()
