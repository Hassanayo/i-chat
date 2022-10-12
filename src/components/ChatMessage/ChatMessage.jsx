import React, { useRef, useEffect, useState } from "react";
import { Regular12, Regular16 } from "../../styles/Typography/typography";
import styles from "./chatMessage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
export default function ChatMessage({ message, senderId }) {
  const [time, setTime] = useState("");
  const linkedText = useRef()
  const dummy = useRef();
  useEffect(() => {
    // always scroll down to last message
    dummy.current?.scrollIntoView({ behavior: "smooth" });
    // get time message was sent
    const dateStr = message.createdAt.toDate().toISOString();
    const date = new Date(dateStr);
    const result =
      date.getHours() +
      ":" +
      (date.getMinutes() < 10 ? "0" : "") +
      date.getMinutes();
    setTime(result);
  }, [message]);
  return (
    <div
      ref={dummy}
      className={`${styles.chatContainer} ${
        message.from === senderId ? styles.sender : styles.receiver
      }`}
    >
      <div
        className={`${
          message.from === senderId ? styles.sent : styles.received
        }`}
        color="#000"
      >
        <Regular16 ref={linkedText} color={`${message.from === senderId ? "#fff" : "#000"}`}>
          {message.text}
        </Regular16>
        <div className={styles.time}>
          <Regular12
            color={`${message.from === senderId ? "#f5f5f5" : "#000"}`}
          >
            {time}
          </Regular12>
          <FontAwesomeIcon
            color={`${message.from === senderId ? "#f5f5f5" : "#000"}`}
            icon={faCheck}
          />
        </div>
      </div>
    </div>
  );
}
