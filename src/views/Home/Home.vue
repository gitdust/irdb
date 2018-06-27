<template>
  <div class="content">
    <div class="banner">
      <p>资源全部来自网络</p>
      <base-link url="https://weibo.com/cmzyk">@传媒老跟班</base-link>
      <base-link url="https://weibo.com/chuangbogongshe">@快递少年</base-link>
    </div>
    <ButtonGroup
      class="types">
      <Button
        v-for="(type, key) in $store.state.types"
        :key="key"
        :type="key === selectedKey ? 'primary' : null"
        @click="onChoseType(key)">{{ type.text }}</Button>
    </ButtonGroup>
    <div class="resources">
      <resource
        v-for="r in data"
        :key="r._id"
        :resource="r"/>
    </div>
    <div
      v-if="!isDataAllLoaded || loadMoreText !== ''"
      class="load-more">
      <Button
        type="primary"
        :loading="$store.state.loading"
        @click="onLoadMore">{{ loadMoreText }}</Button>
    </div>
  </div>
</template>

<script>
import BaseLink from '@/components/BaseLink';
import Resource from './components/Resource';
import api from './api';


export default {
  name: 'Home',
  components: {
    BaseLink,
    Resource,
  },
  data() {
    return {
      defaultMode: true, // 默认模式，即用户未选择分类
      pageNo: 1,
      data: [],
      selectedKey: '',
      isDataAllLoaded: false,
    };
  },
  computed: {
    loadMoreText() {
      if (this.isDataAllLoaded) {
        return '没有更多数据了';
      }
      return this.$store.state.loading ? '加载中...' : '点击加载更多';
    },
  },
  mounted() {
    this.getResources();
  },
  methods: {
    // 获取数据
    async getResources() {
      if (this.isDataAllLoaded) {
        return;
      }
      const payload = {
        type: this.selectedKey,
        pageNo: this.pageNo,
        defaultMode: this.defaultMode,
      };
      const res = await api.getResources(payload);

      if (res) {
        const { count, results } = res;

        if (this.pageNo === 1) {
          this.data = results;
        } else {
          this.data = this.data.concat(results);
        }
        this.isDataAllLoaded = this.data.length >= count;
      }
      this.$store.state.loading = false;
    },
    // 选择类型
    onChoseType(key) {
      if (this.selectedKey !== key) {
        this.selectedKey = key;
        this.pageNo = 1;
        this.defaultMode = false;
        this.isDataAllLoaded = false;
        this.getResources();
      }
    },
    // 加载更多
    onLoadMore() {
      if (!this.isDataAllLoaded) {
        this.pageNo += 1;
        this.getResources();
      }
    },
  },
};
</script>

<style lang="less" scoped>
.content {
  .banner {
    font-size: 20px;
    text-align: center;
    background-color: #e8f9f0;
    padding: 16px;
  }
  .types {
    display: flex;
    justify-content: center;
    width: 100%;
    padding: 8px 16px;
    padding-top: 16px;
  }
  .resources {
    padding: 8px 16px;
    padding-bottom: 0;
  }
  .load-more {
    text-align: center;
    text-align: center;
    font-size: 14px;
    padding-bottom: 16px;
  }
}

</style>
