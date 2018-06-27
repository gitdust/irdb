import { API_HOST } from '@/config';
import axios from 'axios';
import store from '@/store';
import * as globalMessage from './feedback';
import * as globalLoading from './loading';
import { hasOwnProperty } from './tools';

const defaultConfig = {
  baseURL: API_HOST,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000, // 单位毫秒
};

const client = axios.create(defaultConfig);

// reject 工具
const rejectError = response => new Promise((resolve, reject) => {
  reject(response);
});

// request 处理函数
const handleRequest = (config) => {
  // console.log(config);
  const newConfig = config;
  const isGETMethod = !hasOwnProperty(newConfig, 'method');

  // 解决 GET 请求缓存问题
  if (isGETMethod) {
    newConfig.params = {
      r: Date.now(),
    };
  }
  // console.log(newConfig.params);
  return newConfig;
};

// request 处理
client.interceptors.request.use(handleRequest, (err) => {
  console.log({ err });
});

// response 处理函数
const handleResponse = (response) => {
  const { data, request: { responseURL } } = response;
  const status = `${response.status}`;

  // 4xx/5xx错误
  if (status.charAt(0) === '4' || status.charAt(0) === '5') {
    return rejectError({ message: `错误信息:\n${JSON.stringify(data)}\n错误url:\n${responseURL}` });
  }

  if (!data.ok) {
    return rejectError({ message: `错误:\n${data.message}` });
  }

  return data;
};

// response 处理
client.interceptors.response.use(handleResponse, (error) => {
  if (error.response) {
    return handleResponse(error.response);
  } else if (error.request) {
    console.log(error.request);
  } else {
    console.log('Error', error.message, error.stack);
  }
});

/**
 * 客户端请求
 * @param {string} url 接口path
 * @param {object} config 接口参数
 * config = {
 *   // 默认 'GET' 请求
 *   method: 'POST',
 *   // queryString 数据
 *   params: {
 *     username: 'admin',
 *   },
 *   // body 数据
 *   data: {
 *     name: 'admin',
 *   },
 * }
 */
const request = (url, config = {}) => {
  store.state.loading = true;
  globalLoading.start();
  defaultConfig.url = url;
  const newConfig = Object.assign(config, defaultConfig);

  return client.request(newConfig)
    .then((res) => {
      globalLoading.done();
      return res.data || true;
    })
    .catch((err) => {
      store.state.loading = false;
      globalLoading.done();
      console.log(err.message);
      // TODO: 出错之后的页面跳转
      globalMessage.error(err.message);
      return false;
    });
};

export default request;
