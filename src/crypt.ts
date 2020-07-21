import Cryptr from 'cryptr';

export const encrypt = (secret: string, message: string): string => {
  const cryptr = new Cryptr(secret);
  return cryptr.encrypt(message);
};

export const decrypt = (secret: string, cipherText: string): string => {
  const cryptr = new Cryptr(secret);
  return cryptr.decrypt(cipherText);
};
