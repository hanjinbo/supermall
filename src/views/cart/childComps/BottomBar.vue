<template>
  <div class="bottom-bar">
    <div class="check-content">
      <check-button
        class="check-button"
        :isCheck="allChecked"
      ></check-button>
      <span>全选</span>
    </div>
    <div class="price">
      合计:{{totalPrice}}
    </div>
    <div class="calculate">
      去计算:({{countLength}})
    </div>
  </div>
</template>
<script>
import CheckButton from "./CheckButton";
export default {
  name: "BottomBar",
  components: {
    CheckButton
  },
  computed: {
    totalPrice() {
      return this.$store.state.cartList
        .filter(item => {
          return item.checked;
        })
        .reduce((pre, item) => {
          return pre + item.price * item.count;
        }, 0)
        .toFixed(2);
    },
    countLength() {
      return this.$store.state.cartList.filter(item => {
        return item.checked;
      }).length;
    },
    allChecked() {
      if (this.$store.state.cartList.length == 0) return false;
      return !this.$store.state.cartList.filter(item => {
        return !item.checked;
      }).length;
    }
  }
};
</script>
<style scoped>
.bottom-bar {
  display: flex;
  width: 100%;
  background: #eee;
  height: 40px;
  line-height: 40px;
}
.check-content {
  width: 60px;
  display: flex;
  align-items: center;
  /* line-height: 40px; */
  margin-left: 10px;
}
.check-button {
  width: 22px;
  height: 22px;
  line-height: 22px;
  margin-right: 5px;
}
.price {
  margin-left: 30px;
  flex: 1;
}
.calculate {
  width: 100px;
  background: red;
  text-align: center;
  color: #fff;
  font-size: 14px;
}
</style>