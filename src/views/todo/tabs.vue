<template>
    <div class="tabs-container">
        <span class="left">{{left}} items left</span>
        <span class="filters">
            <span 
                v-for="state in states"
                :key="state"
                :class="['filter',filter===state?'active':'']"
                @click="filterChange(state)"
            >{{state}}</span>
        </span>
        <span class="clear-completed" @click="clearAll">Clear Completed</span>
    </div>
</template>
<script>
export default {
  props: {
    left: {
      type: Number,
      required: true
    },
    filter: {
      type: String,
      required: true
    }
  },
  data () {
    return {
      states: ['all', 'active', 'completed']
    }
  },
  methods: {
    clearAll () {
      this.$emit('clearAllCompleted')
    },
    filterChange (state) {
      this.$emit('filterChange', state)
    }
  }
}
</script>
<style lang="stylus" scoped>
.tabs-container
    height 50px
    display flex
    justify-content space-between
    align-items center
    border-top 1px solid #efefef
    .filters
        cursor pointer
        .filter
            padding 0 5px
        .active
            color red
    .clear-completed
        cursor pointer
</style>

