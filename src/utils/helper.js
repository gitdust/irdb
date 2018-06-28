import placeHolder from 'statics/img/placeholder.jpeg';

export const hasOwnProperty = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property);

export const createObjectURL = fileObj => window.URL.createObjectURL(fileObj);

export const transformProtocol = (url) => {
  const currentProtocol = window.location.protocol;
  if (currentProtocol === 'https:') {
    return url.replace('http', 'https');
  }
  return url;
};

export const errorImage = (event) => {
  event.target.src = placeHolder;
};
