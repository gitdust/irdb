export const hasOwnProperty = (obj, property) => Object.prototype.hasOwnProperty.call(obj, property);

export const createObjectURL = fileObj => window.URL.createObjectURL(fileObj);

