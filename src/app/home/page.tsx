import styles from './page.module.css';
import TopBar from "@/app/_component/TopBar";

export default function Home() {
    return (
        <div className={styles.page}>
            <TopBar pageType='홈'/>
        </div>
    );
}