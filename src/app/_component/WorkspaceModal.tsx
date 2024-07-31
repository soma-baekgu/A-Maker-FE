"use client";

import styles from './workspaceModal.module.css';
import {useEffect, useState} from "react";
import Image from "next/image";
import CreateWorkspaceModal from "@/app/_component/CreateWorkspaceModal";
import workspaceApi from "@/app/(api)/workspace";

type Workspace = {
    workspaceId: number,
    name: string,
    thumbnail: string
}

type Props = {
    onClose: () => void,
    visible
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
    }, [visible]);

    const handleClick = () => {
        setCreateWorkspaceVisible(true);
    }

    const handleClose = () => {
        onClose();
    }

    return (
        <div className={styles.background} onClick={handleClose}>
            <div className={styles.component} onClick={e => e.stopPropagation()}>
                <div className={styles.list}>
                    {workspaces.map((workspace, index) => (
                        <div key={index} className={styles.workspace}>
                            <Image src={workspace.thumbnail} alt="workspace" width={60} height={60}/>
                            <div>{workspace.name}</div>
                        </div>
                    ))}
                </div>
                <div className={styles.button} onClick={handleClick}>새로운 워크스페이스</div>
            </div>
            {createWorkspaceVisible && <CreateWorkspaceModal setVisible={setCreateWorkspaceVisible}/>}
        </div>
    )
}