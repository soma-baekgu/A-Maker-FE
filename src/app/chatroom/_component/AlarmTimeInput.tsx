'use client';
import styles from './alarmTimeInput.module.css';
import NumberPicker from "@/app/chatroom/_component/NumberPicker";
import {useState} from "react";

export default function AlarmTimeInput() {
    const minuteNumbers = Array.from({length: 12}, (_, i) => String(i * 5).padStart(2, '0'));
    const hourNumbers = Array.from({length: 12}, (_, i) => String(i).padStart(1, '0'));
    const periodNumbers = Array.from({length: 12}, (_, i) => String((i + 1) * 5).padStart(2, '0'));
    const [period, setPeriod] = useState('05');
    const [hour, setHour] = useState('00');
    const [minute, setMinute] = useState('00');

    return (
        <div className={styles.component}>
            <div className={styles.description}>알림 시작 시간</div>
            <div className={styles.startTimeInput}>
                <div className={styles.text}>마감</div>
                <NumberPicker values={hourNumbers} setValue={setHour}/>
                <div className={styles.text}>시간</div>
                <NumberPicker values={minuteNumbers} setValue={setMinute}/>
                <div className={styles.text}>분 전</div>
            </div>
            <div className={styles.description}>알림 주기</div>
            <div className={styles.periodTimeInput}>
                <NumberPicker values={periodNumbers} setValue={setPeriod}/>
                <div className={styles.text}>분 마다</div>
            </div>
        </div>
    );
}