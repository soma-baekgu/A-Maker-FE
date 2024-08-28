import styles from './page.module.css';
import TopBar from "@/app/_component/TopBar";
import BottomBar from "@/app/_component/BottomBar";
import ChatMessage from "@/app/chatroom/_component/ChatMessage";

type Props = {
    params: {
        workspaceId: string
    }
}

export default function Home(props: Props) {
    const workspaceId: number = Number(props.params.workspaceId);

    return (
        <div className={styles.page}>
            <TopBar pageType='홈' workspaceId={workspaceId}/>
            <div className={styles.content}></div>
            <BottomBar pageType='홈' workspaceId={workspaceId}/>
        </div>
    );
}