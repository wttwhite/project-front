// 文件处理
// 下载函数等
export const downloadFileByBlob = (res, fileName) => {
  // 判断res的类型
  let liu = ''
  if (res instanceof Blob) {
    liu = res
  } else if (res.data instanceof Blob) {
    liu = res.data
  } else {
    console.error('res 和 res 都不是二进制码流')
    return
  }
  const blob = new Blob([liu], { type: liu.type })
  let dom = document.createElement('a')
  //创建下载链接
  let url = window.URL.createObjectURL(blob)
  if (!fileName) {
    // 判断能否使用header的文件名
    if (!res.headers || !res.headers['content-disposition']) {
      console.error('res.headers没有值，请自己传入文件名')
      return
    }
    fileName = res.headers['content-disposition']
      ? res.headers['content-disposition'].split('attachment;filename=')[1]
      : new Date().getTime()
  }
  dom.href = url
  // 解码
  dom.download = decodeURI(fileName)
  dom.style.display = 'none'
  document.body.appendChild(dom)
  dom.click()
  dom.parentNode.removeChild(dom)
  // 释放掉blob对象
  window.URL.revokeObjectURL(url)
}
//引入js文件代码
// 文件下载ppt,xls,word
export const downloadFileByUrl = (str, fileName) => {
  //   let that = this
  getBlob(str, function (blob) {
    saveAs(blob, fileName)
  })
  function getBlob(url, cb) {
    console.log('调用getBlob')
    var xhr = new XMLHttpRequest()
    xhr.open('GET', url, true)
    xhr.responseType = 'blob'
    xhr.onload = function () {
      if (xhr.status === 200) {
        cb(xhr.response)
      }
    }
    xhr.send()
  }
  function saveAs(blob, filename) {
    console.log('调用saveAs')
    if (window.navigator.msSaveOrOpenBlob) {
      navigator.msSaveBlob(blob, filename)
    } else {
      var link = document.createElement('a')
      var body = document.querySelector('body')
      link.href = window.URL.createObjectURL(blob)
      link.download = filename
      link.style.display = 'none'
      body.appendChild(link)
      link.click()
      body.removeChild(link)
      window.URL.revokeObjectURL(link.href)
    }
  }
}
