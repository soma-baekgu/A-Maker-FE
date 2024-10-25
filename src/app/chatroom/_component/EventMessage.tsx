import styles from './eventMessage.module.css';
import ProfileImageGroup from "@/app/_component/ProfileImageGroup";
import {useRouter} from "next/navigation";
import Image from "next/image";
import {timeAfter} from "@/app/(utils)/DateUtils";

type Props = {
    eventTitle: string,
    users: string[],
    deadLine: string,
    finishedCount: number,
    totalAssignedCount: number,
    eventType: 'reply' | 'reaction' | 'task',
    messageId: number,
    chatroomId: number,
}

export default function EventMessage({
                                         eventTitle,
                                         users,
                                         deadLine,
                                         finishedCount,
                                         totalAssignedCount,
                                         eventType,
                                         messageId,
                                         chatroomId
                                     }: Props) {
    const timeRemaining = timeAfter(new Date(deadLine));
    const router = useRouter();

    const moveDetail = () => {
        if (eventType === 'reply')
            router.push(`/chatroom/${chatroomId}/event/${messageId}/reply`);
    }

    return (
        <div className={styles.component} onClick={moveDetail}>
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
                    <div className={styles.right}>
                        <Image src="/chatting/time.png" alt="clock" width={16} height={16}/>
                        <span className={styles.remain}>{timeRemaining}</span>
                    </div>
                    <div className={styles.left}>{eventTitle}</div>
                    <div className={styles.right+" "+styles.count}>
                        {eventType === 'reply' ?
                            `답변 대기중 ${finishedCount}/${totalAssignedCount}`
                            :
                            eventType === 'reaction' ?
                                `응답 대기중 ${finishedCount}/${totalAssignedCount}`
                                :
                                ''
                        }
                    </div>
                </div>
            </div>
        </div>
    );
}