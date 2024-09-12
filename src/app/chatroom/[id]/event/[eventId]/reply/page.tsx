'use client';

import Image from "next/image";
import styles from './page.module.css'
import TopBar2 from "@/app/_component/TopBar2";
import Profile from "@/app/chatroom/[id]/event/_component/Profile";
import ReplyInput from "@/app/chatroom/[id]/event/_component/ReplyInput";
import {useEffect, useState} from "react";
import eventApi from "@/app/(api)/event";
import eventCommentApi from "@/app/(api)/eventComment";
import {timeAgo} from "@/app/(utils)/DateUtils";

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
    const chatRoomId: number = Number(props.params.id);
    const eventId: number = Number(props.params.eventId);
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
                    <div className={styles.body}>
                        <div className={styles.title}>
                            <div className={styles.titleText}>{event.eventTitle}</div>
                        </div>
                        <div className={styles.info}>
                            <div className={styles.value}>
                                <div className={styles.description}>답변 대기중</div>
                                <div className={styles.row}>
                                    {event.waitingUser?.map((user, index) => (
                                        <Profile key={index} name={user.name} img={user.picture} isComment={false}/>
                                    ))}
                                </div>
                            </div>
                            <div className={styles.value}>
                                <div className={styles.description}>답변 완료</div>
                                <div className={styles.row}>
                                    {event.finishUser?.map((user, index) => (
                                        <Profile key={index} name={user.name} img={user.picture} isComment={false}/>
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
                                        <Profile name={event.eventCreator.name} img={event.eventCreator.picture}
                                                 isComment={false}/>
                                    }
                                </div>
                            </div>

                        </div>
                        <div className={styles.detailText}>{event.eventDetails}</div>
                    </div>
                    <div className={styles.comments}>
                        {
                            comments.map((comment, index) => (
                                <div key={index} className={styles.comment}>
                                    <div className={styles.commentTitle}>
                                        <Profile name={comment.userResponse.name}
                                                 img={comment.userResponse.picture}
                                                 isComment={true}/>
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