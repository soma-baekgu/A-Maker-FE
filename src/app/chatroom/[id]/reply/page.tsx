"use client";

import styles from './page.module.css';
import ReplyEventInput from "@/app/chatroom/[id]/reply/_component/ReplyEventInput";
import RecipientSelector from "@/app/chatroom/_component/RecipientSelector";
import DueDateInput from "@/app/chatroom/_component/DueDateInput";
import AlarmTimeInput from "@/app/chatroom/_component/AlarmTimeInput";
import TopBar2 from "@/app/_component/TopBar2";
import {useState} from "react";

export default function Page() {
    const title = "응답요청 이벤트 생성";
    const [eventTitle, setEventTitle] = useState('');
    const [eventDetails, setEventDetails] = useState('');
    const [assignees, setAssignees] = useState<string[]>([]);
    const [deadline, setDeadline] = useState(new Date());
    const [notificationStartHour, setNotificationStartHour] = useState(1);
    const [notificationStartMinute, setNotificationStartMinute] = useState(30);
    const [interval, setInterval] = useState(15);

    return (
        <div className={styles.page}>
            <TopBar2 title={title}/>
            <div className={styles.section}>
                <ReplyEventInput detail={eventDetails} setDetail={setEventDetails} setTitle={setEventTitle}
                                 title={eventTitle}/>
                <RecipientSelector assignees={assignees} setAssignees={setAssignees}/>
                <DueDateInput deadline={deadline} setDeadline={setDeadline}/>
            </div>
            <div className={styles.section}>
                <AlarmTimeInput/>
            </div>
            <div className={styles.button}>
                생성
            </div>
        </div>
    );
}