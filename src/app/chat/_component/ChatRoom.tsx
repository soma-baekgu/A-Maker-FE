import styles from './chatRoom.module.css';
import ProfileImageGroup from "@/app/_component/ProfileImageGroup";
import {ChatContent, FileContent, isFileContent, isReplyEventContent, isString} from "@/app/chatroom/types";
import Image from "next/image";
import React from "react";

type Props = {
    imageUrls: string[]
    chatroomName: string,
    time?: Date,
    speaker?: string
    message?: ChatContent,
    messageCount: number,
    chatType?: string
}

export default function ChatRoom({imageUrls, chatroomName, time, speaker, message, messageCount, chatType}: Props) {
    const options: Intl.DateTimeFormatOptions = {hour: 'numeric', minute: 'numeric', hour12: true};
    const timeString = time ? time.toLocaleTimeString('ko-KR', options) : null;

    return (
        <div className={styles.component}>
            <ProfileImageGroup imageUrls={imageUrls} size={'large'}/>
            <div className={styles.description}>
                <div className={styles.title}>
                    <div className={styles.chatroomName}>{chatroomName}</div>
                    {messageCount > 0 &&

                        <div className={styles.circle}>{messageCount}</div>
                    }
                    {time && <div className={styles.time}>{timeString}</div>}
                </div>
                {message && (
                    chatType === 'GENERAL' && isString(message) ?
                        <div className={styles.message}>{`${speaker} : ${message}`}</div>
                        :
                        chatType === 'IMAGE' && isFileContent(message) ?
                            <div className={styles.message}>{`사진 : ${message.fileName}`}</div>
                            :
                            chatType === 'FILE' && isFileContent(message) ?
                                <div
                                    className={styles.message}>{`파일 : ${message.fileName}`}</div>
                                :
                                chatType === 'REPLY' && isString(message) ?
                                    <div className={styles.message}>{`답변을 요청합니다.`}</div>
                                    :
                                    chatType === 'REACTION' && isString(message) ?
                                        <div className={styles.message}>{`응답을 요청합니다`}</div>
                                        :
                                        chatType === 'TASK' && isString(message) ?
                                            <div className={styles.message}>{`업무를 요청합니다`}</div>
                                            :
                                            <div>잘못된 메세지</div>
                )}
            </div>
        </div>
    );
}