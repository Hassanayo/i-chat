import React, { useEffect } from "react";
import { Regular12, Regular16 } from "../../styles/Typography/typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
import styles from "./chatScreen.module.scss";
import { useMessages } from "../../context/MessageContext";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  limit,
  onSnapshot,
  orderBy,
  query,
} from "firebase/firestore";
import { db } from "../../firebase/firebase";
import ChatMessage from "../ChatMessage/ChatMessage";
export default function ChatScreen({chat}) {
  const { message, setMessage } = useMessages();
  const newText = message;
  const docRef = doc(collection(db, "message"))
  //get messages
  
    // const special = doc(collection(db, "message"))
   

  return (
    <div className={styles.chatBody}>
      <div className={styles.date}>
        <Regular16 color="#FFF">Today</Regular16>
      </div>
      <div className={styles.chatMessages}>
        <ChatMessage message="hello"/>
        
      </div>
    </div>
  );
}
