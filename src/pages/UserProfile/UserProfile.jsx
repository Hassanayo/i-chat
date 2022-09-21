import {
  faCamera,
  faArrowLeftLong,
  faTrash,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./userProfile.module.scss";
import Img from "../../assets/blankimage.png";
import { useEffect, useState } from "react";
import { LayoutWrapper } from "../../components/Layout/Layout";
import { db, storage } from "../../firebase/firebase";
import {
  ref,
  getDownloadURL,
  uploadBytes,
  deleteObject,
} from "firebase/storage";
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { useAuth } from "../../context/AuthContext";
import { useNavigate } from "react-router-dom";

export default function UserProfile() {
  const [img, setImg] = useState("");
  const [user, setUser] = useState("");
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  useEffect(() => {
    getDoc(doc(db, "users", currentUser.uid)).then((docSnap) => {
      if (docSnap.exists()) {
        setUser(docSnap.data());
      }
    });
    if (img) {
      async function uploadImg() {
        const imgRef = ref(storage, `avatar/${currentUser.uid} - ${img.name}`);
        console.log(user.avatarPath);
        try {
          // if(user.avatarPath){
          //     await deleteObject(ref(storage, user.avatarPath))
          // }
          const snap = await uploadBytes(imgRef, img);
          const url = await getDownloadURL(ref(storage, snap.ref.fullPath));

          await updateDoc(doc(db, "users", currentUser.uid), {
            avatar: url,
            avatarPath: snap.ref.fullPath,
          });
          setImg("");
        } catch (error) {
          console.log(error.message);
        }
      }
      uploadImg();
    }
  }, [img, currentUser.uid, user.avatarPath]);

  // delete profile picture
  async function deleteImage() {
    try {
      const confirm = window.confirm("Delete profile picture?");
      if (confirm) {
        await deleteObject(ref(storage, user.avatarPath));

        // update the user document
        await updateDoc(doc(db, "users", currentUser.uid), {
          avatar: "",
          avatarPath: "",
        });
      }
    } catch (error) {
      console.log(error.message);
    }
  }

  return user ? (
    <LayoutWrapper>
      <section className={styles.profileContainer}>
        <nav className={styles.profileNav}>
          <div
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/messenger")}
          >
            <FontAwesomeIcon icon={faArrowLeftLong} />
          </div>

          <div>
            <p>Profile</p>
          </div>
        </nav>
        <div className={styles.profileBody}>
          <div className={styles.imgContainer}>
            <img
              className={styles.profilePic}
              src={user.avatar || Img}
              alt="#profilepic"
            />
            <div className={styles.overlay}>
              <div>
                <label htmlFor="photo" className={styles.avatarIcons}>
                  <FontAwesomeIcon icon={faCamera} />
                </label>
                <input
                  type="file"
                  accept="image/*"
                  id="photo"
                  onChange={(e) => setImg(e.target.files[0])}
                  style={{ display: "none" }}
                />
              </div>
              <div className={styles.avatarIcons}>
                {user.avatar ? (
                  <FontAwesomeIcon onClick={deleteImage} icon={faTrash} />
                ) : null}
              </div>
            </div>
          </div>

          <div className={styles.userDetails}>
            <p className={styles.nameLabel}>Your name</p>
            <p className={styles.username}>{user.name}</p>
            <small>Joined on: {user.createdAt.toDate().toDateString()}</small>
          </div>
        </div>
      </section>
    </LayoutWrapper>
  ) : null;
}
