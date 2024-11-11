"use client";

import styles from './specialChatBar.module.css';
import Image from "next/image";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import SendApproveModal from "@/app/chatroom/_component/SendApproveModal";
import fileApi from "@/app/(api)/file";
import axios, {AxiosRequestHeaders} from "axios";
import chatApi from "@/app/(api)/chat";
import {getPreSignedUrl} from "@/app/chatroom/preSignedUrl";

type Props = {
    chatroomId: number
}

export default function SpecialChatBar({chatroomId}: Props) {
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const imageInputRef = useRef<HTMLInputElement | null>(null);
    const [fileInputVisible, setFileInputVisible] = useState(false);
    const [imageInputVisible, setImageInputVisible] = useState(false);
    const [fileName, setFileName] = useState('');
    const [imageName, setImageName] = useState('');

    useEffect(() => {
        if (!fileInputVisible && fileInputRef.current) {
            fileInputRef.current!.value = '';
        }
    }, [fileInputVisible]);

    useEffect(() => {
        if (!imageInputVisible && imageInputRef.current)
            imageInputRef.current!.value = '';
    }, [imageInputVisible]);


    const handleFileInput = () => {
        fileInputRef.current!.click();
    }

    const handleImageInput = () => {
        imageInputRef.current!.click();
    }

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files![0].name);
            setFileInputVisible(true);
        }
    }

    const handleChangeImage = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setImageName(e.target.files![0].name);
            setImageInputVisible(true);
        }
    }

    const sendFile = async () => {
        const fileUrl: string = await getPreSignedUrl(fileName, fileInputRef);
        await chatApi.sendFile(chatroomId, fileUrl);
    }

    const sendImage = async () => {
        const imageUrl: string = await getPreSignedUrl(imageName, imageInputRef);
        console.log(imageUrl);
        await chatApi.sendImg(chatroomId, imageUrl);
    }

    return (
        <div className={styles.component}>
            <div className={styles.buttons}>
                <Link className={styles.button} href={`/chatroom/${chatroomId}/reaction`}>
                    <Image src="/specialChatBar/reaction.png" alt="reaction" width={32} height={32}/>
                    <div>응답 요청하기</div>
                </Link>
                <Link className={styles.button} href={`/chatroom/${chatroomId}/reply`}>
                    <Image src="/specialChatBar/reply.png" alt="reply" width={32} height={32}/>
                    <div>답변 요청하기</div>
                </Link>
                <Link className={styles.button} href={`/chatroom/${chatroomId}/task`}>
                    <Image src="/specialChatBar/task.png" alt="task" width={32} height={32}/>
                    <div>업무 요청하기</div>
                </Link>
            </div>
            <div className={styles.buttons}>
                <div className={styles.button}>
                    <Image src="/specialChatBar/image.png" alt="image" width={32} height={32}
                           onClick={handleImageInput}/>
                    <input type="file" ref={imageInputRef} accept="image/*" className={styles.none}
                           onChange={handleChangeImage}/>
                    <div>이미지 전송</div>
                </div>
                <div className={styles.button}>
                    <Image src="/specialChatBar/file.png" alt="file" width={32} height={32} onClick={handleFileInput}/>
                    <input type="file" ref={fileInputRef} className={styles.none} onChange={handleChangeFile}/>
                    <div>파일 전송</div>
                </div>
                <div className={styles.empty}></div>
            </div>
            {fileInputVisible &&
                <SendApproveModal title="파일 전송" fileName={fileName} setVisible={setFileInputVisible} send={sendFile}/>}
            {imageInputVisible &&
                <SendApproveModal title="이미지 전송" fileName={imageName} setVisible={setImageInputVisible}
                                  send={sendImage}/>}
        </div>
    )
}