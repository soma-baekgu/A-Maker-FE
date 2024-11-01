'use client';
import styles from './page.module.css';
import TopBar from "@/app/_component/TopBar";
import BottomBar from "@/app/_component/BottomBar";
import {useEffect, useRef, useState} from "react";
import {timeAgo} from "@/app/(utils)/DateUtils";
import Image from "next/image";
import notificationApi from "@/app/(api)/notification";

interface Props {
    params: {
        workspaceId: number
    }
}

interface Notification {
    id: number,
    title: string,
    content: string,
    userId: string,
    eventId: number,
}

export default function Alarm(props: Props) {
    const workspaceId = props.params.workspaceId;
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const contentRef = useRef<HTMLDivElement | null>(null);
    const [cursor, setCursor] = useState(0);
    const [isLoading, setIsLoading] = useState(false);

    const fetchNotifications = () => {
        if (isLoading) return;
        setIsLoading(true);
        notificationApi.getNotifications(
            workspaceId,
            cursor + 1
        ).then((res) => {
            setNotifications(prev => [...prev, ...res.data.data.content]);
            setCursor(prev=>prev+1 );
            setIsLoading(false);
        })
    }

    const handleScroll = () => {
        if (contentRef.current) {
            const {scrollTop, scrollHeight, clientHeight} = contentRef.current;
            if (scrollTop + clientHeight >= scrollHeight) {
                console.log(cursor);
                fetchNotifications();
            }
        }
    };

    useEffect(() => {
        fetchNotifications();
    }, []);


    useEffect(() => {
        const contentElement = contentRef.current;
        if (contentElement) {
            contentElement.addEventListener('scroll', handleScroll);
        }
    }, [cursor]);


    return (
        <div className={styles.page}>
            <TopBar pageType='알림' workspaceId={workspaceId}/>
            <div className={styles.content} ref={contentRef}>
                {notifications.map((notification, index) => (
                    <>
                        <div className={styles.notification} key={index}>
                            <div className={styles.top}>
                                <div className={styles.title}>
                                    <Image src={"/alarm/icon.png"} alt={"icon"} width={16} height={16}/>
                                    {notification.title}
                                </div>
                            </div>
                            <div className={styles.body}>{notification.content}</div>
                        </div>
                    </>
                ))}
            </div>
            <BottomBar workspaceId={workspaceId} pageType='알림'/>
        </div>
    );
}

//title div 아래에 두기
//<div className={styles.date}>{timeAgo(new Date(notification.createdAt))}</div>