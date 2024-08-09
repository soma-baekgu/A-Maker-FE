import styles from './chatMessage.module.css';
import React from "react";
import {FileContent} from "@/app/chatroom/types";
import Image from "next/image";

type Props = {
    speakerImageUrl: string,
    speakerName: string,
    content: string | FileContent,
    time: Date,
    isMine: boolean,
    chatType: string,
}

const ChatMessage = React.forwardRef<HTMLDivElement, Props>(({
                                                                 speakerImageUrl,
                                                                 speakerName,
                                                                 content,
                                                                 time,
                                                                 isMine,
                                                                 chatType
                                                             }, ref) => {
    const options: Intl.DateTimeFormatOptions = {hour: 'numeric', minute: 'numeric', hour12: true};
    const timeString = time.toLocaleTimeString('ko-KR', options);

    return (
        isMine ? (
            <div ref={ref} className={`${styles.component} ${styles.right}`}>
                <div className={styles.message}>
                    <div className={styles.time}>{timeString}</div>
                    {chatType === 'GENERAL' ?
                        <div className={styles.content}>{typeof content === 'string' ? content : ''}</div>
                        :
                        chatType === 'IMAGE' ?
                            <a href={typeof content === 'object' ? content.path : ''}>
                                <Image className={styles.content} src={typeof content === 'object' ? content.path : ''}
                                       alt="img" width={300} height={300}/>
                            </a>
                            :
                            chatType === 'FILE' ?
                                <a href={typeof content === 'object' ? content.path : ''}>
                                    <div className={`${styles.file} ${styles.content}`}>
                                        <div className={styles.fileIcon}>
                                            <Image src="/button/file.png" alt="file" width={20} height={20}/>
                                        </div>
                                        <div>
                                            {typeof content === 'object' ? content.fileName : ''}
                                        </div>
                                    </div>
                                </a>
                                :
                                <div></div>

                    }
                </div>
            </div>
        ) : (
            <div ref={ref} className={`${styles.component} ${styles.left}`}>
                <img src={speakerImageUrl} className={styles.speakerImage}/>
                <div className={styles.description}>
                    <div className={styles.speakerName}>{speakerName}</div>
                    <div className={styles.message}>
                        {chatType === 'GENERAL' ?
                            <div className={styles.content}>{typeof content === 'string' ? content : ''}</div>
                            :
                            chatType === 'IMAGE' ?
                                <a href={typeof content === 'object' ? content.path : ''}>
                                    <Image className={styles.content}
                                           src={typeof content === 'object' ? content.path : ''} alt="img" width={300}
                                           height={300}/>
                                </a>
                                :
                                chatType === 'FILE' ?
                                    <a href={typeof content === 'object' ? content.path : ''}>
                                        <div className={`${styles.file} ${styles.content}`}>
                                            <div className={styles.fileIcon}>
                                                <Image src="/button/file.png" alt="file" width={20} height={20}/>
                                            </div>
                                            <div className={styles.content}>
                                                {typeof content === 'object' ? content.fileName : ''}
                                            </div>
                                        </div>
                                    </a>
                                    :
                                    <div></div>

                        }
                        <div className={styles.time}>{timeString}</div>
                    </div>
                </div>
            </div>
        )
    );
});

ChatMessage.displayName = 'ChatMessage';

export default ChatMessage;