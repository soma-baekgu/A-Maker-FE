import styles from './specialChatBar.module.css';
import Image from "next/image";
import Link from "next/link";

type Props = {
    chatroomId: number
}

export default function SpecialChatBar({chatroomId}: Props) {
    return (
        <div className={styles.component}>
            <div className={styles.button}>
                <Image src="/button/special/reaction.png" alt="reaction" width={60} height={53}/>
            </div>
            <Link className={styles.button} href={`/chatroom/${chatroomId}/reply`}>
                <Image src="/button/special/reply.png" alt="reply" width={60} height={60}/>
            </Link>
            <div className={styles.button}>
                <Image src="/button/special/task.png" alt="task" width={60} height={61}/>
            </div>
            <div className={styles.button}>
                <Image src="/button/special/image.png" alt="image" width={55} height={54}/>
            </div>
            <div className={styles.button}>
                <Image src="/button/special/file.png" alt="file" width={45} height={52}/>
            </div>
        </div>
    )
}