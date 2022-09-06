import {Regular16 } from "../../styles/Typography/typography";
import styles from "./chatScreen.module.scss";
import ChatMessage from "../ChatMessage/ChatMessage";
import { useMessages } from "../../context/MessageContext";
export default function ChatScreen({messages, senderId}) {
  return (
    <div className={styles.chatBody}>
      <div className={styles.date}>
        <Regular16 color="#FFF">Today</Regular16>
      </div>
      <div className={styles.messages}>
        {messages.length ? messages.map((message, index) => (
        <ChatMessage senderId={senderId} key={index} message={message}/>
        )): null}
        
      </div>
    </div>
  );
}
