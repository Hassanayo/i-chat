import React, { useRef, useEffect } from "react";
import { Regular12, Regular16 } from "../../styles/Typography/typography";
import styles from "./chatMessage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
export default function ChatMessage({message, senderId}) {
  const dummy = useRef()
  useEffect(() => {
    dummy.current?.scrollIntoView({behavior: "smooth"})
  }, [message])
  return (
    <div ref={dummy} className={`${styles.chatContainer} ${message.from === senderId ? styles.sender : styles.receiver}`}>
      <div className={`${message.from === senderId ? styles.sent : styles.received}`} color="#000">
        <Regular16 color="#000">{message.text}</Regular16>
        <div className={styles.time}>
        <Regular12>{message.createdAt.toDate().toLocaleTimeString().slice(0, 4)}</Regular12>
        <FontAwesomeIcon icon={faCheck} />
      </div>
      </div>
      
    </div>
  );
}
