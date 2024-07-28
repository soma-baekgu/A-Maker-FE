import styles from './recipientSelector.module.css';

export default function RecipientSelector() {

    const recipients = [
        {name: '노영진', image: 'image1.png'},
        {name: '홍길동', image: 'image2.png'},
    ];

    return (
        <div className={styles.component}>
            <div className={styles.description}>답변을 요청할 인원</div>
            {recipients.map((recipient, index) => (
                <div className={styles.element} key={index}>
                    <div className={styles.image}></div>
                    <div className={styles.name}>{recipient.name}</div>
                    <input className={styles.checkbox} type="checkbox"/>
                </div>
            ))}
        </div>
    );
}