import React, { useState, useEffect } from "react";
import { db } from "../firebase/firebaseconfig";
import { collection, doc, getDocs, onSnapshot, setDoc, query, orderBy } from "firebase/firestore";
import { auth } from "../firebase/firebaseconfig";

const Chat = () => {
  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");

  // Default profile picture URL
  const defaultProfileImage = "data:image/jpeg;base64,/9j/4AAQSkZJRgABAQAAAQABAAD/2wCEAAkGBwgHBgkIBwgKCgkLDRYPDQwMDRsUFRAWIB0iIiAdHx8kKDQsJCYxJx8fLT0tMTU3Ojo6Iys/RD84QzQ5OjcBCgoKDQwNGg8PGjclHyU3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3Nzc3N//AABEIAMAAzAMBIgACEQEDEQH/xAAbAAEAAgMBAQAAAAAAAAAAAAAABQYBAwQCB//EADEQAQACAQIEBQEIAQUAAAAAAAABAgMEEQUhQVESEzFhcSIjMlKBkaHB0UIUM2Jygv/EABQBAQAAAAAAAAAAAAAAAAAAAAD/xAAUEQEAAAAAAAAAAAAAAAAAAAAA/9oADAMBAAIRAxEAPwD6IAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAABuAAAAAAAAAAAAAAAAAAAAABMgG5vy90pw7h3iiM2eOX+NP7ByabQ5tR92vhr+KyRxcIwxEebe1567coSVYiI2iNtmQckcN0kRt5MT8zLxk4XpJj6cdqz3raXcAhdRwi9Y3w38X/GUdbHfHbw3rMT2la3Pq9Jj1NNrxtbpaPWAVobdTgyafJNMkc+k92oAAAAAAAAAAAAAAA2DuDs4ZpY1Gfe0fRTnb37LBEbQ4+FYfK0dfxX5y7QAAAAAAcfEdLGowTEf7ledVd3nqts8uau8TxeVrLdrcwcoAAAAAAAAAAAAAB1iO4dd+wLTgr4cVI7RDY1aefFhpbvWG0AAAAAABC8drHm4526JpCcdt9tjr2jcEbHoEAAAAAAAAAAAAAB1DcE/wAIzebpYrvzxzs7lc4dqf8ATaiJtP0W5W/tYqzFoiYneJBkAAAAAGJVziOXz9VeY9InaEtxTVRgw+Gs/aW5R7IAAAAAAAAAAAAAAAAmAAjlHON0hw/iHkR5WXecXSeyPP3+QWut62r4qzEx3hneFZ0+pzaed8V527TzhIYeMdM2Kd+9Z3BLsbuGOK6WY5zePmrxfi+CI+ml7fkCS3cmt1uPTV23i159KozPxTPkia02xx3j1cFp35zznvIPebLfPkm+Sd5eIIAAAAAAAAAAAAAAAAAA+Jh16bh+fUbW28FO9uU/oDkmfaTbflET+Se0/CtPi+9vkt7uumHHSNqUrHxAKzGHLPPy7T/5Ymlq+tbR8wtWxNYn1iP0BU+fZiVmy6LT5I+rFX5jkj9Twjlvp78/w36/mCKj0HvJiyYbeHLSaz7vAAAAAAAAAAAAAAADZhxXzZIx467zP7M6fBfUZYpSPmeyw6XTY9NSK0jn1t1kHPouHYsO1skePJ36Q7tmQAAAAAAGvNhx5q+HJWLV90JreHXwfXjnx09vWE+xMRPQFTEpxPh/hm2bBHL1tWOnuiwAAAAAAAAAJAeqUte0VpztPKIeExwbS7V8+3rPKoO3RaaumxRWNptP3p7ukgAAAAAAAAAABiUFxXSeRbzccfZ29faU815cdc2O1LxvEgqw2ajDbDntS3rXl8tYAAAAAABIA9YMU5s1Mcetp2WnHSKUitY2iI2hCcFxePUWyT/hHL5lOQDIAAAAAAAAAAAAAInjeDlXPX/rb+EQs2sxedpcuOetZ2+VZ/gAAAAH/9k=";

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
              className={`flex items-center p-4 cursor-pointer hover:bg-gray-200 ${
                selectedUser?.userId === user.userId ? "bg-gray-300" : ""
              }`}
            >
              <img
                src={defaultProfileImage}
                alt="Profile"
                className="w-12 h-12 rounded-full mr-4"
              />
              <div>
                <p className="font-semibold">{user.email}</p>
                <p className="text-sm text-gray-500">Last seen recently</p>
              </div>
            </li>
          ))}
        </ul>
      </div>

      {/* Right Section: Chat Area */}
      <div className="w-2/3 flex flex-col">
        {/* Chat Header */}
        {selectedUser && (
          <div className="p-2 bg-gray-100 border-b border-gray-300 flex items-center">
            <img
              src={defaultProfileImage}
              alt="Profile"
              className="w-8 h-8 rounded-full mr-4"
            />
            <h2 className="text-lg font-semibold flex-1">{selectedUser.email}</h2>
            <button className="text-blue-500 text-sm">Call</button>
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
                  className={`px-4 py-2 rounded-lg shadow-md ${
                    msg.senderId === auth.currentUser.uid
                      ? "bg-green-200 text-gray-800"
                      : "bg-gray-200 text-gray-800"
                  }`}
                >
                  {msg.message}
                  <div className="text-xs text-gray-500 text-right mt-1">
                    {new Date(msg.createdAt?.seconds * 1000).toLocaleTimeString()}
                  </div>
                </div>
              </div>
            ))
          ) : (
            <p className="text-center text-gray-500">Select a user to start chatting.</p>
          )}
        </div>

        {/* Input Field */}
        {selectedUser && (
          <div className="flex items-center p-2 bg-gray-100 border-t border-gray-300">
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
