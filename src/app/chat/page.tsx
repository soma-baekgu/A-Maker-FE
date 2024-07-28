'use client';

import styles from './page.module.css';
import TopBar from "@/app/_component/TopBar";
import ChatRoom from "@/app/chat/_component/ChatRoom";
import {useEffect, useState} from "react";
import CreateChatModal from "@/app/chat/_component/CreateChatModal";
import BottomBar from "@/app/_component/BottomBar";
import Link from "next/link";
import chatRoomApi from "@/app/(api)/chatRoom";

type Participant = {
    name: string,
    email: string,
    picture: string,
}

type LastChat = {
    id: number,
    user: Participant,
    chatRoomId: number,
    content: string,
    chatType: string,
    createdAt: string,
    updatedAt: string,
}

type ChatRoomData = {
    chatRoomId: number,
    chatRoomName: string,
    participants: Participant[],
    lastChat: LastChat | null,
    unreadChatCount: number,
}

export default function Chat() {
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [chatRoomDatas, setChatRoomDatas] = useState<ChatRoomData[]>([]);

    useEffect(() => {
        const getChatRooms = async () => {
            const res = await chatRoomApi.getListJoined(1);
            setChatRoomDatas(res.data.data.chatRooms);
        };

        getChatRooms();
    }, []);

    const onCreateChat = () => {
        setCreateModalVisible(true);
    };

    const onSearchChat = () => {
        console.log('search');
    };

    const createChatRoom = async (chatroomName: string) => {
        const response = await chatRoomApi.create(1, chatroomName);
    }

    return (
        <div className={styles.page}>
            <TopBar pageType='채팅' onCreateChat={onCreateChat} onSearchChat={onSearchChat}/>
            <div className={styles.content}>
                {chatRoomDatas.map((data, index) => {
                    if (data.lastChat) {
                        return (
                            <Link href={`/chatroom/${data.chatRoomId}`} key={index}>
                                <ChatRoom
                                    key={index}
                                    chatroomName={data.chatRoomName}
                                    imageUrls={data.participants.map(participant => participant.picture)}
                                    message={data.lastChat.content}
                                    messageCount={data.unreadChatCount}
                                    speaker={data.lastChat.user.name}
                                    time={new Date(data.lastChat.createdAt)}/>
                            </Link>
                        );
                    } else {
                        return (
                            <Link href={`/chatroom/${data.chatRoomId}`} key={index}>
                                <ChatRoom
                                    chatroomName={data.chatRoomName}
                                    imageUrls={data.participants.map(participant => participant.picture)}
                                    messageCount={data.unreadChatCount}/>
                            </Link>
                        );
                    }
                })}
            </div>
            <BottomBar/>
            {createModalVisible &&
                <CreateChatModal setVisible={setCreateModalVisible} createChatRoom={createChatRoom}/>}
        </div>
    );
}