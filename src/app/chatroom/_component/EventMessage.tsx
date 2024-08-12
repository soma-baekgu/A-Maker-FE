import styles from './eventMessage.module.css';
import ProfileImageGroup from "@/app/_component/ProfileImageGroup";

type Props = {
    eventTitle: string,
    users: string[],
    deadLine: Date,
    finishedCount: number,
    totalAssignedCount: number,
    eventType: 'reply' | 'reaction' | 'task'
}

function getTimeRemaining(deadLine: Date): string {
    const now = new Date();
    const deadLineDate = typeof deadLine === 'string' ? new Date(deadLine) : deadLine;
    const diff = deadLineDate.getTime() - now.getTime();

    if (diff <= 0) {
        return '마감';
    }

    const diffInSeconds = Math.floor(diff / 1000);
    const diffInMinutes = Math.floor(diffInSeconds / 60);
    const diffInHours = Math.floor(diffInMinutes / 60);
    const diffInDays = Math.floor(diffInHours / 24);

    if (diffInDays > 0) {
        return `${diffInDays}일 후 마감`;
    } else if (diffInHours > 0) {
        return `${diffInHours}시간 후 마감`;
    } else if (diffInMinutes > 0) {
        return `${diffInMinutes}분 후 마감`;
    } else {
        return `${diffInSeconds}초 후 마감`;
    }
}

export default function EventMessage({
                                         eventTitle,
                                         users,
                                         deadLine,
                                         finishedCount,
                                         totalAssigneesCount,
                                         eventType
                                     }: Props) {
    const timeRemaining = getTimeRemaining(deadLine);

    return (
        <div className={styles.component}>
            <div className={styles.notice}>
                {eventType === 'reply' ?
                    '답변을 요청합니다'
                    :
                    eventType === 'reaction' ?
                        '응답을 요청합니다'
                        :
                        '업무를 요청합니다'
                }
            </div>
            <div className={styles.content}>
                <ProfileImageGroup imageUrls={users} size={'small'}/>
                <div className={styles.description}>
                    <div className={styles.right}>{timeRemaining}</div>
                    <div className={styles.left}>{eventTitle}</div>
                    <div className={styles.right}>
                        {eventType === 'reply' ?
                            `답변 대기중 ${finishedCount}/${totalAssigneesCount}`
                            :
                            eventType === 'reaction' ?
                                `응답 대기중 ${finishedCount}/${totalAssigneesCount}`
                                :
                                ''
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}