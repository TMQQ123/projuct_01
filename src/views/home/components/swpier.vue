<template>
  <div class="top-swipe">
    <van-swipe :autoplay="3000" lazy-render>
      <van-swipe-item v-for="image in state.images" :key="image">
        <img :src="image.pic" />
      </van-swipe-item>
    </van-swipe>
  </div>
</template>

<script>
import { onMounted, reactive } from "vue";
import { getBanner } from "@/api/home.js";
export default {
  name: "Swiper",
  setup() {
    const state = reactive({
      images: [
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-1.jpeg",
        "https://fastly.jsdelivr.net/npm/@vant/assets/apple-2.jpeg",
      ],
    });

    // ------------------------------------

    onMounted(async () => {
      let res = await getBanner();
      state.images = res.data.banners;
      // console.log(res);
    });
    return { state };
  },
};
</script>

<style lang="less" scoped>
.top-swipe {
  .van-swipe {
    width: 100%;
    height: 3rem;
    .van-swipe-item {
      padding: 0 0.2rem;
      img {
        width: 100%;
        height: 100%;
        border-radius: 0.2rem;
      }
    }
    /deep/ .van-swipe__indicator--active {
      background-color: rgb(219, 130, 130);
    }
  }
}
</style>