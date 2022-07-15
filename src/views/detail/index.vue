<template>
  <DetailTop :state="state" />
  <DetailBody :state="state" />
  <DetailList :state="state" />
</template>

<script>
import { onMounted, ref } from "vue";
import { useRoute } from "vue-router";
import { getMusicDetail } from "@/api/detail";
import DetailTop from "./detail-top.vue";
import DetailBody from "./detail-body.vue";
import DetailList from "./detail-list.vue";

export default {
  name: "Detail",
  components: { DetailTop, DetailBody, DetailList },
  setup() {
    const state = ref(null);
    const route = useRoute();
    onMounted(async () => {
      // 歌单id
      const id = route.query.id;
      // 歌单列表
      const detailData = await getMusicDetail(id);
      console.log(detailData);
      state.value = detailData.data.playlist;
    });

    return { state };
  },
};
</script>

<style lang="less" scoped>
</style>