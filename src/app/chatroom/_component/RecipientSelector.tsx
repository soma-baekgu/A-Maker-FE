"use client";
import styles from './recipientSelector.module.css';
import {ChangeEvent, useEffect, useState} from "react";
import chatRoomApi from "@/app/(api)/chatRoom";
import Image from "next/image";

type User = {
    name: string,
    email: string,
    picture: string
}

export default function RecipientSelector({setAssignees, chatroomId, type}: {
    setAssignees: (assignees: string[]) => void,
    chatroomId: number,
    type: string
}) {

    const [recipients, setRecipients] = useState<User[]>([]);

    const [checkedState, setCheckedState] = useState<Record<string, boolean>>(
        recipients.reduce((state, recipient) => ({
            ...state,
            [recipient.email]: false
        }), {})
    );

    useEffect(() => {
        fetchRecipients();
    }, []);

    const fetchRecipients = async () => {
        const res = await chatRoomApi.getUsers(chatroomId);
        if (res.data.status !== "2000")
            return;
        setRecipients(res.data.data.users);
    }

    const handleCheckboxChange = (email: string) => (event: ChangeEvent<HTMLInputElement>) => {
        const newCheckedState = {...checkedState, [email]: event.target.checked};
        setCheckedState(newCheckedState);
        const newAssignees = recipients.filter(recipient => newCheckedState[recipient.email]).map(recipient => recipient.email);
        setAssignees(newAssignees);
    }

    return (
        <div className={styles.component}>
            <div className={styles.description}>{
                type === "reply" ?
                    "답변을 요청할 인원"
                    :
                    type === "reaction" ?
                        "응답을 요청할 인원"
                        :
                        "업무를 요청할 인원"
            }</div>
            {recipients.map((recipient, index) => (
                <div className={styles.element} key={index}>
                    <Image className={styles.image} src={recipient.picture} alt="picture"
                           width={46} height={46}/>
                    <div className={styles.name}>{recipient.name}</div>
                    <input
                        className={styles.checkbox}
                        type="checkbox"
                        checked={checkedState[recipient.email] || false}
                        onChange={handleCheckboxChange(recipient.email)}
                    />
                </div>
            ))}
        </div>
    );
}