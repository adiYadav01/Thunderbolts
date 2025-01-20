// src/utils/encryptionUtils.js
export const encrypt = (text) => {
    const key = "my_secret_key"; // Use a secure key in production
    return btoa(key + text); // Simple encoding for demonstration
  };
  
  export const decrypt = (encodedText) => {
    const key = "my_secret_key";
    return atob(encodedText).replace(key, "");
  };
  