import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { FaSun, FaMoon, FaUserCircle } from "react-icons/fa";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";

const Header = () => {
  const [darkMode, setDarkMode] = useState(false); // Dark mode state
  const [isLoggedIn, setIsLoggedIn] = useState(false); // Login state
  const [showProfileMenu, setShowProfileMenu] = useState(false); // Profile menu visibility
  const navigate = useNavigate();
  const auth = getAuth(); // Firebase auth instance

  // Toggle between light and dark mode
  const toggleMode = () => {
    setDarkMode(!darkMode);
    document.body.style.backgroundColor = darkMode ? "#fff" : "#121212";
    document.body.style.color = darkMode ? "#000" : "#fff";
  };

  // Firebase Auth: Check if user is logged in
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLoggedIn(true);
      } else {
        setIsLoggedIn(false);
      }
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
  }, [auth]);

  // Redirect to login page
  const handleLogin = () => {
    navigate("/login"); // Redirect to the login page
  };

  // Firebase sign out
  const handleLogout = async () => {
    try {
      await signOut(auth); // Sign out user from Firebase
      setShowProfileMenu(false);
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  // Toggle profile menu visibility
  const toggleProfileMenu = () => {
    setShowProfileMenu(!showProfileMenu);
  };

  return (
    <header style={styles.header(darkMode)}>
      {/* Left: Website Name */}
      <div style={styles.logo}>iDecrypt</div>

      {/* Center: Navigation Menu */}
      <nav style={styles.nav}>
        <ul style={styles.navList}>
          <li style={styles.navItem}>
            <Link to="/" style={styles.navLink(darkMode)}>
              Home
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/chat" style={styles.navLink(darkMode)}>
              Chat
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/decryption" style={styles.navLink(darkMode)}>
              Decrypt File
            </Link>
          </li>
          <li style={styles.navItem}>
            <Link to="/about" style={styles.navLink(darkMode)}>
              About
            </Link>
          </li>
        </ul>
      </nav>

      {/* Right: Login/Profile and Light/Dark Mode Toggle */}
      <div style={styles.headerRight}>
        {!isLoggedIn ? (
          <button onClick={handleLogin} style={styles.loginButton(darkMode)}>
            Login
          </button>
        ) : (
          <div style={styles.profileContainer}>
            <FaUserCircle
              onClick={toggleProfileMenu}
              style={styles.profileIcon}
            />
            {showProfileMenu && (
              <div style={styles.profileMenu}>
                <p
                  style={styles.profileMenuItem}
                  onClick={() => navigate("/profile")}
                >
                  Profile
                </p>
                <p style={styles.profileMenuItem} onClick={handleLogout}>
                  Logout
                </p>
              </div>
            )}
          </div>
        )}
        <div onClick={toggleMode} style={styles.iconContainer}>
          {darkMode ? <FaSun style={styles.icon} /> : <FaMoon style={styles.icon} />}
        </div>
      </div>
    </header>
  );
};

const styles = {
  header: (darkMode) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    padding: "10px 20px",
    backgroundColor: darkMode ? "#333" : "#4CAF50",
    color: darkMode ? "#fff" : "#fff",
  }),
  logo: {
    fontSize: "1.8rem",
    fontWeight: "bold",
  },
  nav: {
    display: "flex",
  },
  navList: {
    display: "flex",
    listStyle: "none",
    padding: 0,
    margin: 0,
  },
  navItem: {
    margin: "0 15px",
  },
  navLink: (darkMode) => ({
    textDecoration: "none",
    color: darkMode ? "#fff" : "#fff",
    fontWeight: "bold",
  }),
  headerRight: {
    display: "flex",
    alignItems: "center",
  },
  loginButton: (darkMode) => ({
    backgroundColor: darkMode ? "#fff" : "#fff",
    color: darkMode ? "#333" : "#4CAF50",
    border: "none",
    padding: "8px 15px",
    marginRight: "10px",
    cursor: "pointer",
    borderRadius: "4px",
  }),
  iconContainer: {
    cursor: "pointer",
    fontSize: "1.5rem",
    marginLeft: "10px",
  },
  icon: {
    color: "inherit",
  },
  profileContainer: {
    position: "relative",
    cursor: "pointer",
  },
  profileIcon: {
    fontSize: "2rem",
    color: "#fff",
  },
  profileMenu: {
    position: "absolute",
    top: "50px",
    right: "0",
    backgroundColor: "#fff",
    color: "#000",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    borderRadius: "8px",
    zIndex: 10,
    overflow: "hidden",
  },
  profileMenuItem: {
    padding: "10px 20px",
    cursor: "pointer",
    textAlign: "center",
    borderBottom: "1px solid #ddd",
    fontSize: "1rem",
  },
};

export default Header;
