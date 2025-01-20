import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaLock, FaShieldAlt, FaChartBar, FaCloudUploadAlt, FaKey, FaDownload } from "react-icons/fa";
import image1 from "../assets/image1.jpg";
import image2 from "../assets/image2.jpg";
import image3 from "../assets/image3.jpg";

const Homepage = () => {
  const [darkMode, setDarkMode] = useState(false);
  const navigate = useNavigate();

  // Toggle dark mode
  const toggleMode = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? "#fff" : "#121212";
    document.body.style.color = darkMode ? "#000" : "#fff";
  };

  return (
    <div style={{ ...styles.page, ...(darkMode ? styles.darkMode : {}) }}>
      {/* Hero Section */}
      <section style={styles.hero}>
        <div style={styles.heroContent}>
          <h1 style={styles.heroTitle}>Decrypt, Analyze, Investigate.</h1>
          <p style={styles.heroSubtitle}>
            Effortlessly decrypt and analyze chat data from platforms like WeChat and DingTalk for evidence and insights.
          </p>
          <div style={styles.heroButtons}>
            <button
              style={{ ...styles.primaryButton, ...styles.animatedButton }}
              onClick={() => navigate("/decryption")}
            >
              Start Now
            </button>
            <button style={{ ...styles.secondaryButton, ...styles.animatedButton }}>Learn More</button>
          </div>
        </div>
        <div style={styles.heroImage}>
          <img src={image1} alt="Hero" style={styles.image} />
        </div>
      </section>

      {/* Features Section */}
      <section style={styles.features}>
        <h2 style={styles.sectionTitle}>Our Features</h2>
        <div style={styles.featureCards}>
          <div style={styles.featureCard}>
            <FaLock style={styles.featureIcon} />
            <h3 style={styles.cardTitle}>Decrypt with Ease</h3>
            <p>Easily decrypt WeChat and DingTalk messages from cloud or local storage.</p>
          </div>
          <div style={styles.featureCard}>
            <FaShieldAlt style={styles.featureIcon} />
            <h3 style={styles.cardTitle}>Secure & Reliable</h3>
            <p>We ensure your data's integrity and security during the process.</p>
          </div>
          <div style={styles.featureCard}>
            <FaChartBar style={styles.featureIcon} />
            <h3 style={styles.cardTitle}>Detailed Analysis</h3>
            <p>Generate comprehensive reports for forensic investigations.</p>
          </div>
          <div style={styles.featureCard}>
            <FaCloudUploadAlt style={styles.featureIcon} />
            <h3 style={styles.cardTitle}>Multi-Platform Support</h3>
            <p>Compatible with multiple devices and file formats.</p>
          </div>
        </div>
      </section>

      {/* Image Slider Section */}
      <section style={styles.imageSlider}>
        <h2 style={styles.sectionTitle}>Tools</h2>
        <div style={styles.slider}>
          <img src={image2} alt="Screenshot 1" style={styles.sliderImage} />
          <img src={image3} alt="Screenshot 2" style={styles.sliderImage} />
          <img src={image1} alt="Screenshot 3" style={styles.sliderImage} />
        </div>
      </section>

      {/* Testimonials Section */}
      <section style={styles.testimonials}>
        <h2 style={styles.sectionTitle}>What Our Users Say</h2>
        <div style={styles.testimonialCards}>
          <div style={styles.testimonialCard}>
            <p>"This tool made my investigation 3x faster with accurate decryption."</p>
            <span>- Investigator 1</span>
          </div>
          <div style={styles.testimonialCard}>
            <p>"Highly secure and easy to use for our forensic team."</p>
            <span>- Analyst 2</span>
          </div>
        </div>
      </section>

      {/* How It Works Section */}
      <section style={styles.howItWorks}>
        <h2 style={styles.sectionTitle}>How It Works</h2>
        <div style={styles.steps}>
          <div style={styles.step}>
            <FaCloudUploadAlt style={styles.stepIcon} />
            <h3 style={styles.cardTitle}>Upload File</h3>
            <p>Upload the chat backup file from local/cloud storage.</p>
          </div>
          <div style={styles.step}>
            <FaKey style={styles.stepIcon} />
            <h3 style={styles.cardTitle}>Decrypt</h3>
            <p>Select decryption options and unlock the messages.</p>
          </div>
          <div style={styles.step}>
            <FaChartBar style={styles.stepIcon} />
            <h3 style={styles.cardTitle}>Analyze</h3>
            <p>Get detailed reports and insights for investigation.</p>
          </div>
          <div style={styles.step}>
            <FaDownload style={styles.stepIcon} />
            <h3 style={styles.cardTitle}>Export</h3>
            <p>Export decrypted data and reports securely.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={styles.footer}>
        <div>Designed for investigators and analysts.</div>
        <div>
          <a href="https://facebook.com" target="_blank" rel="noreferrer" style={styles.footerLink}>
            Facebook
          </a>{" "}
          |{" "}
          <a href="https://linkedin.com" target="_blank" rel="noreferrer" style={styles.footerLink}>
            LinkedIn
          </a>{" "}
          |{" "}
          <a href="https://github.com" target="_blank" rel="noreferrer" style={styles.footerLink}>
            GitHub
          </a>
        </div>
        <div>© 2025 iDecrypt. All rights reserved.</div>
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
  darkMode: {
    backgroundColor: "#121212",
    color: "#fff",
  },
  hero: {
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    padding: "40px 20px",
    backgroundColor: "#f0f8ff",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  heroTitle: {
    fontSize: "3.5rem",
    fontWeight: "bold",
  },
  heroSubtitle: {
    marginTop: "10px",
    fontSize: "1.2rem",
    color: "#555",
  },
  heroButtons: {
    marginTop: "20px",
  },
  primaryButton: {
    padding: "12px 24px",
    backgroundColor: "#007BFF",
    color: "#fff",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    marginRight: "10px",
    transition: "all 0.3s ease",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
  },
  secondaryButton: {
    padding: "12px 24px",
    backgroundColor: "#f8f9fa",
    border: "1px solid #007BFF",
    borderRadius: "5px",
    cursor: "pointer",
    transition: "all 0.3s ease",
  },
  animatedButton: {
    transform: "scale(1)",
    animation: "scale-in 1s ease-in-out",
  },
  heroImage: {
    maxWidth: "40%",
  },
  image: {
    width: "100%",
    borderRadius: "10px",
    boxShadow: "0 4px 12px rgba(0, 0, 0, 0.15)",
  },
  features: {
    padding: "20px",
  },
  sectionTitle: {
    textAlign: "center",
    marginBottom: "20px",
    fontSize: "2.5rem",
    fontWeight: "bold",
  },
  featureCards: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  featureCard: {
    width: "250px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    textAlign: "center",
    backgroundColor: "#fff",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
    transition: "all 0.3s ease",
    cursor: "pointer",
  },
  featureCardHover: {
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.2)",
    transform: "scale(1.05)",
  },
  featureIcon: {
    fontSize: "2rem",
    marginBottom: "10px",
  },
  cardTitle: {
    fontSize: "1.5rem",
    fontWeight: "bold",
  },
  imageSlider: {
    padding: "20px",
    textAlign: "center",
  },
  slider: {
    display: "flex",
    gap: "10px",
    justifyContent: "center",
  },
  sliderImage: {
    width: "200px",
    borderRadius: "10px",
    transition: "transform 0.3s ease",
  },
  testimonials: {
    padding: "20px",
    backgroundColor: "#f9f9f9",
  },
  testimonialCards: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
  },
  testimonialCard: {
    width: "300px",
    padding: "20px",
    border: "1px solid #ccc",
    borderRadius: "10px",
    backgroundColor: "#fff",
    textAlign: "center",
    boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.1)",
  },
  howItWorks: {
    padding: "20px",
  },
  steps: {
    display: "flex",
    justifyContent: "center",
    gap: "20px",
    flexWrap: "wrap",
  },
  step: {
    width: "200px",
    textAlign: "center",
  },
  stepIcon: {
    fontSize: "2rem",
    marginBottom: "10px",
  },
  footer: {
    padding: "10px",
    backgroundColor: "#4CBF50",
    color: "white",
    textAlign: "center",
  },
  footerLink: {
    color: "white",
    textDecoration: "none",
  },
};

export default Homepage;
