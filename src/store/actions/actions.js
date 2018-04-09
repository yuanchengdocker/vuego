export default {
  updateCountAsync (store, {num, time}) {
    setTimeout(() => {
      store.commit('updateCount', {num})
    }, time)
  }
}
