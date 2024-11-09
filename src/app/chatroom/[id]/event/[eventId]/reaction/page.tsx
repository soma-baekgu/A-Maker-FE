"use client";

import styles from "./page.module.css";
import TopBar2 from "@/app/_component/TopBar2";
import {useEffect, useState} from "react";
import {EventData, User} from "@/app/chatroom/[id]/event/[eventId]/types";
import EventInfo from "@/app/chatroom/[id]/event/[eventId]/_component/EventInfo";
import eventApi from "@/app/(api)/event";
import eventCommentApi from "@/app/(api)/eventComment";

interface Option {
    id: number,
    eventId: number,
    content: string
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
    const [event, setEvent] = useState<ReactionEventData>();
    const [isLoaded, setIsLoaded] = useState(false);
    const [selectedOption, setSelectedOption] = useState<number>();

    const loadEventData = async () => {
        const res = await eventApi.readReactionEvent(chatRoomId, eventId);
        setEvent(res.data.data);
    }

    const createEventComment = async (optionId: number | undefined) => {
        if (!optionId) return;
        await eventCommentApi.createReactionComment(eventId, optionId);
        //todo event comment 조회 api 호출
    }

    const handleOptionChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSelectedOption(Number(e.target.value));
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
                                <input
                                    className={styles.checkbox}
                                    type="radio"
                                    name={"vote"}
                                    value={option.id}
                                    onChange={handleOptionChange}
                                />
                                {option.content}
                            </div>
                        ))}
                    </div>
                    <div className={selectedOption ? styles.button : styles.disableButton} onClick={() => {
                        if (!selectedOption) return;
                        createEventComment(selectedOption);
                    }}>응답
                    </div>
                    <div className={styles.empty}></div>
                </div>
            ) : (
                <div className={styles.main}>Loading...</div>
            )}
        </div>
    )
}