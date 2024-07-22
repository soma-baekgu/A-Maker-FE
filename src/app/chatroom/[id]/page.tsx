"use client";

import styles from './page.module.css';
import TopBar2 from "@/app/_component/TopBar2";
import ChatInput from "@/app/chatroom/_component/ChatInput";
import ChatMessage from "@/app/chatroom/_component/ChatMessage";
import {useRouter} from "next/navigation";
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";

type User = {
    name: string,
    email: string,
    picture: string,
}

type Message = {
    id: number,
    user: User,
    chatRoomId: number,
    content: string,
    chatType: string,
    createdAt: string,
    updatedAt: string,
}

export default function Page() {
    const title: string = '캡스톤 디자인 2조';//todo 채팅방이름을 어떻게 가져올까? 프론트에서 상태관리? 아니면 백에 단일 채팅방정보 api요청?
    const router = useRouter();
    const [cursor, setCursor] = useState(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const topMessageRef = useRef(null);

    const fetchRecentChat = async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/chat-rooms/1/chats/recent`, {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
            },
        });
        const data = await response.json();
        setCursor(data.data.id);
        setMessages([data.data]);
    };

    const fetchPreviousChats = useCallback(async () => {
        const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/chat-rooms/1/chats/previous?cursor=${cursor}&size=10`, {
            headers: {
                'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
            },
        });
        const data = await response.json();

        // 서버에서 오류 응답을 받은 경우 처리
        if (data.status === "5000")
            return; // 함수 실행 중단

        setCursor(data.data.nextCursor);
        console.log(data.data);
        setMessages(prevMessages => [...data.data.chatList, ...prevMessages]);
    }, [cursor]);

    useEffect(() => {
        fetchRecentChat();
    }, []);

    useLayoutEffect(() => {
        console.log(1);
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                fetchPreviousChats();
            }
        });

        console.log(topMessageRef);
        if (topMessageRef.current) {
            observer.observe(topMessageRef.current);
        }

        return () => {
            if (topMessageRef.current) {

                observer.unobserve(topMessageRef.current);
            }
        };
    }, [fetchPreviousChats]);

    function myFunction() {
        //console.log(topMessageRef.current);
    }

// setInterval 함수는 첫 번째 인자로 주어진 함수를 두 번째 인자로 주어진 시간 간격(밀리초 단위)마다 실행합니다.
    const intervalId = setInterval(myFunction, 1000);

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
                {messages.map((message, index) => (
                    <ChatMessage
                        ref={topMessageRef}
                        key={index}
                        content={message.content}
                        isMine={message.user.email==='soma.backgu@gmail.com'}//todo context api사용하여 로그인시 사용자 이메일 저장하여 비교하도로 수정
                        speakerImageUrl={message.user.picture}
                        speakerName={message.user.name}
                        time={new Date(message.createdAt)}/>
                ))}
            </div>
            <ChatInput onSend={onSend}/>
        </div>
    );
}