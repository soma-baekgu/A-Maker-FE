"use client";

import styles from './page.module.css';
import TopBar2 from "@/app/_component/TopBar2";
import ChatInput from "@/app/chatroom/_component/ChatInput";
import ChatMessage from "@/app/chatroom/_component/ChatMessage";
import {useRouter} from "next/navigation";
import {useCallback, useEffect, useLayoutEffect, useRef, useState} from "react";
import chatApi from "@/app/(api)/chat";
import {useStore} from "@/app/store";
import {ChatContent, FileContent} from "@/app/chatroom/types";
import {Params} from "next/dist/shared/lib/router/utils/route-matcher";
import chatRoomApi from "@/app/(api)/chatRoom";

type User = {
    name: string,
    email: string,
    picture: string,
}

type Message = {
    id: number,
    user: User,
    chatRoomId: number,
    content: ChatContent,
    chatType: string,
    createdAt: string,
    updatedAt: string,
}

type Props = {
    params: {
        id: string
    }
}

interface StoreState {
    email: string;
}

export default function Page(props: Props) {
    const router = useRouter();
    const [previousCursor, setPreviousCursor] = useState(-1);
    const [afterCursor, setAfterCursor] = useState(-1);
    const [messages, setMessages] = useState<Message[]>([]);
    const topMessageRef = useRef(null);
    const bottomMessageRef = useRef<HTMLDivElement | null>(null);
    const chatroomId: number = Number(props.params.id);
    const {email} = useStore() as StoreState;
    const [title, setTitle] = useState('');
    const [isLoadingChat, setIsLoadingChat] = useState(false);
    const contentRef = useRef(null);
    const [scrollHeight,setScrollHeight] = useState(0);

    const fetchChatRoom = async () => {
        const res = await chatRoomApi.get(chatroomId);

        if (res.data.status !== "2000")
            return;
        setTitle(res.data.data.chatRoomName);
    };

    //가장 최근 채팅 메세지를 불러 오는 함수로 처음 1회만 호출
    const fetchRecentChat = async () => {
        const response = await chatApi.recentChat(chatroomId);
        const data = response.data;

        if (data.status !== "2000")
            return;
        setPreviousCursor(data.data.id);
        setAfterCursor(data.data.id)
        setMessages([data.data]);
    };

    const fetchPreviousChat = useCallback(async () => {
        const response = await chatApi.previousChat(chatroomId, previousCursor, 10);
        const data = response.data;

        if (data.status !== "2000"||data.data.size===0)
            return;
        setPreviousCursor(data.data.nextCursor);
        console.log('이전 채팅을 불러왔습니다.');
        setMessages(prevMessages => [...data.data.chatList, ...prevMessages]);
    }, [previousCursor]);

    const fetchAfterChat = useCallback(async () => {
        const response = await chatApi.afterChat(chatroomId, afterCursor, 10);
        const data = response.data;

        if (data.status !== "2000"||data.data.size===0)
            return;
        const lastMessage = data.data.chatList[data.data.chatList.length - 1];
        setAfterCursor(lastMessage.id);
        setMessages(prevMessages => [...prevMessages, ...data.data.chatList]);
        setIsLoadingChat(true);
    }, [afterCursor]);


    useEffect(() => {
        fetchChatRoom();
        fetchRecentChat();
    }, []);

    useEffect(() => {
        if (bottomMessageRef.current)
            bottomMessageRef.current!.scrollIntoView({behavior: 'smooth'});
        console.log('height: '+contentRef.current.scrollHeight);
        const currentScrollHeight = contentRef.current.scrollHeight;
        if (currentScrollHeight !== undefined) {
            const scrollDifference = currentScrollHeight - scrollHeight;
            if (scrollDifference > 0) {
                contentRef.current.scrollTop += scrollDifference;
            }
        }
        setScrollHeight(contentRef.current.scrollHeight);
    }, [messages]);


    useEffect(() => {
        //1초마다 새로운 채팅이 있는지 확인
        const intervalId = setInterval(async () => {
            console.log('새로운 채팅있는지 확인');
            if (isLoadingChat)
                return;
            setIsLoadingChat(true);
            try {
                const response = await chatApi.recentChat(chatroomId);
                const data = response.data;

                if (data.status !== "2000")
                    return;
                if (data.data.id > afterCursor) {
                    console.log('새로운 채팅을 불러옵니다.');
                    await fetchAfterChat();
                }
            } finally {
                setIsLoadingChat(false);
            }
        }, 1000);

        return () => {
            clearInterval(intervalId);
            setIsLoadingChat(false);
        };
    }, [fetchAfterChat]);

    useEffect(() => {
        let observer = null;

        if(contentRef.current) {
            observer = new IntersectionObserver(
                entries => {
                    if (entries[0].isIntersecting) {
                        fetchPreviousChat();
                    }
                },
                {
                    root: contentRef.current,
                    rootMargin:'0px 0px -20px 0px'
                }
            );

            if (topMessageRef.current) {
                observer.observe(topMessageRef.current);
            }
        }

        return () => {
            if (observer && topMessageRef.current) {
                observer.unobserve(topMessageRef.current);
            }
        };
    }, [fetchPreviousChat]);

    const onSend = async (msg: string) => {
        await chatApi.send(chatroomId, msg);
        fetchAfterChat();
    };

    return (
        <div className={styles.page}>
            <TopBar2 title={title}/>
            <div className={styles.content} ref={contentRef}>
                {messages.map((message, index) => (
                    <ChatMessage
                        ref={index === 0 ? topMessageRef : (index === messages.length - 1) ? bottomMessageRef : undefined}
                        key={index}
                        content={message.content}
                        isMine={message.user.email === email}//todo context api사용하여 로그인시 사용자 이메일 저장하여 비교하도로 수정
                        speakerImageUrl={message.user.picture}
                        speakerName={message.user.name}
                        time={new Date(message.createdAt)}
                        chatType={message.chatType}
                        messageId={message.id}
                        chatroomId={chatroomId}/>
                ))}
            </div>
            <ChatInput onSend={onSend} chatroomId={chatroomId}/>
        </div>
    );
}