// 并集
export function unionFn(a = [], b = []) {
  let arr = a.concat(b)
  let result = arr.filter(
    (item, index) => arr.findIndex((it) => it.id === item.id) == index
  )
  return result
}

// 差集
export function minusFn(a = [], b = []) {
  let result = a.filter((aItem) => b.every((bItem) => aItem.id !== bItem.id))
  return [...result]
}

// 校验
export function isValid(variable) {
  // 检查变量不是空数组
  if (Array.isArray(variable) && variable.length > 0) {
    return true
  }
  // 检查变量不是空对象
  if (typeof variable === 'object' && Object.keys(variable).length > 0) {
    return true
  }
  return false
}

// 防抖
export const debounce = (func, wait = 16, immediate = false) => {
  let timeout, args, context, timestamp, result
  const later = function () {
    const last = +new Date() - timestamp
    if (last < wait && last > 0) {
      timeout = setTimeout(later, wait - last)
    } else {
      timeout = null
      if (!immediate) {
        result = func.apply(context, args)
        if (!timeout) context = args = null
      }
    }
  }
  return function () {
    context = this
    args = arguments
    timestamp = +new Date()
    const callNow = immediate && !timeout
    if (!timeout) timeout = setTimeout(later, wait)
    if (callNow) {
      result = func.apply(context, args)
      context = args = null
    }
    return result
  }
}

// 节流
export function throttle(callback, delay) {
  let timerId
  return function () {
    // 如果定时器已经设置，则直接返回，不执行回调函数
    if (timerId) return
    const context = this
    const args = arguments
    // 设置定时器，在指定延迟后执行回调函数
    timerId = setTimeout(() => {
      callback.apply(context, args)
      // 清除定时器
      timerId = null
    }, delay)
  }
}

// 计算日期差
export function dateDiff(date1, date2) {
  // 将日期字符串转换为 Date 对象
  const d1 = new Date(date1)
  const d2 = new Date(date2)
  // 校验
  if (isNaN(d1.getTime()) || isNaN(d2.getTime())) {
    return 0
  }
  // 计算
  const diff = Math.abs(d1.getTime() - d2.getTime())
  // 转换
  const daysDiff = Math.ceil(diff / (1000 * 60 * 60 * 24)) + 1
  return daysDiff
}

// 复制文本
export function copyText(text) {
  const textField = document.createElement('textarea')
  textField.innerText = text
  document.body.appendChild(textField)
  textField.select()
  document.execCommand('copy')
  document.body.removeChild(textField)
}

import { add } from './decimal'
// 表格合计
export const getMoneySummaries = (
  param,
  sumProps,
  needDecimal = false,
  needFormatNumber
) => {
  const { columns, data } = param
  const sums = []
  columns.forEach((column, index) => {
    if (index === 0) {
      sums[index] = '合计'
      return
    }
    const item = sumProps.find((item) => item.prop === column.property)
    if (item && item.prop) {
      const values = data.map((item) => Number(item[column.property]))
      sums[index] = values.reduce((prev, curr) => {
        const value = Number(curr)
        if (!isNaN(value)) {
          if (needDecimal) {
            return add(prev, curr)
          } else {
            return prev + curr
          }
        } else {
          return prev
        }
      }, 0)
      const money = Number(sums[index].toFixed(2) || 0)
      const formatMoney = needFormatNumber ? formatNumber(money) : money
      sums[index] = formatMoney + ' ' + (item.unit ? item.unit : '')
    } else {
      sums[index] = ' '
    }
  })
  return sums
}
// 千分位，逗号分隔
export const formatNumber = (num) => {
  return num?.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
}
// 获取ip和端口
export const getOrigin = () => {
  let _origin = ''
  if (!window.location.origin) {
    _origin =
      window.location.protocol +
      '//' +
      window.location.hostname +
      (window.location.port ? ':' + window.location.port : '')
  } else {
    _origin = window.location.origin
  }
  return _origin
}

//金额大写
export const toRmb = (money) => {
  // 汉字的数字
  const cnNums = ['零', '壹', '贰', '叁', '肆', '伍', '陆', '柒', '捌', '玖']
  // 基本单位
  const cnIntRadice = ['', '拾', '佰', '仟']
  // 对应整数部分扩展单位
  const cnIntUnits = ['', '万', '亿', '兆']
  // 对应小数部分单位
  const cnDecUnits = ['角', '分', '毫', '厘']
  // 整数金额时后面跟的字符
  const cnInteger = '整'
  // 整型完以后的单位
  const cnIntLast = '圆'
  // 最大处理的数字
  const maxNum = 999999999999999.9999
  // 金额整数部分
  let integerNum
  // 金额小数部分
  let decimalNum
  // 输出的中文金额字符串
  let chineseStr = ''
  // 分离金额后用的数组，预定义
  let parts
  if (money == '') {
    return '零'
  }
  money = parseFloat(money)
  if (money >= maxNum) {
    // 超出最大处理数字
    return ''
  }
  if (money == 0) {
    chineseStr = cnNums[0] + cnIntLast + cnInteger
    return chineseStr
  }
  // 转换为字符串
  money = money.toString()
  if (money.indexOf('.') == -1) {
    integerNum = money
    decimalNum = ''
  } else {
    parts = money.split('.')
    integerNum = parts[0]
    decimalNum = parts[1].substr(0, 4)
  }
  // 获取整型部分转换
  if (parseInt(integerNum, 10) > 0) {
    let zeroCount = 0
    const IntLen = integerNum.length
    for (let i = 0; i < IntLen; i++) {
      const n = integerNum.substr(i, 1)
      const p = IntLen - i - 1
      const q = p / 4
      const m = p % 4
      if (n == '0') {
        zeroCount++
      } else {
        if (zeroCount > 0) {
          chineseStr += cnNums[0]
        }
        // 归零
        zeroCount = 0
        chineseStr += cnNums[parseInt(n)] + cnIntRadice[m]
      }
      if (m == 0 && zeroCount < 4) {
        chineseStr += cnIntUnits[q]
      }
    }
    chineseStr += cnIntLast
  }
  // 小数部分
  if (decimalNum != '') {
    const decLen = decimalNum.length
    for (let i = 0; i < decLen; i++) {
      const n = decimalNum.substr(i, 1)
      if (n != '0') {
        chineseStr += cnNums[Number(n)] + cnDecUnits[i]
      }
    }
  }
  if (chineseStr == '') {
    chineseStr += cnNums[0] + cnIntLast + cnInteger
  } else if (decimalNum == '') {
    chineseStr += cnInteger
  }
  return chineseStr
}

// 搜索数组，重置为[]，element组件默认是''，后端接收[]
export const SearchFormatEmptyArr = (keyArr, params) => {
  for (let i = 0; i < keyArr.length; i++) {
    if (params[keyArr[i]] === '') {
      params[keyArr[i]] = []
    }
  }
  return params
}
