import Vue from 'vue'

const component = {
  template: `
    <div>
      <span>{{text}}</span>
      <input v-model="text"></input>
    </div>
  `,
  data () {
    return {
      text: 0
    }
  },
  // 自定义v-model实现
  model: {
    prop: 'value1',
    event: 'change'
  },
  props: ['value1'],
  watch: {
    text (newValue, oldValue) {
      this.$emit('change', newValue)
    }
  },
  mounted () {
    console.log('extend mounted')
    // setInterval(() => {
    //   this.text += 1
    // }, 1000)
  }
}

const component2 = {
  extends: component,
  data () {
    return {
      text: 10
    }
  },
  mounted () {
    console.log('instand mounted')
  }
}

new Vue({
  components: {
    Comp2: component2
  },
  propsData: {
    pData: 'yuancheng'
  },
  data () {
    return {
      value: 10
    }
  },
  watch: {
    value (newValue, oldValue) {
      console.log(this.value)
    }
  },
  methods: {
    change (value) {
      this.value = value
    }
  },
  mounted () {
    console.log('instance mounted')
  },
  template: `
    <div>
      <comp2 v-model="value"></comp2>
    </div>
  `
}).$mount('#root')

// <comp2 :value="value" @value="value = arguments[0]"></comp2>
// const Comp1 = Vue.extend(component)

// new Comp1({
//   propsData: {
//     pData: 'yuancheng'
//   },
//   data: {
//     text: 10
//   },
//   mounted () {
//     console.log('instant mounted')
//   }
// }).$mount('#root')
