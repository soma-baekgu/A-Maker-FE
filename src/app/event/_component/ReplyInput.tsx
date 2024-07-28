'use client';

import styles from './replyInput.module.css';
import Image from "next/image";
import {useState} from "react";

type Props = {
    onSend: (msg:string) => void
}

export default function ReplyInput({onSend}: Props) {
    const [message, setMessage] = useState('');

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
        <div className={styles.component}>
            <input className={styles.input} type="text" placeholder="답변을 입력하세요." onChange={handleChange} value={message} onKeyPress={handleKeyPress}/>
            <div className={styles.sendButton} onClick={handleSend}>등록</div>
        </div>
    );
}