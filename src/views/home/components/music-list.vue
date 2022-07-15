<template>
  <div class="music-list">
    <div class="music-top">
      <div class="title">发现好歌单</div>
      <div class="more">查看更多</div>
    </div>
    <div class="music-content" v-if="musicList">
      <van-swipe :loop="false" :width="135" class="my-swipe" :show-indicators="false">
        <van-swipe-item v-for="item in musicList" :key="item">
          <router-link :to="{path:'/detail',query:{id:item.id}}">
            <img :src="item.picUrl" alt="">
            <span class="play-count">
              <svg class="icon" aria-hidden="true">
                <use xlink:href="#icon-24gl-play"></use>
              </svg>
              {{changeCount(item.playCount)}}
            </span>
            <span class="name">{{item.name}}</span>
          </router-link>
        </van-swipe-item>
      </van-swipe>
    </div>
  </div>
</template>

<script>
import { getMusicList } from "@/api/home.js";
import { ref } from "vue";
export default {
  name: "MusicList",
  setup() {
    const musicList = ref({});
    getMusicList().then((res) => {
      musicList.value = res.data.result;
      console.log(res);
    });

    // ---------------------------
    // 播放量转换
    const changeCount = (num) => {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    };

    // ---------------------------
    return { musicList, changeCount };
  },
};
</script>

<style lang="less" scoped>
.music-list {
  width: 100%;
  height: 5rem;
  padding: 0.2rem;
  .music-top {
    width: 100%;
    height: 0.6rem;
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;
    .title {
      font-size: 0.4rem;
      font-weight: 900;
    }
    .more {
      border: 1px solid #ccc;
      text-align: center;
      line-height: 0.6rem;
      padding: 0 0.2rem;
      border-radius: 0.4rem;
    }
  }
  .music-content {
    width: 100%;
    height: 3.4rem;
    .my-swipe {
      height: 100%;
      position: relative;
      .play-count {
        position: absolute;
        top: 0.04rem;
        right: 0.2rem;
        font-size: 0.24rem;
        color: #ccc;
        display: flex;
        justify-items: center;
        align-items: center;
        .icon {
          color: #fff;
          width: 0.4rem;
          height: 0.4rem;
        }
      }
      img {
        width: 100%;
        height: 2.5rem;
        border-radius: 0.3rem;
        padding: 0 0.1rem;
      }
      .name {
        font-size: 0.28rem;
        color: #72777b;
      }
    }
  }
}
</style>