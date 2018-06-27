import { DEBUG } from '@/config';
import * as globalMessage from '@/utils/feedback';

// 收集客户端错误信息
window.onerror = (message, source, lineno, colno) => {
  const msg = {};
  msg.userAgent = window.navigator.userAgent;
  msg.message = message;
  msg.source = source;
  msg.lineno = lineno;
  msg.colno = colno;
  msg.page = window.location.href;
  if (DEBUG) {
    console.log('客户端错误:\n', msg.message);
  } else {
    // 图像 Ping 搜集客户端错误
    const img = new Image();
    img.src = `/api/client?error=${JSON.stringify(msg)}`;
  }
  // TODO: 运行时错误跳转页面
  globalMessage.error(message);
};
