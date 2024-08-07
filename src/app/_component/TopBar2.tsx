import styles from './topBar2.module.css';
import Image from "next/image";
import {useRouter} from "next/navigation";

type Props = {
    title: string,
}

export default function TopBar2({title}: Props) {
    const router = useRouter();
    const onBack = () => {
        router.back();
    }

    return (
        <div className={styles.component}>
            <Image className={styles.backButton} src="/button/back.png" alt="back" width={82} height={82}
                   onClick={onBack}/>
            <div className={styles.title}>{title}</div>
        </div>
    );
}