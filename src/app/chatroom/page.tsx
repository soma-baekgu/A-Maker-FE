"use client";

import styles from './page.module.css';
import TopBar2 from "@/app/_component/TopBar2";

export default function Page() {
    const title: string = '캡스톤 디자인 2조';

    const onBack = () => {
        console.log('뒤로가기');
    }

    return (
        <div className={styles.page}>
            <TopBar2 title={title} onBack={onBack}/>
        </div>
    );
}