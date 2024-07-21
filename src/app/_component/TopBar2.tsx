import styles from './topBar2.module.css';
import Image from "next/image";

type Props = {
    title: string,
    onBack?: () => void,
}

export default function TopBar2({title, onBack}: Props) {
    return (
        <div className={styles.component}>
            <Image className={styles.backButton} src="/button/back.png" alt="back" width={82} height={82} onClick={onBack}/>
            <div className={styles.title}>{title}</div>
        </div>
    );
}