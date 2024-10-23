// 正数2位小数
export const RegexpNumAndTwoDecimal = /^[1-9]\d*(\.\d{1,2})?$|^0\.\d{1,2}$/

// 非负2位小数
export const RegexpNonNegativeNumAndTwoDecimal = /^(0|[1-9]\d*)(\.\d{1,2})?$/

// 非负6位小数 （万元）
export const RegexpNonNegativeNumAndSixDecimal = /^(0|[1-9]\d*)(\.\d{1,6})?$/

// 数字、非负整数
export const RegexpNumber = /^\d+$/

// 正整数
export const RegexpPositiveInteger = /^[1-9]\d*$/

// 整数
export const RegexInteger = /^(?:0|(?:-?[1-9]\d*))$/

// 1-28的正整数（日期）
export const dateRegex = /^(?:[1-9]|1\d|2[0-8])$/

// 统一社会信用代码（宽松匹配）
// export const uniqueCreditLooseRegex =
//   /^(([0-9A-Za-z]{15})|([0-9A-Za-z]{18})|([0-9A-Za-z]{20}))$/
// 统一社会信用代码
export const uniqueCreditRegex =
  /^[0-9A-HJ-NPQRTUWXY]{2}\d{6}[0-9A-HJ-NPQRTUWXY]{10}$/

// 身份证 （2代）
export const idCardRegex =
  /^[1-9]\d{5}(?:18|19|20)\d{2}(?:0[1-9]|10|11|12)(?:0[1-9]|[1-2]\d|30|31)\d{3}[\dXx]$/

// 百分比（0-100 小数点精确到2位）
export const PercentRegex = /^(\d{1,2}|100|\d{1,2}\.\d{1,2}|100\.00)$/
