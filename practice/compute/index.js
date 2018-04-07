import Vue from 'vue'

new Vue({
  template: `
    <div>
      <p>Text: {{text}}</p>
      <p>FullName: {{name}}</p>
      <input v-model="text"></input>

      <p>Obj.a: {{lala}}</p>
      <input v-model="Obj.a"></input>
    </div>
  `,
  data: {
    firstName: 1,
    text: 0,
    fullName: '',
    lala: '',
    Obj: {
      a: ''
    }
  },
  computed: {
    name () {
      return (new Array(5)).fill(this.text).join('')
    }
  },
  watch: {
    Obj: {
      handler (newValue, oldValue) {
        console.log(newValue.a)
        this.lala = newValue.a
      },
      immediate: true,
      deep: true
    }
  }
}).$mount('#root')
