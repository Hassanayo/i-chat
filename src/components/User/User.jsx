import React from "react";
import Img from "../../assets/blankimage.png";
import {
  FlexBox,
  Regular14,
  Semibold16,
} from "../../styles/Typography/typography";
import styles from "./user.module.scss";
export default function User({ user, selectUser, lastMsg }) {
  return (
    <div onClick={() => selectUser(user)} className={styles.userContainer}>
      <div className={styles.left}>
        <div className={styles.userStatus}>

        <div className={styles.profilePic}>
          <img src={user.avatar || Img} alt="" />
          <div
              className={`${styles.status} ${
                user.isOnline ? styles.online : styles.offline
              }`}
            ></div>
        </div>
        </div>
        <div className={styles.details}>
          <FlexBox alignItems="center" gap="10px">
            <Semibold16>{user.name}</Semibold16>
            
          </FlexBox>
          <Regular14>{user.lastMessage}</Regular14>
        </div>
      </div>
      {/* <div className={styles.addDetails}>
        <Regular12 className={styles.time}>12:48</Regular12>
        <div className={styles.notifs}>
          <Regular12 color="#FFF">1</Regular12>
        </div>
      </div> */}
    </div>
  );
}
