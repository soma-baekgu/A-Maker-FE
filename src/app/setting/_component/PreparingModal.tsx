import styles from './preparingModal.module.css';

export default function PreparingModal({setVisible}: {
    setVisible: (visible: boolean) => void
}) {
    return (
        <div className={styles.background} onClick={() => setVisible(false)}>
            <div className={styles.component} onClick={e => e.stopPropagation()}>
                준비 중인 기능입니다
                <div className={styles.button} onClick={() => setVisible(false)}>닫기</div>
            </div>
        </div>
    );
}