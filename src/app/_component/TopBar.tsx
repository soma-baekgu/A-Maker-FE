import styles from './topBar.module.css';
import Link from "next/link";
import {usePathname} from "next/navigation";
import Image from "next/image";

type Props = {
    pageType: string
}

export default function TopBar({pageType}: Props) {
    return (
        <div className={styles.component}>
            <div className={styles.workspace}></div>
            <div className={styles.description}>{pageType}</div>
            <Image className={styles.button} src="/button/createChat.png" alt="createChat" width={60} height={60} />
            <Image className={styles.button} src="/button/searchChat.png" alt="searchChat" width={60} height={60} />
            <Link href="/setting">
                <Image className={styles.button} src="/button/setting.png" alt="setting" width={60} height={60} />
            </Link>
        </div>
    )
};