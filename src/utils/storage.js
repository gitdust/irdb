import { DEBUG } from '@/config';

const LStorage = window.localStorage;
const { JSON } = window;
// const SStorage = window.sessionStorage;

// 设置
export const set = (key, obj) => {
  LStorage.setItem(key, JSON.stringify(obj));
};

// 获取
export const get = (key) => {
  let string = LStorage.getItem(key);
  try {
    string = JSON.parse(string);
  } catch (err) {
    if (DEBUG) {
      console.log('JSON.parse出错,原数据:', string);
    }
  }
  return string || '';
};

// 移除
export const remove = (key) => {
  LStorage.removeItem(key);
};

// 清空
export const clear = () => LStorage.clear();

// 获取 user_id
export const getUserID = () => get('user_id');
