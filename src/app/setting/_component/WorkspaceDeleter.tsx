'use client';

import styles from './workspaceDeleter.module.css';
import {useState} from "react";
import PreparingModal from "@/app/setting/_component/PreparingModal";

export default function WorkspaceDeleter() {
    const [modalVisible, setModalVisible] = useState(false);

    return (
        <div className={styles.component}>
            <div className={styles.title}>워크스페이스 삭제</div>
            <div className={styles.help}>워크스페이스를 삭제하시면 해당 <span
                className={styles.green}>워크스페이스의 모든 데이터가 삭제됩니다.</span> 삭제된 데이터는 복구할 수 없습니다.
            </div>
            <div className={styles.deleteButton} onClick={() => setModalVisible(true)}>워크스페이스 삭제</div>
            {modalVisible && <PreparingModal setVisible={setModalVisible}/>}
        </div>
    );
}