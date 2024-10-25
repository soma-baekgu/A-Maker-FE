"use client";

import styles from "./page.module.css";
import TopBar2 from "@/app/_component/TopBar2";
import {useEffect, useState} from "react";
import {EventData, User} from "@/app/chatroom/[id]/event/[eventId]/types";
import EventInfo from "@/app/chatroom/[id]/event/[eventId]/_component/EventInfo";
import eventApi from "@/app/(api)/event";

interface Option{
    id:number,
    eventId:number,
    content:string
}

interface ReactionEventData extends EventData {
    options: Option[]
}

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
    const [event, setEvent] = useState<ReactionEventData>();
    const [isLoaded, setIsLoaded] = useState(false);
    const loadEventData = async () => {
        const res = await eventApi.readReactionEvent(chatRoomId, eventId)
        setEvent(res.data.data)
    }

    useEffect(() => {
        loadEventData().then(
            () => setIsLoaded(true)
        )
    }, []);


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
                        {event.options.map((option, index) => (
                            <div className={styles.item} key={index}>
                                <input className={styles.checkbox} type="radio" name={"vote"}/>
                                {option.content}
                            </div>
                        ))}
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