<template>
  <header class="app-header">
    <router-link to="/">
      <img
        class="logo"
        src="~statics/img/logo.png">
    </router-link>
    <github-link/>
  </header>
</template>

<script>
import GithubLink from './GithubLink';
import BaseLink from './BaseLink';

export default {
  name: 'BaseHeader',
  components: {
    BaseLink,
    GithubLink,
  },
};
</script>

<style lang="less" scoped>
.app-header {
  padding: 0 16px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  background-color: #495060;
  height: 64px;
}
</style>

