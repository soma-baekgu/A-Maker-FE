import styles from './createChatModal.module.css';
import Image from "next/image";

type Props = {
    setVisible: (visible: boolean) => void,
}
export default function CreateChatModal({setVisible}: Props) {
    const handleClose = () => {
        setVisible(false);
    }

    return (
        <div className={styles.background} onClick={handleClose}>
            <div className={styles.component} onClick={e => e.stopPropagation()}>
                <div className={styles.logo}>
                    <Image className={styles.icon} src="/button/createChat.png" alt="createChat" width={93}
                           height={92}/>
                    <div className={styles.title}>새로운 채팅방</div>
                </div>
                <div className={styles.inputSection}>
                    <div className={styles.inputGuide}>채팅방 이름을 입력해주세요.</div>
                    <input className={styles.input}></input>
                </div>
                <div className={styles.button} onClick={handleClose}>생성</div>
            </div>
        </div>
    )
}