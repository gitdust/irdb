const NODE_ENV = process.env.NODE_ENV || 'development'; // 默认本地开发
export const DEBUG = NODE_ENV !== 'production'; // 是否本地开发

export const API_HOST = DEBUG ? 'http://localhost:3005' : ''; // 后台接口
