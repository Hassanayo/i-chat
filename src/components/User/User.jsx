import { doc, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import Img from "../../assets/blankimage.png";
import { db } from "../../firebase/firebase";
import {
  FlexBox,
  Regular12,
  Regular14,
  Semibold16,
} from "../../styles/Typography/typography";
import styles from "./user.module.scss";
export default function User({ user, selectUser, senderId, chat }) {
  const receiverId = user?.uid;
  const [data, setData] = useState("");
  const [time, setTime] = useState("");
  useEffect(() => {
    const id =
      senderId > receiverId
        ? `${senderId + receiverId}`
        : `${receiverId + senderId}`;
    let unsub = onSnapshot(doc(db, "lastMessage", id), (doc) => {
      setData(doc.data());
    });

    return () => unsub();
  }, [receiverId, senderId]);

  useEffect(() => {
    async function fetchDate() {
      // get time message was sent
      if (data) {
        const dateStr = data.createdAt?.toDate().toISOString();
        const date = new Date(dateStr);
        console.log(data?.createdAt.toDate().toISOString());
        const result =
          date.getHours() +
          ":" +
          (date.getMinutes() < 10 ? "0" : "") +
          date.getMinutes();
        setTime(result);
        console.log(result);
      }
    }
    fetchDate();
  }, [data]);

  return (
    <div
      onClick={() => selectUser(user)}
      className={`${styles.userContainer} ${
        chat.name === user.name && styles.selectedUser
      }`}
    >
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
          <Regular14>{data?.text?.length > 30 ? `${data?.text.slice(0, 21)}...` : data?.text}</Regular14>
        </div>
      </div>
      <div className={styles.addDetails}>
        <Regular12 className={styles.time}>{time}</Regular12>
        {data?.from !== senderId && data?.unread && (
          <div className={styles.notifs}>
            <Regular12 color="#FFF"></Regular12>
          </div>
        )}
      </div>
    </div>
  );
}
