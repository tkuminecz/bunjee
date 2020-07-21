const crypto = require('crypto');

crypto.generateKeyPair(
  'rsa',
  {
    modulusLength: 2048,
    publicKeyEncoding: {
      type: 'spki',
      format: 'pem',
    },
    privateKeyEncoding: {
      type: 'pkcs8',
      format: 'pem',
      cipher: 'aes-256-cbc',
      passphrase: 'top secret',
    },
  },
  (err, pub, priv) => {
    if (err) {
      console.error(err);
    } else {
      const secret = priv.split(/\n/).slice(1, -2).join('');
      // eslint-disable-next-line no-console
      console.log(secret);
    }
  }
);
