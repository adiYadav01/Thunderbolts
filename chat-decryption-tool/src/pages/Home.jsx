// src/pages/Home.jsx
import React from "react";
import { Link } from "react-router-dom";

const Home = () => {
  return (
    <div style={styles.page}>
      {/* Header */}
      <header style={styles.header}>
        <h2>Chat Decryption Tool</h2>
        <nav style={styles.nav}>
          <Link to="/login" style={styles.navLink}>
            Login
          </Link>
          <Link to="/signup" style={styles.navLink}>
            Sign Up
          </Link>
        </nav>
      </header>

      {/* Main Section */}
      <main style={styles.main}>
        <section style={styles.description}>
          <h1>Welcome to the Chat Decryption Tool</h1>
          <p>
            Our app helps decrypt and analyze chats from WeChat and DingTalk,
            ensuring secure communication and providing insights into your
            data.
          </p>
        </section>

        {/* Feature Boxes */}
        <section style={styles.featuresSection}>
          <div style={styles.featureBox}>
            <h3>Secure Chat Analysis</h3>
            <p>
              Safely decrypt messages stored locally or in the cloud without
              compromising your data.
            </p>
            <button style={styles.learnMoreBtn}>Learn More</button>
          </div>
          <div style={styles.featureBox}>
            <h3>Data Export Options</h3>
            <p>
              Export decrypted chat data in multiple formats for reporting and
              evidence collection.
            </p>
            <button style={styles.learnMoreBtn}>Learn More</button>
          </div>
          <div style={styles.featureBox}>
            <h3>Cloud and Local Support</h3>
            <p>
              Supports decryption from both cloud storage and local device
              backups.
            </p>
            <button style={styles.learnMoreBtn}>Learn More</button>
          </div>
        </section>
      </main>

      {/* Footer */}
      <footer style={styles.footer}>
        <p>© 2025 Chat Decryption Tool. All rights reserved.</p>
        <p>
          Follow us:{" "}
          <a href="https://facebook.com" target="_blank" rel="noopener noreferrer">
            Facebook
          </a>{" "}
          |{" "}
          <a href="https://google.com" target="_blank" rel="noopener noreferrer">
            Google
          </a>{" "}
          |{" "}
          <a href="https://linkedin.com" target="_blank" rel="noopener noreferrer">
            LinkedIn
          </a>
        </p>
      </footer>
    </div>
  );
};

// Styles
const styles = {
  page: {
    fontFamily: "Arial, sans-serif",
    lineHeight: 1.6,
  },
  header: {
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    
    backgroundColor: "#4CAF50",
    color: "white",
  },
  nav: {
    display: "flex",
    gap: "10px",
  },
  navLink: {
    color: "white",
    textDecoration: "none",
    fontWeight: "bold",
    padding: "5px 10px",
    border: "1px solid white",
    borderRadius: "5px",
  },
  main: {
    textAlign: "center",
    padding: "20px",
  },
  description: {
    marginBottom: "30px",
  },
  featuresSection: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
    padding: "20px",
  },
  featureBox: {
    width: "300px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    boxShadow: "0 2px 5px rgba(0, 0, 0, 0.1)",
    textAlign: "left",
    backgroundColor: "white",
    transition: "transform 0.3s, box-shadow 0.3s",
    cursor: "pointer",
    position: "relative",
  },
  learnMoreBtn: {
    marginTop: "10px",
    padding: "8px 15px",
    border: "none",
    backgroundColor: "#4CAF50",
    color: "white",
    fontWeight: "bold",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "background-color 0.3s ease",
  },
  footer: {
    textAlign: "center",
    padding: "10px 20px",
    backgroundColor: "#4CAF50",
    color: "white",
    marginTop: "121px",
  },
};

export default Home;
