<template>
  <div class="detail-body" v-if="state">
    <div class="item-box">
      <div class="left">
        <img :src="state.coverImgUrl" alt="">
        <span class="play-count">
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-24gl-play"></use>
          </svg>
          {{changeCount(state.playCount)}}
        </span>
      </div>

      <div class="right">
        <span class="one">{{state.name}}</span>
        <div class="two">
          <span class="pct"><img :src="state.creator.backgroundUrl" alt=""></span>
          <span>{{state.creator.nickname}}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </div>
        <span class="three">
          <span>{{state.description}}</span>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-youjiantou"></use>
          </svg>
        </span>
      </div>
    </div>
    <DetailIcon :state="state" />

  </div>
</template>

<script>
import DetailIcon from "./detail-icon.vue";
export default {
  name: "DetailBody",
  components: { DetailIcon },
  props: ["state"],
  setup(props) {
    // 播放量转换
    const changeCount = (num) => {
      if (num >= 100000000) {
        return (num / 100000000).toFixed(1) + "亿";
      } else if (num >= 10000) {
        return (num / 10000).toFixed(1) + "万";
      }
    };

    return { changeCount };
  },
};
</script>

<style lang="less" scoped>
.detail-body {
  width: 100%;
  height: 200px;
  .item-box {
    height: 2.5rem;
    margin: 20px 10px 10px;
    display: flex;
    justify-content: space-around;
    .right {
      display: flex;
      height: 2.5rem;
      flex: 2;
      flex-direction: column;
      justify-content: space-between;
      padding: 0 0 0 0.2rem;
      .one {
        color: #fff;
        font-size: 0.32rem;
      }
      .two {
        display: flex;
        justify-content: start;
        align-items: center;
        color: #d3d7d4;
        font-size: 0.3rem;
      }
      .three {
        display: flex;
        justify-content: space-between;
        align-items: center;
        color: #8a8c8e;
        font-size: 0.24rem;
        span {
          overflow: hidden;
          text-overflow: ellipsis;
          display: -webkit-box;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }
      }
      .pct {
        display: inline-block;
        width: 0.6rem;
        height: 0.6rem;
        border-radius: 0.3rem;
        margin-right: 0.1rem;
        img {
          width: 0.6rem;
          height: 0.6rem;
          border-radius: 0.3rem;
        }
      }
    }
    .left {
      display: flex;
      position: relative;
      flex: 1;
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
          fill: #ccc;
        }
      }
      img {
        width: 2.5rem;
        height: 2.5rem;
        border-radius: 7px;
      }
    }
  }
}
</style>