<template>
  <div class="detail-top" v-if="state">
    <img :src="state.coverImgUrl" alt="" class="bgimg">
    <div class="item-left">
      <span>
        <svg class="icon" aria-hidden="true" @click="$router.go(-1)">
          <use xlink:href="#icon-fanhui"></use>
        </svg>
      </span>
      <span class="name">歌单</span>
    </div>
    <div class="item-right">
      <span>
        <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </span>
      <span>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-31liebiao"></use>
        </svg>
      </span>
    </div>
  </div>
</template>

<script>
export default {
  name: "DetailTop",
  props: ["state"],
  setup() {},
};
</script>

<style lang="less" scoped>
.detail-top {
  width: 100%;
  height: 0.9rem;
  display: flex;
  justify-content: space-between;
  align-items: center;
  //   padding: 0.2rem;
  position: relative;
  .item-left,
  .item-right {
    width: 25%;
    height: 100%;
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0.2rem;
    .name {
      font-size: 0.4rem;
      color: #fff;
    }
    .icon {
      fill: #fff;
    }
  }
  .bgimg {
    width: 100%;
    height: 11rem;
    position: fixed;
    z-index: -1;
    filter: blur(0.6rem);
  }
}
</style>