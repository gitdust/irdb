<template>
  <a
    :class="className"
    target="_blank"
    :href="url"
    ref="noopener noreferrer"><slot>rdb.cn</slot></a>
</template>

<script>
export default {
  name: 'BaseLink',
  props: {
    url: {
      type: String,
      default: 'https://rdb.cn',
    },
    className: {
      type: String,
      default: '',
    },
  },
};
</script>

