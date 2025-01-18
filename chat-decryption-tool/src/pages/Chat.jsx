// src/pages/Chat.jsx
import { useState, useEffect } from "react";
import { collection, query, where, onSnapshot, addDoc } from "firebase/firestore";
import { db, auth } from "../firebase/firebaseconfig";  // Firestore and Firebase Auth imports

const Chat = () => {
  const [contacts, setContacts] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [selectedContact, setSelectedContact] = useState(null);  // Track the selected contact
  const currentUser = auth.currentUser?.email;  // Current logged-in user's email

  // Fetch all users from the 'users' collection
  useEffect(() => {
    const q = query(collection(db, "users"));
    const unsubscribe = onSnapshot(q, (querySnapshot) => {
      const users = [];
      querySnapshot.forEach((doc) => {
        users.push(doc.data());
      });
      setContacts(users);  // Set contacts to state
    });

    return () => unsubscribe();
  }, []);

  // Fetch messages between currentUser and selectedContact
  useEffect(() => {
    if (selectedContact) {
      const q = query(
        collection(db, "messages"),
        where("sender", "in", [currentUser, selectedContact.email]),
        where("receiver", "in", [currentUser, selectedContact.email]),
        orderBy("timestamp")
      );

      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const newMessages = querySnapshot.docs.map((doc) => doc.data());
        setMessages(newMessages);  // Update the messages state
      });

      return () => unsubscribe();
    }
  }, [selectedContact, currentUser]);

  // Send message function
  const sendMessage = async (e) => {
    e.preventDefault();
    if (message.trim() && selectedContact) {
      await addDoc(collection(db, "messages"), {
        text: message,
        sender: currentUser,
        receiver: selectedContact.email,
        timestamp: new Date(),
      });
      setMessage("");  // Clear input after sending
    }
  };

  return (
    <div className="chat-container">
      <div className="contacts-sidebar">
        <h3>Contacts</h3>
        <ul>
          {contacts.map((contact, index) => (
            <li
              key={index}
              onClick={() => setSelectedContact(contact)}
              className={`contact ${selectedContact?.email === contact.email ? "selected" : ""}`}
            >
              {contact.email}
            </li>
          ))}
        </ul>
      </div>

      <div className="chat-window">
        {selectedContact ? (
          <>
            <div className="chat-box">
              {messages.map((msg, index) => (
                <div
                  key={index}
                  className={`message ${msg.sender === currentUser ? "sent" : "received"}`}
                >
                  <p>{msg.text}</p>
                </div>
              ))}
            </div>

            <form onSubmit={sendMessage} className="send-message-form">
              <input
                type="text"
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                placeholder="Type a message"
              />
              <button type="submit">Send</button>
            </form>
          </>
        ) : (
          <p>Select a contact to start chatting.</p>
        )}
      </div>
    </div>
  );
};

export default Chat;
