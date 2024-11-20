'use client';
import styles from './page.module.css';
import TopBar from "@/app/_component/TopBar";
import BottomBar from "@/app/_component/BottomBar";
import Event from "./_component/Event";
import {useEffect, useState} from "react";
import Link from "next/link";
import eventQueryAPi from "@/app/(api)/eventQuery";

interface Props {
    params: {
        workspaceId: string
    }
}

interface EventData {
    eventType: string,
    eventId: number,
    chatRoomId: number,
    eventTitle: string,
    deadLine: string,
    notificationStartTime: string,
    notificationInterval: number,
    users: string[],
    finishedCount: number,
    totalAssignedCount: number,
    isMine: boolean,
}

export default function Home(props: Props) {
    const workspaceId: number = Number(props.params.workspaceId);
    const [mine, setMine] = useState<boolean>(false);
    const dummyImg = "https://lh3.googleusercontent.com/a/ACg8ocKoltqSQEeJytHSjnxp7xMKzStDF9KkwCBFYZgLEUmqXF-Khg=s96-c";
    const [expiredEvents, setExpiredEvents] = useState<EventData[]>([]);
    const [ongoingEvents, setOngoingEvents] = useState<EventData[]>([]);
    const [completedEvents, setCompletedEvents] = useState<EventData[]>([]);

    useEffect(() => {
        eventQueryAPi.getEvents(workspaceId, 'expired')
            .then(res => setExpiredEvents(res.data.data));
        eventQueryAPi.getEvents(workspaceId, 'ongoing')
            .then(res => setOngoingEvents(res.data.data));
        eventQueryAPi.getEvents(workspaceId, 'completed')
            .then(res => setCompletedEvents(res.data.data));
    }, []);

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
                        {expiredEvents.length > 0 ?
                            expiredEvents.map((event, index) => (
                                <Link
                                    href={`/chatroom/${event.chatRoomId}/event/${event.eventId}/${event.eventType.toLowerCase()}`}
                                    key={index}
                                    className={mine && !event.isMine ? styles.button + " " + styles.hide : styles.button}>
                                    <Event
                                        type={event.eventType}
                                        imageUrls={event.users}
                                        title={event.eventTitle}
                                        dueDate={event.deadLine}
                                        completedMembers={event.finishedCount}
                                        totalMembers={event.totalAssignedCount}/>
                                </Link>
                            ))
                            :
                            <div className={styles.empty}>마감이 지난 이벤트가 없습니다</div>
                        }
                    </div>
                    <div className={styles.section}>
                        <div className={styles.subtitle}>진행중인 이벤트</div>
                        {ongoingEvents.length > 0 ?
                            ongoingEvents.map((event, index) => (
                                <Link
                                    href={`/chatroom/${event.chatRoomId}/event/${event.eventId}/${event.eventType.toLowerCase()}`}
                                    key={index}
                                    className={mine && !event.isMine ? styles.button + " " + styles.hide : styles.button}>
                                    <Event
                                        type={event.eventType}
                                        imageUrls={event.users}
                                        title={event.eventTitle}
                                        dueDate={event.deadLine}
                                        completedMembers={event.finishedCount}
                                        totalMembers={event.totalAssignedCount}/>
                                </Link>
                            ))
                            :
                            <div className={styles.empty}>진행중인 이벤트가 없습니다</div>
                        }
                    </div>
                    <div className={styles.section}>
                        <div className={styles.subtitle}>완료된 이벤트</div>
                        {completedEvents.length > 0 ?
                            completedEvents.map((event, index) => (
                                <Link
                                    href={`/chatroom/${event.chatRoomId}/event/${event.eventId}/${event.eventType.toLowerCase()}`}
                                    key={index}
                                    className={mine && !event.isMine ? styles.button + " " + styles.hide : styles.button}>
                                    <Event
                                        key={index}
                                        type={event.eventType}
                                        imageUrls={event.users}
                                        title={event.eventTitle}
                                        dueDate={event.deadLine}
                                        completedMembers={event.finishedCount}
                                        totalMembers={event.totalAssignedCount}/>
                                </Link>
                            ))
                            :
                            <div className={styles.empty}>완료된 이벤트가 없습니다</div>
                        }
                    </div>
                </div>
            </div>
            <BottomBar pageType='홈' workspaceId={workspaceId}/>
        </div>
    );
}