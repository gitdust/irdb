<template>
  <div class="resource">
    <img
      :src="resource.picture"
      @error="errorHandler">
    <div class="info">
      <div class="title">
        <h2>
          <base-link :url="resource.homepage">{{ resource.name }}</base-link>
        </h2>
        <div class="tags">
          <base-tag :color="tagColor">{{ tagText }}</base-tag>
          <base-tag
            v-show="resource.vpn"
            color="green">VPN</base-tag>
        </div>
      </div>
      <p>{{ resource.describe }}</p>
    </div>
  </div>
</template>

<script>
import BaseTag from '@/components/BaseTag';
import { errorImage } from '@/utils/helper';
import BaseLink from '@/components/BaseLink';

export default {
  name: 'Resource',
  components: {
    BaseLink,
    BaseTag,
  },
  props: {
    resource: {
      type: Object,
      default: {
        _id: 1,
        name: '',
        homepage: '',
        describe: '',
        picture: '',
      },
    },
  },
  computed: {
    errorHandler() {
      return errorImage;
    },
    tagColor() {
      return this.$store.state.types[this.resource.type].color;
    },
    tagText() {
      return this.$store.state.types[this.resource.type].text;
    },
  },
};
</script>


<style lang="less" scoped>
.resource {
  margin-bottom: 16px;
  display: flex;
  font-size: 0;
  box-shadow: 0 0 8px 0 rgba(0, 0, 0, .2);
  border-radius: 5px;
  transition: box-shadow .3s ease .1s;
  &:hover {
    box-shadow: 0 4px 16px 0 rgba(0, 0, 0, .2);
  }
  img {
    padding: 8px;
    width: 400px;
    height: 240px;
  }
  .info {
    flex: 1;
    box-shadow: -1px 0 0 0 rgba(0, 0, 0, .2);
    .title {
      display: flex;
      padding: 8px;
      justify-content: space-around;
      box-shadow: 0 1px 0 0 rgba(0, 0, 0, .2);
      h2 {
        flex: 1;
        font-size: 16px;
      }
    }
    p {
      padding: 8px;
      font-size: 14px;
    }
  }
}
@keyframes pulse {
  0% {
    box-shadow: 0 0 0 1px rgba(0, 0, 0, .5);
  }
  66% {
    box-shadow: 0 0 0 4px rgba(0, 0, 0, .3);
  }
  100% {
    box-shadow: 0 0 0 7px rgba(0, 0, 0, .1);
  }
}
</style>

