import styles from './page.module.css';
import TopBar from "@/app/_component/TopBar";
import ChatRoom from "@/app/chat/_component/ChatRoom";

export default function Chat() {
    return (
        <div className={styles.page}>
            <TopBar pageType='채팅'/>
            <ChatRoom/>
        </div>
    );
}