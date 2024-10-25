"use client";

import styles from "./page.module.css";
import TopBar2 from "@/app/_component/TopBar2";
import {useState} from "react";
import {EventData, User} from "@/app/chatroom/[id]/event/[eventId]/types";
import EventInfo from "@/app/chatroom/[id]/event/[eventId]/_component/EventInfo";

export default function Page(props: {
    params: {
        id: string,
        eventId: string
    }
}) {
    const chatRoomId: number = Number(props.params.id);
    const eventId: number = Number(props.params.eventId);
    const dummyUser: User = {
        name: "노영진",
        email: "shane9747@gmail.com",
        picture: "https://lh3.googleusercontent.com/a/ACg8ocKoltqSQEeJytHSjnxp7xMKzStDF9KkwCBFYZgLEUmqXF-Khg=s96-c"
    }
    const [event, setEvent] = useState<EventData>(
        {
            id: 1,
            eventTitle: "Sample Event",
            eventDetails: "This is a sample event.",
            deadLine: "2024-12-31T23:59:59Z",
            notificationStartTime: "2024-10-12T17:00:33.987524",
            notificationInterval: 60,
            eventCreator: dummyUser,
            finishUser: [dummyUser,dummyUser],
            waitingUser: [dummyUser,dummyUser]
        }
    );
    const [isLoaded, setIsLoaded] = useState(true);

    return (
        <div className={styles.page}>
            <TopBar2 title={"이벤트 상세"}/>
            {isLoaded && event ? (
                <div className={styles.main}>
                    <div className={styles.body}>
                        <div className={styles.title}>
                            <div className={styles.titleText}>{event.eventTitle}</div>
                        </div>
                        <EventInfo event={event} type={"reaction"}/>
                    </div>
                    <div className={styles.choice}>
                        <div className={styles.item}>
                            <input className={styles.checkbox} type="checkbox"/>
                            서울
                        </div>
                        <div className={styles.item}>
                            <input className={styles.checkbox} type="checkbox"/>
                            부산
                        </div>
                        <div className={styles.item}>
                            <input className={styles.checkbox} type="checkbox"/>
                            경기
                        </div>
                    </div>
                    <div className={styles.button}>응답</div>
                    <div className={styles.empty}></div>
                </div>
            ) : (
                <div className={styles.main}>Loading...</div>
            )}
        </div>
    )
}