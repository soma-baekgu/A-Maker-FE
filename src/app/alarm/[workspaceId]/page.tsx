'use client';
import styles from './page.module.css';
import TopBar from "@/app/_component/TopBar";
import BottomBar from "@/app/_component/BottomBar";
import {useState} from "react";
import {timeAgo} from "@/app/(utils)/DateUtils";
import Image from "next/image";

interface Props {
    params: {
        workspaceId: number
    }
}

interface Notification {
    eventId: number,
    title: string,
    body: string,
    createdAt: string
}

export default function Alarm(props: Props) {
    const workspaceId = props.params.workspaceId;
    const [notifications, setNotifications] = useState<Notification[]>([
        {
            eventId: 1,
            title: '미완료된 이벤트',
            body: '[ppt 목차 어떻게 할까요?]가 마감 10분 전입니다. 맡은 업무를 완료해주세요.',
            createdAt: '2024-09-12T17:00:33.987524'
        },
        {
            eventId: 2,
            title: '마감이 지난 이벤트',
            body: '[ppt 목차 어떻게 할까요?]의 마감 기한이 지났습니다. 맡은 업무를 완료해주세요.',
            createdAt: '2024-09-12T17:00:33.987524'
        },
        {
            eventId: 3,
            title: '이벤트 마감',
            body: '[ppt 목차 어떻게 할까요?]가 마감되었습니다. 팀원들의 이벤트 완료 여부를 확인해주세요.',
            createdAt: '2024-09-12T17:00:33.987524'
        },
        {
            eventId: 4,
            title: '이벤트',
            body: '노영진님이 [ppt 목차 어떻게 할까요?]에 답변을 남겼습니다.',
            createdAt: '2024-09-12T17:00:33.987524'
        },
        {
            eventId: 5,
            title: '이벤트',
            body: '허석문님이 [회의 장소]에 답변을 남겼습니다.',
            createdAt: '2024-09-12T17:00:33.987524'
        },
        {
            eventId: 6,
            title: '이벤트',
            body: '이승환님이 [자료조사하기]에 파일을 올렸습니다.',
            createdAt: '2024-09-12T17:00:33.987524'
        },
        {
            eventId: 6,
            title: '이벤트',
            body: '이승환님이 [자료조사하기]에 파일을 올렸습니다.',
            createdAt: '2024-09-12T17:00:33.987524'
        },
        {
            eventId: 6,
            title: '이벤트',
            body: '이승환님이 [자료조사하기]에 파일을 올렸습니다.',
            createdAt: '2024-09-12T17:00:33.987524'
        }
    ]);

    return (
        <div className={styles.page}>
            <TopBar pageType='알림' workspaceId={workspaceId}/>
            <div className={styles.content}>
                {notifications.map((notification, index) => (
                    <>
                        <div className={styles.notification} key={index}>
                            <div className={styles.top}>
                                <div className={styles.title}>
                                    <Image src={"/alarm/icon.png"} alt={"icon"} width={16} height={16}/>
                                    {notification.title}
                                </div>
                                <div className={styles.date}>{timeAgo(new Date(notification.createdAt))}</div>
                            </div>
                            <div className={styles.body}>{notification.body}</div>
                        </div>
                    </>
                ))}
            </div>
            <BottomBar workspaceId={workspaceId} pageType='알림'/>
        </div>
    );
}