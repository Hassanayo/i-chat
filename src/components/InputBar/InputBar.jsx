import styles from "./inputBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import Colors from "../../styles/Colors/colors";
import { useMessages } from "../../context/MessageContext";
export default function InputBar() {
  const {sendMessage, text, setText} = useMessages()
  return (
    <div className={styles.inputBarBody}>
      <div className={styles.iconBox}>
        <FontAwesomeIcon color={Colors.navyGrey} icon={faFaceSmile} />
      </div>
      <form className={styles.inputForm} onSubmit={sendMessage}>
        <input
          className={styles.inputField}
          type="text"
          placeholder="Message"
          value={text}
          onChange={(e) => setText(e.target.value)}
        />
      <button className={styles.iconBox}>
        <FontAwesomeIcon color={Colors.icebergBlue} icon={faPaperPlane} />
      </button>
      </form>
    </div>
  );
}
