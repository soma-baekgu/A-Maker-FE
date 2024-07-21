import styles from './chatInput.module.css';
import Image from "next/image";

type Props = {
    onSend: () => void
}

export default function ChatInput({onSend}: Props) {

    const onPlusClick = () => {
        console.log('plus');
    }

    return (
        <div className={styles.component}>
            <Image src="/button/plus.png" alt="plus" width={47} height={47} className={styles.plusButton}
                   onClick={onPlusClick}/>
            <input className={styles.input} type="text" placeholder="채팅을 입력하세요."/>
            <div className={styles.sendButton} onClick={onSend}>전송</div>
        </div>
    );
}