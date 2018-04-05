<template>
  <div class="todo-container">
      <input 
        type="text"
        class="todo-input"
        autofocus=true
        placeholder="请输入您接下来要做的事！"
        @keyup.enter="addTodo"
    >
    <Item 
        v-for="todo in showTodos"
        :key="todo.id"
        :todo="todo"
        @del="delTodo"
    />
    <Tabs
        :filter="filter"
        :left="(todos.filter((item)=>!item.completed)).length"
        @filterChange="filterChange"
        @clearAllCompleted="clearAllCompleted"
    />
  </div>
</template>
<script>
import Item from './item.vue'
import Tabs from './tabs.vue'
var id = 0
export default {
  data () {
    return {
      todos: [],
      filter: 'all'
    }
  },
  components: {
    Item, Tabs
  },
  computed: {
    showTodos: function () {
      if (this.filter === 'all') {
        return this.todos
      } else if (this.filter === 'active') {
        return this.todos.filter((item) => !item.completed)
      } else if (this.filter === 'completed') {
        return this.todos.filter((item) => item.completed)
      }
    }
  },
  methods: {
    addTodo (e) {
      let content = e.target.value.trim()
      if (content === '') return
      this.todos.unshift({
        id: id++,
        content: content,
        completed: false
      })
      e.target.value = ''
    },
    delTodo (id) {
      this.todos.splice(this.todos.findIndex((item) => item.id === id), 1)
    },
    filterChange (state) {
      this.filter = state
    },
    clearAllCompleted () {
      this.todos = this.todos.filter((item) => !item.completed)
    }
  }
}
</script>
<style lang="stylus" scoped>
.todo-container
    width 90%
    margin-left 3%
    padding 0 2%
    background-color #ffffff
    .todo-input
        width 100%
        height 50px
        font-size 30px
        border none
        padding 10px 0
</style>


