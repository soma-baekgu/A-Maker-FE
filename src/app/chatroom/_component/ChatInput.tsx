'use client';

import styles from './chatInput.module.css';
import Image from "next/image";
import {useState} from "react";
import SpecialChatBar from "@/app/chatroom/_component/SpecialChatBar";
import {bottom} from "@popperjs/core";

type Props = {
    onSend: (msg: string) => void,
    chatRoomId: number
}

export default function ChatInput({onSend, chatRoomId}: Props) {
    const [message, setMessage] = useState('');
    const [bottomBarVisible, setBottomBarVisible] = useState(false);

    const onPlusClick = () => {
        setBottomBarVisible(!bottomBarVisible);
    }

    const handleSend = () => {
        onSend(message);
        setMessage(''); // 메시지 전송 후 input 필드 초기화
    }

    const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setMessage(event.target.value);
    }

    const handleKeyPress = (event: React.KeyboardEvent) => {
        if (event.key === 'Enter') {
            handleSend();
        }
    }

    return (
        <div>
            <div className={styles.component}>
                {bottomBarVisible ?
                    <Image src="/button/close.png" alt="close" width={47} height={47} className={styles.plusButton}
                           onClick={onPlusClick}/>
                    :
                    <Image src="/button/plus.png" alt="plus" width={47} height={47} className={styles.plusButton}
                           onClick={onPlusClick}/>
                }
                <input className={styles.input} type="text" placeholder="채팅을 입력하세요." onChange={handleChange}
                       value={message} onKeyPress={handleKeyPress}/>
                <div className={styles.sendButton} onClick={handleSend}>전송</div>
            </div>
            {bottomBarVisible && <SpecialChatBar chatroomId={chatRoomId}/>}
        </div>
    );
}