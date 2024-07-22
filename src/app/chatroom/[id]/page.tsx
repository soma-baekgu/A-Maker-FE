"use client";

import styles from './page.module.css';
import TopBar2 from "@/app/_component/TopBar2";
import ChatInput from "@/app/chatroom/_component/ChatInput";
import ChatMessage from "@/app/chatroom/_component/ChatMessage";
import {useRouter} from "next/navigation";

export default function Page() {
    const title: string = '캡스톤 디자인 2조';
    const router = useRouter();

    const onBack = () => {
        router.push('/chat');
    }

    const onSend = () => {
        console.log('전송');
    }

    const dummyMessages = [
        {
            speakerImageUrl: "https://example.com/image1.jpg",
            speakerName: "User1",
            content: "Hello, this is a message from User1.",
            time: new Date(2022, 0, 1, 10, 33), // 2022년 1월 1일 10시 33분
            isMine: false,
        },
        {
            speakerImageUrl: "https://example.com/image2.jpg",
            speakerName: "User2",
            content: "Hello, this is a message from User2.",
            time: new Date(2022, 0, 1, 11, 45), // 2022년 1월 1일 11시 45분
            isMine: true,
        },
        {
            speakerImageUrl: "https://example.com/image3.jpg",
            speakerName: "User3",
            content: "Hello, this is a message from User3.",
            time: new Date(2022, 0, 1, 12, 15), // 2022년 1월 1일 12시 15분
            isMine: false,
        },
        {
            speakerImageUrl: "https://example.com/image4.jpg",
            speakerName: "User4",
            content: "Hello, this is a message from User4.",
            time: new Date(2022, 0, 1, 13, 30), // 2022년 1월 1일 13시 30분
            isMine: false,
        },
    ];

    return (
        <div className={styles.page}>
            <TopBar2 title={title} onBack={onBack}/>
            <div className={styles.content}>
                {dummyMessages.map((message, index) => (
                    <ChatMessage key={index} {...message}/>
                ))}
            </div>
            <ChatInput onSend={onSend}/>
        </div>
    );
}