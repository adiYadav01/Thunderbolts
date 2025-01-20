import React, { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";
import CryptoJS from "crypto-js";

const FileList = () => {
  const [files, setFiles] = useState([]); // Files from Firestore
  const [selectedFileData, setSelectedFileData] = useState(""); // Decrypted data

  // Fetch files from Firestore
  useEffect(() => {
    const fetchFiles = async () => {
      const querySnapshot = await getDocs(collection(db, "files"));
      const fileList = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      setFiles(fileList);
    };

    fetchFiles();
  }, []);

  // Decrypt file content
  const handleDecrypt = (file) => {
    // Show prompt to get decryption key from the user
    const enteredKey = prompt("Please enter the decryption key:");

    if (!enteredKey) {
      alert("Decryption key is required to decrypt the file.");
      return;
    }

    try {
      const bytes = CryptoJS.AES.decrypt(file.encryptedData, enteredKey);
      const decryptedData = bytes.toString(CryptoJS.enc.Utf8);

      if (!decryptedData) {
        throw new Error("Decryption failed. Incorrect key.");
      }

      setSelectedFileData(decryptedData); // Set the decrypted data to display
    } catch (error) {
      alert("Decryption failed. Check the key or file.");
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Uploaded Files</h2>
      <ul>
        {files.map((file) => (
          <li key={file.id} style={{ marginBottom: "10px" }}>
            <p><strong>File Name:</strong> {file.fileName}</p>
            <button
              onClick={() => handleDecrypt(file)}
              style={{
                padding: "5px 10px",
                backgroundColor: "#007bff",
                color: "#fff",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              Decrypt
            </button>
          </li>
        ))}
      </ul>

      {selectedFileData && (
        <div
          style={{
            marginTop: "20px",
            whiteSpace: "pre-wrap",
            backgroundColor: "#f9f9f9",
            padding: "10px",
            borderRadius: "5px",
          }}
        >
          <h3>Decrypted Data:</h3>
          <pre>{selectedFileData}</pre>
        </div>
      )}
    </div>
  );
};

export default FileList;
