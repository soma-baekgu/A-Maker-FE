"use client";

import styles from './dueDateInput.module.css';
import {useState} from "react";
import {DateCalendar, DigitalClock, LocalizationProvider, MultiSectionDigitalClock} from "@mui/x-date-pickers";
import {AdapterDayjs} from "@mui/x-date-pickers/AdapterDayjs";
import NumberPicker from "@/app/chatroom/_component/NumberPicker";

export default function DueDateInput() {

    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<string | null>(null);
    const minuteNumbers = Array.from({length: 12}, (_, i) => String(i * 5).padStart(2, '0'));
    const hourNumbers = Array.from({length: 12}, (_, i) => String(i + 1).padStart(1, '0'));
    const dayPeriods = ['오전', '오후'];


    const handleDateChange = (date: Date) => setDate(date);
    const handleTimeChange = (time: string) => setTime(time);

    return (
        <div className={styles.component}>
            <div className={styles.description}>
                마감 기한
            </div>
            <div className={styles.dateInput}>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DateCalendar/>
                </LocalizationProvider>
            </div>
            <div className={styles.timeInput}>
                <NumberPicker values={dayPeriods}/>
                <NumberPicker values={hourNumbers}/>
                <NumberPicker values={minuteNumbers}/>
            </div>
        </div>)
};
