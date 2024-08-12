import {FileContent} from "@/app/chatroom/types";
import styles from "@/app/chatroom/_component/chatMessage.module.css";
import Image from "next/image";
import React from "react";

type Props = {
    chatType: string,
    content: string | FileContent,
}

export default function ContentByChatType({chatType, content}: Props) {
    return (
        <>
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

        </>
    );
}