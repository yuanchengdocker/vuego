import Vue from 'vue'

const app = new Vue({
  // el: '#root',
  // template: '<div>{{text}}</div>',
  data: {
    text: 0
  },
  beforeCreate: function () {
    console.log(this, 'beforeCreate')
  },
  created: function () {
    console.log(this, 'created')
  },
  beforeMount: function () {
    console.log(this, 'beforeMount')
  },
  mounted: function () {
    console.log(this, 'mounted')
  },
  beforeUpdate: function () {
    console.log(this, 'beforeUpdate')
  },
  updated: function () {
    console.log(this, 'updated')
  },
  activated: function () {
    console.log(this, 'activated')
  },
  deactivated: function () {
    console.log(this, 'deactivated')
  },
  beforeDestroy: function () {
    console.log(this, 'beforeDestroy')
  },
  destroyed: function () {
    console.log(this, 'destroyed')
  },
  render: function (h) {
    console.log(this, 'render')
    return h('div', {}, this.text)
  }
}).$mount('#root')

setTimeout(() => {
  app.text += 1
}, 1000)
