"use client";

import styles from './page.module.css'
import TopBar2 from "@/app/_component/TopBar2";
import {useState} from "react";
import RecipientSelector from "@/app/chatroom/_component/RecipientSelector";
import DueDateInput from "@/app/chatroom/_component/DueDateInput";
import AlarmTimeInput from "@/app/chatroom/_component/AlarmTimeInput";
import EventDetailInput from "@/app/chatroom/_component/EventDetailInput";

export default function Page(props: {
    params: {
        id: string
    }
}) {
    const chatRoomId: number = Number(props.params.id);
    const [eventTitle, setEventTitle] = useState('');
    const [eventDetails, setEventDetails] = useState('');
    const [assignees, setAssignees] = useState<string[]>([]);
    const [deadline, setDeadline] = useState(new Date());
    const [notificationStartHour, setNotificationStartHour] = useState(1);
    const [notificationStartMinute, setNotificationStartMinute] = useState(30);
    const [interval, setInterval] = useState(15);

    return (
        <div className={styles.page}>
            <TopBar2 title={"업무요청 이벤트 생성"}/>
            <div className={styles.content}>
                <div className={styles.section}>
                    <EventDetailInput detail={eventDetails} setDetail={setEventDetails} setTitle={setEventTitle}
                                      title={eventTitle}/>
                    <RecipientSelector setAssignees={setAssignees} chatroomId={chatRoomId}
                    type={"task"}/>
                    <DueDateInput deadline={deadline} setDeadline={setDeadline}/>
                </div>
                <div className={styles.section}>
                    <AlarmTimeInput setIntervalValue={setInterval} setNotificationHourValue={setNotificationStartHour}
                                    setNotificationMinuteValue={setNotificationStartMinute}/>
                    <div className={styles.button}>생성</div>
                </div>
            </div>
        </div>
    )
}