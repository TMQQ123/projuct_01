<template>
  <div class="detail-icon">
    <div class="icon-item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xinxi"></use>
      </svg>
      <span>{{state.commentCount}}</span>
    </div>
    <div class="icon-item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-fenxiang-"></use>
      </svg>
      <span>{{state.shareCount}}</span>
    </div>
    <div class="icon-item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-xiazai1"></use>
      </svg>
      <span>下载</span>
    </div>
    <div class="icon-item">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-show_duoxuan"></use>
      </svg>
      <span>多选</span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailIcon",
  props: ["state"],
  setup(props) {},
};
</script>

<style lang="less" scoped>
.detail-icon {
  width: 100%;
  height: 1rem;
  margin: 0.3rem 0 0.4rem 0;
  display: flex;
  justify-content: space-around;
  align-items: center;

  .icon-item {
    width: 25%;
    height: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    span {
      color: #f6f5ec;
    }
    .icon {
      width: 1rem;
      height: 1rem;
      fill: #f6f5ec;
    }
  }
}
</style>