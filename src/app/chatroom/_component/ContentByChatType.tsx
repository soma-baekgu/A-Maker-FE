import {ChatContent, FileContent, isFileContent, isReplyEventContent, isString} from "@/app/chatroom/types";
import styles from "@/app/chatroom/_component/chatMessage.module.css";
import Image from "next/image";
import React from "react";
import EventMessage from "@/app/chatroom/_component/EventMessage";

type Props = {
    chatType: string,
    content: ChatContent,
    messageId: number,
    chatroomId: number
}

export default function ContentByChatType({chatType, content, messageId, chatroomId}: Props) {
    return (
        <>
            {chatType === 'GENERAL' && isString(content) ?
                <div className={styles.content}>{content}</div>
                :
                chatType === 'IMAGE' && isFileContent(content) ?
                    <a href={content.path}>
                        <Image className={styles.content} src={content.path}
                               alt="img" width={250} height={250}/>
                    </a>
                    :
                    chatType === 'FILE' && isFileContent(content) ?
                        <a href={content.path}>
                            <div className={`${styles.file} ${styles.content}`}>
                                <div>
                                    <Image src="/chatting/file.png" alt="file" width={16} height={16}/>
                                </div>
                                <div>
                                    {content.fileName}
                                </div>
                            </div>
                        </a>
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