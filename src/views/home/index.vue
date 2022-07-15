<template>
  <TopNav></TopNav>
  <Swiper></Swiper>
  <IconList></IconList>
  <MusicList></MusicList>
</template>

<script>
import TopNav from "./components/top-nav.vue";
import Swiper from "./components/swpier.vue";
import IconList from "./components/icon-list.vue";
import MusicList from "./components/music-list.vue";

export default {
  name: "APPHome",
  components: { TopNav, Swiper, IconList, MusicList },
};
</script>

<style>
</style>