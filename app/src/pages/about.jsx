import React from "react";

// About page component
const About = () => {
  return (
    <div style={styles.container}>
      {/* Title */}
      <h1 style={styles.title}>About the Chat Decryption Tool</h1>

      {/* Introduction Section */}
      <section style={styles.card}>
        <h2 style={styles.sectionTitle}>Introduction</h2>
        <p style={styles.text}>
          The Chat Decryption Tool is a powerful application that allows you to decrypt encrypted chat data from messaging platforms like WeChat, DingTalk, WhatsApp, and more. The tool supports various chat encryption algorithms and enables you to retrieve important information from your backup or cloud storage.
        </p>
      </section>

      {/* Features Section */}
      <section style={styles.card}>
        <h2 style={styles.sectionTitle}>Key Features</h2>
        <ul style={styles.featuresList}>
          <li style={styles.featureItem}>Decrypt chat messages from popular platforms like WeChat, DingTalk, and WhatsApp.</li>
          <li style={styles.featureItem}>Secure and safe handling of sensitive data.</li>
          <li style={styles.featureItem}>Custom decryption requests for non-standard formats.</li>
          <li style={styles.featureItem}>Community support forum for troubleshooting and tips.</li>
          <li style={styles.featureItem}>Option to integrate with forensic analysis tools like X1 and FTK Imager.</li>
        </ul>
      </section>

      {/* Tutorial Section */}
      <section style={styles.card}>
        <h2 style={styles.sectionTitle}>Tutorial Video</h2>
        <p style={styles.text}>Watch our step-by-step tutorial to understand how to use the Chat Decryption Tool and get the most out of it.</p>
        <iframe
          width="100%"
          height="500px"
          src="https://www.youtube.com/embed/YOUR_VIDEO_ID"
          title="Chat Decryption Tool Tutorial"
          frameBorder="0"
          allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
      </section>

      {/* User Testimonials */}
      <section style={styles.card}>
        <h2 style={styles.sectionTitle}>User Testimonials</h2>
        <div style={styles.testimonials}>
          <blockquote style={styles.testimonial}>
            "The Chat Decryption Tool saved me hours of work by quickly recovering important chat history. It's a must-have tool for any investigator." - John Doe, Forensic Expert
          </blockquote>
          <blockquote style={styles.testimonial}>
            "I was able to decrypt my WeChat backup within minutes. Excellent tool!" - Jane Smith, Data Analyst
          </blockquote>
        </div>
      </section>

      {/* Changelog Section */}
      <section style={styles.card}>
        <h2 style={styles.sectionTitle}>Changelog</h2>
        <ul style={styles.changelogList}>
          <li style={styles.changelogItem}>Version 1.1.0 - Added support for WhatsApp chat decryption.</li>
          <li style={styles.changelogItem}>Version 1.0.0 - Initial release with support for WeChat and DingTalk.</li>
        </ul>
      </section>

      {/* Integration with Other Tools */}
      <section style={styles.card}>
        <h2 style={styles.sectionTitle}>Integration with Other Tools</h2>
        <p style={styles.text}>
          The Chat Decryption Tool integrates seamlessly with other forensic tools like X1 and FTK Imager, providing a comprehensive solution for digital investigations.
        </p>
      </section>

      {/* Contact and Support Section */}
      <section style={styles.card}>
        <h2 style={styles.sectionTitle}>Contact and Support</h2>
        <p style={styles.text}>
          If you need support, please contact us at <a href="mailto:support@chatdecrypt.com" style={styles.link}>support@chatdecrypt.com</a>.
        </p>
        <p style={styles.text}>
          For more information, visit our <a href="https://www.chatdecrypt.com/forum" target="_blank" style={styles.link}>community forum</a>.
        </p>
      </section>
    </div>
  );
};

// Styles for the About page
const styles = {
  container: {
    maxWidth: "1200px",
    margin: "0 auto",
    padding: "20px",
    fontFamily: "'Arial', sans-serif",
    backgroundColor: "#f9f9f9",
  },
  title: {
    fontSize: "2.5rem",
    fontWeight: "bold",
    marginBottom: "30px",
    textAlign: "center",
    color: "#333",
  },
  card: {
    backgroundColor: "#fff",
    padding: "20px",
    marginBottom: "20px",
    borderRadius: "10px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
  },
  sectionTitle: {
    fontSize: "2rem",
    fontWeight: "bold",
    marginBottom: "10px",
    color: "#333",
  },
  text: {
    fontSize: "1rem",
    lineHeight: "1.6",
    color: "#555",
  },
  featuresList: {
    listStyleType: "none",
    padding: "0",
  },
  featureItem: {
    fontSize: "1.1rem",
    paddingLeft: "1.5em",
    textIndent: "-1.5em",
    marginBottom: "8px",
    position: "relative",
  },
  testimonials: {
    marginTop: "10px",
  },
  testimonial: {
    fontStyle: "italic",
    marginBottom: "15px",
    color: "#555",
    borderLeft: "4px solid #4CAF50",
    paddingLeft: "20px",
    fontSize: "1.1rem",
  },
  changelogList: {
    listStyleType: "none",
    padding: "0",
  },
  changelogItem: {
    fontSize: "1rem",
    marginBottom: "10px",
    color: "#333",
  },
  link: {
    color: "#4CAF50",
    textDecoration: "none",
  },
};

export default About;
