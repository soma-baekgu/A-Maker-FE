'use client';

import styles from './page.module.css';
import React, {useState} from "react";
import workspaceApi from "@/app/(api)/workspace";
import CreateWorkspaceModal from "@/app/_component/CreateWorkspaceModal";
import {useRouter} from "next/navigation";

export default function Page() {
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();

    const createWorkspace = async (workspaceName: string) => {
        await workspaceApi.create(workspaceName);
        router.replace("/");
    }


    return (
        <div className={styles.page}>
            <div className={styles.help}>
                워크스페이스를 만들어서 팀원들을 초대해보세요!
            </div>
            <div className={styles.button} onClick={()=>{setModalVisible(true)}}>
                새로운 워크스페이스
            </div>
            {modalVisible &&
                <CreateWorkspaceModal setVisible={setModalVisible} createWorkspace={createWorkspace}/>}
        </div>
    )
}