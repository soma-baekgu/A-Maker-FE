import styles from './chatroom.module.css';
import ProfileImageGroup from "@/app/_component/ProfileImageGroup";

type Props = {
    imageUrls: string[]
    chatroomName: string,
    time: Date,
    speaker: string
    message: string,
    messageCount: number,
}

export default function ChatRoom({imageUrls, chatroomName, time, speaker, message, messageCount}: Props) {
    const options: Intl.DateTimeFormatOptions = {hour: 'numeric', minute: 'numeric', hour12: true};
    const timeString = time.toLocaleTimeString('ko-KR', options);

    return (
        <div className={styles.component}>
            <ProfileImageGroup imageUrls={imageUrls}/>
            <div className={styles.description}>
                <div className={styles.title}>
                    <div className={styles.chatroomName}>{chatroomName}</div>
                    <div className={styles.time}>{timeString}</div>
                </div>
                <div className={styles.message}>{speaker} : {message}</div>
                <div className={styles.messageCount}>
                    <div className={styles.circle}>{messageCount}</div>
                </div>
            </div>
        </div>
    );
}