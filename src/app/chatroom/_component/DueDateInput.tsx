"use client";

import styles from './dueDateInput.module.css';
import {useEffect, useState} from "react";
import {DateCalendar, DigitalClock, LocalizationProvider, MultiSectionDigitalClock} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import NumberPicker from "@/app/chatroom/_component/NumberPicker";
import dayjs from "dayjs";

type Props = {
    deadline: Date,
    setDeadline: (date: Date) => void
}

export default function DueDateInput({deadline, setDeadline}: Props) {

    const minuteNumbers = Array.from({length: 12}, (_, i) => String(i * 5).padStart(2, '0'));
    const hourNumbers = Array.from({length: 12}, (_, i) => String(i + 1).padStart(1, '0'));
    const dayPeriods = ['오전', '오후'];
    const [dayPeriod, setDayPeriod] = useState('오전');
    const [hour, setHour] = useState('00');
    const [minute, setMinute] = useState('00');

    const setNewDeadline = () => {
        // 현재 deadline의 년, 월, 일을 가져옵니다.
        const currentYear = dayjs(deadline).year();
        const currentMonth = dayjs(deadline).month();
        const currentDay = dayjs(deadline).date();

        // dayPeriod에 따라 시간을 12시간제로 변환합니다.
        const adjustedHour = dayPeriod === '오후' ? parseInt(hour) + 12 : parseInt(hour);

        // 새로운 Date 객체를 생성합니다.
        const newDeadline = dayjs()
            .year(currentYear)
            .month(currentMonth)
            .date(currentDay)
            .hour(adjustedHour)
            .minute(parseInt(minute))
            .toDate();

        // 새로운 deadline을 설정합니다.
        setDeadline(newDeadline);
    };

    useEffect(() => {
        setNewDeadline();
        console.log(deadline);
    }, [dayPeriod, hour, minute]);


    return (
        <div className={styles.component}>
            <div className={styles.description}>
                마감 기한
            </div>
            <div className={styles.dateInput}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar value={dayjs(deadline)} onChange={(newDate) => setDeadline(newDate)}/>
                </LocalizationProvider>
            </div>
            <div className={styles.timeInput}>
                <NumberPicker values={dayPeriods} setValue={setDayPeriod}/>
                <NumberPicker values={hourNumbers} setValue={setHour}/>
                <NumberPicker values={minuteNumbers} setValue={setMinute}/>
            </div>
        </div>)
};
