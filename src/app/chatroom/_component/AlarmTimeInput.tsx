'use client';
import styles from './alarmTimeInput.module.css';
import NumberPicker from "@/app/chatroom/_component/NumberPicker";
import {useEffect, useState} from "react";

type Props = {
    setNotificationHourValue: (val: number) => void,
    setNotificationMinuteValue: (val: number) => void,
    setIntervalValue: (val: number) => void
}

export default function AlarmTimeInput({
                                           setNotificationHourValue,
                                           setNotificationMinuteValue,
                                           setIntervalValue
                                       }: Props) {
    const minuteNumbers = Array.from({length: 60}, (_, i) => String(i).padStart(2, '0'));
    const hourNumbers = Array.from({length: 12}, (_, i) => String(i).padStart(1, '0'));
    const intervalNumbers = Array.from({length: 60}, (_, i) => String((i + 1)).padStart(2, '0'));
    const [notificationHour, setNotificationHour] = useState('1');
    const [notificationMinute, setNotificationMinute] = useState('05');
    const [interval, setInterval] = useState('30');

    useEffect(() => {
        setNotificationHourValue(parseInt(notificationHour));
        setNotificationMinuteValue(parseInt(notificationMinute));
        setIntervalValue(parseInt(interval));
    }, [notificationHour, notificationMinute, interval]);


    return (
        <div className={styles.component}>
            <div>
                <div className={styles.description}>알림 시작 시간</div>
                <div className={styles.startTimeInput}>
                    <div className={styles.text}>마감</div>
                    <NumberPicker values={hourNumbers} setValue={setNotificationHour} initialValue={'1'}/>
                    <div className={styles.text}>시간</div>
                    <NumberPicker values={minuteNumbers} setValue={setNotificationMinute} initialValue={'05'}/>
                    <div className={styles.text}>분 전</div>
                </div>
            </div>
            <div>
                <div className={styles.description}>알림 주기</div>
                <div className={styles.periodTimeInput}>
                    <NumberPicker values={intervalNumbers} setValue={setInterval} initialValue={'30'}/>
                    <div className={styles.text}>분 마다</div>
                </div>
            </div>
        </div>

    )
        ;
}