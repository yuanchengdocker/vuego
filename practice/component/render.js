import Vue from 'vue'

const childComponent = {
  template: `<div>This is Child Component{{data.value}}</div>`,
  inject: ['yeye', 'data'],
  mounted () {
    console.log(this.yeye)
  },
  data () {
    return {
      value: 1
    }
  }
}

const component = {
  components: {
    childComponent
  },
  data () {
    return {
      value: 0,
      style: {
        width: '200px',
        height: '200px',
        border: '1px solid #aaa'
      }
    }
  },
  template: `
    <div :style="style">
      <slot :value="value" :aaa="111"/>
      <childComponent></childComponent>
    </div>
  `
}

new Vue({
  components: {
    CompOne: component
  },
  provide () {
    var data = {}
    Object.defineProperty(data, 'value', {
      get: () => this.value
      // Enumerator: true
    })

    return {
      'yeye': this,
      'data': data
    }
  },
  data () {
    return {
      value: 100
    }
  },
  mounted () {
    // console.log(this.$refs)
  },
  template: `
    <div>
      <comp-one ref="com">
        <span  ref="span"> {{value}}</span>
      </comp-one>
      <input v-model="value"/>
    </div>
  `
}).$mount('#root')
