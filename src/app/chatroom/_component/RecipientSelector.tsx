"use client";
import styles from './recipientSelector.module.css';
import {ChangeEvent, useEffect, useState} from "react";
import chatRoomApi from "@/app/(api)/chatRoom";

type Props = {
    assignees: string[],
    setAssignees: (assignees: string[]) => void,
    chatroomId: number
}

type User = {
    name: string,
    email: string,
    picture: string
}

export default function RecipientSelector({assignees, setAssignees, chatroomId}: Props) {

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
            <div className={styles.description}>답변을 요청할 인원</div>
            {recipients.map((recipient, index) => (
                <div className={styles.element} key={index}>
                    <img className={styles.image} src={recipient.picture} alt="picture"></img>
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