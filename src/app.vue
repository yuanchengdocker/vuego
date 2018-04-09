<template>
  <div class="main-page">
        <div class="main-cover">
        </div>
        <div class="main-content">
            <Header/>
            <p>{{fullName}}  {{counter}}</p>
            <p>{{text}} {{fiveText}}  c {{textc}}</p>
            <router-link to="/app/1234">app123</router-link>
            <router-link to="/app/567">app567</router-link>
            <router-link to="/login">login</router-link>
            <transition name="fade">
              <router-view/>
            </transition>
            <Footer/>
        </div>
  </div>
</template>

<script>
import Header from './views/header.vue'
import Footer from './views/footer.jsx'
import {
  mapState,
  mapGetters,
  mapActions,
  mapMutations
} from 'vuex'
export default {
  components: {
    Header, Footer
  },
  mounted () {
    // let i = 0
    // this.$store.dispatch('updateCountAsync', {
    //   num: 5,
    //   time: 5000
    // })
    this.updateCountAsync({num: 5, time: 5000})
    console.log(this.$store)
    // setInterval(() => {
    //   this.$store.commit('updateCount', i++)
    // }, 1000)
    // setInterval(() => {
    //   this['a/addCount']()
    //   this.updateCount({num: i++})
    //   // this['a/addText']()
    // }, 1000)
    // this.aText(1000)
  },
  methods: {
    ...mapActions(['updateCountAsync', 'a/addCount', 'a/addText']),
    ...mapMutations({
      updateCount: 'updateCount',
      aText: 'a/updateText'
    })
  },
  computed: {
    // text () {
    //   return this.$store.state.a.text
    // },
    // fullName () {
    //   return this.$store.getters.fullName
    // },
    ...mapGetters({
      fullName: 'fullName',
      fiveText: 'a/fiveText'
    }),
    // count () {
    //   return this.$store.state.count
    // }
    ...mapState({
      counter: state => {
        console.log(state)
        return state.count
      },
      text: state => state.a.text,
      textc: state => state.c.textc
    })
  }
}
</script>

<style lang="stylus" scoped>
.main-page
    width 100%
    height 100%
    background-image url('./img/login-bg.jpg')
    background-position center
    position relative
    .main-cover
        width 100%
        height 100%
        background-color #ffffff
        opacity 0.7
        position absolute
        top 0
        z-index 10
    .main-content
        position absolute
        width 100%
        height 100%
        z-index 11
        text-align center

</style>





