import request from "@/request/request";

// 获取首页轮播图数据
export const getBanner = () => {
  return request({
    method: "GET",
    url: "/banner?type=2",
  });
};

// 发现好歌单
export const getMusicList = () => {
  return request({
    method: "GET",
    url: "/personalized?limit=10",
  });
};

// 搜索获取
export const getSearchMusic = (name) => {
  return request({
    method: "GET",
    url: `/search?keywords=${name}`,
  });
};

// 电话登录
export const getLogin = (data) => {
  return request({
    method: "GET",
    url: `/login/cellphone?phone=${data.phone}&password=${data.password}`,
  });
};
