"use client";

import styles from './memberInviter.module.css';
import workspaceApi from "@/app/(api)/workspace";
import {useState} from "react";
import Image from "next/image";

type Props = {
    workspaceId: number;
}

type User = {
    name: string,
    email: string,
    picture: string,
    workspaceId: number,
    workspaceRole: string,
    status: string,
}


export default function MemberInviter({workspaceId}: Props) {
    const [invitedUsers,setInvitedUsers]=useState<String[]>([]);

    const [invitedUserEmail, setInvitedUserEmail] = useState('');
    const [errorMsg, setErrorMsg] = useState<string|null>(null);


    const handleInvite = async () => {
        if (invitedUserEmail === '') return;
        setInvitedUserEmail('');
        try {
            const res = await workspaceApi.invite(workspaceId, invitedUserEmail);
            if (res.data.status !== "2000") {
                setErrorMsg('초대에 실패했습니다. 이미 초대된 유저이거나 가입되지 않은 유저일 수 있습니다.');
                return;
            }
            console.log("초대 성공");
            setInvitedUsers([...invitedUsers, invitedUserEmail]);
            setErrorMsg(null);


        } catch (e) {
            setErrorMsg('초대에 실패했습니다. 이미 초대된 유저이거나 가입되지 않은 유저일 수 있습니다.');
        }

    }

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInvitedUserEmail(e.target.value);
    }

    return (
        <div className={styles.component}>
            <div className={styles.title}>팀원 초대</div>
            <div className={styles.section}>
                <div className={styles.help}>초대할 팀원의 이메일을 입력해주세요.<br/>팀원은 <span className={styles.green}>A-Maker에 가입</span>되있어야 합니다.</div>
                <div className={styles.inputContainer}>
                    <input type="text" className={styles.input} value={invitedUserEmail} onChange={handleChange}
                    placeholder={"초대할 팀원의 이메일을 입력해주세요."}/>
                    <div className={styles.inviteButton} onClick={handleInvite}>초대</div>
                </div>
                {errorMsg && <div className={styles.error}>{errorMsg}</div>}
            </div>
            <div className={styles.list}>
                {invitedUsers.map((user, index) => (
                    <div key={index} className={styles.user}>
                        <div className={styles.userInfo}>
                            <div>{user}</div>
                        </div>
                        <div className={styles.state}>초대 이메일 발송</div>
                    </div>
                ))}
            </div>
        </div>
    );
}