import className from '../style/footer.styl'

export default {
  data (){
    return {
      msg: 'yuancheng'
    }
  },
  render () {
    return (
      <p class={className.footerMain}>whritten by {this.msg}</p>
    )
  }
}
