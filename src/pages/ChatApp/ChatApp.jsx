import React, { useState, useEffect, useRef } from "react";
import ChatListTop from "../../components/ChatListTop/ChatListTop";
import ChatScreen from "../../components/ChatScreen/ChatScreen";
import InputBar from "../../components/InputBar/InputBar";
import TopBar from "../../components/TopBar/TopBar";
import User from "../../components/User/User";
import styles from "./chatApp.module.scss";
import { LayoutWrapper } from "../../components/Layout/Layout";
import {
  addDoc,
  collection,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  where,
} from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function ChatApp() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const { logout } = useAuth();
  const navigate = useNavigate();
  const dummy = useRef()
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
  
  return (
    <LayoutWrapper>
      <div className={styles.chatBody}>
        <div className={styles.leftBar}>
          <ChatListTop />
          {users.map((user, i) => (
            <User key={i} user={user} selectUser={selectUser} />
          ))}
        </div>
        <div className={styles.rightBar}>
          {chat ? (
            <>
              <TopBar chat={chat} />
              <div className={styles.chatArea}>
                <ChatScreen
                  messages={messages}
                  senderId={senderId}
                  receiverId={chat.uid}
                  setMessages={setMessages}
                />
              </div>{" "}
              <div ref={dummy}>

              </div>
                <InputBar
                  sendMessage={sendMessage}
                  text={text}
                  setText={setText}
                />
                <span ></span>
            </>
          ) : (
            <p>Select a user to start a conversation</p>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
}
