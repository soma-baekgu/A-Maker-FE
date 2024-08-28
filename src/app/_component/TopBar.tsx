"use client";

import styles from './topBar.module.css';
import Link from "next/link";
import {usePathname, useRouter} from "next/navigation";
import Image from "next/image";
import {useEffect, useState} from "react";
import WorkspaceModal from "@/app/_component/WorkspaceModal";
import workspaceApi from "@/app/(api)/workspace";

type Props = {
    pageType: string
    onCreateChat?: () => void
    onSearchChat?: () => void
    workspaceId: number
}

type workspaceData = {
    workspaceId: number,
    name: string,
    thumbnail: string
}

export default function TopBar({pageType, onCreateChat, onSearchChat, workspaceId}: Props) {
    const [modalVisible, setModalVisible] = useState(false);
    const router = useRouter();
    const [workspace, setWorkspace] = useState<workspaceData | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);
    const [pageIcon, setPageIcon] = useState<string>('');

    const fetchWorkspace = async () => {
        const res = await workspaceApi.get(workspaceId);
        setWorkspace(res.data.data);
    }

    useEffect(() => {
        if(pageType == '채팅') setPageIcon('/topBar/chat.png');
        else if(pageType == '홈') setPageIcon('/topBar/home.png');
        else if(pageType =='알림') setPageIcon('/topBar/alarm.png');
        else if(pageType == '설정') setPageIcon('/topBar/setting.png');
        fetchWorkspace().then(() => setIsLoaded(true));
    }, []);

    const handleClick = () => {
        setModalVisible(true);
    };

    const onClose = () => {
        setModalVisible(false);
    }

    const handleBack = () => {
        router.back();
    }


    return (
        <div className={styles.component}>
            {isLoaded ?
                <>
                    <Image src={workspace!.thumbnail} alt="workspaceImage" width={60} height={60}
                           className={styles.workspaceThumbnail} onClick={handleClick}/>
                    <Image src={pageIcon} alt="pageIcon" width={24} height={24}/>
                    {/*<div className={styles.description}>{`${workspace!.name} - ${pageType}`}</div>*/}
                    <div className={styles.description}>{pageType}</div>
                </>
                :
                <>
                    <div className={styles.workspace} onClick={handleClick}></div>
                    <div className={styles.description}></div>
                </>
            }
            {onCreateChat &&
                <Image className={styles.button} src="/topBar/createChat.png" alt="createChat" width={32} height={32}
                       onClick={onCreateChat}/>}
            {onSearchChat &&
                <Image className={styles.button} src="/topBar/searchChat.png" alt="searchChat" width={32} height={32}
                       onClick={onSearchChat}/>}
            {pageType == '설정' ?
                <Image className={styles.button} src="/topBar/close.png" alt="close" width={24} height={24}
                       onClick={handleBack}/>
                :
                <Link href={`/setting/${workspaceId}`}>
                    <Image className={styles.button} src="/topBar/setting_gray.png" alt="setting" width={32} height={32}/>
                </Link>
            }
            {modalVisible && <WorkspaceModal onClose={onClose} visible={modalVisible}/>}
        </div>
    )
};