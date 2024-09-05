"use client";

import styles from './specialChatBar.module.css';
import Image from "next/image";
import Link from "next/link";
import {useEffect, useRef, useState} from "react";
import SendApproveModal from "@/app/chatroom/_component/SendApproveModal";
import fileApi from "@/app/(api)/file";
import axios, {AxiosRequestHeaders} from "axios";
import chatApi from "@/app/(api)/chat";

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


    const getUrl = async (targetName: string, ref: React.RefObject<HTMLInputElement>): Promise<string> => {
        const fileNameArray: string[] = targetName.split('.');
        const extension: string = fileNameArray.pop() || '';
        const name: string = fileNameArray.join('.');

        const res = await fileApi.getUrl(new Date().getTime().toString(), extension, name);

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload = async (evt) => {
                if (evt.target && ref && ref.current && ref.current.files && ref.current.files.length > 0) {
                    try {
                        const binaryData = evt.target.result;
                        await axios.put(res.data.data, binaryData, {
                            headers: {
                                'Content-Type': ref.current.files![0].type
                            } as AxiosRequestHeaders
                        });
                        const url = new URL(res.data.data);
                        resolve(url.origin + url.pathname);
                    } catch (error) {
                        reject(error);
                    }
                } else {
                    reject(new Error("File reading failed"));
                }
            }
            reader.onerror = (evt) => reject(new Error("File reading failed"));
            if (ref.current && ref.current.files && ref.current.files.length > 0) {
                reader.readAsArrayBuffer(ref.current.files![0]);
            } else {
                reject(new Error("No file selected"));
            }
        });
    }

    const sendFile = async () => {
        const fileUrl: string = await getUrl(fileName, fileInputRef);
        await chatApi.sendFile(chatroomId, fileUrl);
    }

    const sendImage = async () => {
        const imageUrl: string = await getUrl(imageName, imageInputRef);
        console.log(imageUrl);
        await chatApi.sendImg(chatroomId, imageUrl);
    }

    return (
        <div className={styles.component}>
            <div className={styles.buttons}>
                <div className={styles.button}>
                    <Image src="/specialChatBar/reaction.png" alt="reaction" width={32} height={32}/>
                    <div>응답 요청하기</div>
                </div>
                <Link className={styles.button} href={`/chatroom/${chatroomId}/reply`}>
                    <Image src="/specialChatBar/reply.png" alt="reply" width={32} height={32}/>
                    <div>답변 요청하기</div>
                </Link>
                <div className={styles.button}>
                    <Image src="/specialChatBar/task.png" alt="task" width={32} height={32}/>
                    <div>업무 요청하기</div>
                </div>
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