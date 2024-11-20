'use client';

import Image from "next/image";
import styles from './page.module.css'
import TopBar2 from "@/app/_component/TopBar2";
import Profile from "@/app/chatroom/[id]/event/_component/Profile";
import ReplyInput from "@/app/chatroom/[id]/event/[eventId]/reply/_component/ReplyInput";
import {useEffect, useState} from "react";
import eventApi from "@/app/(api)/event";
import eventCommentApi from "@/app/(api)/eventComment";
import {timeAgo} from "@/app/(utils)/DateUtils";
import {EventData, User} from "@/app/chatroom/[id]/event/[eventId]/types";
import EventInfo from "@/app/chatroom/[id]/event/[eventId]/_component/EventInfo";
import {useStore} from "@/app/store";

type Comment = {
    id: number,
    userId: string,
    eventId: number,
    content: string,
    createdAt: string,
    updatedAt: string,
    userResponse: User
}

type Props = {
    params: {
        id: string,
        eventId: string
    }
}

interface ReplyEventData extends EventData {
    eventDetails: string
}

interface StoreState {
    email: string;
}

export default function Page(props: Props) {
    const chatRoomId: number = Number(props.params.id);
    const eventId: number = Number(props.params.eventId);
    const [event, setEvent] = useState<ReplyEventData>();
    const [isLoaded, setIsLoaded] = useState(false);
    const [comments, setComments] = useState<Comment[]>([]);
    const [isAvailable, setIsAvailable] = useState(false);
    const {email} = useStore() as StoreState;

    const fetchComments = async () => {
        //todo 페이징 적용
        const res = await eventCommentApi.readReplyComment(eventId, 0, 100);
        setComments(res.data.data.content);
    }

    const fetchEventData = async () => {
        const res = await eventApi.readReplyEvent(chatRoomId, eventId);
        setEvent(res.data.data);
    }

    function areAllWaitingUsersInComments(event: EventData, comments: Comment[]): boolean {
        const commentEmails = comments.map(comment => comment.userResponse.email);
        return event.waitingUser.every(user => commentEmails.includes(user.email));
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
        fetchEventData();
    }

    useEffect(() => {
        if (event?.waitingUser.some((user: User) => user.email == email) ||
            event?.finishUser.some((user: User) => user.email == email))
            setIsAvailable(true);
    }, [event]);

    return (
        <div className={styles.page}>
            <TopBar2 title="이벤트 상세"/>
            {isLoaded && event ? (
                <div className={styles.main}>
                    <div className={styles.body}>
                        <div className={styles.title}>
                            <div className={styles.titleText}>{event.eventTitle}</div>
                            {areAllWaitingUsersInComments(event, comments) && <div className={styles.status}>
                                <div className={styles.statusText}>완료</div>
                            </div>}
                        </div>
                        <EventInfo event={event} type={"reply"}/>
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
            {isAvailable && event && !areAllWaitingUsersInComments(event, comments) &&
                <ReplyInput onSend={onSend}/>
            }
        </div>
    )
        ;
}