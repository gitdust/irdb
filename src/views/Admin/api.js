import request from '@/utils/request';

const getResources = payload => request('/admin', {
  params: {
    token: payload.token,
    pageSize: 10,
    pageNo: payload.pageNo,
    q: payload.q,
  },
});

const updateResource = payload => request('/admin', {
  method: 'POST',
  data: payload,
});

const delResource = payload => request('/admin', {
  method: 'DELETE',
  data: payload,
});

export default {
  getResources,
  updateResource,
  delResource,
};

