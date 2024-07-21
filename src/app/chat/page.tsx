'use client';

import styles from './page.module.css';
import TopBar from "@/app/_component/TopBar";
import ChatRoom from "@/app/chat/_component/ChatRoom";
import {useEffect, useState} from "react";
import CreateChatModal from "@/app/chat/_component/CreateChatModal";
import BottomBar from "@/app/_component/BottomBar";

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
        const fetchData = async () => {
            const response = await fetch(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/workspaces/1/chat-rooms/joined`, {
                headers: {
                    'Authorization': `Bearer ${process.env.NEXT_PUBLIC_ACCESS_TOKEN}`,
                },
            });
            const data = await response.json();
            setChatRoomDatas(data.data.chatRooms);
        };

        fetchData();
    }, []);

    const onCreateChat = () => {
        setCreateModalVisible(true);
    };

    const onSearchChat = () => {
        console.log('search');
    };

    return (
        <div className={styles.page}>
            <TopBar pageType='채팅' onCreateChat={onCreateChat} onSearchChat={onSearchChat}/>
            <div className={styles.content}>
                {chatRoomDatas.map((data, index) => {
                    if (data.lastChat) {
                        return (
                            <ChatRoom
                                key={index}
                                chatroomName={data.chatRoomName}
                                imageUrls={data.participants.map(participant => participant.picture)}
                                message={data.lastChat.content}
                                messageCount={data.unreadChatCount}
                                speaker={data.lastChat.user.name}
                                time={new Date(data.lastChat.createdAt)}/>
                        );
                    } else {
                        return (
                            <ChatRoom
                                key={index}
                                chatroomName={data.chatRoomName}
                                imageUrls={data.participants.map(participant => participant.picture)}
                                messageCount={data.unreadChatCount}/>
                        );
                    }
                })}
            </div>
            <BottomBar/>
            {createModalVisible && <CreateChatModal setVisible={setCreateModalVisible}/>}
        </div>
    );
}