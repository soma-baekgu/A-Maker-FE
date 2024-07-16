import styles from './chatroom.module.css';
import ProfileImageGroup from "@/app/_component/ProfileImageGroup";

export default function ChatRoom() {
    return (
        <div className={styles.component}>
            <ProfileImageGroup imageUrls={["a", "b", "c"]}/>
            <div className={styles.description}>
                <div className={styles.title}>
                    <div className={styles.chatroomName}>전체 채팅방</div>
                    <div className={styles.time}>오후 5:26</div>
                </div>
                <div className={styles.message}>이승환: 안녕하세요!</div>
                <div>
                    <div className={styles.messageCount}>3</div>
                </div>
            </div>
        </div>
    );
}