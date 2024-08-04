import Link from "next/link";
import styles from "./bottomBar.module.css";
import Image from 'next/image';

type Props = {
    workspaceId: number
}

export default function BottomBar({workspaceId}: Props) {
    return (
        <>
            <div className={styles.component}>
                <Link href={`/home/${workspaceId}`}>
                    <Image className={styles.button} src="/button/home.png" alt="home" width={60} height={60}/>
                </Link>
                <Link href={`/chat/${workspaceId}`}>
                    <Image className={styles.button} src="/button/chat.png" alt="chat" width={60} height={60}/>
                </Link>
                <Link href={`/alarm/${workspaceId}`}>
                    <Image className={styles.button} src="/button/alarm.png" alt="alarm" width={60} height={60}/>
                </Link>
            </div>
        </>
    )
}