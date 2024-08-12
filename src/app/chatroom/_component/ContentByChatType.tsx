import {ChatContent, FileContent, isFileContent, isReplyEventContent, isString} from "@/app/chatroom/types";
import styles from "@/app/chatroom/_component/chatMessage.module.css";
import Image from "next/image";
import React from "react";
import EventMessage from "@/app/chatroom/_component/EventMessage";

type Props = {
    chatType: string,
    content: ChatContent,
}

export default function ContentByChatType({chatType, content}: Props) {
    return (
        <>
            {chatType === 'GENERAL' && isString(content) ?
                <div className={styles.content}>{content}</div>
                :
                chatType === 'IMAGE' && isFileContent(content) ?
                    <a href={content.path}>
                        <Image className={styles.content} src={content.path}
                               alt="img" width={300} height={300}/>
                    </a>
                    :
                    chatType === 'FILE' && isFileContent(content) ?
                        <a href={content.path}>
                            <div className={`${styles.file} ${styles.content}`}>
                                <div className={styles.fileIcon}>
                                    <Image src="/button/file.png" alt="file" width={20} height={20}/>
                                </div>
                                <div>
                                    {content.fileName}
                                </div>
                            </div>
                        </a>
                        :
                        chatType === 'REPLY' && isReplyEventContent(content) ?
                            <div className={styles.content}>
                            <EventMessage
                                eventTitle={content.eventTitle}
                                users={content.users}
                                deadLine={content.deadLine}
                                finishedCount={content.finishedCount}
                                totalAssigneesCount={content.totalAssignedCount}
                                eventType={'reply'}/>
                            </div>
                            :
                            <div>잘못된 메세지</div>

            }

        </>
    );
}