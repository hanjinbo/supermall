<template>
  <div
    class="icon-selector"
    :class="{'active':isCheck}"
  >
    <img
      src="~assets/img/cart/tick.svg"
      alt=""
    >
  </div>
</template>
<script>
export default {
  name: "CheckButton",
  props: {
    isCheck: {
      type: Boolean,
      default: false
    }
  }
};
</script>
<style scoped>
.icon-selector {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  border: 2px solid #ccc;
  cursor: pointer;
}
.active {
  background: red;
  border-color: red;
}
</style>