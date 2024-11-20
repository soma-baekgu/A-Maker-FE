"use client";

import styles from './page.module.css';
import EventDetailInput from "@/app/chatroom/_component/EventDetailInput";
import RecipientSelector from "@/app/chatroom/_component/RecipientSelector";
import DueDateInput from "@/app/chatroom/_component/DueDateInput";
import AlarmTimeInput from "@/app/chatroom/_component/AlarmTimeInput";
import TopBar2 from "@/app/_component/TopBar2";
import {useState} from "react";
import eventApi from "@/app/(api)/event";
import {useRouter} from "next/navigation";

type Props = {
    params: {
        id: string
    }
}

export default function Page(props: Props) {
    const chatRoomId: number = Number(props.params.id);
    const title = "답변요청 이벤트 생성";
    const [eventTitle, setEventTitle] = useState('');
    const [eventDetails, setEventDetails] = useState('');
    const [assignees, setAssignees] = useState<string[]>([]);
    const [deadline, setDeadline] = useState(new Date());
    const [notificationStartHour, setNotificationStartHour] = useState(1);
    const [notificationStartMinute, setNotificationStartMinute] = useState(30);
    const [interval, setInterval] = useState(15);
    const router = useRouter();
    const createEvent = () => {
        eventApi.createReplyEvent(
            chatRoomId,
            eventTitle,
            eventDetails,
            assignees,
            new Date(new Date(deadline).getTime() + 9 * 60 * 60 * 1000),
            notificationStartHour,
            notificationStartMinute,
            interval
        ).then(() => {
            console.log('리플라이 이벤트 생성완료')
            router.back();
        });

    }

    const isValidInput = (eventTitle: string, eventDetails: string, assignees: string[]) => {
        return eventTitle.length > 0 && eventDetails.length > 0 && assignees.length > 0;
    }

    return (
        <div className={styles.page}>
            <TopBar2 title={title}/>
            <div className={styles.content}>
                <div className={styles.section}>
                    <EventDetailInput detail={eventDetails} setDetail={setEventDetails} setTitle={setEventTitle}
                                      title={eventTitle}/>
                    <RecipientSelector setAssignees={setAssignees} chatroomId={chatRoomId}
                                       type={"reply"}/>
                    <DueDateInput deadline={deadline} setDeadline={setDeadline}/>
                </div>
                <div className={styles.section}>
                    <AlarmTimeInput setIntervalValue={setInterval} setNotificationHourValue={setNotificationStartHour}
                                    setNotificationMinuteValue={setNotificationStartMinute}/>
                    {isValidInput(eventTitle, eventDetails, assignees) ?
                        <div className={styles.button} onClick={createEvent}>생성</div>
                        :
                        <div className={styles.disableButton}>생성</div>
                    }
                </div>

            </div>

        </div>
    );
}