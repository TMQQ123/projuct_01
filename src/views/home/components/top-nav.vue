<template>
  <div class="top-nav">
    <!-- 左侧列表图标 -->
    <div class="topleft">
      <svg class="icon" aria-hidden="true">
        <use xlink:href="#icon-31liebiao"></use>
      </svg>
    </div>
    <!-- 中间导航内容 -->
    <div class="topContent">
      <span @click="$router.push('/infoUser')">我的</span>
      <span class="active">发现</span>
      <span>云村</span>
      <span>视频</span>
    </div>
    <!-- 右侧搜索图标 -->
    <div class="topright">
      <svg class="icon" aria-hidden="true" @click="$router.push('/search')">
        <use xlink:href="#icon-sousuo"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  name: "TopNav",
};
</script>

<style lang="less" scoped>
.top-nav {
  width: 100%;
  height: 1rem;
  padding: 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .topleft,
  .topright {
    width: 0.5rem;
    height: 0.5rem;
    justify-content: center;
    align-items: center;
  }

  .topContent {
    width: 65%;
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    font-size: 0.36rem;

    .active {
      font-weight: 900;
    }
  }
}
</style>