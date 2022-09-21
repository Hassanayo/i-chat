import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import styles from "./chatListTop.module.scss";
import ListModal from "../ListModal/ListModal";
export default function ChatListTop({ openModal, logout }) {
  const [isOpen, setIsOpen] = useState(false);

  // open and close modal
  function handleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={styles.container}>
      <div className={styles.iconBox} onClick={handleModal}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <ListModal setIsOpen={setIsOpen} isOpen={isOpen} logout={logout} />

      <div className={styles.appName}>
        <h2>iChat</h2>
      </div>
    </div>
  );
}
