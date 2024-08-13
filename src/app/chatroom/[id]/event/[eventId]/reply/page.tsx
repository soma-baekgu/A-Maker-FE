'use client';

import Image from "next/image";
import styles from './page.module.css'
import TopBar2 from "@/app/_component/TopBar2";
import Profile from "@/app/chatroom/[id]/event/_component/Profile";
import ReplyInput from "@/app/chatroom/[id]/event/_component/ReplyInput";
import {useEffect, useState} from "react";
import eventApi from "@/app/(api)/event";

type Comment = {
    img: string,
    name: string,
    time: Date,//todo: string으로 수정
    content: string
}

type User = {
    name: string,
    email: string,
    picture: string
}

type EventData = {
    id: number,
    eventTitle: string,
    eventDetails: string,
    deadLine: string,
    notificationStartTime: string,
    notificationInterval: number,
    eventCreator: User,
    finishUser: User[],
    waitingUser: User[]
}

const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
};

export default function Page(props) {
    const chatRoomId = props.params.id;
    const eventId = props.params.eventId;
    const [event, setEvent] = useState<EventData>();
    const [isLoaded, setIsLoaded] = useState(false);

    useEffect(() => {
        const fetchData = async () => {
            const res = await eventApi.readReplyEvent(chatRoomId, eventId);
            setEvent(res.data.data);
        }
        fetchData().then(() => {
            setIsLoaded(true);
        });
    }, []);

    const comments: Comment[] = [
        {
            img: "http://example.com/image1.png",
            name: "User1",
            time: new Date("2022-01-01T10:20:30Z"),
            content: "This is a comment from User1."
        },
        {
            img: "http://example.com/image2.png",
            name: "User2",
            time: new Date("2022-01-02T11:30:45Z"),
            content: "This is a comment from User2."
        }
    ];

    const timeAgo = (date: Date) => {
        const now = new Date();
        const diffInMilliseconds = now.getTime() - date.getTime();
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

        return `${diffInMinutes}분 전`;
    }

    return (
        <div className={styles.page}>
            <TopBar2 title="이벤트 상세"/>
            {isLoaded && event ? (
                <>
                    <div className={styles.title}>
                        <Image src="/icon/reply.png" alt="reply" width={32} height={32}/>
                        <div className={styles.titleText}>{event.eventTitle}</div>
                    </div>
                    <div className={`${styles.section} ${styles.info}`}>
                        <div className={styles.value}>
                            <div className={styles.description}>답변 대기중</div>
                            <div className={styles.row}>
                                {event.waitingUser?.map((user, index) => (
                                    <Profile key={index} name={user.name} img={user.picture}/>
                                ))}
                            </div>
                        </div>
                        <div className={styles.value}>
                            <div className={styles.description}>답변 완료</div>
                            <div className={styles.row}>
                                {event.finishUser?.map((user, index) => (
                                    <Profile key={index} name={user.name} img={user.picture}/>
                                ))}
                            </div>
                        </div>

                        <div className={styles.value}>
                            <div className={styles.description}>마감 기한</div>
                            <div
                                className={styles.row}>{new Date(event.deadLine).toLocaleTimeString('ko-KR', options)}</div>
                        </div>

                        <div className={styles.value}>
                            <div className={styles.description}>이벤트 생성자</div>
                            <div className={styles.row}>
                                {event.eventCreator &&
                                    <Profile name={event.eventCreator.name} img={event.eventCreator.picture}/>
                                }
                            </div>
                        </div>

                    </div>
                    <div className={`${styles.detailText} ${styles.section}`}>{event.eventDetails}</div>
                    <div className={styles.comments}>
                        {
                            comments.map((comment, index) => (
                                <div key={index} className={`${styles.section} ${styles.comment}`}>
                                    <div className={styles.commentTitle}>
                                        <Profile name={comment.name} img={comment.img}/>
                                        <div className={styles.time}>{timeAgo(comment.time)}</div>
                                    </div>
                                    <div className={styles.content}>{comment.content}</div>
                                </div>
                            ))
                        }
                    </div>
                </>
            ) : (
                <div>Loading...</div>
            )}
            <ReplyInput onSend={(msg: string) => {
                console.log(msg);
            }}/>
        </div>
    )
        ;
}