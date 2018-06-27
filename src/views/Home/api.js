import request from '@/utils/request';

const getResources = payload => request('/api', {
  method: 'POST',
  data: payload,
});

export default {
  getResources,
};

