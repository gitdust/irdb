<template>
  <div class="app-layout">
    <base-header />
    <main class="app-main">
      <router-view/>
    </main>
    <base-footer />
    <BackTop />
  </div>
</template>

<script>
import BaseHeader from '@/components/BaseHeader';
import BaseFooter from '@/components/BaseFooter';
import Favicon from 'statics/img/favicon-32x32.png';

export default {
  name: 'APP',
  head: {
    link: [
      {
        rel: 'icon',
        type: 'image/png',
        href: Favicon,
        sizes: '32x32',
      },
    ],
  },
  components: {
    BaseHeader,
    BaseFooter,
  },
};
</script>

<style lang="less" scoped>
.app-layout {
  min-height: 100%;
  display: flex;
  flex-flow: column;
  // header {
  // }
  // main {
  // }
  .app-main {
    flex: 1;
  }
  footer {
    box-shadow: 0 -1px 1px 1px rgba(0, 0, 0, .1)
  }
}
</style>

