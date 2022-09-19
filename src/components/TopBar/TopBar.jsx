import styles from "./topBar.module.scss";
import Avatar from "../../assets/blankimage.png";
import { Regular14, Semibold16 } from "../../styles/Typography/typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faClose} from "@fortawesome/free-solid-svg-icons";
export default function TopBar({ chat, setChat }) {
  return (
    <div className={styles.topBarBody}>
      <div className={styles.left}>
        <div className={styles.imageBox}>
          <img src={chat.avatar || Avatar} alt="" />
        </div>
        <div className={styles.details}>
          <Semibold16>{chat.name}</Semibold16>
          <div>
            {chat.isOnline ? (
              <Regular14>online</Regular14>
            ) : (
              <Regular14>offline</Regular14>
            )}
          </div>
        </div>
      </div>
      <div className={styles.iconBox} onClick={() => setChat("")}>
        <FontAwesomeIcon icon={faClose}/>
      </div>
    </div>
  );
}
