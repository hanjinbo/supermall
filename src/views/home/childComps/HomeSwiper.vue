<template>
  <swiper class="swiper">
    <swiper-item
      v-for="(item,index) in banners"
      :key="index"
    >
      <a :href="item.link">
        <img
          :src="item.image"
          alt=""
          @load="loadImg"
        >
      </a>
    </swiper-item>
  </swiper>
</template>

<script>
import { Swiper, SwiperItem } from "components/common/swiper";

export default {
  name: "HomeSwiper",
  data() {
    return {
      isLoad: true
    };
  },
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  components: {
    Swiper,
    SwiperItem
  },
  methods: {
    loadImg() {
      if (this.isLoad) {
        this.$emit("swiperImgLoad");
        this.isLoad = false;
      }
    }
  }
};
</script>

<style scoped>
.swiper {
  background: #fff;
}
</style>
