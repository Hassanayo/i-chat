import { Link } from 'react-router-dom'
import styles from "./listModal.module.scss"
export default function ListModal({logout, isOpen, setIsOpen}) {
    
  return (
    <section className={`${styles.modalBackground} ${isOpen ? styles.open : styles.close}`} onClick={() => setIsOpen(false)}>
        <div className={`${styles.modalContainer} `} onClick={() => setIsOpen(false)}>
        <div className={styles.modalList}>
            <Link className={styles.link} to="/profile">Profile</Link>
            <p onClick={logout} style={{cursor: 'pointer'}}>Logout</p>
        </div>
        </div>
    </section>
  )
}
