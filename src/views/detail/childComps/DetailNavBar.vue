<template>
  <div>
    <nav-bar>
      <div
        slot="left"
        class="back"
        @click="clickBack"
      >
        <img
          src="~assets/img/common/back.svg"
          alt=""
        >
      </div>
      <div
        slot="center"
        class="title"
      >
        <div
          v-for="(item,index) in titles"
          :key="index"
          class="title-item"
          :class="{actived: currentIndex == index}"
          @click="titleClick(index)"
        >
          {{item}}
        </div>
      </div>
    </nav-bar>
  </div>
</template>

<script>
import NavBar from "components/common/navbar/NavBar";
export default {
  name: "DetailNavBar",
  data() {
    return {
      titles: ["商品", "参数", "评论", "推荐"],
      currentIndex: 0
    };
  },
  components: {
    NavBar
  },
  methods: {
    titleClick(index) {
      this.$emit("tabTitleClick", index);
      this.currentIndex = index;
    },
    clickBack() {
      this.$router.back();
    }
  }
};
</script>

<style scoped>
.title {
  display: flex;
  font-size: 13px;
}
.title-item {
  flex: 1;
}
.actived {
  color: red;
}
.back img {
  vertical-align: middle;
}
</style>