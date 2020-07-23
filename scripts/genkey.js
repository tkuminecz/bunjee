const shortid = require('shortid');

const key = Array(10).fill(0).map(shortid.generate).join('');
// eslint-disable-next-line no-console
console.log(key);
