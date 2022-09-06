import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import React, { useContext, useEffect, useState } from "react";
import { auth, db } from "../firebase/firebase";

const MessageContext = React.createContext();
export default function MessageProvider({ children }) {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  //id of sender
  const senderId = auth.currentUser.uid;
  //get all users
  useEffect(() => {
    const usersRef = collection(db, "users");
    // get query of all users except the current logged in user
    const getAllUsers = query(usersRef, where("uid", "not-in", [senderId]));
    const unsubscribe = onSnapshot(getAllUsers, (snapshot) => {
      let usersArr = [];
      snapshot.forEach((doc) => {
        usersArr.push(doc.data());
      });
      setUsers(usersArr);
    });
    return () => unsubscribe();
  }, [senderId]);

  // select a user and get the messages between the sender and receiver
  function selectUser(user) {
    console.log(user);
    setChat(user);
    const receiverId = user.uid;
    const id =
      senderId > receiverId
        ? `${senderId + receiverId}`
        : `${receiverId + senderId}`;
    const messageRef = collection(db, "messages", id, "chat");
    const messageSnapshot = query(messageRef, orderBy("createdAt", "asc"));
    onSnapshot(messageSnapshot, (querySnapshot) => {
      let msgs = [];
      querySnapshot.forEach((doc) => {
        msgs.push(doc.data());
      });
      setMessages(msgs);
    });
  }

  // send message to receiver
  async function sendMessage(e) {
    console.log("sent");
    e.preventDefault();
    const receiverId = chat.uid;
    const id =
      senderId > receiverId
        ? `${senderId + receiverId}`
        : `${receiverId + senderId}`;
    const chatRef = collection(db, "messages", id, "chat");
    await addDoc(chatRef, {
      text,
      from: senderId,
      to: receiverId,
      createdAt: Timestamp.fromDate(new Date()),
    });
    setText("");
  }
  const value = {
    users,
    chat,
    text,
    messages,
    senderId,
    setMessages,
    sendMessage,
    selectUser,
    setText
  };
  return (
    <MessageContext.Provider value={value}>{children}</MessageContext.Provider>
  );
}
export function useMessages() {
  return useContext(MessageContext);
}
