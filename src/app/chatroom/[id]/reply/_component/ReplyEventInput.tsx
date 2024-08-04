"use client";

import styles from './replyEventInput.module.css';

type Props = {
    title: string,
    setTitle: (title: string) => void,
    detail: string,
    setDetail: (detail: string) => void
}

export default function ReplyEventInput({title, setTitle, detail, setDetail}: Props) {

    const handleTitleChange = (event: React.ChangeEvent<HTMLInputElement>) => setTitle(event.target.value);

    const handleDetailChange = (event: React.ChangeEvent<HTMLTextAreaElement>) => setDetail(event.target.value);

    return (
        <div className={styles.component}>
            <div>
                <div className={styles.description}>
                    이벤트 제목
                </div>
                <input className={styles.titleInput} type="text" onChange={handleTitleChange} value={title}/>
            </div>
            <div>
                <div className={styles.description}>
                    이벤트 상세 내용
                </div>
                <textarea className={styles.detailInput} onChange={handleDetailChange} value={detail}/>
            </div>
        </div>
    );
}