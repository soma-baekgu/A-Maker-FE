import styles from './chatRoom.module.css';
import ProfileImageGroup from "@/app/_component/ProfileImageGroup";
import {FileContent} from "@/app/chatroom/types";
import Image from "next/image";
import React from "react";

type Props = {
    imageUrls: string[]
    chatroomName: string,
    time?: Date,
    speaker?: string
    message?: string | FileContent,
    messageCount: number,
    chatType: string
}

export default function ChatRoom({imageUrls, chatroomName, time, speaker, message, messageCount, chatType}: Props) {
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
                {message && (
                    chatType === 'GENERAL' ?
                        <div className={styles.message}>{typeof message === 'string' ? message : ''}</div>
                        :
                        chatType === 'IMAGE' ?
                            <div className={styles.message}>{typeof message === 'object' ? message.fileName : ''}</div>
                            :
                            chatType === 'FILE' ?
                                <div
                                    className={styles.message}>{typeof message === 'object' ? message.fileName : ''}</div>
                                :
                                <div></div>
                )}
                {messageCount > 0 &&
                    <div className={styles.messageCount}>
                        <div className={styles.circle}>{messageCount}</div>
                    </div>
                }
            </div>
        </div>
    );
}