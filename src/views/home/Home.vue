<template>
  <div id="home">
    <nav-bar class="home-nav">
      <div slot="center">购物街</div>
    </nav-bar>
    <scroll
      class="content"
      ref="Hscroll"
      @scroll="backTopScroll"
      :probeType="3"
      :pull-up-load="true"
      @pullingUp="loadMore"
    >
      <home-swiper :banners="banners" />
      <recommend-view :recommends="recommends" />
      <feature-view />
      <tab-control
        :titles="['流行', '新款', '精选']"
        @controlNum="changeControl"
      ></tab-control>
      <goods-list :goods="showGoods"></goods-list>

    </scroll>
    <back-top
      @click.native="clickScroll"
      v-show="backTopShow"
    ></back-top>
  </div>
</template>
<script>
import NavBar from "components/common/navbar/NavBar";
import HomeSwiper from "./childComps/HomeSwiper";
import RecommendView from "./childComps/RecommendView";
import FeatureView from "./childComps/FeatureView";
import TabControl from "components/content/tabControl/TabControl";
import GoodsList from "components/content/goods/GoodsList";
import BackTop from "components/content/backTop/BackTop";
import Scroll from "components/common/scroll/Scroll";

import { getHomeMultidata, getHomeGoods } from "network/home";
import { debounce } from "common/utils";
export default {
  name: "Home",
  data() {
    return {
      banners: [],
      recommends: [],
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] }
      },
      curentType: "pop",
      backTopShow: false
    };
  },
  computed: {
    showGoods() {
      return this.goods[this.curentType].list;
    }
  },

  components: {
    NavBar,
    HomeSwiper,
    RecommendView,
    FeatureView,
    TabControl,
    GoodsList,
    BackTop,
    Scroll
  },
  created() {
    this.getHomeMultidata();
    this.hgetHomeGoods("pop");
    this.hgetHomeGoods("sell");
    this.hgetHomeGoods("new");
  },
  mounted() {
    const refresh = debounce(this.$refs.Hscroll.refresh, 50);
    this.$bus.$on("loadImage", () => {
      refresh();
    });
  },
  methods: {
    getHomeMultidata() {
      getHomeMultidata().then(res => {
        this.banners = res.data.banner.list;
        this.recommends = res.data.recommend.list;
      });
    },
    hgetHomeGoods(type) {
      const page = this.goods[type].page + 1;
      getHomeGoods(type, page).then(res => {
        this.goods[type].list.push(...res.data.list);
        this.goods[type].page += 1;

        this.$refs.Hscroll.finishUp();
      });
    },
    clickScroll() {
      this.$refs.Hscroll.scroll.scrollTo(0, 0, 500);
    },
    backTopScroll(option) {
      this.backTopShow = -option.y > 500;
    },
    changeControl(index) {
      switch (index) {
        case 0:
          this.curentType = "pop";
          break;
        case 1:
          this.curentType = "new";
          break;
        case 2:
          this.curentType = "sell";
      }
    },
    loadMore() {
      this.hgetHomeGoods(this.curentType);
    }
  }
};
</script>
<style scoped>
.home-nav {
  background-color: var(--color-tint);
  color: #fff;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
}
#home {
  margin-top: 44px;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 49px;
  left: 0;
  right: 0;
}
</style>
