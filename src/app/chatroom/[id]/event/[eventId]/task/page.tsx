"use client";

import {EventData, User} from "@/app/chatroom/[id]/event/[eventId]/types";
import {useEffect, useRef, useState} from "react";
import TopBar2 from "@/app/_component/TopBar2";
import EventInfo from "@/app/chatroom/[id]/event/[eventId]/_component/EventInfo";
import Profile from "@/app/chatroom/[id]/event/_component/Profile";
import {timeAgo} from "@/app/(utils)/DateUtils";
import styles from "./page.module.css";
import Image from "next/image";
import eventApi from "@/app/(api)/event";
import eventCommentApi from "@/app/(api)/eventComment";
import {useStore} from "@/app/store";
import SendApproveModal from "@/app/chatroom/_component/SendApproveModal";
import {getPreSignedUrl} from "@/app/chatroom/preSignedUrl";
import chatApi from "@/app/(api)/chat";
import axios from "axios";
import fileDownload from 'js-file-download';
import {saveFile} from "@/app/chatroom/fileSaver";
import FileDownloader from "@/app/chatroom/_component/FileDownloader";

interface Comment {
    id: number,
    userId: string,
    eventId: number,
    path: string,
    createdAt: string,
    updatedAt: string,
    userResponse: User
}

interface TaskEventData extends EventData {
    eventDetails: string
}

interface StoreState {
    email: string;
}

export default function Page(props: {
    params: {
        id: string,
        eventId: string
    }
}) {
    const chatRoomId: number = Number(props.params.id);
    const eventId: number = Number(props.params.eventId);
    const [event, setEvent] = useState<TaskEventData>();
    const [isLoaded, setIsLoaded] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const {email} = useStore() as StoreState;
    const fileInputRef = useRef<HTMLInputElement | null>(null);
    const [fileInputVisible, setFileInputVisible] = useState(false);
    const [fileName, setFileName] = useState('');
    const [isAvailable, setIsAvailable] = useState(false);

    const fetchEventData = async () => {
        const res = await eventApi.readTaskEvent(chatRoomId, eventId);
        setEvent(res.data.data);
    }

    const fetchCommentData = async () => {
        const res = await eventCommentApi.readTaskComment(eventId, 0, 100);
        setComments(res.data.data.content);
    }

    const handleFileInput = () => {
        fileInputRef.current!.click();
    }

    const handleChangeFile = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files.length > 0) {
            setFileName(e.target.files![0].name);
            setFileInputVisible(true);
        }
    }

    const uploadFile = async () => {
        const fileUrl: string = await getPreSignedUrl(fileName, fileInputRef);
        await eventCommentApi.createTaskComment(eventId, fileUrl);
        await fetchCommentData();
    }

    const getFileNameFromUrl = (url: string): string => {
        const parts = url.split('/');
        const encodedFileName = parts[parts.length - 1];
        return decodeURIComponent(encodedFileName);
    };

    function areAllWaitingUsersInComments(event: EventData, comments: Comment[]): boolean {
        const commentEmails = comments.map(comment => comment.userResponse.email);
        return event.waitingUser.every(user => commentEmails.includes(user.email));
    }

    useEffect(() => {
        fetchEventData().then(() => setIsLoaded(true));
        fetchCommentData();
    }, []);

    useEffect(() => {
        if (!fileInputVisible && fileInputRef.current) {
            fileInputRef.current!.value = '';
        }
    }, [fileInputVisible]);

    useEffect(() => {
        if (event?.waitingUser.some((user: User) => user.email == email) ||
            event?.finishUser.some((user: User) => user.email == email))
            setIsAvailable(true);
    }, [event]);

    return (
        <div className={styles.page}>
            <TopBar2 title={"이벤트 상세"}/>
            {isLoaded && event ? (
                <div className={styles.main}>
                    <div className={styles.body}>
                        <div className={styles.title}>
                            <div className={styles.titleText}>{event.eventTitle}</div>
                            {areAllWaitingUsersInComments(event, comments) && <div className={styles.status}>
                                <div className={styles.statusText}>완료</div>
                            </div>}
                        </div>
                        <EventInfo event={event} type={"task"}/>
                        <div className={styles.detailText}>{event.eventDetails}</div>
                    </div>
                    <div className={styles.comments}>
                        {
                            comments.map((comment, index) => (
                                <div key={index} className={styles.comment}>
                                    <div className={styles.commentTitle}>
                                        <Profile name={comment.userResponse.name}
                                                 img={comment.userResponse.picture}
                                                 isComment={true}/>
                                        <div className={styles.time}>{timeAgo(new Date(comment.createdAt))}</div>
                                    </div>
                                    <div className={styles.content}>
                                        <Image src={"/task/clip.png"} alt={"clip"} width={16} height={16}/>
                                        {getFileNameFromUrl(comment.path)}
                                    </div>
                                    <FileDownloader path={comment.path} fileName={getFileNameFromUrl(comment.path)}/>
                                </div>
                            ))
                        }
                    </div>
                    {isAvailable && event && !areAllWaitingUsersInComments(event, comments) &&
                        <div className={styles.fixedBtn} onClick={handleFileInput}>
                            <Image src={"/task/white_clip.png"} alt={"white_clip"} width={24} height={24}/>
                            <input type="file" ref={fileInputRef} className={styles.none} onChange={handleChangeFile}/>
                            첨부파일 등록
                        </div>
                    }
                </div>
            ) : (
                <div className={styles.main}>Loading...</div>
            )}
            {fileInputVisible &&
                <SendApproveModal title="첨부파일 등록" fileName={fileName} setVisible={setFileInputVisible}
                                  send={uploadFile}/>}
        </div>
    )
}