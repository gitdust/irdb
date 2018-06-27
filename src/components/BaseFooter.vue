<template>
  <footer class="app-footer">
    &copy; 2018
    <base-link url="http://www.miitbeian.gov.cn/">皖ICP备17026479号-1</base-link>
  </footer>
</template>

<script>
import BaseLink from './BaseLink';

export default {
  name: 'BaseFooter',
  components: {
    BaseLink,
  },
};
</script>

<style lang="less" scoped>
.app-footer {
  padding: 8px 16px;
  text-align: center;
  box-shadow: 0 -1px 1px 1px rgba(0, 0, 0, .1);
}
</style>

