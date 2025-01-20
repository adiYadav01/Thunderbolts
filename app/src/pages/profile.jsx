import React, { useState, useEffect } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import { FaEdit, FaSignOutAlt } from "react-icons/fa";

const Profile = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate();
  const auth = getAuth();

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserData({
          name: user.displayName || "User",
          email: user.email,
        });
        setIsLoading(false);
      } else {
        navigate("/login");
      }
    });

    return () => unsubscribe();
  }, [auth, navigate]);

  const handleEditProfile = () => {
    // Redirect to the edit profile page or show a modal to edit details
    navigate("/edit-profile");
  };

  const handleLogout = async () => {
    try {
      await auth.signOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out:", error);
    }
  };

  return (
    <div style={styles.container}>
      {isLoading ? (
        <p>Loading...</p>
      ) : (
        <div style={styles.profileCard}>
          <h2 style={styles.welcomeText}>Welcome, {userData.name}!</h2>
          <div style={styles.profileDetails}>
            <img
              src="data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EADEQAQACAQIEBQEIAQUAAAAAAAABAgMEEQUhQVESEzFhcSIjMlKBkaHB0UIUM2Jygv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD6IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABuAAAAAAAAAAAAAAAAAAAAABMgG5vy90pw7h3iiM2eOX+NP7ByabQ5tR92vhr+KyRxcIwxEebe1567coSVYiI2iNtmQckcN0kRt5MT8zLxk4XpJj6cdqz3raXcAhdRwi9Y3w38X/GUdbHfHbw3rMT2la3Pq9Jj1NNrxtbpaPWAVobdTgyafJNMkc+k92oAAAAAAAAAAAAAAA2DuDs4ZpY1Gfe0fRTnb37LBEbQ4+FYfK0dfxX5y7QAAAAAAcfEdLGowTEf7ledVd3nqts8uau8TxeVrLdrcwcoAAAAAAAAAAAAAB1iO4dd+wLTgr4cVI7RDY1aefFhpbvWG0AAAAAABC8drHm4526JpCcdt9tjr2jcEbHoEAAAAAAAAAAAAAB1DcE/wAIzebpYrvzxzs7lc4dqf8ATaiJtP0W5W/tYqzFoiYneJBkAAAAAGJVziOXz9VeY9InaEtxTVRgw+Gs/aW5R7IAAAAAAAAAAAAAAAAmAAjlHON0hw/iHkR5WXecXSeyPP3+QWut62r4qzEx3hneFZ0+pzaed8V527TzhIYeMdM2Kd+9Z3BLsbuGOK6WY5zePmrxfi+CI+ml7fkCS3cmt1uPTV23i159KozPxTPkia02xx3j1cFp35zznvIPebLfPkm+Sd5eIIAAAAAAAAAAAAAAAAAA+Jh16bh+fUbW28FO9uU/oDkmfaTbflET+Se0/CtPi+9vkt7uumHHSNqUrHxAKzGHLPPy7T/5Ymlq+tbR8wtWxNYn1iP0BU+fZiVmy6LT5I+rFX5jkj9Twjlvp78/w36/mCKj0HvJiyYbeHLSaz7vAAAAAAAAAAAAAAADZhxXzZIx467zP7M6fBfUZYpSPmeyw6XTY9NSK0jn1t1kHPouHYsO1skePJ36Q7tmQAAAAAAGvNhx5q+HJWLV90JreHXwfXjnx09vWE+xMRPQFTEpxPh/hm2bBHL1tWOnuiwAAAAAAAAAJAeqUte0VpztPKIeExwbS7V8+3rPKoO3RaaumxRWNptP3p7ukgAAAAAAAAAABiUFxXSeRbzccfZ29faU815cdc2O1LxvEgqw2ajDbDntS3rXl8tYAAAAAABIA9YMU5s1Mcetp2WnHSKUitY2iI2hCcFxePUWyT/hHL5lOQDIAAAAAAAAAAAAAInjeDlXPX/rb+EQs2sxedpcuOetZ2+VZ/gAAAAH/9k="
              alt="Profile Avatar"
              style={styles.profileImage}
            />
            <div style={styles.userInfo}>
              <p style={styles.infoText}>Email: {userData.email}</p>
            </div>
          </div>
          <div style={styles.actions}>
            <button onClick={handleEditProfile} style={styles.editButton}>
              <FaEdit style={styles.icon} /> Edit Profile
            </button>
            <button onClick={handleLogout} style={styles.logoutButton}>
              <FaSignOutAlt style={styles.icon} /> Logout
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const styles = {
  container: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    minHeight: "100vh",
    backgroundColor: "#f0f2f5",
    padding: "20px",
  },
  profileCard: {
    width: "100%",
    maxWidth: "600px",
    backgroundColor: "#fff",
    borderRadius: "10px",
    boxShadow: "0 4px 6px rgba(0, 0, 0, 0.1)",
    padding: "30px",
    textAlign: "center",
  },
  welcomeText: {
    fontSize: "2.5rem",
    marginBottom: "20px",
    color: "#4CAF50",
  },
  profileDetails: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "20px",
  },
  profileImage: {
    width: "150px",
    height: "150px",
    borderRadius: "50%",
    marginBottom: "15px",
  },
  userInfo: {
    textAlign: "center",
    marginBottom: "20px",
  },
  infoText: {
    fontSize: "1.2rem",
    color: "#333",
  },
  actions: {
    display: "flex",
    justifyContent: "space-between",
  },
  editButton: {
    backgroundColor: "#4CAF50",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    width: "45%",
  },
  logoutButton: {
    backgroundColor: "#f44336",
    color: "#fff",
    border: "none",
    padding: "12px 20px",
    borderRadius: "4px",
    cursor: "pointer",
    fontSize: "1rem",
    width: "45%",
  },
  icon: {
    marginRight: "8px",
  },
};

export default Profile;
