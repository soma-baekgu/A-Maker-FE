"use client";

import styles from './page.module.css';
import TopBar2 from "@/app/_component/TopBar2";
import ChatInput from "@/app/chatroom/_component/ChatInput";

export default function Page() {
    const title: string = '캡스톤 디자인 2조';

    const onBack = () => {
        console.log('뒤로가기');
    }

    const onSend = () => {
        console.log('전송');
    }

    return (
        <div className={styles.page}>
            <TopBar2 title={title} onBack={onBack}/>
            <div className={styles.content}></div>
            <ChatInput onSend={onSend}/>
        </div>
    );
}