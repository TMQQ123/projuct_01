<template>
  <div class="search-top">
    <svg class="icon fanhui" aria-hidden="true" @click="$router.go(-1)">
      <use xlink:href="#icon-fanhui"></use>
    </svg>
    <div class="search">
      <span>
        <svg class="icon fanhui" aria-hidden="true">
          <use xlink:href="#icon-sousuo"></use>
        </svg>
      </span>
      <input type="text" placeholder="周杰伦" v-model="searchKey" @keyup.enter="enterKey" />
    </div>
    <span @click="enterKey">搜索</span>
  </div>
  <!-- 搜索历史 -->
  <div class="search-history">
    <div class="history-top">
      <span>历史</span>
      <svg class="icon shanchu" aria-hidden="true" @click="delHistoryList">
        <use xlink:href="#icon-shanchu"></use>
      </svg>
    </div>
    <div class="history-body" ref="target">
      <span v-for="item in keyWorldList.historyList" :key="item" @click="searchHistory(item)">{{ item }}</span>
    </div>
  </div>
  <!-- 搜索歌曲列表 -->
  <div class="item-list">
    <div class="item" v-for="(item, i) in searchList" :key="item.id">
      <div class="itemleft" @click="updateIndex(item)">
        <span>{{ i + 1 }}</span>
        <div class="message">
          <p>{{ item.name }}</p>
          <span v-for="(item1, index) in item.artists" :key="item1.id">{{item1.name}}</span>
        </div>
      </div>
      <div class="itemright">
        <svg class="icon bofang1" aria-hidden="true" v-if="item.mvid != 0">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-gengduo-shuxiang"></use>
        </svg>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, reactive, ref, getCurrentInstance } from "vue";
import { getSearchMusic } from "@/api//home";
import { useStore } from "vuex";
export default {
  name: "Search",
  setup(props) {
    const { proxy } = getCurrentInstance();
    const store = useStore();
    // console.log(proxy);
    const keyWorldList = reactive({
      historyList: [],
    });
    const searchKey = ref("");
    const searchList = ref([]);

    // ---------------------------------------
    // 历史记录
    onMounted(() => {
      keyWorldList.historyList = JSON.parse(localStorage.getItem("historyList"))
        ? JSON.parse(localStorage.getItem("historyList"))
        : [];
    });
    const enterKey = () => {
      // console.log(searchKey.value);
      // console.log(keyWorldList.historyList);
      if (searchKey.value !== "") {
        keyWorldList.historyList.unshift(searchKey.value);
        // 去重
        keyWorldList.historyList = [...new Set(keyWorldList.historyList)];
        // 固定历史记录个数
        // console.log(proxy);
        // console.log(proxy.$refs.target.offsetHeight);
        if (keyWorldList.historyList.length > 10) {
          keyWorldList.historyList.splice(
            keyWorldList.historyList.length - 1,
            1
          );
        }
        localStorage.setItem(
          "historyList",
          JSON.stringify(keyWorldList.historyList)
        );
        // 获取数据
        getSearchMusic(searchKey.value).then((result) => {
          // console.log(result);
          searchList.value = result.data.result.songs;
          // console.log(searchList.value);
        });
        searchKey.value = "";
      }
    };
    // 点击历史记录搜索
    const searchHistory = (item) => {
      getSearchMusic(item).then((result) => {
        console.log(result);
        searchList.value = result.data.result.songs;
        console.log(searchList.value);
      });
    };
    // 删除历史记录
    const delHistoryList = () => {
      localStorage.removeItem("historyList");
      keyWorldList.historyList = [];
    };

    // ---------------------------------------
    // 点击播放歌曲
    const updateIndex = (item) => {
      item.al = item.album;
      item.ar = item.artists;
      item.al.picUrl = item.album.artist.img1v1Url;
      store.commit("pushMusicList", item);
      store.commit("updateMusicListIndex", store.state.musicList.length - 1);
    };

    return {
      keyWorldList,
      enterKey,
      searchKey,
      delHistoryList,
      searchList,
      searchHistory,
      updateIndex,
    };
  },
};
</script>

<style lang="less" scoped>
.search-top {
  width: 100%;
  height: 1rem;
  padding: 0 0.2rem;
  display: flex;
  justify-content: space-between;
  align-items: center;

  .fanhui {
    transform: scale(0.8);
  }

  .search {
    display: flex;
    justify-content: flex-start;
    width: 75%;
    height: 0.6rem;
    border-radius: 0.3rem;
    color: #333;
    padding-left: 0.1rem;
    background-color: #eee;

    span {
      display: flex;
      align-items: center;
      justify-content: flex-end;
      fill: #ccc;
      transform: scale(0.9);
    }

    input {
      display: block;
      width: 100%;
      height: 0.6rem;
      border: none;
      border-top-right-radius: 0.3rem;
      border-bottom-right-radius: 0.3rem;
      border: 1px solid #eee;
      background-color: #eee;
      // 光标颜色
      caret-color: #000;
      // 光标位置
      text-indent: 0.06rem;
    }

    input::placeholder {
      padding-left: 0.08rem;
      color: #ccc;
    }
  }
}

// 历史记录
.search-history {
  width: 100%;
  display: flex;
  flex-direction: column;
  padding: 0 0.2rem;
  background-color: #f8f8ff;

  .history-top {
    display: flex;
    justify-content: space-between;
    padding-top: 0.1rem;

    .shanchu {
      transform: scale(0.8);
      fill: #999;
    }
  }

  .history-body {
    span {
      display: inline-block;
      height: 0.6rem;
      line-height: 0.6rem;
      background-color: #fff;
      margin: 5px;
      padding: 0 0.2rem;
      border-radius: 0.3rem;
      color: #333;
    }
  }
}

// 搜索歌曲列表
.item-list {
  margin-bottom: 1.3rem;
  padding: 0.2rem;

  .item {
    display: flex;
    justify-content: space-between;
    margin-bottom: 0.2rem;

    .itemleft,
    .itemright {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .itemleft {
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
    }

    .itemright {
      flex: 1;
      justify-content: flex-end;

      .bofang1 {
        margin-right: 0.3rem;
      }
    }
  }
}
</style>
