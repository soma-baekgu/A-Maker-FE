"use client";

import styles from './page.module.css';
import TopBar2 from "@/app/_component/TopBar2";
import ChatInput from "@/app/chatroom/_component/ChatInput";
import ChatMessage from "@/app/chatroom/_component/ChatMessage";
import {useRouter} from "next/navigation";
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import chatApi from "@/app/(api)/chat";

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

export default function Page(props) {
    const title: string = '캡스톤 디자인 2조';//todo 채팅방이름을 어떻게 가져올까? 프론트에서 상태관리? 아니면 백에 단일 채팅방정보 api요청?
    const router = useRouter();
    const [cursor, setCursor] = useState(-1);
    const [afterCursor, setAfterCursor] = useState(-1);
    const [messages, setMessages] = useState<Message[]>([]);
    const topMessageRef = useRef(null);
    const bottomMessageRef = useRef(null);
    const chatroomId = props.params.id;

    const getRecentChat = async () => {
        const response = await chatApi.recentChat(chatroomId);
        const data = response.data;

        if (data.status !== "2000")
            return; // 함수 실행 중단

        setCursor(data.data.id);
        setAfterCursor(data.data.id)
        setMessages([data.data]);
    };

    const getPreviousChat = useCallback(async () => {
        const response = await chatApi.previousChat(chatroomId, cursor, 10);
        const data = response.data;

        // 서버에서 오류 응답을 받은 경우 처리
        if (data.status !== "2000")
            return; // 함수 실행 중단

        setCursor(data.data.nextCursor);
        console.log(data.data);
        setMessages(prevMessages => [...data.data.chatList, ...prevMessages]);
    }, [cursor]);

    const getAfterChat = useCallback(async () => {
        const response = await chatApi.afterChat(chatroomId, afterCursor, 10);
        const data = response.data;

        // 서버에서 오류 응답을 받은 경우 처리
        if (data.status !== "2000")
            return; // 함수 실행 중단

        const lastMessage = data.data.chatList[data.data.chatList.length - 1];
        if (lastMessage) {
            setAfterCursor(lastMessage.id);
        }
        console.log(data.data);
        setMessages(prevMessages => [...prevMessages, ...data.data.chatList]);

    }, [afterCursor]);

    useEffect(() => {
        // 메시지 상태가 변경될 때마다 스크롤을 맨 아래로 내립니다.
        if (bottomMessageRef.current)
            bottomMessageRef.current.scrollIntoView({behavior: 'smooth'});
    }, [afterCursor]);

    useEffect(() => {
        getRecentChat();
    }, []);

    useEffect(() => {
        const intervalId = setInterval(async () => {
            const response = await chatApi.recentChat(chatroomId);
            const data = response.data;

            if (data.status !== "2000")
                return; // 함수 실행 중단

            if (data.data.id > afterCursor) {
                getAfterChat();
            }
        }, 1000); // 1초마다 실행

        return () => {
            clearInterval(intervalId); // 컴포넌트 unmount 시에 interval clear
        };
    }, [afterCursor, getAfterChat]);

    useLayoutEffect(() => {
        console.log(1);
        const observer = new IntersectionObserver(entries => {
            if (entries[0].isIntersecting) {
                getPreviousChat();
            }
        });

        if (topMessageRef.current) {
            observer.observe(topMessageRef.current);
        }

        return () => {
            if (topMessageRef.current) {
                observer.unobserve(topMessageRef.current);
            }
        };
    }, [getPreviousChat]);

    function myFunction() {
        //console.log(topMessageRef.current);
    }

// setInterval 함수는 첫 번째 인자로 주어진 함수를 두 번째 인자로 주어진 시간 간격(밀리초 단위)마다 실행합니다.
    const intervalId = setInterval(myFunction, 1000);

    const onSend = async (msg: string) => {
        await chatApi.send(chatroomId, msg);
        getAfterChat();
    };

    return (
        <div className={styles.page}>
            <TopBar2 title={title}/>
            <div className={styles.content}>
                {messages.map((message, index) => (
                    <ChatMessage
                        ref={index === 0 ? topMessageRef : (index === messages.length - 1) ? bottomMessageRef : undefined}
                        key={index}
                        content={message.content}
                        isMine={message.user.email === 'soma.backgu@gmail.com'}//todo context api사용하여 로그인시 사용자 이메일 저장하여 비교하도로 수정
                        speakerImageUrl={message.user.picture}
                        speakerName={message.user.name}
                        time={new Date(message.createdAt)}/>
                ))}
            </div>
            <ChatInput onSend={onSend}/>
        </div>
    );
}