import Link from "next/link";
import styles from "./bottomBar.module.css";
import Image from 'next/image';

export default function BottomBar() {
    return (
        <>
            <div className={styles.component}>
                <Link href="/home">
                    <Image className={styles.button} src="/button/home.png" alt="home" width={60} height={60} />
                </Link>
                <Link href="/chat">
                    <Image className={styles.button} src="/button/chat.png" alt="chat" width={60} height={60} />
                </Link>
                <Link href="/alarm">
                    <Image className={styles.button} src="/button/alarm.png" alt="alarm" width={60} height={60} />
                </Link>
            </div>
        </>
    )
}