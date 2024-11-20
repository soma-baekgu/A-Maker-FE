import styles from './createWorkspaceModal.module.css';
import Image from "next/image";
import React, {useState} from "react";

type Props = {
    setVisible: (visible: boolean) => void,
    createWorkspace: (workspaceName: string) => void,
}

export default function CreateWorkspaceModal({setVisible, createWorkspace}: Props) {
    const [inputValue, setInputValue] = useState("");

    const handleClose = (e: React.MouseEvent) => {
        e.stopPropagation();
        setVisible(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleCreateWorkspace = async () => {
        if (inputValue.length <= 0) return;
        setVisible(false);
        await createWorkspace(inputValue);
    }

    return (
        <div className={styles.background} onClick={handleClose}>
            <div className={styles.component} onClick={e => e.stopPropagation()}>
                <div className={styles.logo}>
                    <Image src="/modal/createWorkspace.png" alt="workspace" width={95}
                           height={95}/>
                </div>
                <div className={styles.inputSection}>
                    <div className={styles.inputGuide}>워크스페이스 이름을 입력해주세요.</div>
                    <input className={styles.input} value={inputValue} onChange={handleInputChange}></input>
                </div>
                <div className={styles.button} onClick={handleCreateWorkspace}>생성</div>
            </div>
        </div>
    )
}