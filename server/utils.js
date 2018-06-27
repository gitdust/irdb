exports.random = () => Math.random();

exports.sleep = (seconds) => {
  const now = Date.now();
  const milliseconds = seconds * 1000;
  while (((Date.now()) - now) < milliseconds) {
    //
  }
};
