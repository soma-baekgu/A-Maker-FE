import styles from "./receivedEvent.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

type Props = {
    dueDate: Date,
    content: string,
    requesterName: string,
}
export default function ReceivedEvent({dueDate, content, requesterName}: Props){
    return(
        <div className={styles.eventElement}>
            <div className={styles.right}>
                {`${dayjs(dueDate).fromNow()} 마감`}
            </div>
            <div className={styles.left}>
                {content}
            </div>
            <div className={styles.right}>
                {`${requesterName}님이 요청함`}
            </div>
        </div>
    );
}