import {useState} from "react";
import styles from "./inputBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import Colors from "../../styles/Colors/colors";
import { useMessages } from "../../context/MessageContext";
export default function InputBar() {
  const {message, setMessage} = useMessages()
  function sendMessage(e){
    e.preventDefault()
  }
  return (
    <div className={styles.inputBarBody}>
      <div className={styles.iconBox}>
        <FontAwesomeIcon color={Colors.navyGrey} icon={faFaceSmile} />
      </div>
      <form className={styles.inputForm} action="" onSubmit={sendMessage}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="Message"
          onChange={(e) => setMessage(e.target.value)}
        />
      </form>
      <div className={styles.iconBox}>
        <FontAwesomeIcon color={Colors.icebergBlue} icon={faPaperPlane} />
      </div>
    </div>
  );
}
