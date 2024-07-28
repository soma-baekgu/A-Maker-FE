import styles from './replyEventInput.module.css';

export default function ReplyEventInput() {
    return (
        <div className={styles.component}>
            <div>
                <div className={styles.description}>
                    이벤트 제목
                </div>
                <input className={styles.titleInput} type="text"/>
            </div>
            <div>
                <div className={styles.description}>
                    이벤트 상세 내용
                </div>
                <textarea className={styles.detailInput}/>
            </div>
        </div>
    );
}