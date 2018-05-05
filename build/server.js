var http = require('http')
var fs = require('fs')// 引入文件读取模块

var documentRoot = __dirname
// 需要访问的文件的存放目录（项目所在位置的文件夹路径）

http.createServer(function (req, res) {
  var url = req.url
  // 客户端输入的url，例如如果输入localhost:8888/index.html
  // 那么这里的url == /index.html

  var file = documentRoot + url
  console.log(url)
  // E:/PhpProject/html5/websocket/www/index.html

  fs.readFile(file, function (err, data) {
    /*
        一参为文件路径
        二参为回调函数
            回调函数的一参为读取错误返回的信息，返回空就没有错误
            二参为读取成功返回的文本内容
    */
    if (err) {
      res.writeHeader(404, {
        'content-type': 'text/html;charset="utf-8"'
      })
      res.write('<h1>404错误</h1><p>你要找的页面不存在</p>')
      res.end()
    } else {
      res.writeHeader(200, {
        'content-type': 'text/html;charset="utf-8"'
      })
      res.write(data)// 将index.html显示在客户端
      res.end()
    }
  })
}).listen(8081)

console.log('服务器开启成功')

function Person () {
  this.name = 'es3'
  this.sex = 'male'
  this.get = function (key) {
    return this[key]
  }
  this.set = function (key, value) {
    if (key !== 'sex') {
      this[key] = value
    } else {
      throw Error('cuole')
    }
  }
}
var person = new Person()
person.set('sex', 'female')

var person = {
  name: 'es5'
}

Object.defineProperties(person, 'sex', {
  whriteable: false,
  value: 'male'
})
console.log(person.sex)
person.sex = 'female'


var person = {
  name: 'es5',
  sex: 'male'
}

var p = new Proxy(person, {
  get: (obj, key) => {
    return obj[key]
  },
  set: (obj, key, newValue) => {
    if (key !== 'sex') {
      obj[key] = newValue
    } else {
      throw Error('dd')
    }
  }
})
console.log(p.name)
p.sex = 'female'
