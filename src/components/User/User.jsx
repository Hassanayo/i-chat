import React from 'react'
import Avatar from "../../assets/Avatar.png"
import {Regular12, Regular14, Semibold16} from "../../styles/Typography/typography"
import styles from "./user.module.scss"
export default function User() {
  return (
    <div className={styles.userContainer}>
      <div className={styles.left}>
      <div className={styles.profilePic}>
        <img src={Avatar} alt="" />
      </div>
      <div className={styles.details}>
        <Semibold16>Greg James</Semibold16>
        <Regular14>Ok, see you later</Regular14>
      </div>
      </div>
      <div className={styles.addDetails}>
        <Regular12 className={styles.time}>12:48</Regular12>
        <div className={styles.notifs}><Regular12 color='#FFF'>1</Regular12></div>
      </div>
    </div>
  )
}
