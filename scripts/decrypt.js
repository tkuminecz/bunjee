const Cryptr = require('cryptr');

const [secret, cipherText] = process.argv.slice(2);
const cryptr = new Cryptr(secret);

// eslint-disable-next-line no-console
console.log(cryptr.decrypt(cipherText));
