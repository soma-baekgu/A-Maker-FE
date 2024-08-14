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

    const fetchWorkspace = async () => {
        const res = await workspaceApi.get(workspaceId);
        setWorkspace(res.data.data);
    }

    useEffect(() => {
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
                    <Image src={workspace!.thumbnail} alt="workspaceImage" width={60} height={60} onClick={handleClick}/>
                    <div className={styles.description}>{`${workspace!.name} - ${pageType}`}</div>
                </>
                :
                <>
                    <div className={styles.workspace} onClick={handleClick}></div>
                    <div className={styles.description}>{pageType}</div>
                </>
            }
            {onCreateChat &&
                <Image className={styles.button} src="/button/createChat.png" alt="createChat" width={60} height={60}
                       onClick={onCreateChat}/>}
            {onSearchChat &&
                <Image className={styles.button} src="/button/searchChat.png" alt="searchChat" width={60} height={60}
                       onClick={onSearchChat}/>}
            {pageType == '설정' ?
                <Image className={styles.button} src="/button/workspaceClose.png" alt="close" width={50} height={50}
                       onClick={handleBack}/>
                :
                <Link href={`/setting/${workspaceId}`}>
                    <Image className={styles.button} src="/button/setting.png" alt="setting" width={60} height={60}/>
                </Link>
            }
            {modalVisible && <WorkspaceModal onClose={onClose} visible={modalVisible}/>}
        </div>
    )
};