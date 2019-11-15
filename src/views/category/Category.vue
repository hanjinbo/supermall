<template>
  <div class="wrapper" ref="bs">
    <ul class="content">
      <li>liebiao1</li>
      <li>liebiao2</li>
      <li>liebiao3</li>
      <li>liebiao4</li>
      <li>liebiao5</li>
      <li>liebiao6</li>
      <li>liebiao7</li>
      <li>liebiao8</li>
      <li>liebiao9</li>
      <li>liebiao10</li>
      <li>liebiao11</li>
      <li>liebiao12</li>
      <li>liebiao13</li>
      <li>liebiao14</li>
      <li>liebiao15</li>
      <li>liebiao16</li>
      <li>liebiao17</li>
      <li>liebiao18</li>
      <li>liebiao19</li>
      <li>liebiao20</li>
    </ul>
  </div>
</template>
<script>
import Bscroll from "better-scroll";
export default {
  name: "Category",
  mounted() {
    let bs = new Bscroll(this.$refs.bs);
  }
};
</script>
<style scoped>
.wrapper {
  height: 300px;
  background: red;
}
</style>
