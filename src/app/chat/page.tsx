'use client';

import styles from './page.module.css';
import TopBar from "@/app/_component/TopBar";
import ChatRoom from "@/app/chat/_component/ChatRoom";
import {useState} from "react";
import CreateChatModal from "@/app/chat/_component/CreateChatModal";
import BottomBar from "@/app/_component/BottomBar";

type ChatRoomData = {
    imageUrls: string[],
    chatroomName: string,
    time: Date,
    speaker: string,
    message: string,
    messageCount: number,
}

export default function Chat() {
    const [createModalVisible, setCreateModalVisible] = useState(false);

    const chatRoomDatas: ChatRoomData[] = [
        {
            imageUrls: ["url1", "url2"],
            chatroomName: "채팅방1",
            time: new Date(2023, 4, 15, 13, 30), // 2023년 5월 15일 13시 30분
            speaker: "홍길동",
            message: "안녕하세요",
            messageCount: 5,
        },
        {
            imageUrls: ["url4", "url5", "url6"],
            chatroomName: "채팅방2",
            time: new Date(2023, 4, 16, 14, 45), // 2023년 5월 16일 14시 45분
            speaker: "이순신",
            message: "반갑습니다",
            messageCount: 3,
        },
        {
            imageUrls: ["url7"],
            chatroomName: "채팅방3",
            time: new Date(2023, 4, 17, 15, 50), // 2023년 5월 17일 15시 50분
            speaker: "유관순",
            message: "잘 지내세요",
            messageCount: 4,
        },
        {
            imageUrls: ["url10", "url11", "url12", "url"],
            chatroomName: "채팅방4",
            time: new Date(2023, 4, 18, 16, 55), // 2023년 5월 18일 16시 55분
            speaker: "안중근",
            message: "오랜만입니다",
            messageCount: 2,
        },
    ];

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
                {chatRoomDatas.map((data, index) => (
                    <ChatRoom key={index} {...data} />
                ))}
            </div>
            <BottomBar/>
            {createModalVisible && <CreateChatModal setVisible={setCreateModalVisible}/>}
        </div>
    );
}