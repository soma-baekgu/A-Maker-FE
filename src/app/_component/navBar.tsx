import styles from './navBar.module.css';
import Link from "next/link";

export default function NavBar() {
    return (
        <div className={styles.navBar}>
            <Link href="/main" className={styles.navButton}>
                <div className={styles.buttonIcon}></div>
            </Link>
            <Link href="/chatting" className={styles.navButton}>
                <div className={styles.buttonIcon}></div>
            </Link>
            <Link href="/dm" className={styles.navButton}>
                <div className={styles.buttonIcon}></div>
            </Link>
            <Link href="/task" className={styles.navButton}>
                <div className={styles.buttonIcon}></div>
            </Link>
        </div>
    )
};