import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseconfig";
import { collection, doc, getDocs, onSnapshot, setDoc, query, orderBy } from "firebase/firestore";
import { auth } from "../firebase/firebaseconfig";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Fetch all users except the current logged-in user
  useEffect(() => {
    const fetchUsers = async () => {
      const usersCollection = collection(db, "users");
      const usersSnapshot = await getDocs(usersCollection);
      const allUsers = usersSnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));
      const filteredUsers = allUsers.filter((user) => user.userId !== auth.currentUser.uid);
      setUsers(filteredUsers);
    };

    fetchUsers();
  }, []);

  // Load messages for the selected user
  useEffect(() => {
    if (!selectedUser) return;

    const chatId = getChatId(auth.currentUser.uid, selectedUser.userId);
    const messagesRef = collection(db, "chats", chatId, "messages");
    const messagesQuery = query(messagesRef, orderBy("createdAt", "asc"));

    const unsubscribe = onSnapshot(messagesQuery, (snapshot) => {
      const loadedMessages = snapshot.docs.map((doc) => doc.data());
      setMessages(loadedMessages);
    });

    return () => unsubscribe();
  }, [selectedUser]);

  // Helper to generate a chat ID for two users
  const getChatId = (user1, user2) => {
    return user1 > user2 ? `${user1}_${user2}` : `${user2}_${user1}`;
  };

  // Handle sending a new message
  const handleSendMessage = async () => {
    if (!newMessage.trim()) return;

    const chatId = getChatId(auth.currentUser.uid, selectedUser.userId);
    const messagesRef = collection(db, "chats", chatId, "messages");

    await setDoc(doc(messagesRef), {
      senderId: auth.currentUser.uid,
      receiverId: selectedUser.userId,
      message: newMessage,
      createdAt: new Date(),
    });

    setNewMessage("");
  };

  return (
    <div className="flex h-screen">
      {/* Left Section: User List */}
      <div className="w-1/3 bg-gray-100 border-r border-gray-300 overflow-y-auto">
        <h2 className="text-xl font-bold p-4 border-b border-gray-300">Users</h2>
        <ul>
          {users.map((user) => (
            <li
              key={user.id}
              onClick={() => setSelectedUser(user)}
              className={`p-4 cursor-pointer hover:bg-gray-200 ${
                selectedUser?.userId === user.userId ? "bg-gray-300" : ""
              }`}
            >
              {user.email}
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section: Chat Area */}
      <div className="w-2/3 flex flex-col">
        {/* Chat Header */}
        {selectedUser && (
          <div className="p-4 bg-gray-100 border-b border-gray-300">
            <h2 className="text-lg font-semibold">{selectedUser.email}</h2>
          </div>
        )}

        {/* Chat Messages */}
        <div className="flex-1 overflow-y-auto p-4 bg-white">
          {selectedUser ? (
            messages.map((msg, index) => (
              <div
                key={index}
                className={`flex mb-4 ${
                  msg.senderId === auth.currentUser.uid ? "justify-end" : "justify-start"
                }`}
              >
                <div
                  className={`px-4 py-2 rounded-lg ${
                    msg.senderId === auth.currentUser.uid
                      ? "bg-green-200 text-gray-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.message}
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Select a user to start chatting.</p>
          )}
        </div>

        {/* Input Field */}
        {selectedUser && (
          <div className="flex items-center p-4 bg-gray-100 border-t border-gray-300">
            <input
              type="text"
              placeholder="Type your message..."
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              className="flex-1 px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-green-400"
            />
            <button
              onClick={handleSendMessage}
              className="ml-4 px-6 py-2 bg-green-500 text-white rounded-lg hover:bg-green-600"
            >
              Send
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Chat;
