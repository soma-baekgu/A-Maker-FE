import styles from './createWorkspaceModal.module.css';
import Image from "next/image";
import {useState} from "react";

type Props = {
    setVisible: (visible: boolean) => void,
    createWorkspace: (workspaceName: string) => void,
}

export default function CreateWorkspaceModal({setVisible, createWorkspace}: Props) {
    const [inputValue, setInputValue] = useState("");

    const handleClose = (e) => {
        e.stopPropagation();
        setVisible(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleCreateWorkspace = async () => {
        await createWorkspace(inputValue);
        setVisible(false);
    }

    return (
        <div className={styles.background} onClick={handleClose}>
            <div className={styles.component} onClick={e => e.stopPropagation()}>
                <div className={styles.logo}>
                    <Image src="/button/workspace.png" alt="workspace" width={147}
                           height={104}/>
                    <div className={styles.title}>새로운 워크스페이스</div>
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