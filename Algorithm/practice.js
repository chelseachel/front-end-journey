// Q：给定一个整数无序数组和变量 sum，如果存在数组中任意两项和使等于 sum 的值，则返回true。
//   否则, 返回false。例如，数组[3, 5, 1, 4]和 sum = 9，函数应该返回true，因为4 + 5 = 9。
// 思路：遍历数组，创建Set保存相对差值
function findSum(arr, val) => {
    let searchVals = new Set();
    searchVals.add(val - arr[0]);
    for (let i = 1; i < arr.length; i++) {
        let searchVal = val - arr[i];
        if (searchVals.has(arr[i])) { // 理清：如果 searchVals 新增的值对应了前面的数组元素值，那前面的值的反面也就等于当前的这个数组元素值了
            return true;
        } else {
            searchVals.add(searchVal);
        }
    };
    return false;
};

// 数组去重
// 传统方式
function unique1(arr) {
  const res = []
  arr.forEach(item => {
    if (res.indexOf(item) = -1) {
      res.push(item)
    }
  })
  return res
}

// ES6 set对象，无序结构，不能重复 
function unique(arr) {
  const set = new Set(arr) //{10, 20, 30, 40}
  return [...set] // Array.from(set)
}

unique([30, 10, 20, 30, 40])


// 字符串反转
function reverse(str) {
  return str.split('').reverse().join('')
}

// 统计一个字符串出现最多的字母
function findMaxDuplicateChar(str) {
  let charObj = {}
  for(let i = 0; i < str.length; i++) {
    if (!charObj[str.charAt(i)]) {
      charObj[str.charAt(i)] = 1
    } else {
      charObj[str.charAt(i)] += 1
    }
  }
  let max = 0, 
      maxChar = ''
  for (let key in charObj) {
    if (charObj[key] > max) {
      max = charObj[key]
      maxChar = key
    }
  }
  return maxChar
}

// 随机生成制定长度的字符串
function randomString(n) {
  const chars ='abcdefghijklmnopqrstuvwxyz'
  const len = chars.length
  let randomStr = ''
  for (let i = 0; i < n ; i++) {
    let char = chars.charAt(Math.floor(Math.random() * len))
    randomStr += char
  }
  return randomStr
}

// 正数组的最大差值
function maxDiff(arr) {
  let max = Math.max(...arr) // Math.max.apply(null, arr)
  let min = Math.min(...arr)
  return max - min
}

// 最长公共子串
function find(str1, str2) {
  let temp = new Array()
  let max = 0, index = null
  for (let i = 0; i < str1.length; i++) {
    temp[i] = new Array() // 定义 temp 为二维数组
    for (let j = 0; j < str2.length; j++) {
      if (str1[i] === str2[j]) {
        if(i > 0 && j > 0 && temp[i-1][j-1]) {
          temp[i][j] = temp[i-1][j-1] + 1
        } else {
          temp[i][j] = 1
        }
        if (temp[i][j] >= max) {
          max = temp[i][j]
          index = i
        }
      } else {
        temp[i][j] = 0
      }
    }
  }
  return str1.substr(index - max + 1, max)
}






















