import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faSearch } from "@fortawesome/free-solid-svg-icons";
import React, { useState } from "react";
import styles from "./chatListTop.module.scss";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
import ListModal from "../ListModal/ListModal";
export default function ChatListTop({ openModal, logout }) {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  // async function handleLogout(e) {
  //   e.preventDefault();
  //   try {
  //     // setError("");
  //     await logout();
  //     navigate("/login");
  //     await updateDoc(doc(db, "users", currentUser.uid), {
  //       isOnline: false,
  //     });
  //   } catch (error) {
  //     console.log(error);
  //     // setError("Failed to log out");
  //   }
  // }
  // open and close modal
  function handleModal() {
    setIsOpen(!isOpen);
  }

  return (
    <div className={styles.container}>
      <div className={styles.iconBox} onClick={handleModal}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <div className={styles.modalBody} >
        <ListModal setIsOpen={setIsOpen} isOpen={isOpen} logout={logout} />
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
