<template>
  <div class="tab-control">
    <div
      v-for="(item , index) in titles"
      :key="index"
      class="tab-control-item"
      :class="{active: index == currentIndex }"
      @click="itemClcik(index)"
    >
      <span>{{item}}</span>
    </div>
  </div>
</template>
<script>
export default {
  name: "TabControl",
  data() {
    return {
      currentIndex: 0
    };
  },
  props: {
    titles: {
      type: Array,
      default: []
    }
  },
  methods: {
    itemClcik(index) {
      this.currentIndex = index;
    }
  }
};
</script>
<style scoped>
.tab-control {
  display: flex;
  text-align: center;
  font-size: 15px;
  height: 40px;
  line-height: 40px;
  background-color: #fff;
  position: sticky;
  top: 44px;
}
.tab-control-item {
  flex: 1;
}
.tab-control-item span {
  padding: 5px;
}
.active {
  color: var(--color-high-tint);
}
.active span {
  border-bottom: 3px solid var(--color-tint);
}
</style>