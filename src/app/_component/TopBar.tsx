"use client";

import styles from './topBar.module.css';
import Link from "next/link";
import {usePathname} from "next/navigation";
import Image from "next/image";
import {useState} from "react";
import WorkspaceModal from "@/app/_component/WorkspaceModal";

type Props = {
    pageType: string
    onCreateChat?: () => void
    onSearchChat?: () => void
}

export default function TopBar({pageType, onCreateChat, onSearchChat}: Props) {
    const [modalVisible, setModalVisible] = useState(false);

    const handleClick = () => {
        setModalVisible(true);
    };

    const onClose = () => {
        setModalVisible(false);
    }

    return (
        <div className={styles.component}>
            <div className={styles.workspace} onClick={handleClick}></div>
            <div className={styles.description}>{pageType}</div>
            {onCreateChat &&
                <Image className={styles.button} src="/button/createChat.png" alt="createChat" width={60} height={60}
                       onClick={onCreateChat}/>}
            {onSearchChat &&
                <Image className={styles.button} src="/button/searchChat.png" alt="searchChat" width={60} height={60}
                       onClick={onSearchChat}/>}
            <Link href="/setting">
                <Image className={styles.button} src="/button/setting.png" alt="setting" width={60} height={60}/>
            </Link>
            {modalVisible && <WorkspaceModal onClose={onClose} visible={modalVisible}/>}
        </div>
    )
};