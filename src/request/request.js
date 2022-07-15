import axios from "axios";

// 创建一个实例
const request = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 3000,
});
export default request;
