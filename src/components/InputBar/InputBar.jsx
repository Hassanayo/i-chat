import React from "react";
import styles from "./inputBar.module.scss";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPaperPlane } from "@fortawesome/free-solid-svg-icons";
import { faFaceSmile } from "@fortawesome/free-regular-svg-icons";
import Colors from '../../styles/Colors/colors'
export default function InputBar() {
  return (
    <div className={styles.inputBarBody}>
      <div className={styles.iconBox}>
        <FontAwesomeIcon color={Colors.navyGrey} icon={faFaceSmile} />
      </div>
      <input className={styles.inputField} type="text" placeholder="Message" />
      <div className={styles.iconBox}>
        <FontAwesomeIcon color={Colors.icebergBlue} icon={faPaperPlane} />
      </div>
    </div>
  );
}
