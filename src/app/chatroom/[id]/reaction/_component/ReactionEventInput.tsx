"use client";

import styles from './reactionEventInput.module.css';
import Image from "next/image";

export default function ReactionEventInput(
    {title, setTitle, items, setItems}: {
        title: string,
        setTitle: (title: string) => void,
        items: string[],
        setItems: (items: string[]) => void
    }
) {
    return (
        <div className={styles.component}>
            <div>
                <div className={styles.description}>이벤트 제목</div>
                <input type="text" placeholder={"이벤트 제목을 입력해주세요."}
                       className={styles.input}/>
            </div>
            <div className={styles.items}>
                <div className={styles.description}>항목 입력</div>
                <input type="text" placeholder={"항목을 입력해주세요."}
                       className={styles.input}/>
                <input type="text" placeholder={"항목을 입력해주세요."}
                       className={styles.input}/>
                <div className={styles.button}>
                    <Image src={"/reaction/plus.png"} alt={"plus"} width={24} height={24}/>
                    항목 추가
                </div>
            </div>
        </div>
    );
}