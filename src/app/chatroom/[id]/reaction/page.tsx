"use client";

import styles from './page.module.css';
import TopBar2 from "@/app/_component/TopBar2";
import {useState} from "react";
import ReactionEventInput from "@/app/chatroom/[id]/reaction/_component/ReactionEventInput";
import RecipientSelector from "@/app/chatroom/_component/RecipientSelector";
import DueDateInput from "@/app/chatroom/_component/DueDateInput";
import AlarmTimeInput from "@/app/chatroom/_component/AlarmTimeInput";
import eventApi from "@/app/(api)/event";
import {useRouter} from "next/navigation";

export default function Page(props: {
    params: {
        id: string
    }
}) {
    const chatRoomId: number = Number(props.params.id);
    const [title, setTitle] = useState('');
    const [items, setItems] = useState<string[]>(["", ""]);
    const [assignees, setAssignees] = useState<string[]>([]);
    const [deadline, setDeadline] = useState(new Date());
    const [notificationStartHour, setNotificationStartHour] = useState(1);
    const [notificationStartMinute, setNotificationStartMinute] = useState(30);
    const [interval, setInterval] = useState(15);
    const router = useRouter();
    const createEvent = () => {
        eventApi.createReactionEvent(
            chatRoomId,
            title,
            items,
            assignees,
            new Date(new Date(deadline).getTime() + 9 * 60 * 60 * 1000),
            notificationStartHour,
            notificationStartMinute,
            interval
        ).then(() => {
            console.log('리액션 이벤트 생성완료')
            router.back();
        });
    }

    function isValidInput(title: string, items: string[], assignees: string[]): boolean {
        return title.length > 0 && items.every(item => item.length > 0) && assignees.length > 0;
    }

    return (
        <div className={styles.page}>
            <TopBar2 title={"응답요청 이벤트 생성"}/>
            <div className={styles.content}>
                <div className={styles.section}>
                    <ReactionEventInput
                        title={title}
                        setTitle={setTitle}
                        items={items}
                        setItems={setItems}/>
                    <RecipientSelector
                        setAssignees={setAssignees}
                        chatroomId={chatRoomId}
                        type={"reaction"}/>
                    <DueDateInput
                        deadline={deadline}
                        setDeadline={setDeadline}/>
                </div>
                <div className={styles.section}>
                    <AlarmTimeInput
                        setNotificationHourValue={setNotificationStartHour}
                        setNotificationMinuteValue={setNotificationStartMinute}
                        setIntervalValue={setInterval}/>
                    {isValidInput(title, items, assignees) ?
                        <div className={styles.button} onClick={createEvent}>생성</div>
                        :
                        <div className={styles.disableButton}>생성</div>
                    }
                </div>
            </div>
        </div>
    );
}