import Mock from 'mockjs'
// 这是一个获取URL参数的方法
import { getParams } from './utils'


// 在这里编写你的逻辑代码
Mock.mock(RegExp('/list' + '.*'), function(options) {
  let num = getParams(options.url, 'num')
  return Mock.mock({
    [`users|${num}`]: [{
      'name': '@cname',
      'city': '@city',
      'image': '@image',
      'tid|+1': 1,
      'title': '@title',
      'catalog': 'index',
      'fav': '@natural(10,1000)',
      'created': '@datetime',
      'isEnd': '@boolean',
      'answer': '@natural(0,100)',
      'user': {
        'avatar': '@image',
        'name': '@cname',
        'isVip': '@boolean',
        'level|1-10': 0
      }
    }]
  })
})

