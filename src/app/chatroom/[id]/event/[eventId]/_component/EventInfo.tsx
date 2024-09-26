import styles from './eventInfo.module.css';
import Profile from "@/app/chatroom/[id]/event/_component/Profile";
import {EventData} from "@/app/chatroom/[id]/event/[eventId]/types";

const options: Intl.DateTimeFormatOptions = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
};

export default function EventInfo(
    {event, type}: {
        event: EventData,
        type: string
    }
) {
    return (
        <div className={styles.component}>
            <div className={styles.value}>
                <div className={styles.description}>
                    {type === "reply" ? "답변 대기중" : "응답 대기중"}
                </div>
                <div className={styles.row}>
                    {event.waitingUser?.map((user, index) => (
                        <Profile key={index} name={user.name} img={user.picture} isComment={false}/>
                    ))}
                </div>
            </div>
            <div className={styles.value}>
                <div className={styles.description}>
                    {type === "reply" ? "답변 완료" : "응답 완료"}
                </div>
                <div className={styles.row}>
                    {event.finishUser?.map((user, index) => (
                        <Profile key={index} name={user.name} img={user.picture} isComment={false}/>
                    ))}
                </div>
            </div>
            <div className={styles.value}>
                <div className={styles.description}>마감 기한</div>
                <div
                    className={styles.row}>{new Date(event.deadLine).toLocaleTimeString('ko-KR', options)}</div>
            </div>
            <div className={styles.value}>
                <div className={styles.description}>이벤트 생성자</div>
                <div className={styles.row}>
                    {event.eventCreator &&
                        <Profile name={event.eventCreator.name} img={event.eventCreator.picture}
                                 isComment={false}/>
                    }
                </div>
            </div>
        </div>
    )
}