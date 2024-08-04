import styles from './page.module.css';
import TopBar from "@/app/_component/TopBar";
import BottomBar from "@/app/_component/BottomBar";
import ChatMessage from "@/app/chatroom/_component/ChatMessage";

export default function Home(props) {
    const workspaceId = props.params.workspaceId;

    return (
        <div className={styles.page}>
            <TopBar pageType='홈'/>
            <div className={styles.content}></div>
            <BottomBar workspaceId={workspaceId}/>
        </div>
    );
}