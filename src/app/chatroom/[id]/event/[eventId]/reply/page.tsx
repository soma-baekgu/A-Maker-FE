'use client';

import Image from "next/image";
import styles from './page.module.css'
import TopBar2 from "@/app/_component/TopBar2";
import Profile from "@/app/chatroom/[id]/event/_component/Profile";
import ReplyInput from "@/app/chatroom/[id]/event/_component/ReplyInput";
import {useEffect, useState} from "react";
import eventApi from "@/app/(api)/event";
import eventCommentApi from "@/app/(api)/eventComment";

type User = {
    name: string,
    email: string,
    picture: string
}

type Comment = {
    id: number,
    userId: string,
    eventId: number,
    content: string,
    createdAt: string,
    updatedAt: string,
    userResponse: User
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

type Props = {
    params: {
        id: string,
        eventId: string
    }
}

export default function Page(props: Props) {
    const chatRoomId = props.params.id;
    const eventId = props.params.eventId;
    const [event, setEvent] = useState<EventData>();
    const [isLoaded, setIsLoaded] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);

    const fetchComments = async () => {
        //todo 페이징 적용
        const res = await eventCommentApi.readReplyComment(eventId, 0, 100);
        setComments(res.data.data.content);
    }

    const fetchEventData = async () => {
        const res = await eventApi.readReplyEvent(chatRoomId, eventId);
        setEvent(res.data.data);
    }

    useEffect(() => {
        fetchEventData().then(() => {
            setIsLoaded(true);
        });

        fetchComments();
    }, []);

    const timeAgo = (date: Date) => {
        const now = new Date();
        const diffInMilliseconds = now.getTime() - date.getTime();
        const diffInMinutes = Math.floor(diffInMilliseconds / (1000 * 60));

        return `${diffInMinutes}분 전`;
    }

    const onSend = async (msg: string) => {
        if (msg.length === 0)
            return;
        await eventCommentApi.createReplyComment(eventId, msg);
        fetchComments();
    }

    return (
        <div className={styles.page}>
            <TopBar2 title="이벤트 상세"/>
            {isLoaded && event ? (
                <div className={styles.main}>
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
                                        <Profile name={comment.userResponse.name} img={comment.userResponse.picture}/>
                                        <div className={styles.time}>{timeAgo(new Date(comment.createdAt))}</div>
                                    </div>
                                    <div className={styles.content}>{comment.content}</div>
                                </div>
                            ))
                        }
                    </div>
                </div>
            ) : (
                <div className={styles.main}>Loading...</div>
            )}
            <ReplyInput onSend={onSend}/>
        </div>
    )
        ;
}