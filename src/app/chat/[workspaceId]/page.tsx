'use client';

import styles from './page.module.css';
import TopBar from "@/app/_component/TopBar";
import ChatRoom from "@/app/chat/_component/ChatRoom";
import {useEffect, useState} from "react";
import CreateChatModal from "@/app/chat/_component/CreateChatModal";
import BottomBar from "@/app/_component/BottomBar";
import Link from "next/link";
import chatRoomApi from "@/app/(api)/chatRoom";
import SearchChatModal from "@/app/chat/_component/SearchChatModal";
import workspace from "@/app/(api)/workspace";

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

type JoinChatRoom = {
    chatRoomId: number,
    chatRoomName: string,
    participants: Participant[],
    lastChat: LastChat | null,
    unreadChatCount: number,
}

export default function Chat(props) {
    const [createModalVisible, setCreateModalVisible] = useState(false);
    const [searchModalVisible, setSearchModalVisible] = useState(false);
    const [joinChatRooms, setJoinChatRooms] = useState<JoinChatRoom[]>([]);
    const workspaceId = props.params.workspaceId;

    useEffect(() => {
        const getChatRooms = async () => {
            const res = await chatRoomApi.getListJoined(1);
            setJoinChatRooms(res.data.data.chatRooms);
        };

        getChatRooms();
    }, [createModalVisible, searchModalVisible]);

    const onCreateChat = () => {
        setCreateModalVisible(true);
    };

    const onSearchChat = () => {
        setSearchModalVisible(true);
    };

    const createChatRoom = async (chatroomName: string) => {
        const response = await chatRoomApi.create(1, chatroomName);
    }

    const joinChatRoom = async (ids: number[]) => {
        await Promise.all(ids.map(id => chatRoomApi.join(1, id)));
    }

    return (
        <div className={styles.page}>
            <TopBar pageType='채팅' onCreateChat={onCreateChat} onSearchChat={onSearchChat}/>
            <div className={styles.content}>
                {joinChatRooms.map((data, index) => {
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
            <BottomBar workspaceId={workspaceId}/>
            {createModalVisible &&
                <CreateChatModal setVisible={setCreateModalVisible} createChatRoom={createChatRoom}/>}
            {searchModalVisible &&
                <SearchChatModal setVisible={setSearchModalVisible} onJoin={joinChatRoom}
                                 visible={searchModalVisible}/>}
        </div>
    );
}