import styles from './specialChatBar.module.css';
import Image from "next/image";

export default function SpecialChatBar() {
    return (
        <div className={styles.component}>
            <div className={styles.button}>
                <Image src="/button/special/reaction.png" alt="reaction" width={60} height={53}/>
            </div>
            <div className={styles.button}>
                <Image src="/button/special/reply.png" alt="reply" width={60} height={60}/>
            </div>
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