import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  template: '<div ref="test">This is a {{text}}, obj a is {{obj.a}}</div>',
  data: {
    text: 34,
    obj: {}
  }
})

app.$mount('#root')

// setInterval(() => {
//   app.text += 1
// }, 1000)

// console.log(app.$data)
// console.log(app.$el)
// console.log(app.$isServer)
// console.log(app.$children)
// console.log(app.$root === app)
// console.log(app.$refs)
// console.log(app.$options)
// console.log(app.$slots)

// const unWatch = app.$watch('text', (newV, oldV) => {
//   console.log(`${newV} : ${oldV}`)
// })
// setTimeout(() => {
//   unWatch()
// }, 3000)

// app.$on('test', (a) => {
//   console.log(a)
// })
// app.$once('test', (a) => {
//   console.log(a)
// })
var i = 0
setInterval(() => {
  i++
  // app.$emit('test', 1000)
  // 当a属性不在obj上时候，再赋值不会导致页面渲染
  // app.obj.a = i
  // app.$forceUpdate()
  app.$set(app.obj, 'a', i)
  // 渲染完成后的回调函数
  // app.$nextTick(() => {
  //   console.log('over')
  // })
  // setTimeout(() => {
  //   app.$delete(app.obj, 'a')
  //   console.log(app.obj)
  // }, 500)
}, 1000)
