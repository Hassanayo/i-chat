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
  doc,
  getDoc,
  onSnapshot,
  orderBy,
  query,
  setDoc,
  Timestamp,
  updateDoc,
  where,
} from "firebase/firestore";
import { useEffect, useState } from "react";
import { auth, db } from "../../firebase/firebase";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
export default function ChatApp() {
  const [users, setUsers] = useState([]);
  const [chat, setChat] = useState("");
  const [text, setText] = useState("");
  const [lastMessage] = useState("");
  const [messages, setMessages] = useState([]);
  const { currentUser, logout } = useAuth();
  const navigate = useNavigate();

  //id of sender
  const senderId = auth.currentUser.uid;
  //get all users
  useEffect(() => {
    const usersRef = collection(db, "users");
    // getDoc(doc(db, "users", currentUser.uid)).then((docSnap) => {
    //   if (docSnap.exists()) {
    //     setUserData(docSnap.data());
    //   }
    // });
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
  async function selectUser(user) {
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

    // update the last message status when the receiver opens the text
    const docSnap = await getDoc(doc(db, "lastMessage", id));
    if (docSnap?.data().from !== senderId) {
      await updateDoc(doc(db, "lastMessage", id), {
        unread: false,
      });
    }
  }
  // get last message from chat
  // useEffect(() => {
  //   console.log(users.lastMessage);
  // }, [users])
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
    if (text) {
      await addDoc(chatRef, {
        text,
        from: senderId,
        to: receiverId,
        createdAt: Timestamp.fromDate(new Date()),
      });
      // await updateDoc(doc(db, "users", currentUser.uid), {
      //   lastMessage: text
      // })
      // check if the doc exists from the id. if not,  create a new one else replace existing doc
      await setDoc(doc(db, "lastMessage", id), {
        text,
        from: senderId,
        to: receiverId,
        createdAt: Timestamp.fromDate(new Date()),
        unread: true,
      });
    }

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
        <div className={`${styles.leftBar} ${chat && styles.inactive}`}>
          <ChatListTop logout={handleLogout} />
          {users.map((user, i) => (
            <User
              lastMsg={lastMessage}
              key={i}
              user={user}
              selectUser={selectUser}
              senderId={senderId}
              chat={chat}
            />
          ))}
        </div>
        <div className={`${styles.rightBar} ${chat && styles.active}`}>
          {chat ? (
            <>
              <TopBar chat={chat} setChat={setChat} />
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
            <section className={styles.desktopHolder}>
              <div>
                <h3 className={styles.holderTitle}>Stay Connected 👋</h3>
                <p className={styles.holderText}>
                  Send and receive messages on your favorite chat app.
                </p>
                <p className={styles.holderText}>
                  Click on a user to start a conversation.
                </p>
              </div>
            </section>
          )}
        </div>
      </div>
    </LayoutWrapper>
  );
}
