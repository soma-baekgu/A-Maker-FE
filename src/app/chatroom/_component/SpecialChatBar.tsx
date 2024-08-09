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
    const fileInputRef = useRef(null);
    const imageInputRef = useRef(null);
    const [fileInputVisible, setFileInputVisible] = useState(false);
    const [imageInputVisible, setImageInputVisible] = useState(false);
    const [fileName, setFileName] = useState('');
    const [imageName, setImageName] = useState('');

    useEffect(() => {
        if (!fileInputVisible)
            fileInputRef.current.value = '';
    }, [fileInputVisible]);

    useEffect(() => {
        if (!imageInputVisible)
            imageInputRef.current.value = '';
    }, [imageInputVisible]);


    const handleFileInput = () => {
        fileInputRef.current.click();
    }

    const handleImageInput = () => {
        imageInputRef.current.click();
    }

    const handleChangeFile = (e) => {
        setFileName(e.target.files[0].name);
        setFileInputVisible(true);
    }

    const handleChangeImage = (e) => {
        setImageName(e.target.files[0].name);
        setImageInputVisible(true);
    }


    const getUrl = async (targetName, ref) =>{
        const fileNameArray = targetName.split('.');
        const extension = fileNameArray.pop();
        const name = fileNameArray.join('.');

        const res = await fileApi.getUrl(new Date().getTime().toString(), extension, name);

        return new Promise((resolve, reject) => {
            const reader = new FileReader();
            reader.onload= async (evt)=>{
                try{
                    const binaryData = evt.target.result;
                    await axios.put(res.data.data, binaryData,{
                        headers: {
                            'Content-Type': ref.current.files[0].type
                        } as AxiosRequestHeaders
                    });
                    const url = new URL(res.data.data);
                    resolve(url.origin + url.pathname);
                }catch(error){
                    reject(error);
                }
            }
            reader.onerror = (evt)=>reject(new Error("File reading failed"));
            reader.readAsArrayBuffer(ref.current.files[0]);
        });
    }

    const sendFile = async () => {
        const fileUrl = await getUrl(fileName, fileInputRef);
        await chatApi.sendFile(chatroomId, fileUrl);
    }

    const sendImage = async () => {
        const imageUrl = await getUrl(imageName, imageInputRef);
        console.log(imageUrl);
        await chatApi.sendImg(chatroomId, imageUrl);
    }

    return (
        <div className={styles.component}>
            <div className={styles.button}>
                <Image src="/button/special/reaction.png" alt="reaction" width={60} height={53}/>
            </div>
            <Link className={styles.button} href={`/chatroom/${chatroomId}/reply`}>
                <Image src="/button/special/reply.png" alt="reply" width={60} height={60}/>
            </Link>
            <div className={styles.button}>
                <Image src="/button/special/task.png" alt="task" width={60} height={61}/>
            </div>
            <div className={styles.button}>
                <Image src="/button/special/image.png" alt="image" width={55} height={54} onClick={handleImageInput}/>
                <input type="file" ref={imageInputRef} accept="image/*" className={styles.none}
                       onChange={handleChangeImage}/>
            </div>
            <div className={styles.button}>
                <Image src="/button/special/file.png" alt="file" width={45} height={52} onClick={handleFileInput}/>
                <input type="file" ref={fileInputRef} className={styles.none} onChange={handleChangeFile}/>
            </div>
            {fileInputVisible &&
                <SendApproveModal title="파일 전송" fileName={fileName} setVisible={setFileInputVisible} send={sendFile}/>}
            {imageInputVisible &&
                <SendApproveModal title="이미지 전송" fileName={imageName} setVisible={setImageInputVisible}
                                  send={sendImage}/>}
        </div>
    )
}