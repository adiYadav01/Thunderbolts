import React, { useState } from "react";
import { collection, addDoc, Timestamp } from "firebase/firestore";
import { db } from "../firebase/firebaseconfig";
import CryptoJS from "crypto-js";

const FileUpload = () => {
  const [fileData, setFileData] = useState(null); // Selected .txt file
  const [encryptionKey, setEncryptionKey] = useState(""); // Custom encryption key
  const [uploadStatus, setUploadStatus] = useState(""); // Status messages
  const [isUploading, setIsUploading] = useState(false); // Disable button during upload

  // Handle file selection
  const handleFileChange = (e) => {
    setFileData(e.target.files[0]);
  };

  // Handle encryption key input
  const handleKeyChange = (e) => {
    setEncryptionKey(e.target.value);
  };

  // Encrypt and upload file to Firestore
  const handleUpload = async () => {
    if (!fileData || !encryptionKey) {
      alert("Please select a file and enter an encryption key.");
      return;
    }

    setUploadStatus("Encrypting and uploading... Please wait.");
    setIsUploading(true);

    try {
      const fileReader = new FileReader();

      // Read the .txt file
      fileReader.onload = async () => {
        const plainText = fileReader.result.trim(); // File content

        try {
          // Encrypt the file content
          const encryptedData = CryptoJS.AES.encrypt(plainText, encryptionKey).toString();

          // Store encrypted data in Firestore
          await addDoc(collection(db, "files"), {
            fileName: fileData.name, // Original file name
            encryptedData: encryptedData, // Encrypted text
            timestamp: Timestamp.now(),
          });

          setUploadStatus("File encrypted and uploaded successfully!");
        } catch (error) {
          setUploadStatus("Encryption failed. Please try again.");
        }

        setIsUploading(false);
      };

      fileReader.readAsText(fileData); // Read the file as text
    } catch (error) {
      console.error("Upload failed:", error);
      setUploadStatus("An error occurred during upload.");
      setIsUploading(false);
    }
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h2>Upload a File to Encrypt</h2>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Choose a Plain Text File (.txt):
        </label>
        <input
          type="file"
          accept=".txt"
          onChange={handleFileChange}
          disabled={isUploading}
          style={{ padding: "5px" }}
        />
      </div>
      <div style={{ marginBottom: "10px" }}>
        <label style={{ display: "block", marginBottom: "5px" }}>
          Enter Encryption Key:
        </label>
        <input
          type="text"
          value={encryptionKey}
          onChange={handleKeyChange}
          disabled={isUploading}
          style={{ padding: "5px", width: "100%" }}
        />
      </div>
      <button
        onClick={handleUpload}
        disabled={isUploading}
        style={{
          padding: "10px 20px",
          backgroundColor: isUploading ? "#ccc" : "#007bff",
          color: "#fff",
          border: "none",
          borderRadius: "5px",
          cursor: isUploading ? "not-allowed" : "pointer",
        }}
      >
        {isUploading ? "Uploading..." : "Encrypt & Upload"}
      </button>
      <div style={{ marginTop: "20px", color: isUploading ? "#007bff" : "#000" }}>
        {uploadStatus}
      </div>
    </div>
  );
};

export default FileUpload;
