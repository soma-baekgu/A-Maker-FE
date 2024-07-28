"use client";

import styles from './page.module.css';
import TopBar2 from "@/app/_component/TopBar2";
import Image from "next/image";
import Profile from "@/app/event/_component/Profile";
import ReplyInput from "@/app/event/_component/ReplyInput";

export default function Page() {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: '2-digit',
        minute: '2-digit'
    };

    const dummy = {
        "id": 1,
        "eventTitle": "우리 어디서 만날지",
        "eventDetails": "우리 어디서 만날지 정해봅시다",
        "deadLine": "2024-07-28T14:54:43.526Z",
        "notificationStartTime": "2024-07-28T14:54:43.527Z",
        "notificationInterval": 15,
        "eventCreator": {
            "name": "이승환",
            "email": "dltmd202@gmail.com",
            "picture": "http://127.0.0.1/images/default_thumbnail.png"
        },
        "finishUser": [
            {
                "name": "이승환",
                "email": "dltmd202@gmail.com",
                "picture": "http://127.0.0.1/images/default_thumbnail.png"
            },
            {
                "name": "노영진",
                "email": "dltmd202@gmail.com",
                "picture": "http://127.0.0.1/images/default_thumbnail.png"
            }
        ],
        "waitingUser": [
            {
                "name": "이승환",
                "email": "dltmd202@gmail.com",
                "picture": "http://127.0.0.1/images/default_thumbnail.png"
            },
            {
                "name": "허석문",
                "email": "dltmd202@gmail.com",
                "picture": "http://127.0.0.1/images/default_thumbnail.png"
            }
        ]
    }

    type Comment = {
        img: string,
        name: string,
        time: Date,
        content: string
    }

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
            <div className={styles.title}>
                <Image src="/icon/reply.png" alt="reply" width={32} height={32}/>
                <div className={styles.titleText}>{dummy.eventTitle}</div>
            </div>
            <div className={`${styles.section} ${styles.info}`}>
                <div className={styles.value}>
                    <div className={styles.description}>답변 대기중</div>
                    <div className={styles.row}>
                        {dummy.waitingUser.map((user, index) => (
                            <Profile key={index} name={user.name} img={user.picture}/>
                        ))}
                    </div>
                </div>
                <div className={styles.value}>
                    <div className={styles.description}>답변 완료</div>
                    <div className={styles.row}>
                        {dummy.finishUser.map((user, index) => (
                            <Profile key={index} name={user.name} img={user.picture}/>
                        ))}
                    </div>
                </div>

                <div className={styles.value}>
                    <div className={styles.description}>마감 기한</div>
                    <div className={styles.row}>{new Date(dummy.deadLine).toLocaleTimeString('ko-KR', options)}</div>
                </div>

                <div className={styles.value}>
                    <div className={styles.description}>이벤트 생성자</div>
                    <div className={styles.row}>
                        <Profile name={dummy.eventCreator.name} img={dummy.eventCreator.picture}/>
                    </div>
                </div>

            </div>
            <div className={`${styles.detailText} ${styles.section}`}>{dummy.eventDetails}</div>
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
            <ReplyInput onSend={(msg: string) => {
                console.log(msg);
            }}/>
        </div>
    )
        ;
}