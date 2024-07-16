import styles from './page.module.css';
import TopBar from "@/app/_component/TopBar";

export default function Chat() {
    return (
        <div className={styles.page}>
            <TopBar pageType='채팅'/>
        </div>
    );
}