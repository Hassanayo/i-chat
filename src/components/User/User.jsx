import React from "react";
import Avatar from "../../assets/Avatar.png";
import { useMessages } from "../../context/MessageContext";
import Img from "../../assets/blankimage.png"
import {
  FlexBox,
  Regular12,
  Regular14,
  Semibold16,
} from "../../styles/Typography/typography";
import styles from "./user.module.scss";
export default function User({user, selectUser}) {
  return (
    <div onClick={() => selectUser(user)} className={styles.userContainer}>
      <div className={styles.left}>
        <div className={styles.profilePic}>
          <img src={user.avatar || Img} alt="" />
        </div>
        <div className={styles.details}>
          <FlexBox alignItems="center" gap="10px" >
          <Semibold16>{user.name}</Semibold16>
            <div className={`${styles.status} ${user.isOnline ? styles.online : styles.offline}`}></div>
          </FlexBox>
          <Regular14>Ok, see you later</Regular14>
        </div>
      </div>
      <div className={styles.addDetails}>
        <Regular12 className={styles.time}>12:48</Regular12>
        <div className={styles.notifs}>
          <Regular12 color="#FFF">1</Regular12>
        </div>
      </div>
    </div>
  );
}
