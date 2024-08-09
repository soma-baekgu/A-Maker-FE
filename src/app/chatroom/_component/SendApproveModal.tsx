import styles from './sendApproveModal.module.css';

type Props = {
    title: string,
    fileName: string,
    setVisible: (b: boolean) => void,
    send: () => void,
}

export default function SendApproveModal({title, fileName, setVisible, send}: Props) {
    const handleClose = () => {
        setVisible(false);
    }

    const handleSend = async () => {
        await send();
        setVisible(false);
    }

    return (
        <div className={styles.background} onClick={handleClose}>
            <div className={styles.component} onClick={(e) => {
                e.stopPropagation()
            }}>
                <div className={styles.title}>{title}</div>
                <div className={styles.content}>
                    <div className={styles.fileName}>{fileName}</div>
                    <div className={styles.buttons}>
                        <div className={styles.button} onClick={handleClose}>취소</div>
                        <div className={styles.button} onClick={handleSend}>전송</div>
                    </div>
                </div>
            </div>
        </div>
    )
}