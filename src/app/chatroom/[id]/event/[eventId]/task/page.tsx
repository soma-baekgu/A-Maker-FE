"use client";

import {EventData, User} from "@/app/chatroom/[id]/event/[eventId]/types";
import {useEffect, useState} from "react";
import TopBar2 from "@/app/_component/TopBar2";
import EventInfo from "@/app/chatroom/[id]/event/[eventId]/_component/EventInfo";
import Profile from "@/app/chatroom/[id]/event/_component/Profile";
import {timeAgo} from "@/app/(utils)/DateUtils";
import styles from "./page.module.css";
import Image from "next/image";
import eventApi from "@/app/(api)/event";

interface Comment {
    id: number,
    userId: string,
    eventId: number,
    content: string,
    createdAt: string,
    updatedAt: string,
    userResponse: User
}

interface TaskEventData extends EventData {
    eventDetails: string
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
    const [event, setEvent] = useState<TaskEventData>();
    const [isLoaded, setIsLoaded] = useState(false);
    const dummyComments: Comment[] = [
        {
            id: 1,
            userId: "1",
            eventId: 1,
            content: "자료조사A.pdf",
            createdAt: "2024-09-12T17:00:33.987524",
            updatedAt: "2024-09-12T17:00:33.987524",
            userResponse: dummyUser
        },
        {
            id: 2,
            userId: "2",
            eventId: 1,
            content: "자료조사B.pdf",
            createdAt: "2024-09-12T17:00:33.987524",
            updatedAt: "2024-09-12T17:00:33.987524",
            userResponse: dummyUser
        },
    ]

    const fetchEventData = async () => {
        const res = await eventApi.readTaskEvent(chatRoomId, eventId);
        setEvent(res.data.data);
    }

    useEffect(() => {
        fetchEventData().then(() => setIsLoaded(true));
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
                        <EventInfo event={event} type={"task"}/>
                        <div className={styles.detailText}>{event.eventDetails}</div>
                    </div>
                    <div className={styles.comments}>
                        {
                            dummyComments.map((comment, index) => (
                                <div key={index} className={styles.comment}>
                                    <div className={styles.commentTitle}>
                                        <Profile name={comment.userResponse.name}
                                                 img={comment.userResponse.picture}
                                                 isComment={true}/>
                                        <div className={styles.time}>{timeAgo(new Date(comment.createdAt))}</div>
                                    </div>
                                    <div className={styles.content}>
                                        <Image src={"/task/clip.png"} alt={"clip"} width={16} height={16}/>
                                        {comment.content}
                                    </div>
                                </div>
                            ))
                        }
                    </div>
                    <div className={styles.fixedBtn}>
                        <Image src={"/task/white_clip.png"} alt={"white_clip"} width={24} height={24}/>
                        첨부파일 등록
                    </div>
                </div>
            ) : (
                <div className={styles.main}>Loading...</div>
            )}
        </div>
    )
}