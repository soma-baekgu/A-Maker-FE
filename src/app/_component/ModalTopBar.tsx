import styles from "./modalTopBar.module.css";
import Link from "next/link";

type Props = {
    barDescription: string
}

export default function ModalTopBar({barDescription}: Props) {
    return (
        <>
            <div className={styles.topBar}>
                <Link href="/main">
                    <div className={styles.backButton}></div>
                </Link>
                <div className={styles.barTitle}>
                    {barDescription}
                </div>
                <div className={styles.dummy}></div>
            </div>
        </>
    )
}