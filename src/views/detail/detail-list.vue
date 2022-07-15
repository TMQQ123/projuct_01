<template>
  <div class="detail-list" v-if="data && state">
    <div class="item-top">
      <div class="left">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-bofang"></use>
        </svg>
        <span>播放全部<i>(共{{ data.length }}首)</i></span>
      </div>
      <div class="right">
        <svg class="icon" aria-hidden="true">
          <use xlink:href="#icon-tianjia"></use>
        </svg>
        收藏({{ state.subscribedCount }})
      </div>
    </div>
    <!-- 歌曲部分 -->
    <div class="item-list">
      <div class="item" v-for="(item, i) in data" :key="item.id">
        <div class="itemleft" @click="playMusic(i)">
          <span>{{ i + 1 }}</span>
          <div class="message">
            <p>{{ item.name }}</p>
            <span v-for="(item1, index) in item.ar" :key="item1.id">{{ item1.name }}</span>
          </div>
        </div>
        <div class="itemright">
          <svg class="icon bofang1" aria-hidden="true" v-if="item.mv != 0">
            <use xlink:href="#icon-bofang"></use>
          </svg>
          <svg class="icon" aria-hidden="true">
            <use xlink:href="#icon-gengduo-shuxiang"></use>
          </svg>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getDetailList } from "@/api/detail";
import { useStore } from "vuex";
export default {
  name: "DetailList",
  props: ["state"],
  setup(props) {
    const route = useRoute();
    const data = ref(null);
    onMounted(async () => {
      const id = route.query.id;
      console.log(id);
      const result = await getDetailList(id);
      console.log(result);
      data.value = result.data.songs;
    });

    // -----------------------------------
    const store = useStore();
    const playMusic = (i) => {
      store.commit("updateMusicList", data);
      store.commit("updateMusicListIndex", i);
    };
    return { data, playMusic };
  },
};
</script>

<style lang="less" scoped>
.detail-list {
  width: 100%;
  //   height: 50rem;
  padding: 0 0.2rem;
  margin-top: 10px;
  background-color: #fff;
  border-top-left-radius: 0.4rem;
  border-top-right-radius: 0.4rem;

  .item-top {
    display: flex;
    justify-content: space-between;
    padding-top: 10px;

    .left,
    .right {
      display: flex;
      justify-content: space-between;
      align-items: center;
    }

    .left {
      span {
        margin-left: 0.4rem;
      }

      i {
        color: #8a8c8e;
        font-size: 0.24rem;
      }
    }

    .right {
      color: #fff;
      font-size: 0.32rem;
      padding: 10px 5px;
      border: 1px solid transparent;
      border-radius: 21px;
      background-color: red;

      .icon {
        fill: #fff;
      }
    }
  }

  .item-list {
    margin-bottom: 1.3rem;

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
}
</style>
