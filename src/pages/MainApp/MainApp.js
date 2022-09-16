import { faArrowRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styles from "./mainAppp.module.scss";
import Image from "../../assets/Illustration.png"
import { useNavigate } from "react-router-dom";
export default function MainApp() {
  const navigate = useNavigate()
  return (
    <main className={styles.bodyLayout}>
      <nav className={styles.navbar}>
        <div className={styles.navTitle}>
          <h2>iChat</h2>
        </div>
        <div className={styles.navList}>
          <ul>
            <li>About</li>
            <li>Pages</li>
            <li>Contact</li>
          </ul>
        </div>
      </nav>
      <section className={styles.heroSection}>
        <div className={styles.heroDetails}>
          <h1 className={styles.heroTitle}>
            Start chatting with your friends. Anytime and Anywhere with{" "}
            <span className={styles.heroSpan}>iChat</span>.
          </h1>
          <p className={styles.heroSubtext}>
            Great software that allows you to chat from any place at anytime
            without any interruptions.
          </p>
          <button className={styles.heroBtn} onClick={() => navigate("/messenger")}>
            Start Chatting Now <FontAwesomeIcon icon={faArrowRight} />
          </button>
        </div>
        <div className={styles.heroImg}>
          <img src={Image} alt="heroimage"/>
        </div>
      </section>
    </main>
  );
}
