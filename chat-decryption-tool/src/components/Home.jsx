import React from 'react';

const Home = () => {
    return (
        <div style={styles.container}>
            <header style={styles.header}>
                <h1 style={styles.title}>Welcome to Chat Decryption Tool</h1>
                <p style={styles.subtitle}>
                    Decode encrypted messages effortlessly and securely! Our tool helps you to retrieve and decode messages from popular messaging platforms.
                </p>
            </header>
            <main style={styles.main}>
                <div style={styles.content}>
                    <h2 style={styles.contentTitle}>Features</h2>
                    <ul style={styles.featureList}>
                        <li style={styles.featureItem}>Support for WeChat and DingTalk decryption</li>
                        <li style={styles.featureItem}>Easy-to-use interface for uploading encrypted data</li>
                        <li style={styles.featureItem}>Complete privacy and security for your data</li>
                        <li style={styles.featureItem}>Fast and accurate decryption process</li>
                    </ul>
                    <button style={styles.button}>Get Started</button>
                </div>
            </main>
            <footer style={styles.footer}>
                <p>&copy; 2025 Chat Decryption Tool | All Rights Reserved</p>
            </footer>
        </div>
    );
};

// Inline styles for simplicity
const styles = {
    container: {
        fontFamily: 'Arial, sans-serif',
        textAlign: 'center',
        color: '#333',
        padding: '0',
        margin: '0',
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        width: '100%', // Ensure full width
    },
    header: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        padding: '30px 20px',
        marginBottom: '20px',
    },
    title: {
        fontSize: '3rem',
        margin: '0',
    },
    subtitle: {
        fontSize: '1.2rem',
        margin: '10px 0',
        fontWeight: '300',
    },
    main: {
        flex: '1',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'flex-start', // Adjusted to start aligning
        width: '100%',
    },
    content: {
        maxWidth: '800px',
        width: '100%', // Ensure content takes full width of the container
        padding: '20px',
    },
    contentTitle: {
        fontSize: '2rem',
        fontWeight: '600',
        marginBottom: '15px',
    },
    featureList: {
        listStyleType: 'none',
        padding: '0',
        textAlign: 'left',
        fontSize: '1.1rem',
    },
    featureItem: {
        margin: '10px 0',
    },
    button: {
        backgroundColor: '#4CAF50',
        color: '#fff',
        border: 'none',
        padding: '15px 30px',
        fontSize: '1.2rem',
        cursor: 'pointer',
        borderRadius: '5px',
        marginTop: '20px',
    },
    footer: {
        backgroundColor: '#f1f1f1',
        padding: '15px 0',
        fontSize: '1rem',
        marginTop: '20px',
    },
};

export default Home;
