<template>
    <section :class = "['todo-item',todo.completed?'active':'']">
        <input 
            type="checkbox" 
            class="check-box"
            v-model="todo.completed"
        >
        <label class="todo-content">{{todo.content}}</label>
        <button class="todo-del" @click="delTodo">删除</button>
    </section>
</template>
<script>
export default {
  props: {
    todo: {
      type: Object,
      required: true
    }
  },
  methods: {
    delTodo () {
      this.$emit('del', this.todo.id)
    }
  }
}
</script>
<style lang="stylus" scoped>
.todo-item
    height 50px
    line-height 50px
    display flex
    align-items center
    justify-content space-between
    position relative
    border-top 1px solid #efefef
    .check-box
        float left
        border-radius 50%
    .todo-content
        float left
        position absolute
        left 20px
        font-size 25px
    .todo-del
        float right
.active
    .todo-content
        color red
</style>


