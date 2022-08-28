import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styles from "./chatListTop.module.scss";
export default function ChatListTop() {
  return (
    <div className={styles.container}>
      <div className={styles.iconBox}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className={styles.inputField}>
        <div>
          <FontAwesomeIcon icon={faSearch} />
        </div>
        <input className={styles.inputBox} type="text" placeholder="Search" />
      </div>
    </div>
  );
}
