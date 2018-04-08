<template>
  <div class="main-page">
        <div class="main-cover">
        </div>
        <div class="main-content">
            <Header/>
            <p>{{count}}</p>
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
export default {
  components: {
    Header, Footer
  },
  mounted () {
    let i = 0
    console.log(this.$store)
    setInterval(() => {
      this.$store.commit('updateCount', i++)
    }, 1000)
  },
  computed: {
    count () {
      return this.$store.state.count
    }
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





