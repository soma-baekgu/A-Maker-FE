import ProfileImageGroup from "@/app/_component/ProfileImageGroup";
import React from "react";
import {timeAfter} from "@/app/(utils)/DateUtils";
import styles from "./event.module.css";
import Image from "next/image";

interface Props{

}

export default function Event(
    {type, imageUrls, title, dueDate, completedMembers, totalMembers}: {
        type: string,
        imageUrls: string[],
        title: string,
        dueDate: string,
        completedMembers: number,
        totalMembers: number
    }) {
    return (
        <div className={styles.component}>
            <ProfileImageGroup imageUrls={imageUrls} size={'large'}/>
            <div className={styles.main}>
                <div className={styles.time}>
                    <Image src={"/home/time.png"} alt={"time"} width={16} height={16}/>
                    {timeAfter(new Date(dueDate))}
                </div>
                <div className={styles.title}>{title}</div>
                <div className={styles.member}>
                    {
                        completedMembers < totalMembers ?
                            (type == "reply" ?
                                `답변 대기중 ${completedMembers}/${totalMembers}`
                                :
                                type == "reaction" ?
                                    `응답 대기중 ${completedMembers}/${totalMembers}`
                                    :
                                    `미완료`)
                            :
                            '완료'
                    }
                </div>
            </div>
        </div>
    );
}