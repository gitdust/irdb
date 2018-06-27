<template>
  <span
    class="tag"
    :style="{ backgroundColor: color }">
    <slot/>
  </span>
</template>

<script>
export default {
  name: 'BaseTag',
  props: {
    color: {
      type: String,
      default: '#333',
    },
  },
};
</script>

<style lang="less" scoped>
.tag {
  margin-left: 8px;
  padding: 0 8px;
  display: inline-block;
  background-color: #eee;
  font-size: 12px;
  text-align: center;
  line-height: 2;
  color: #fff;
}
</style>

