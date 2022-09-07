import React from "react";
import styles from "./topBar.module.scss";
import Avatar from "../../assets/Avatar.png";
import { Regular14, Semibold16 } from "../../styles/Typography/typography";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faSearch,
  faPhone,
  faEllipsisV,
} from "@fortawesome/free-solid-svg-icons";
export default function TopBar({chat, user}) {
  return (
    <div className={styles.topBarBody}>
      <div className={styles.left}>
        <div className={styles.details}>
          <Semibold16>{chat.name}</Semibold16>
          <Regular14>last seen 5 mins ago</Regular14>
        </div>
      </div>
      <div className={styles.iconBox}>
        {/* <FontAwesomeIcon icon={faSearch} />
        <FontAwesomeIcon icon={faPhone} /> */}
        <FontAwesomeIcon icon={faEllipsisV} />
      </div>
    </div>
  );
}
