// src/pages/Home.jsx
import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
    return (
        <div style={styles.container}>
            <h1>Welcome to Chat Decryption Tool</h1>
            <p>Login or Sign up to continue</p>
            <div>
                <Link to="/login"><button>Login</button></Link>
                <Link to="/signup"><button>Sign Up</button></Link>
            </div>
        </div>
    );
};



const styles = {
 
    container: {
        
        textAlign: 'center',
        marginTop: '50px',
    },
};

export default Home;
