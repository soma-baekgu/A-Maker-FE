import {useState} from "react";
import styles from './createChatModal.module.css';
import Image from "next/image";

type Props = {
    setVisible: (visible: boolean) => void,
    createChatRoom: (chatroomName: string) => void,
}

export default function CreateChatModal({setVisible, createChatRoom}: Props) {
    const [inputValue, setInputValue] = useState("");
    const [isError, setIsError] = useState(false);

    const handleClose = () => {
        setVisible(false);
    }

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    }

    const handleCreateChat = async () => {
        try {
            await createChatRoom(inputValue);
            setIsError(false);
            setVisible(false);
        } catch (e) {
            setIsError(true);
        }finally {
            setInputValue("");
        }
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
                    {isError && <div className={styles.error}>채팅방 생성에 실패했습니다. 워크스페이스 관리자 권한이 필요합니다.</div>}
                </div>
                <div className={styles.buttons}>
                    <div className={styles.createButton} onClick={handleCreateChat}>생성</div>
                    <div className={styles.closeButton} onClick={handleClose}>닫기</div>
                </div>
            </div>
        </div>
    )
}