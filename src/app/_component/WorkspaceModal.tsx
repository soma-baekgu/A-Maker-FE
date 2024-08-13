"use client";

import styles from './workspaceModal.module.css';
import {useEffect, useState} from "react";
import Image from "next/image";
import CreateWorkspaceModal from "@/app/_component/CreateWorkspaceModal";
import workspaceApi from "@/app/(api)/workspace";
import Link from "next/link";

type Workspace = {
    workspaceId: number,
    name: string,
    thumbnail: string
}

type Props = {
    onClose: () => void,
    visible: boolean
}

export default function WorkspaceModal({onClose, visible}: Props) {
    const [createWorkspaceVisible, setCreateWorkspaceVisible] = useState(false);
    const [workspaces, setWorkspaces] = useState<Workspace[]>([]);

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

    return (
        <div className={styles.background} onClick={handleClose}>
            <div className={styles.component} onClick={e => e.stopPropagation()}>
                <div className={styles.list}>
                    {workspaces.map((workspace, index) => (
                        <Link key={index} className={styles.workspace} href={`/home/${workspace.workspaceId}`}>
                            <Image src={workspace.thumbnail} alt="workspace" width={60} height={60}/>
                            <div>{workspace.name}</div>
                        </Link>
                    ))}
                </div>
                <div className={styles.button} onClick={handleClick}>새로운 워크스페이스</div>
            </div>
            {createWorkspaceVisible &&
                <CreateWorkspaceModal setVisible={setCreateWorkspaceVisible} createWorkspace={createWorkspace}/>}
        </div>
    )
}