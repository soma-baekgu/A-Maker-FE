"use client";

import styles from './workspaceModal.module.css';
import React, {useEffect, useState} from "react";
import Image from "next/image";
import CreateWorkspaceModal from "@/app/_component/CreateWorkspaceModal";
import workspaceApi from "@/app/(api)/workspace";
import Link from "next/link";
import {useStore} from "@/app/store";
import {useRouter} from "next/navigation";

type Workspace = {
    workspaceId: number,
    name: string,
    thumbnail: string
}

type Props = {
    onClose: () => void,
    visible: boolean,
    currentWorkspaceId: number
}

interface StoreState {
    picture: string,
    name: string
}

export default function WorkspaceModal({onClose, visible, currentWorkspaceId}: Props) {
    const [createWorkspaceVisible, setCreateWorkspaceVisible] = useState(false);
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);
    const {picture, name} = useStore() as StoreState;
    const router = useRouter();

    useEffect(() => {
        const getWorkspaces = async () => {
            const res = await workspaceApi.getList();
            setWorkspaces(res.data.data.workspaces);
        };

        getWorkspaces();
    }, [visible, createWorkspaceVisible]);

    const handleClick = () => {
        setCreateWorkspaceVisible(true);
    }

    const handleClose = () => {
        onClose();
    }

    const createWorkspace = async (workspaceName: string) => {
        await workspaceApi.create(workspaceName);
    }

    const handleLogout = () => {
        router.push('/login');
    }

    return (
        <div className={styles.background} onClick={handleClose}>
            <div className={styles.component} onClick={e => e.stopPropagation()}>
                <div className={styles.profile}>
                    <Image src={picture} alt="profile" width={46} height={46} className={styles.picture}/>
                    <div className={styles.name}>
                        <span className={styles.name1}>{name}</span>
                        <span className={styles.name2}>님</span>
                    </div>
                    <div className={styles.logout}>
                        <Image src={"/modal/logout.png"} alt={"logout"} width={16} height={16}/>
                        <span onClick={handleLogout}>로그아웃</span>
                    </div>
                </div>
                <div className={styles.list}>
                    {workspaces.map((workspace, index) => (
                        <Link
                            key={index}
                            className={`${styles.workspace} ${workspace.workspaceId == currentWorkspaceId ? styles.currentWorkspace : ''}`}
                            href={`/home/${workspace.workspaceId}`}>
                            <Image src={workspace.thumbnail} alt="workspace" width={42} height={42}/>
                            <div className={styles.workspaceName}>{workspace.name}</div>
                            <Image src={"/modal/current.png"} alt="current" width={24} height={24}
                                   className={styles.icon}/>
                        </Link>
                    ))}
                </div>
                <div className={styles.button} onClick={handleClick}>
                    <Image src={"/login/plus.png"} alt={"plus"} width={25} height={24}/>
                    <div>새로운 워크스페이스</div>
                </div>
            </div>
            {createWorkspaceVisible &&
                <CreateWorkspaceModal setVisible={setCreateWorkspaceVisible} createWorkspace={createWorkspace}/>}
        </div>
    )
}