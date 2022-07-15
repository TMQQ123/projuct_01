import { createStore } from "vuex";
import { getMusicLyric } from "@/api/detail";
import { getLogin } from "@/api/home";

export default createStore({
  state: {
    musicList: [
      {
        al: {
          id: 96799251,
          name: "我又想你了",
          pic: 109951165416746530,
          picUrl:
            "https://p2.music.126.net/XnLAbFfmIEyHW3_mtvvKrA==/109951165416746532.jpg",
          pic_str: "109951165416746532",
        },
        id: 2360129270,
        name: "我又想你了",
        ar: [{ id: 34171281, name: "善喜" }],
      },
    ],
    // 默认播放音乐列表下标
    musicListIndex: 0,
    // 播放按钮
    isbtnShow: true,
    // 歌曲详情页展示
    detailShow: false,
    // 歌词
    musicLyric: {},
    // 当前歌曲播放到时间
    currentTime: 0,
    // 歌曲总时长
    duration: 0,
    // 判断是否登录
    isLogin: false,
    // 判断是否显示底部播放组件
    isFooterMusic: true,
    // 个人信息
    token: "",
  },
  mutations: {
    updateIsbtnShow(state, step) {
      state.isbtnShow = step;
    },
    updateMusicList(state, step) {
      state.musicList = step;
    },
    updateMusicListIndex(state, step) {
      state.musicListIndex = step;
      console.log(step);
    },
    updetaDetailShow(state) {
      state.detailShow = !state.detailShow;
    },
    updateMusciLyric(state, step) {
      state.musicLyric = step;
    },
    updateCurrentTime(state, step) {
      // console.log(state.currentTime);
      state.currentTime = step;
    },
    updateDuration(state, step) {
      state.duration = step;
      // console.log(state.duration);
    },
    pushMusicList(state, step) {
      state.musicList.push(step);
    },
    updateIsLogin(state, step) {
      state.isLogin = step;
    },
    updateToken(state, step) {
      state.token = step;
      localStorage.setItem = ("token", state.token);
    },
  },
  actions: {
    getLyric: async function (context, id) {
      let res = await getMusicLyric(id);
      // console.log(res);
      // console.log(id);
      context.commit("updateMusciLyric", res.data.lrc);
    },

    getLogin: async function (context, value) {
      let res = await getLogin(value);
      // console.log(res);
      return res;
      // console.log(id);
    },
  },
  modules: {},
});
