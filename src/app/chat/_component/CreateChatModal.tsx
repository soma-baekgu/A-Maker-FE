import {useState} from "react";
import styles from './createChatModal.module.css';
import Image from "next/image";

type Props = {
    setVisible: (visible: boolean) => void,
    createChatRoom: (chatroomName: string) => void,
}

export default function CreateChatModal({setVisible, createChatRoom}: Props) {
    const [inputValue, setInputValue] = useState("");

    const handleClose = () => {
        setVisible(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleCreateChat = async () => {
        await createChatRoom(inputValue);
        setInputValue("");
        setVisible(false);
    }

    return (
        <div className={styles.background} onClick={handleClose}>
            <div className={styles.component} onClick={e => e.stopPropagation()}>
                <div className={styles.logo}>
                    <Image src="/modal/createChat.png" alt="createChat" width={95}
                           height={95}/>
                    <div className={styles.title}>새로운 채팅방</div>
                </div>
                <div className={styles.inputSection}>
                    <div className={styles.inputGuide}>채팅방 이름을 입력해주세요.</div>
                    <input className={styles.input} value={inputValue} onChange={handleInputChange}></input>
                </div>
                <div className={styles.buttons}>
                    <div className={styles.createButton} onClick={handleCreateChat}>생성</div>
                    <div className={styles.closeButton} onClick={handleClose}>닫기</div>
                </div>
            </div>
        </div>
    )
}