import CryptoJS from 'crypto-js';
import config from '../config';

export const encryptPassword = async (password: string) => {
  if (!config.encrypt_key) {
    throw new Error('Encryption key is not defined');
  }
  const encryptedPassword = CryptoJS.AES.encrypt(
    password,
    config.encrypt_key
  ).toString();
  return encryptedPassword;
};

export const decryptPassword = async (password: string) => {
  if (!config.encrypt_key) {
    throw new Error('Encryption key is not defined');
  }
  const decrypted = CryptoJS.AES.decrypt(password, config.encrypt_key);
  return decrypted.toString(CryptoJS.enc.Utf8);
};

export const comparePassword = async (
  password: string,
  encryptedPassword: string
) => {
  const match = password === (await decryptPassword(encryptedPassword));
  return match;
};
