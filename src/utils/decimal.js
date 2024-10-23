// 金额基础计算
import Decimal from 'decimal.js'

// 设置默认精度为两位小数
// Decimal.set({ precision: 2 })

// 加法
export function add(a, b, precision = 2) {
  return new Decimal(a).add(b).toDecimalPlaces(precision).toNumber()
}
// 减法
export function subtract(a, b, precision = 2) {
  return new Decimal(a).sub(b).toDecimalPlaces(precision).toNumber()
}
// 乘法
export function multiply(a, b, precision = 2) {
  return new Decimal(a).mul(b).toDecimalPlaces(precision).toNumber()
}
// 除法
export function divide(a, b, precision = 2) {
  return new Decimal(a).div(b).toDecimalPlaces(precision).toNumber()
}

export default {
  add,
  subtract,
  multiply,
  divide,
}
