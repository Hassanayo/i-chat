import React, { useState, useEffect } from "react";
import ChatListTop from "../../components/ChatListTop/ChatListTop";
import ChatScreen from "../../components/ChatScreen/ChatScreen";
import InputBar from "../../components/InputBar/InputBar";
import TopBar from "../../components/TopBar/TopBar";
import User from "../../components/User/User";
import styles from "./chatApp.module.scss";
import { LayoutWrapper } from "../../components/Layout/Layout";
import { collection, onSnapshot, query, where } from "firebase/firestore";
import { auth, db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function ChatApp() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const { logout } = useAuth();
  const navigate = useNavigate();

  //id of sender
  const sender = auth.currentUser.uid;
  //get all users
  useEffect(() => {
    const usersRef = collection(db, "users");
    // get query of all users except the current logged in user
    const getAllUsers = query(usersRef, where("uid", "not-in", [sender]));
    const unsubscribe = onSnapshot(getAllUsers, (snapshot) => {
      let usersArr = [];
      snapshot.forEach((doc) => {
        usersArr.push(doc.data());
      });

      setUsers(usersArr);
    });
    return () => unsubscribe();
  }, [sender]);

  function selectUser(user) {
    console.log(user);
    setChat(user);
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
              <div className={styles.rightBottom}>
                <ChatScreen />
                <InputBar />
              </div>{" "}
            </>
          ) : (
            <p>Select a user to start a conversation</p>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
}
