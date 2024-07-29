"use client";

import styles from './searchChatModal.module.css';
import Image from "next/image";
import MiniProfileImageGroup from "@/app/chat/_component/MiniProfileImageGroup";
import {useEffect, useState} from "react";
import chatRoomApi from "@/app/(api)/chatRoom";

type Props = {
    setVisible: (visible: boolean) => void,
    onJoin: (chatRoomIds: number[]) => void,
    visible: boolean,
}

type NotJoinChatRoom = {
    chatRoomId: number,
    chatRoomName: string,
    participants: string[],
}

export default function SearchChatModal({setVisible, onJoin, visible}: Props) {
    const [notJoinChatRooms, setNotJoinChatRooms] = useState<NotJoinChatRoom[]>([]);
    const [checkedChatRooms, setCheckedChatRooms] = useState<{ [key: number]: boolean }>({});

    useEffect(() => {
        const getNotJoinChatRooms = async () => {
            const res = await chatRoomApi.getListNotJoined(1);
            setNotJoinChatRooms(res.data.data.chatRooms);
            setCheckedChatRooms({});
        }
        getNotJoinChatRooms();
    }, [visible]);

    const handleClose = () => {
        setVisible(false);
    }

    const handleCheckboxChange = (chatRoomId: number) => (event: React.ChangeEvent<HTMLInputElement>) => {
        setCheckedChatRooms(prevState => ({...prevState, [chatRoomId]: event.target.checked}));
    }

    const handleJoin = async () => {
        const selectedChatRoomIds = Object.keys(checkedChatRooms).filter(chatRoomId => checkedChatRooms[Number(chatRoomId)]).map(Number);
        await onJoin(selectedChatRoomIds);
        setVisible(false);
    }

    return (
        <div className={styles.background} onClick={handleClose}>
            <div className={styles.component} onClick={e => e.stopPropagation()}>
                <div className={styles.logo}>
                    <Image src="/button/searchChat.png" alt="searchChat" width={92} height={92}/>
                    <div className={styles.title}>채팅방 참여하기</div>
                </div>
                <div className={styles.chatRoomList}>
                    {notJoinChatRooms.map((chatRoom, index) => {
                        return (
                            <div key={index} className={styles.chatRoom}>
                                <MiniProfileImageGroup imageUrls={chatRoom.participants}/>
                                <div className={styles.chatRoomName}>{chatRoom.chatRoomName}</div>
                                <input
                                    className={styles.checkbox}
                                    type="checkbox"
                                    checked={checkedChatRooms[chatRoom.chatRoomId] || false}
                                    onChange={handleCheckboxChange(chatRoom.chatRoomId)}/>
                            </div>
                        )
                    })}
                </div>
                <div className={styles.button} onClick={handleJoin}>참여</div>
            </div>
        </div>
    )
}