import React from "react";
import { Regular12, Regular16 } from "../../styles/Typography/typography";
import styles from "./chatMessage.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCheck } from "@fortawesome/free-solid-svg-icons";
export default function ChatMessage({message}) {
  return (
    <div className={styles.sent}>
      <Regular16 color="#000">
        {message}
      </Regular16>
      <div className={styles.time}>
        <Regular12>18:12</Regular12>
        <FontAwesomeIcon icon={faCheck} />
      </div>
    </div>
  );
}
