<template>
  <div class="recommend-info">
    <div class="info-header">热门推荐</div>
    <goods-list :goods="recommendList"></goods-list>
  </div>
</template>

<script>
import GoodsList from "components/content/goods/GoodsList";
export default {
  name: "DetailRecommendInfo",
  props: {
    recommendList: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    GoodsList
  }
};
</script>

<style scoped>
</style>