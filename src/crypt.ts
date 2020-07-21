import { generateKeyPair } from 'crypto';
import Cryptr from 'cryptr';

export const encrypt = (secret: string, message: string): string => {
  const cryptr = new Cryptr(secret);
  return cryptr.encrypt(message);
};

export const decrypt = (secret: string, cipherText: string): string => {
  const cryptr = new Cryptr(secret);
  return cryptr.decrypt(cipherText);
};

export const generateSecret = async (seed: string): Promise<string> => {
  return new Promise((resolve, reject) => {
    generateKeyPair(
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
          passphrase: seed,
        },
      },
      (err, pub, priv) => {
        if (err) {
          reject(err);
        } else {
          const secret = priv.split(/\n/).slice(1, -2).join('');
          resolve(secret);
        }
      }
    );
  });
};
