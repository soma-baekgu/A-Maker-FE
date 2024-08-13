import styles from './chatMessage.module.css';
import React from "react";
import {ChatContent, FileContent} from "@/app/chatroom/types";
import Image from "next/image";
import ContentByChatType from "@/app/chatroom/_component/ContentByChatType";

type Props = {
    speakerImageUrl: string,
    speakerName: string,
    content: ChatContent,
    time: Date,
    isMine: boolean,
    chatType: string,
    messageId: number,
    chatroomId: number
}

const ChatMessage = React.forwardRef<HTMLDivElement, Props>(({
                                                                 speakerImageUrl,
                                                                 speakerName,
                                                                 content,
                                                                 time,
                                                                 isMine,
                                                                 chatType,
                                                                 messageId,
                                                                 chatroomId
                                                             }, ref) => {
    const options: Intl.DateTimeFormatOptions = {hour: 'numeric', minute: 'numeric', hour12: true};
    const timeString = time.toLocaleTimeString('ko-KR', options);

    return (
        isMine ? (
            <div ref={ref} className={`${styles.component} ${styles.right}`}>
                <div className={styles.message}>
                    <ContentByChatType chatType={chatType} content={content} messageId={messageId}
                                       chatroomId={chatroomId}/>
                    <div className={styles.time}>{timeString}</div>
                </div>
            </div>
        ) : (
            <div ref={ref} className={`${styles.component} ${styles.left}`}>
                <img src={speakerImageUrl} className={styles.speakerImage}/>
                <div className={styles.description}>
                    <div className={styles.speakerName}>{speakerName}</div>
                    <div className={styles.message}>
                        <ContentByChatType chatType={chatType} content={content} messageId={messageId}
                                           chatroomId={chatroomId}/>
                        <div className={styles.time}>{timeString}</div>
                    </div>
                </div>
            </div>
        )
    );
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;