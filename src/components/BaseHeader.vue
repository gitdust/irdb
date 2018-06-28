<template>
  <header class="app-header">
    <router-link to="/">
      <img
        class="logo"
        src="~statics/img/logo.png">
      <span class="text">IRDB</span>
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
  .text {
    display: inline-block;
    vertical-align: top;
    line-height: 64px;
    font-size: 48px;
    color: #fff;
    transition: all .5s ease .1s;
    text-shadow: 2px 3px 4px lighten(#2d8cf0, 20%);
    &:hover {
      color: #2d8cf0;
      text-shadow: 2px 3px 4px lighten(#fff, 10%);
    }
  }
}
</style>

