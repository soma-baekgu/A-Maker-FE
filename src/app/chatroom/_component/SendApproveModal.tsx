'use client';

import styles from './sendApproveModal.module.css';
import {useState} from "react";

type Props = {
    title: string,
    fileName: string,
    setVisible: (b: boolean) => void,
    send: () => void,
}

export default function SendApproveModal({title, fileName, setVisible, send}: Props) {
    const [check, setCheck] = useState(false);

    const handleClose = () => {
        setVisible(false);
    }

    const handleSend = async () => {
        setCheck(true);
        await send();
        setCheck(false);
        setVisible(false);
    }

    return (
        <div className={styles.background} onClick={handleClose}>
            <div className={styles.component} onClick={(e) => {
                e.stopPropagation()
            }}>
                <div className={styles.title}>{title}</div>
                <div className={styles.content}>
                    <div className={styles.fileName}><span className={styles.fileName2}>{fileName}</span>를 전송하시겠습니까?
                    </div>
                    <div className={styles.buttons}>
                        {check ?
                            <div className={styles.sendButton}>전송</div>
                            :
                            <div className={styles.sendButton} onClick={handleSend}>전송</div>
                        }
                        <div className={styles.closeButton} onClick={handleClose}>닫기</div>
                    </div>
                </div>
            </div>
        </div>
    )
}