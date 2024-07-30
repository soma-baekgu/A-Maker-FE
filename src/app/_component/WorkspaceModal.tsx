"use client";

import styles from './workspaceModal.module.css';
import {useState} from "react";
import Image from "next/image";

type Workspace = {
    workspaceId: number,
    name: string,
    thumbnail: string
}

type Props = {
    onClose: () => void
}

export default function WorkspaceModal({onClose}: Props) {
    const [workspaces, setWorkspaces] = useState<Workspace[]>([
        {
            workspaceId: 1,
            name: "Workspace 1",
            thumbnail: "/path/to/thumbnail1.png"
        },
        {
            workspaceId: 2,
            name: "Workspace 2",
            thumbnail: "/path/to/thumbnail2.png"
        }
    ]);

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
                <div className={styles.button}>새로운 워크스페이스</div>
            </div>
        </div>
    )
}