// src/components/Header.jsx
import React, { useState } from "react";

const Header = ({ toggleMode, darkMode }) => {
  return (
    <header style={styles.header}>
      <div style={styles.headerContent}>
        <h1 style={styles.logo}>Chat Decryption Tool</h1>
        <div style={styles.headerRight}>
          <button onClick={toggleMode} style={styles.modeButton}>
            {darkMode ? "Light Mode" : "Dark Mode"}
          </button>
          <button style={styles.loginButton}>Login</button>
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    padding: "20px",
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
  },
  headerContent: {
    display: "flex",
    justifyContent: "space-between",
    width: "100%",
    maxWidth: "1200px",
  },
  logo: {
    fontSize: "2rem",
  },
  headerRight: {
    display: "flex",
    alignItems: "center",
  },
  modeButton: {
    backgroundColor: "#fff",
    color: "#4CAF50",
    border: "none",
    padding: "10px 20px",
    marginRight: "20px",
    cursor: "pointer",
  },
  loginButton: {
    backgroundColor: "#fff",
    color: "#4CAF50",
    border: "none",
    padding: "10px 20px",
    cursor: "pointer",
  },
};

export default Header;
