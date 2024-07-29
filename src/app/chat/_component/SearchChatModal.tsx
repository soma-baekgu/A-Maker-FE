import styles from './searchChatModal.module.css';
import Image from "next/image";
import MiniProfileImageGroup from "@/app/chat/_component/MiniProfileImageGroup";

type Props = {
    setVisible: (visible: boolean) => void,
    joinChatRoom: (chatRoomIds: number[]) => void,
}

export default function SearchChatModal({setVisible, joinChatRoom}: Props) {
    const handleClose = () => {
        setVisible(false);
    }

    const handleJoin = () => {
        joinChatRoom([]);//todo 값 채워 넣기
        setVisible(false);
        location.reload();
    }

    type chatRoomInfo = {
        chatRoomId: number,
        chatRoomName: string,
        participants: string[]
    }

    const dummy: chatRoomInfo[] = [
        {
            chatRoomId: 1,
            chatRoomName: "채팅방1",
            participants: ["https://lh3.googleusercontent.com/a/ACg8ocK1QHxfX4g2BG_DQk1ZgNTFELzkJ-Br9vsUDg14SFwC5vHkxw=s192-c-br100-rg-mo", "https://lh3.googleusercontent.com/a/ACg8ocK1QHxfX4g2BG_DQk1ZgNTFELzkJ-Br9vsUDg14SFwC5vHkxw=s192-c-br100-rg-mo"]
        },
        {
            chatRoomId: 2,
            chatRoomName: "채팅방2",
            participants: ["https://lh3.googleusercontent.com/a/ACg8ocK1QHxfX4g2BG_DQk1ZgNTFELzkJ-Br9vsUDg14SFwC5vHkxw=s192-c-br100-rg-mo"]
        }
    ]

    return (
        <div className={styles.background} onClick={handleClose}>
            <div className={styles.component} onClick={e => e.stopPropagation()}>
                <div className={styles.logo}>
                    <Image src="/button/searchChat.png" alt="searchChat" width={92} height={92}/>
                    <div className={styles.title}>채팅방 참여하기</div>
                </div>
                <div className={styles.chatRoomList}>
                    {dummy.map((chatRoom, index) => {
                        return (
                            <div key={index} className={styles.chatRoom}>
                                <MiniProfileImageGroup imageUrls={chatRoom.participants}/>
                                <div className={styles.chatRoomName}>{chatRoom.chatRoomName}</div>
                                <input className={styles.checkbox} type="checkbox"/>
                            </div>
                        )
                    })}
                </div>
                <div className={styles.button} onClick={handleJoin}>참여</div>
            </div>
        </div>
    )
}