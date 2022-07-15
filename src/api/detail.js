// @ts-nocheck
import request from "@/request/request.js";

// 歌单详情页数据
export const getMusicDetail = (id) => {
  return request({
    method: "GET",
    url: `/playlist/detail?id=${id}`,
  });
};

// 获取歌单歌曲数据
export const getDetailList = (id) => {
  return request({
    method: "GET",
    url: `/playlist/track/all?id=${id}&limit=20&offset=0`,
  });
};

// 获取歌词数据
export const getMusicLyric = (id) => {
  return request({
    method: "GET",
    url: `/lyric?id=${id}`,
  });
};
