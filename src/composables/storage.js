import CryptoJS from "crypto-js";

export function useEncrypt(text) {
  return CryptoJS.AES.encrypt(text, import.meta.env.VITE_CRYPT_KEY).toString();
}

export function useDecrypt(ciphertext) {
  const bytes = CryptoJS.AES.decrypt(ciphertext, "secret key 123");
  return bytes.toString(CryptoJS.enc.Utf8);
}

