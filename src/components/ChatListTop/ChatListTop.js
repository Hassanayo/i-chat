import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBackspace, faBackward, faBars, faDoorClosed, faRightFromBracket, faSearch } from "@fortawesome/free-solid-svg-icons";
import React from "react";
import styles from "./chatListTop.module.scss";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { doc, updateDoc } from "firebase/firestore";
import { db } from "../../firebase/firebase";
export default function ChatListTop() {
  const {logout, currentUser} = useAuth()
  const navigate = useNavigate()
  async function handleLogout(e) {
    e.preventDefault();
    try {
      // setError("");
      await logout();
      navigate("/login");
      await updateDoc(doc(db, "users", currentUser.uid), {
        isOnline: false,
      });
    } catch (error) {
      console.log(error);
      // setError("Failed to log out");
    }
  }
  return (
    <div className={styles.container}>
      <div onClick={handleLogout}  className={styles.iconBox}>
        <FontAwesomeIcon icon={faRightFromBracket} />
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
