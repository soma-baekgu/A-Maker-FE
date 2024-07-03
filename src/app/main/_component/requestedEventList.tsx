import styles from './requestedEventList.module.css';
import RequestedEvent from "@/app/main/_component/requestedEvent";

export default function RequestedEventList(){
    const requestedEventData = [
        {
            dueDate: new Date("2024-08-01T14:00:00"),
            content: "발표 ppt 목차를 어떻게 할까요?",
            respondedMemberCnt: 5,
            totalMemberCnt: 10
        },
        {
            dueDate: new Date("2024-07-10T14:00:00"),
            content: "다음 회의 장소 정해졌습니다",
            respondedMemberCnt: 10,
            totalMemberCnt: 10
        }
    ];

    return(
        <>
            <div className={styles.eventDescription}>
                요청한 리액션&리플라이 이벤트
            </div>
            <div className={styles.eventList}>
                {requestedEventData.map((event, index) => (
                    <RequestedEvent
                        key={index}
                        dueDate={event.dueDate}
                        content={event.content}
                        respondedMemberCnt={event.respondedMemberCnt}
                        totalMemberCnt={event.totalMemberCnt}
                    />
                ))}
            </div>
            <div className={styles.addButton}></div>
        </>
    );
}