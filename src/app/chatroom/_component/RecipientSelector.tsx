"use client";
import styles from './recipientSelector.module.css';
import {ChangeEvent, useEffect, useState} from "react";
import chatRoomApi from "@/app/(api)/chatRoom";
import Image from "next/image";
import {useStore} from "@/app/store";

type User = {
    name: string,
    email: string,
    picture: string
}

interface StoreState {
    map: Map<string, number>,
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

    const {map} = useStore() as StoreState;
    const [minCnt, setMinCnt] = useState(999);

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

    useEffect(() => {
        if (recipients.length > 0) {
            const minCount = recipients.reduce((min, recipient) => {
                const count = map.get(recipient.email) || 0;
                return count < min ? count : min;
            }, 0);
            console.log("sdf : " + minCount);
            setMinCnt(minCount);
        }
    }, [recipients, map]);

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
                    {map.get(recipient.email) || 0 == minCnt && type === "task" ?
                        <>
                            <div className={styles.recommendName}>{recipient.name} - 추천</div>
                            <Image style={{marginLeft: "-8px"}} src={"/recommend.png"} alt={"recommend"} width={18}
                                   height={15}/>
                            <div style={{flex: 1}}></div>
                        </>
                        :
                        <div className={styles.name}>{recipient.name}</div>
                    }
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