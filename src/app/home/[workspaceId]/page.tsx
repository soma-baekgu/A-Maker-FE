'use client';
import styles from './page.module.css';
import TopBar from "@/app/_component/TopBar";
import BottomBar from "@/app/_component/BottomBar";
import Event from "./_component/Event";
import {useState} from "react";

interface Props {
    params: {
        workspaceId: string
    }
}

interface EventData {
    type: string,
    imageUrls: string[],
    title: string,
    dueDate: string,
    completedMembers: number,
    totalMembers: number,
    isMine: boolean
}

export default function Home(props: Props) {
    const workspaceId: number = Number(props.params.workspaceId);
    const [mine, setMine] = useState<boolean>(false);
    const dummyImg = "https://lh3.googleusercontent.com/a/ACg8ocKoltqSQEeJytHSjnxp7xMKzStDF9KkwCBFYZgLEUmqXF-Khg=s96-c";
    const expiredEvents: EventData[] = [
        {
            type: 'task',
            imageUrls: [dummyImg],
            title: 'ppt 목차 어떻게 할까요?',
            dueDate: '2024-09-12T17:00:33.987524',
            completedMembers: 0,
            totalMembers: 1,
            isMine: false
        },
        {
            type: 'reaction',
            imageUrls: [dummyImg, dummyImg, dummyImg],
            title: 'ppt 목차 어떻게 할까요?',
            dueDate: '2024-09-12T17:00:33.987524',
            completedMembers: 3,
            totalMembers: 4,
            isMine: true
        },
        {
            type: 'reply',
            imageUrls: [dummyImg, dummyImg],
            title: 'ppt 목차 어떻게 할까요?',
            dueDate: '2024-09-12T17:00:33.987524',
            completedMembers: 3,
            totalMembers: 4,
            isMine: false
        }
    ]
    const ongoingEvents: EventData[] = [
        {
            type: 'task',
            imageUrls: [dummyImg],
            title: 'ppt 목차 어떻게 할까요?',
            dueDate: '2024-09-22T17:00:33.987524',
            completedMembers: 0,
            totalMembers: 1,
            isMine: false
        },
        {
            type: 'reaction',
            imageUrls: [dummyImg, dummyImg, dummyImg],
            title: 'ppt 목차 어떻게 할까요?',
            dueDate: '2024-10-12T17:00:33.987524',
            completedMembers: 3,
            totalMembers: 4,
            isMine: true
        },
        {
            type: 'reply',
            imageUrls: [dummyImg, dummyImg],
            title: 'ppt 목차 어떻게 할까요?',
            dueDate: '2024-11-12T17:00:33.987524',
            completedMembers: 3,
            totalMembers: 4,
            isMine: false
        }
    ]
    const completedEvents: EventData[] = [
        {
            type: 'task',
            imageUrls: [dummyImg],
            title: 'ppt 목차 어떻게 할까요?',
            dueDate: '2024-09-12T17:00:33.987524',
            completedMembers: 1,
            totalMembers: 1,
            isMine: false
        },
        {
            type: 'reaction',
            imageUrls: [dummyImg, dummyImg, dummyImg, dummyImg],
            title: 'ppt 목차 어떻게 할까요?',
            dueDate: '2024-09-12T17:00:33.987524',
            completedMembers: 4,
            totalMembers: 4,
            isMine: true
        },
        {
            type: 'reply',
            imageUrls: [dummyImg, dummyImg],
            title: 'ppt 목차 어떻게 할까요?',
            dueDate: '2024-09-12T17:00:33.987524',
            completedMembers: 4,
            totalMembers: 4,
            isMine: false
        }
    ]


    return (
        <div className={styles.page}>
            <TopBar pageType='홈' workspaceId={workspaceId}/>
            <div className={styles.content}>
                <div className={styles.mine}>
                    <input
                        type="checkbox"
                        className={styles.checkbox}
                        checked={mine}
                        onChange={() => setMine(!mine)}
                    />
                    내가 맡은 이벤트
                </div>
                <div className={styles.events}>
                    <div className={styles.section}>
                        <div className={styles.subtitle}>마감이 지난 이벤트</div>
                        {expiredEvents.map((event, index) => (
                            <div key={index} className={mine && !event.isMine ? styles.hide : ""}>
                                <Event
                                    type={event.type}
                                    imageUrls={event.imageUrls}
                                    title={event.title}
                                    dueDate={event.dueDate}
                                    completedMembers={event.completedMembers}
                                    totalMembers={event.totalMembers}/>
                            </div>
                        ))}
                    </div>
                    <div className={styles.section}>
                        <div className={styles.subtitle}>진행중인 이벤트</div>
                        {ongoingEvents.map((event, index) => (
                            <div key={index} className={mine && !event.isMine ? styles.hide : ""}>
                                <Event
                                    type={event.type}
                                    imageUrls={event.imageUrls}
                                    title={event.title}
                                    dueDate={event.dueDate}
                                    completedMembers={event.completedMembers}
                                    totalMembers={event.totalMembers}/>
                            </div>
                        ))}
                    </div>
                    <div className={styles.section}>
                        <div className={styles.subtitle}>완료된 이벤트</div>
                        {completedEvents.map((event, index) => (
                            <div key={index} className={mine && !event.isMine ? styles.hide : ""}>
                                <Event
                                    key={index}
                                    type={event.type}
                                    imageUrls={event.imageUrls}
                                    title={event.title}
                                    dueDate={event.dueDate}
                                    completedMembers={event.completedMembers}
                                    totalMembers={event.totalMembers}/>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
            <BottomBar pageType='홈' workspaceId={workspaceId}/>
        </div>
    );
}