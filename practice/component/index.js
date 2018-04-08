import Vue from 'vue'

const component = {
  template: `
    <div>
      <span>{{text}}</span>
    </div>
  `,
  data () {
    return {
      text: 0
    }
  },
  props: {
    onChange: Function
  },
  watch: {
    text (newValue, oldValue) {
      // this.onChange()
      this.$emit('getNumber', newValue)
    }
  },
  mounted () {
    setInterval(() => {
      this.text += 1
    }, 1000)
  }
}

new Vue({
  components: {
    ComOne: component
  },
  methods: {
    getNumber (value) {
      console.log(value)
    }
  },
  template: `
    <div>
      <com-one @getNumber="getNumber"></com-one>
    </div>
  `
}).$mount('#root')
