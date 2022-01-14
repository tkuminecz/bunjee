import Cryptr from 'cryptr'
import shortid from 'shortid'

export const encrypt = (secret: string, message: string): string => {
  const cryptr = new Cryptr(secret)
  return cryptr.encrypt(message)
}

export const decrypt = (secret: string, cipherText: string): string => {
  const cryptr = new Cryptr(secret)
  return cryptr.decrypt(cipherText)
}

export const generateSecret = async (): Promise<string> => {
  return Array(10).fill(0).map(shortid.generate).join('')
}
