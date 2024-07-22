import styles from './chatMessage.module.css';
import React from "react";

type Props = {
    speakerImageUrl: string,
    speakerName: string,
    content: string,
    time: Date,
    isMine: boolean,
}

const ChatMessage = React.forwardRef<HTMLDivElement, Props>(({
                                                                 speakerImageUrl,
                                                                 speakerName,
                                                                 content,
                                                                 time,
                                                                 isMine
                                                             }, ref) => {
    const options: Intl.DateTimeFormatOptions = {hour: 'numeric', minute: 'numeric', hour12: true};
    const timeString = time.toLocaleTimeString('ko-KR', options);

    return (
        isMine ? (
            <div ref={ref} className={`${styles.component} ${styles.right}`}>
                <div className={styles.message}>
                    <div className={styles.time}>{timeString}</div>
                    <div className={styles.content}>{content}</div>
                </div>
            </div>
        ) : (
            <div ref={ref} className={`${styles.component} ${styles.left}`}>
                <div className={styles.speakerImage}></div>
                <div className={styles.description}>
                    <div className={styles.speakerName}>{speakerName}</div>
                    <div className={styles.message}>
                        <div className={styles.content}>{content}</div>
                        <div className={styles.time}>{timeString}</div>
                    </div>
                </div>
            </div>
        )
    );
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;