import {ChatContent, FileContent, isFileContent, isReplyEventContent, isString} from "@/app/chatroom/types";
import styles from "@/app/chatroom/_component/chatMessage.module.css";
import NextImage from "next/image";
import React, {useEffect, useState} from "react";
import EventMessage from "@/app/chatroom/_component/EventMessage";
import fileDownload from "js-file-download";
import {saveFile} from "@/app/chatroom/fileSaver";
import FileDownloader from "@/app/chatroom/_component/FileDownloader";

type Props = {
    chatType: string,
    content: ChatContent,
    messageId: number,
    chatroomId: number
}

export default function ContentByChatType({chatType, content, messageId, chatroomId}: Props) {
    const [imageHeight, setImageHeight] = useState(0);

    useEffect(() => {
        if (chatType === 'IMAGE' && isFileContent(content)) {
            const img = new Image();
            img.src = content.path;
            img.onload = () => {
                const aspectRatio = img.height / img.width;
                setImageHeight(250 * aspectRatio);
            };
        }
    }, [chatType, content]);

    return (
        <>
            {chatType === 'GENERAL' && isString(content) ?
                <div className={styles.content}>{content}</div>
                :
                chatType === 'IMAGE' && isFileContent(content) ?
                    <div className={styles.content + ' ' + styles.downloadContent}>
                        <NextImage src={content.path}
                                   alt="img" width={250} height={imageHeight}/>
                        <FileDownloader path={content.path} fileName={content.fileName}/>
                    </div>
                    :
                    chatType === 'FILE' && isFileContent(content) ?
                        <div className={styles.content + ' ' + styles.downloadContent}>
                            <div className={`${styles.file}`}>
                                <div>
                                    <NextImage src="/chatting/file.png" alt="file" width={16} height={16}/>
                                </div>
                                <div>
                                    {content.fileName}
                                </div>
                            </div>
                            <FileDownloader path={content.path} fileName={content.fileName}/>
                        </div>
                        :
                        chatType === 'REPLY' && isReplyEventContent(content) ?
                            <div className={styles.content2}>
                                <EventMessage
                                    eventTitle={content.eventTitle}
                                    users={content.users}
                                    deadLine={content.deadLine}
                                    finishedCount={content.finishedCount}
                                    totalAssignedCount={content.totalAssignedCount}
                                    eventType={'reply'}
                                    messageId={messageId}
                                    chatroomId={chatroomId}/>
                            </div>
                            :
                            chatType === 'REACTION' && isReplyEventContent(content) ?
                                <div className={styles.content2}>
                                    <EventMessage
                                        eventTitle={content.eventTitle}
                                        users={content.users}
                                        deadLine={content.deadLine}
                                        finishedCount={content.finishedCount}
                                        totalAssignedCount={content.totalAssignedCount}
                                        eventType={'reaction'}
                                        messageId={messageId}
                                        chatroomId={chatroomId}/>
                                </div>
                                :
                                chatType === 'TASK' && isReplyEventContent(content) ?
                                    <div className={styles.content2}>
                                        <EventMessage
                                            eventTitle={content.eventTitle}
                                            users={content.users}
                                            deadLine={content.deadLine}
                                            finishedCount={content.finishedCount}
                                            totalAssignedCount={content.totalAssignedCount}
                                            eventType={'task'}
                                            messageId={messageId}
                                            chatroomId={chatroomId}/>
                                    </div>
                                    :
                                    <div>잘못된 메세지</div>

            }

        </>
    );
}