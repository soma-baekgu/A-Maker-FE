import styles from './page.module.css';
import TopBar from "@/app/_component/TopBar";
import BottomBar from "@/app/_component/BottomBar";

export default function Alarm(props) {
    const workspaceId = props.params.workspaceId;

    return (
        <div className={styles.page}>
            <TopBar pageType='알림' workspaceId={workspaceId}/>
            <div className={styles.content}></div>
            <BottomBar workspaceId={workspaceId}/>
        </div>
    );
}