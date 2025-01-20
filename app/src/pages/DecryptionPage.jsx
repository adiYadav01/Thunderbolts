import React from "react";
import FileUpload from "../components/FileUpload";
import FileList from "../components/FileList";

const DecryptionPage = () => {
  return (
    <div className="min-h-screen bg-gradient-to-r from-gray-100 to-gray-300">
      {/* Header Section */}
      <div className="bg-gray-800 text-white py-4 shadow-lg">
        <h1 className="text-3xl font-bold text-center">
          Chat Decryption Tool
        </h1>
        <p className="text-center text-gray-300 mt-1">
          Upload encrypted files and decrypt them effortlessly.
        </p>
      </div>

      {/* Main Content */}
      <div className="container mx-auto p-8">
        <div className="grid grid-cols-2 gap-6">
          {/* File Upload Section */}
          <div className="bg-white shadow-md rounded-lg p-6 border">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Upload Your Encrypted File
            </h2>
            <p className="text-gray-600 mb-4">
              Select and upload the encrypted file you want to decrypt. The file details will appear below.
            </p>
            <FileUpload />
          </div>

          {/* File List Section */}
          <div className="bg-white shadow-md rounded-lg p-6 border">
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Decrypted File Details
            </h2>
            <p className="text-gray-600 mb-4">
              Below is the list of files you have uploaded along with their decrypted content.
            </p>
            <FileList />
          </div>
        </div>
      </div>

      {/* Footer Section */}
      <footer className="bg-gray-800 text-white py-4 mt-10">
        <p className="text-center text-sm">
          © {new Date().getFullYear()} Chat Decryption Tool | All Rights Reserved
        </p>
      </footer>
    </div>
  );
};

export default DecryptionPage;
