import styles from './receivedEventList.module.css';
import ReceivedEvent from "@/app/main/_component/receivedEvent";

export default function ReceivedEventList(){
    const receivedEventData = [
        {
            dueDate: new Date("2024-08-01T14:00:00"),
            content: "조 이름을 뭘로 할까요?",
            requesterName: "허석문"
        },
        {
            dueDate: new Date("2024-07-10T14:00:00"),
            content: "작업 전에 과제 제출 형식 확인해주세요",
            requesterName: "이승환",
        }
    ];

    return(
        <>
            <div className={styles.eventDescription}>
                응답을 해야하는 리액션&리플라이 이벤트
            </div>
            <div className={styles.eventList}>
                {receivedEventData.map((event, index) => (
                    <ReceivedEvent
                        key={index}
                        dueDate={event.dueDate}
                        content={event.content}
                        requesterName={event.requesterName}
                    />
                ))}
            </div>
            <div className={styles.addButton}></div>
        </>
    );
}