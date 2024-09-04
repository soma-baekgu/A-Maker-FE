'use client';

import styles from './page.module.css';
import React, {useState} from "react";
import workspaceApi from "@/app/(api)/workspace";
import CreateWorkspaceModal from "@/app/_component/CreateWorkspaceModal";
import {useRouter} from "next/navigation";
import Image from "next/image";

export default function Page() {
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();

    const createWorkspace = async (workspaceName: string) => {
        await workspaceApi.create(workspaceName);
        router.replace("/");
    }


    return (
        <div className={styles.page}>
            <Image src={"/login/pattern2.png"} alt={"pattern"}
                   className={styles.pattern}
                   width={390} height={844}/>
            <div className={styles.help}>
                <div className={styles.helpText1}>Let&apos;s start!</div>
                <div className={styles.helpText2}>워크스페이스를 만들어서<br/>팀원들을 초대해보세요!</div>
            </div>
            <div className={styles.button} onClick={()=>{setModalVisible(true)}}>
                <Image src={"/login/plus.png"} alt={"plus"} width={25} height={24}/>
                <div>새로운 워크스페이스</div>
            </div>
            {modalVisible &&
                <CreateWorkspaceModal setVisible={setModalVisible} createWorkspace={createWorkspace}/>}
        </div>
    )
}