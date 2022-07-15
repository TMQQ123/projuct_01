<template>
  <div class="detail-music" v-if="music">
    <img src="@/assets/bg.png" alt="" class="bgimg">
    <!-- 头部 -->
    <div class="detail-music-top">
      <div class="top-left">
        <svg class="icon" aria-hidden="true" @click="back">
          <use xlink:href="#icon-xiajiantou"></use>
        </svg>
      </div>
      <div class="top-middle">
        <div class="message" ref="init">
          <Vue3Marquee class="name" v-if="music.name.width > 200">{{ music.name }}</Vue3Marquee>
          <p class="name" v-else>{{ music.name }}</p>
          <span class="ar">
            <span v-for="item in music.ar" :key="item.id">{{ item.name }}</span>
            <svg class="icon" aria-hidden="true">
              <use xlink:href="#icon-youjiantou"></use>
            </svg>
          </span>
        </div>
      </div>
      <div class="top-right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-fenxiang"></use>
        </svg>
      </div>
    </div>
    <!-- 中部 -->
    <div class="detail-music-middle" v-show="!flag" @click="flag = !flag">
      <img src="@/assets/cz.png" alt="" class="img_cz" :class="{ img_cz_active: !isbtnShow }">
      <img src="@/assets/cd.png" alt="" class="img_cd">
      <img :src="music.al.picUrl" alt="" class="img_ar"
        :class="{ img_ar_active: !isbtnShow, img_ar_paused: isbtnShow }">
    </div>
    <div class="musicLyric" ref="target" v-show="flag" @click="flag = !flag">
      <p v-for="item in datas" :key="item"
        :class="{ active: ($store.state.currentTime * 1000 >= item.time - 100 && $store.state.currentTime * 1000 < item.pre) }">
        {{ item.lrc }}
      </p>
    </div>
    <!-- 底部 -->
    <div class="detail-music-footer">
      <div class="footer-top">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-51hongxinxianxing"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-xiazai2"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-yinlechangpian"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-pinglun1"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo-shuxiang"></use>
        </svg>
      </div>
      <!-- 进度条 -->
      <div class="footer-middle">
        <input type="range" class="range" min="0" :max="$store.state.duration" v-model="$store.state.currentTime"
          step="0.05">
      </div>
      <div class="footer-bottom">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-liebiaoxunhuan"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(-1)">
          <use xlink:href="#icon-shangyishoushangyige"></use>
        </svg>
        <svg class="icon bofang1" aria-hidden="true" @click="play" v-if="isbtnShow">
          <use xlink:href="#icon-bofang1"></use>
        </svg>
        <svg class="icon bofang1" aria-hidden="true" @click="play" v-else>
          <use xlink:href="#icon-zanting1"></use>
        </svg>
        <svg class="icon" aria-hidden="true" @click="goPlay(1)">
          <use xlink:href="#icon-xiayigexiayishou"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofangliebiao"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { useStore } from "vuex";
import { computed, ref, getCurrentInstance, onUpdated, onMounted } from "vue";
export default {
  name: "DetailMusic",
  props: ["music", "isbtnShow", "play", "addduration"],
  setup(props) {
    const { proxy } = getCurrentInstance();
    // console.log(proxy);
    console.log(props.music);
    const store = useStore();
    const back = () => {
      store.commit("updetaDetailShow");
      flag.value = false
    };

    // 歌词显示与隐藏
    const flag = ref(false);
    const lyricArr = ref(null);
    const datas = computed((lyricArr) => {
      // console.log(store.state.musicLyric.lyric);
      if (store.state.musicLyric.lyric) {
        lyricArr = store.state.musicLyric.lyric
          .split(/[(\r\n)\r\n]+/)
          .map((item, i) => {
            let min = item.slice(1, 3);
            let sec = item.slice(4, 6);
            let mill = item.slice(7, 10);
            let lrc = item.slice(11, item.length);
            let time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
            if (isNaN(Number(mill))) {
              mill = item.slice(7, 9);
              lrc = item.slice(10, item.length);
              time = parseInt(min) * 60 * 1000 + parseInt(sec) * 1000 + parseInt(mill);
            }
            // console.log(min, sec, Number(mill), lrc);
            return { min, sec, mill, lrc, time };
          });
      }
      lyricArr.forEach((item, i) => {
        if (i === lyricArr.length - 1 || isNaN(lyricArr[i + 1].time)) {
          item.pre = 1000000;
        } else {
          item.pre = lyricArr[i + 1].time;
        }
      });
      // console.log(lyricArr);
      return lyricArr;
    });

    // ----------------------------------
    // 歌词固定设置
    onUpdated(() => {
      props.addduration()
      // console.log(proxy);
      let p = document.querySelector("p.active")
      let offsetTop = p.offsetTop
      // console.log(p.offsetTop);
      if (offsetTop > 250) {
        // console.log([proxy.$refs.target]);
        proxy.$refs.target.scrollTop = offsetTop - 250
      }
      if (store.state.currentTime === store.state.duration) {
        if (store.state.musicListIndex === store.state.musicList.length - 1) {
          store.commit('updateMusicListIndex', 0)
          props.play()
        } else {
          store.commit('updateMusicListIndex', store.state.musicListIndex + 1)
        }
      }
    })
    // ----------------------------------
    // 上下首切换
    const goPlay = (num) => {
      let index = store.state.musicListIndex + num
      if (index < 0) {
        console.log(store.state.musicList);
        index = store.state.musicList.length - 1
      } else if (index == store.state.musicList.length) {
        index = 0
      }
      store.commit('updateMusicListIndex', index)
    }

    onMounted(() => {
      props.addduration()
    })


    return { back, flag, lyricArr, datas, goPlay };
  },
};
</script>

<style lang="less" scoped>
.detail-music {
  width: 100%;
  height: 100%;

  .bgimg {
    width: 100%;
    height: 100%;
    position: absolute;
    z-index: -1;
    filter: blur(70px);
  }

  .icon {
    fill: #fff;
  }

  // 头部样式
  .detail-music-top {
    display: flex;
    justify-content: space-between;
    align-items: center;
    width: 100%;
    height: 1.2rem;
    //   background-color: pink;
    padding: 0.2rem;

    .top-left {
      .icon {
        transform: scale(1.5);
      }
    }

    .top-middle .message {
      width: 4rem;
      display: flex;
      flex-direction: column;
      justify-content: center;
      align-items: center;

      .name {
        font-size: 0.32rem;
        color: #fff;
      }

      .ar {
        display: flex;
        justify-content: center;
        font-size: 0.26rem;
        color: #999999;

        .icon {
          width: 0.4rem;
          height: 0.4rem;
        }
      }
    }
  }

  // 中部样式
  .detail-music-middle {
    width: 100%;
    height: 9rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    position: relative;

    img {
      width: 100%;
    }

    .img_cz {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(-13deg);
      transition: all 2s;
    }

    .img_cz_active {
      width: 2rem;
      height: 3rem;
      position: absolute;
      left: 46%;
      transform-origin: 0 0;
      transform: rotate(0deg);
      transition: all 2s;
    }

    .img_cd {
      width: 5rem;
      height: 5rem;
      position: absolute;
      bottom: 2.3rem;
      z-index: -1;
    }

    .img_ar {
      width: 3.2rem;
      height: 3.2rem;
      border-radius: 50%;
      position: absolute;
      bottom: 3.14rem;
      animation: identifier 15s linear infinite;
    }

    .img_ar_active {
      animation-play-state: running;
    }

    .img_ar_paused {
      animation-play-state: paused;
    }

    @keyframes identifier {
      0% {
        transform: rotateZ(0deg);
      }

      100% {
        transform: rotateZ(360deg);
      }
    }
  }

  // 歌词
  .musicLyric {
    width: 100%;
    height: 8.6rem;
    display: flex;
    flex-direction: column;
    align-items: center;
    overflow: scroll;

    p {
      color: rgb(190, 181, 181);
      margin-bottom: 20px;
    }

    .active {
      color: #fff;
      font-size: 20px;
    }
  }

  // 底部样式
  .detail-music-footer {
    width: 100%;
    height: 3rem;
    position: absolute;
    bottom: 0.2rem;
    display: flex;
    flex-direction: column;
    justify-content: space-between;

    .footer-top {
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .icon {
        width: 0.5rem;
        height: 0.5rem;
        fill: rgb(245, 234, 234);
      }
    }

    .footer-middle {
      .range {
        width: 100%;
        height: 0.06rem;
        background-color: pink;
      }

    }

    .footer-bottom {
      width: 100%;
      height: 1rem;
      display: flex;
      justify-content: space-around;
      align-items: center;

      .bofang1 {
        transform: scale(1.8);
      }
    }

  }
}
</style>