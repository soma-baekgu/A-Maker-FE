import styles from './page.module.css';
import TopBar from "@/app/_component/TopBar";

export default function Alarm() {
    return (
        <div className={styles.page}>
            <TopBar pageType='알림'/>
        </div>
    );
}