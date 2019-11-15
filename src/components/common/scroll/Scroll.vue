<template>
  <div class="wrapper" ref="wrapper">
    <div class="content">
      <slot></slot>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
export default {
  name: "Scroll",
  props: {
    probeType: {
      type: Number,
      default() {
        return 0;
      }
    }
  },
  data() {
    return {
      scroll: null
    };
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.wrapper, {
      click: true, //控制内部原生标签是否能被点击
      probeType: this.probeType
    });
    this.scroll.on("scroll", option => {
      this.$emit("scroll", option);
    });
  },
  methods: {
    scrollTo(x, y, time = 300) {
      this.scroll.scrollTo(x, y, time);
    }
  }
};
</script>

<style scoped></style>
