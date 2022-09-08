import ChatListTop from "../../components/ChatListTop/ChatListTop";
import ChatScreen from "../../components/ChatScreen/ChatScreen";
import InputBar from "../../components/InputBar/InputBar";
import TopBar from "../../components/TopBar/TopBar";
import User from "../../components/User/User";
import styles from "./chatApp.module.scss";
import { LayoutWrapper } from "../../components/Layout/Layout";
import { useMessages } from "../../context/MessageContext";
import {
  addDoc,
  collection,
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import ListModal from "../../components/ListModal/ListModal";
import { useNavigate } from "react-router-dom";
export default function ChatApp() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [userData, setUserData] = useState("");
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

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

  // logout of account
  async function handleLogout(e) {
    e.preventDefault();
    try {
      // setError("");
      await logout();
      navigate("/login");
      await updateDoc(doc(db, "users", currentUser.uid), {
        isOnline: false,
      });
    } catch (error) {
      console.log(error);
      // setError("Failed to log out");
    }
  }
  // // open and close modal
  // function handleModal() {
  //   setIsOpen(!isOpen);
  // }

  return (
    <LayoutWrapper>
      <div className={styles.chatBody}>
        <div className={styles.leftBar}>
          <ChatListTop logout={handleLogout}/>
          {users.map((user, i) => (
            <User key={i} user={user} selectUser={selectUser} />
          ))}
            
        </div>
        <div className={styles.rightBar}>
          {chat ? (
            <>
              <TopBar chat={chat} user={users} />
              <div className={styles.chatArea}>
                <ChatScreen messages={messages} senderId={senderId} />
              </div>{" "}
              <InputBar
                sendMessage={sendMessage}
                text={text}
                setText={setText}
              />
            </>
          ) : (
            <p>Select a user to start a conversation</p>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
}
