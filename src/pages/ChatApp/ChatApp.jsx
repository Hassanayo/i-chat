import ChatListTop from "../../components/ChatListTop/ChatListTop";
import ChatScreen from "../../components/ChatScreen/ChatScreen";
import InputBar from "../../components/InputBar/InputBar";
import TopBar from "../../components/TopBar/TopBar";
import User from "../../components/User/User";
import styles from "./chatApp.module.scss";
import { LayoutWrapper } from "../../components/Layout/Layout";
import { useMessages } from "../../context/MessageContext";
import { addDoc, collection, doc, getDoc, onSnapshot, orderBy, query, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";
export default function ChatApp() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState("");
  const {currentUser} = useAuth()

  //id of sender
  const senderId = auth.currentUser.uid;
  //get all users
  useEffect(() => {
    const usersRef = collection(db, "users");
    getDoc(doc(db, "users", currentUser.uid)).then((docSnap) => {
      if (docSnap.exists()) {
        setUserData(docSnap.data());
      }
    });
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
  }, [senderId, currentUser]);


  

  // select a user and get the messages between the sender and receiver
  function selectUser(user) {
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
                <ChatScreen messages={messages} senderId={senderId}/>
              </div>{" "}
              <InputBar/>
            </>
          ) : (
            <p>Select a user to start a conversation</p>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
}
