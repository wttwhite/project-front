// 判断两个数是否相等
export const isEqual = function (value1, value2) {
  if (Array.isArray(value1) && Array.isArray(value2)) {
    return arrayEquals(value1, value2)
  }
  return looseEqual(value1, value2)
}
export const arrayEquals = function (arrayA, arrayB) {
  arrayA = arrayA || []
  arrayB = arrayB || []

  if (arrayA.length !== arrayB.length) {
    return false
  }

  for (let i = 0; i < arrayA.length; i++) {
    if (!looseEqual(arrayA[i], arrayB[i])) {
      return false
    }
  }

  return true
}
export const looseEqual = function (a, b) {
  const isObjectA = isObject(a)
  const isObjectB = isObject(b)
  if (isObjectA && isObjectB) {
    return JSON.stringify(a) === JSON.stringify(b)
  } else if (!isObjectA && !isObjectB) {
    return String(a) === String(b)
  } else {
    return false
  }
}
export function isObject(obj) {
  return Object.prototype.toString.call(obj) === '[object Object]'
}
