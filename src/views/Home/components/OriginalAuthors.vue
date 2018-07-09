<template>
  <div class="banner">
    <p>资源全部来自网络</p>
    <base-link
      v-for="author in authors"
      :key="author.name"
      :url="`https://weibo.com${author.weibo}`">
      @{{ author.name }}
    </base-link>
  </div>
</template>

<script>
import BaseLink from '@/components/BaseLink';

export default {
  name: 'OriginalAuthors',
  components: {
    BaseLink,
  },
  data() {
    return {
      authors: [
        {
          name: '传媒老跟班',
          weibo: '/cmzyk',
        },
        {
          name: '快递少年',
          weibo: '/chuangbogongshe',
        },
        {
          name: 'vipread',
          weibo: '/u/5960474994',
        },
        {
          name: '缠夹二先生',
          weibo: '/570077640',
        },
        {
          name: '万门大学',
          weibo: '/wanmendaxue',
        },
      ],
    };
  },
};
</script>


<style lang="less" scoped>
.banner {
  font-size: 16px;
  text-align: center;
  background-color: #e8f9f0;
  padding: 16px;
}
</style>

