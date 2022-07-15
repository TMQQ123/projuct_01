<template>
  <div class="footer-music" v-if="musicList">
    <div class="footer-left" @click="updetaDetailShow">
      <div class="pic"><img :src="musicList[musicListIndex].al.picUrl" alt=""></div>
      <div class="message">
        <p>{{ musicList[musicListIndex].name }}</p>
        <span v-for="item in musicList[musicListIndex].ar" :key="item.id">{{ item.name }}</span>
      </div>
    </div>
    <div class="footer-right">
      <svg class="icon bofang1" aria-hidden="true" @click="play()" v-if="isbtnShow">
        <use xlink:href="#icon-bofang"></use>
      </svg>
      <svg class="icon bofang1" aria-hidden="true" @click="play()" v-else>
        <use xlink:href="#icon-bofangzhong"></use>
      </svg>
      <svg class="icon duilie" aria-hidden="true">
        <use xlink:href="#icon-bofangduilie"></use>
      </svg>
    </div>
    <audio ref="audio"
      :src="`https://music.163.com/song/media/outer/url?id=${musicList[musicListIndex].id}.mp3`"></audio>
    <van-popup v-model:show="detailShow" position="bottom" :style="{ height: '100%', width: '100%' }">
      <DetailMusic :music="musicList[musicListIndex]" :play="play" :isbtnShow="isbtnShow" :addduration="addduration" />
    </van-popup>
  </div>
</template>

<script>
import { getCurrentInstance, onUpdated, watch, onMounted } from "vue";
import { mapState, useStore } from "vuex";
import DetailMusic from "@/views/detail/detail-music";
export default {
  name: "FooterMusic",
  components: { DetailMusic },
  computed: {
    ...mapState(["musicList", "musicListIndex", "isbtnShow", "detailShow"]),
  },

  setup() {
    const { proxy } = getCurrentInstance();
    console.log(proxy);
    const store = useStore();
    const play = () => {
      // 判断是否在播放
      if (proxy.$refs.audio.paused) {
        proxy.$refs.audio.play();
        store.commit("updateIsbtnShow", false);
        // 开启定时器
        updateTime();
      } else {
        proxy.$refs.audio.pause();
        store.commit("updateIsbtnShow", true);
        // 暂停清除定时器
        clearInterval(flag);
      }
    };
    // ------------------------
    // 点击其他歌曲 id 变化 自动播放
    watch(
      () => {
        store.state.musicListIndex;
        store.state.musicList;
      },
      () => {
        proxy.$refs.audio.autoplay = true;
        // 如果原本是暂停状态 播放时改变图标
        if (proxy.$refs.audio.paused) {
          store.commit("updateIsbtnShow", false);
        }
      },
      { deep: true }
    );

    // ------------------------
    // 点击下方歌曲进入详情页
    const updetaDetailShow = () => {
      store.commit("updetaDetailShow");
    };

    // ----------------------------------------
    // 歌词
    onMounted(() => {
      let index = store.state.musicListIndex;
      let currId = store.state.musicList[index].al.id;
      // console.log(currId);
      store.dispatch("getLyric", currId);
      updateTime();
      addduration();

    });
    onUpdated(() => {
      // 获取当前歌曲id
      let index = store.state.musicListIndex;
      let currId = store.state.musicList[index].id;
      // console.log(currId);
      store.dispatch("getLyric", currId);
      addduration();
    });
    const flag = 0;
    const updateTime = (flag) => {
      flag = setInterval(() => {
        store.commit("updateCurrentTime", proxy.$refs.audio.currentTime);
      }, 1000);
    };

    // ----------------------------------------
    // 进度条总时长
    const addduration = () => {
      store.commit('updateDuration', proxy.$refs.audio.duration)
      store.commit("updateCurrentTime", proxy.$refs.audio.currentTime);
    }

    return { play, updetaDetailShow, updateTime, addduration };
  },
};
</script>

<style lang="less" scoped>
.footer-music {
  width: 100%;
  height: 1.2rem;
  background-color: #f8f8ff;
  position: fixed;
  bottom: 0;
  border-top: #999;
  display: flex;
  justify-content: space-between;
  padding: 5px 10px;

  .footer-left,
  .footer-right {
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .footer-left {
    flex: 2;
    justify-content: flex-start;
    flex: 2;
    justify-content: flex-start;

    .message {
      margin-left: 0.3rem;
      color: #3e4145;

      span {
        color: #74787c;
        font-size: 0.24rem;
      }
    }

    .pic,
    img {
      border-radius: 0.5rem;
      width: 1rem;
      height: 1rem;
      border-radius: 50%;
    }
  }

  .footer-right {
    flex: 1;
    justify-content: flex-end;

    .icon {
      width: 0.6rem;
      height: 0.6rem;
    }

    .bofang1 {
      margin-right: 0.3rem;
      fill: #808080;
    }

    .duilie {
      fill: #808080;
    }
  }
}
</style>