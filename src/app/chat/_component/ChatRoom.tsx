import styles from './chatRoom.module.css';
import ProfileImageGroup from "@/app/_component/ProfileImageGroup";

type Props = {
    imageUrls: string[]
    chatroomName: string,
    time?: Date,
    speaker?: string
    message?: string,
    messageCount: number,
}

export default function ChatRoom({imageUrls, chatroomName, time, speaker, message, messageCount}: Props) {
    const options: Intl.DateTimeFormatOptions = {hour: 'numeric', minute: 'numeric', hour12: true};
    const timeString = time ? time.toLocaleTimeString('ko-KR', options) : null;

    return (
        <div className={styles.component}>
            <ProfileImageGroup imageUrls={imageUrls}/>
            <div className={styles.description}>
                <div className={styles.title}>
                    <div className={styles.chatroomName}>{chatroomName}</div>
                    {time && <div className={styles.time}>{timeString}</div>}
                </div>
                {message && <div className={styles.message}>{speaker} : {message}</div>}
                {messageCount > 0 &&
                    <div className={styles.messageCount}>
                        <div className={styles.circle}>{messageCount}</div>
                    </div>
                }
            </div>
        </div>
    );
}