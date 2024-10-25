"use client";

import styles from './reactionEventInput.module.css';
import Image from "next/image";
import {useState} from "react";

export default function ReactionEventInput(
    {title, setTitle, items, setItems}: {
        title: string,
        setTitle: (title: string) => void,
        items: string[],
        setItems: (items: string[]) => void
    }
) {
    const handleAddItem = () => {
        setItems([...items, '']);
    };

    const handleItemChange = (index: number, value: string) => {
        const newItems = [...items]
        newItems[index] = value;
        setItems(newItems);
    };

    return (
        <div className={styles.component}>
            <div>
                <div className={styles.description}>이벤트 제목</div>
                <input type="text" placeholder={"이벤트 제목을 입력해주세요."}
                       className={styles.input}/>
            </div>
            <div className={styles.items}>
                <div className={styles.description}>항목 입력</div>
                {items.map((item, index) => (
                    <input
                        key={index}
                        type="text"
                        placeholder={"항목을 입력해주세요."}
                        className={styles.input}
                        value={item}
                        onChange={(e) => handleItemChange(index, e.target.value)}
                    />
                ))}
                <div className={styles.button} onClick={handleAddItem}>
                    <Image src={"/reaction/plus.png"} alt={"plus"} width={24} height={24}/>
                    항목 추가
                </div>
            </div>
        </div>
    );
}