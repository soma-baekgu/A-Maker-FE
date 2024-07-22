import styles from './page.module.css';
import TopBar from "@/app/_component/TopBar";
import BottomBar from "@/app/_component/BottomBar";

export default function Alarm() {
    return (
        <div className={styles.page}>
            <TopBar pageType='알림'/>
            <div className={styles.content}></div>
            <BottomBar/>
        </div>
    );
}