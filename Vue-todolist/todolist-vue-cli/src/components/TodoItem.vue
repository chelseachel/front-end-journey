<template>
  <li class="item" @click="handleDelete">{{content}}</li>
</template>

<script>
export default {
  props: ['content', 'index'],
  methods: {
    handleDelete () {
      this.$emit('delete', this.index)
    }
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>/* scope修饰符为这里的样式加了作用域，独立作用于此组件内部 */
  .item {
    color: rosybrown;
  }
</style>
