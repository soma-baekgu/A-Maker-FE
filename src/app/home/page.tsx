import styles from './page.module.css';
import TopBar from "@/app/_component/TopBar";
import BottomBar from "@/app/_component/BottomBar";

export default function Home() {
    return (
        <div className={styles.page}>
            <TopBar pageType='홈'/>
            <BottomBar/>
        </div>
    );
}