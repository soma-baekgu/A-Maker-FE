import Link from "next/link";
import styles from "./bottomBar.module.css";
import Image from 'next/image';

type Props = {
    workspaceId: number,
    pageType: string
}

export default function BottomBar({workspaceId, pageType}: Props) {
    return (
        <>
            <div className={styles.component}>
                <Link href={`/home/${workspaceId}`}>
                    <div className={styles.button}>
                        {pageType == "홈" ?
                            <Image src="/bottomBar/home_selected.png" alt="home" width={24}
                                   height={24}/> :
                            <Image src="/bottomBar/home.png" alt="home" width={24}
                                   height={24}/>}
                        <div>홈</div>
                    </div>
                </Link>
                <Link href={`/chat/${workspaceId}`}>
                    <div className={styles.button}>
                        {pageType == "채팅" ?
                            <Image src="/bottomBar/chat_selected.png" alt="chat" width={24}
                                   height={24}/> :
                            <Image src="/bottomBar/chat.png" alt="chat" width={24} height={24}/>}
                        <div>채팅</div>
                    </div>

                </Link>
                <Link href={`/alarm/${workspaceId}`}>
                    <div className={styles.button}>
                    {pageType == "알림" ?
                        <Image src="/bottomBar/alarm_selected.png" alt="alarm" width={24}
                               height={24}/> :
                        <Image src="/bottomBar/alarm.png" alt="alarm" width={24}
                               height={24}/>}
                    <div>알림</div>
                    </div>
                </Link>
            </div>
        </>
    )
}