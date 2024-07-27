import styles from './page.module.css';
import Image from "next/image";

export default function Page() {
    return (
        <div className={styles.page}>
            <div className={styles.logo}>A-MAKER</div>
            <div className={styles.button}>
                <Image src="/button/google.png" alt="google" width={58} height={54}/>
                <div>Google 로그인</div>
            </div>
        </div>
    );
}