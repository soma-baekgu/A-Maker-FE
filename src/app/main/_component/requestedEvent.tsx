import styles from "./requestedEvent.module.css";
import dayjs from "dayjs";
import relativeTime from "dayjs/plugin/relativeTime";
import 'dayjs/locale/ko';

dayjs.locale('ko');
dayjs.extend(relativeTime);

type Props = {
    dueDate: Date,
    content: string,
    respondedMemberCnt: number,
    totalMemberCnt: number
}
export default function RequestedEvent({dueDate, content, respondedMemberCnt, totalMemberCnt}: Props){
    return(
        <div className={styles.eventElement}>
            <div className={styles.right}>
                {`${dayjs(dueDate).fromNow()} 마감`}
            </div>
            <div className={styles.left}>
                {content}
            </div>
            <div className={styles.right}>
                {respondedMemberCnt>=totalMemberCnt?
                    "모두 응답 완료":
                    `응답 대기중 ${respondedMemberCnt}/${totalMemberCnt}`
                }
            </div>
        </div>
    );
}