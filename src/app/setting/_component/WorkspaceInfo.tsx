"use client";

import styles from './workspaceInfo.module.css';
import Image from "next/image";
import {useEffect, useState} from "react";
import workspaceApi from "@/app/(api)/workspace";
import PreparingModal from "@/app/setting/_component/PreparingModal";

type User = {
    name: string,
    email: string,
    picture: string,
    workspaceId: number,
    workspaceRole: string,
    status: string,
}

type Props = {
    workspaceId: number
}

export default function WorkspaceInfo({workspaceId}: Props) {
    const [joinedUsers, setJoinedUsers] = useState<User[]>([]);

    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    const [workspaceName, setWorkspaceName] = useState('');
    const [workspaceImage, setWorkspaceImage] = useState('');
    const [modalVisible, setModalVisible] = useState(false);

    useEffect(() => {
        fetchWorkspaceInfo();
    }, []);

    const fetchWorkspaceInfo = async () => {
        const res = await workspaceApi.getUsers(workspaceId);
        if (res.data.status !== "2000")
            return;
        setWorkspaceName(res.data.data.name);
        setWorkspaceImage(res.data.data.thumbnail);
        setJoinedUsers(res.data.data.users);
    }


    const handleDropdownClick = (email: string) => {
        setOpenDropdown(openDropdown === email ? null : email);
    }

    const handleRoleChange = (email: string, workspaceRole: string) => {
        setJoinedUsers(joinedUsers.map(user => user.email === email ? {...user, workspaceRole} : user));
        setOpenDropdown(null);
    }

    const handleNameChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setWorkspaceName(e.target.value);
    }

    return (
        <div className={styles.component}>
            <div className={styles.title}>워크스페이스 정보 수정</div>
            <div className={styles.section}>
                <div className={styles.subtitle}>워크스페이스 이름</div>
                <input type="text" className={styles.input} value={workspaceName} onChange={handleNameChange}/>
            </div>
            <div className={styles.section}>
                <div className={styles.subtitle}>대표 이미지</div>
                <div className={styles.center}>
                    <Image src={"/images/default_thumbnail.png"} alt="workspaceImage" width={140} height={140}
                           className={styles.image}/>
                    <div className={styles.uploadButton} onClick={() => setModalVisible(true)}>업로드</div>
                </div>
            </div>
            <div className={styles.section}>
                <div className={styles.subtitle}>팀원 목록</div>
                <div className={styles.userList}>
                    {joinedUsers.map((user, index) => (
                        <div key={index} className={styles.user}>
                            <Image src={user.picture} className={styles.profileImage} alt="profileImage"
                                   width={46} height={46}/>
                            <div className={styles.userInfo}>
                                <div className={styles.userName}>{user.name}</div>
                                <div className={styles.userEmail}>{user.email}</div>
                            </div>
                            <div className={styles.dropdown}>
                                <div className={styles.role}>
                                    <div
                                        className={styles.roleText}>{user.workspaceRole == 'LEADER' ? '관리자' : '일반'}</div>
                                    <Image src="/setting/down.png" alt="dropdown" width={24} height={24}
                                           onClick={() => handleDropdownClick(user.email)}
                                           className={styles.dropDownButton}/>
                                </div>
                                {openDropdown === user.email && (
                                    <ul className={styles.dropBar}>
                                        <li className={styles.dropBarItem}
                                            onClick={() => handleRoleChange(user.email, 'LEADER')}>관리자
                                        </li>
                                        <li className={styles.dropBarItem}
                                            onClick={() => handleRoleChange(user.email, 'MEMBER')}>일반
                                        </li>
                                    </ul>
                                )}
                            </div>

                            <Image className={styles.deleteButton} src="/setting/delete.png" alt="delete" width={16}
                                   height={16}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.editButton} onClick={() => setModalVisible(true)}>수정</div>
            {modalVisible && <PreparingModal setVisible={setModalVisible}/>}
        </div>
    );
}