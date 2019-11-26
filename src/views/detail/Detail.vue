<template>
  <div id="detail">
    <detail-nav-bar
      class="detail-nav"
      @tabTitleClick="tabTitleClick"
      ref="detailNav"
    ></detail-nav-bar>
    <scroll
      ref="scroll"
      class="content"
      :probe-type="3"
      @scroll="contentScroll"
    >
      <detail-swiper :topImages="topImages"> </detail-swiper>
      <detail-base-info :goods="goods"></detail-base-info>
      <detail-shop-info :shop="shop"></detail-shop-info>
      <detail-goods-info
        :detail-info="detailInfo"
        @imageLoad="imageLoad"
      ></detail-goods-info>
      <detail-param-info
        :param-info="paramInfo"
        ref="param"
      ></detail-param-info>
      <detail-comment-info
        :comment-info="commentInfo"
        ref="comment"
      ></detail-comment-info>
      <detail-recommend-info
        :recommend-list="recommendList"
        ref="recommend"
      ></detail-recommend-info>
    </scroll>
    <detail-bottom-bar @addToCart="addToCart"></detail-bottom-bar>
    <back-top @click.native="clickScroll" v-show="backTopShow"></back-top>
  </div>
</template>
<script>
import Scroll from "components/common/scroll/Scroll";
import DetailNavBar from "./childComps/DetailNavBar";
import DetailSwiper from "./childComps/DetailSwiper";
import DetailBaseInfo from "./childComps/DetailBaseInfo";
import DetailShopInfo from "./childComps/DetailShopInfo";
import DetailGoodsInfo from "./childComps/DetailGoodsInfo";
import DetailParamInfo from "./childComps/DetailParamInfo";
import DetailCommentInfo from "./childComps/DetailCommentInfo";
import DetailRecommendInfo from "./childComps/DetailRecommendInfo";
import DetailBottomBar from "./childComps/DetailBottomBar";
import BackTop from "components/content/backTop/BackTop";

import {
  getDetail,
  Goods,
  Shop,
  GoodsParam,
  getRecommend
} from "network/detail";
export default {
  name: "Detail",
  data() {
    return {
      iid: null,
      topImages: [],
      goods: {},
      shop: {},
      detailInfo: {},
      paramInfo: {},
      commentInfo: {},
      recommendList: [],
      themeTopYs: [],
      backTopShow: false
    };
  },
  components: {
    Scroll,
    DetailNavBar,
    DetailSwiper,
    DetailBaseInfo,
    DetailShopInfo,
    DetailGoodsInfo,
    DetailParamInfo,
    DetailCommentInfo,
    DetailRecommendInfo,
    DetailBottomBar,
    BackTop
  },
  created() {
    this.iid = this.$route.params.iid;

    getDetail(this.iid).then(res => {
      const data = res.result;
      // console.log(data);

      this.topImages = data.itemInfo.topImages;

      this.goods = new Goods(
        data.itemInfo,
        data.columns,
        data.shopInfo.services
      );

      //店铺信息
      this.shop = new Shop(data.shopInfo);

      //商品详情数据
      this.detailInfo = data.detailInfo;

      //获取参数信息
      this.paramInfo = new GoodsParam(
        data.itemParams.info,
        data.itemParams.rule
      );
      // console.log(data);

      //获取评价
      if (data.rate.list) {
        this.commentInfo = data.rate.list[0];
      }
    });

    getRecommend().then(res => {
      this.recommendList = res.data.list;
    });
  },
  methods: {
    imageLoad() {
      this.$refs.scroll.scroll.refresh();

      this.themeTopYs.push(0);
      this.themeTopYs.push(this.$refs.param.$el.offsetTop);
      this.themeTopYs.push(this.$refs.comment.$el.offsetTop);
      this.themeTopYs.push(this.$refs.recommend.$el.offsetTop);
    },
    tabTitleClick(index) {
      this.$refs.scroll.scrollTo(0, -this.themeTopYs[index] + 44, 200);
    },
    contentScroll(option) {
      const optionY = -option.y;
      this.backTopShow = optionY > 500;
      if (optionY > this.themeTopYs[3]) {
        this.$refs.detailNav.currentIndex = 3;
      } else if (optionY < this.themeTopYs[3] && optionY > this.themeTopYs[2]) {
        this.$refs.detailNav.currentIndex = 2;
      } else if (optionY < this.themeTopYs[2] && optionY > this.themeTopYs[1]) {
        this.$refs.detailNav.currentIndex = 1;
      } else if (optionY < this.themeTopYs[1]) {
        this.$refs.detailNav.currentIndex = 0;
      }
    },
    clickScroll() {
      this.$refs.scroll.scrollTo(0, 0, 500);
    },
    addToCart() {
      const obj = {
        iid: this.iid,
        image: this.topImages[0],
        title: this.goods.title,
        desc: this.goods.desc,
        price: this.goods.realPrice
      };
      this.$store.commit("addCart", obj);
      // console.log(this.$store.state.cartList);
    }
  }
};
</script>
<style scoped>
#detail {
  height: 100vh;
  background: #fff;
  position: relative;
  z-index: 1;
}
.detail-nav {
  position: relative;
  z-index: 9;
  background: #fff;
}
.content {
  position: absolute;
  top: 44px;
  bottom: 60px;
}
</style>
