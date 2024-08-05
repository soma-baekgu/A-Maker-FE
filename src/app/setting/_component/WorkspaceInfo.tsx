import styles from './workspaceInfo.module.css';
import Image from "next/image";

export default function WorkspaceInfo() {
    const joinedUsers = [
        {
            id: 55,
            name: '김태훈',
            email: 'abc@gmail.com',
            role: 'admin',
            imgUrl: '/defaultImg'
        },
        {
            id: 99,
            name: '노영진',
            email: 'abc@gmail.com',
            role: 'member',
            imgUrl: '/defaultImg'
        }
    ];

    return (
        <div className={styles.component}>
            <div className={styles.title}>워크스페이스 정보 수정</div>
            <div className={styles.section}>
                <div className={styles.subtitle}>워크스페이스 이름</div>
                <input type="text" className={styles.input}/>
            </div>
            <div className={styles.section}>
                <div className={styles.subtitle}>대표 이미지</div>
                <Image src={"/images/default_thumbnail.png"} alt="workspaceImage" width={170} height={170}/>
                <div className={styles.uploadButton}>업로드</div>
            </div>
            <div className={styles.section}>
                <div className={styles.subtitle}>팀원 목록</div>
                <div className={styles.userList}>
                    {joinedUsers.map((user, index) => (
                        <div key={index} className={styles.user}>
                            <img src={user.imgUrl} className={styles.profileImage} alt="profileImage"/>
                            <div className={styles.userInfo}>
                                <div>{user.name}</div>
                                <div>{user.email}</div>
                            </div>
                            <div className={styles.role}>
                                <div className={styles.roleText}>{user.role == 'admin' ? '관리자' : '일반'}</div>
                                <Image src="/button/dropdown.png" alt="dropdown" width={30} height={31}/>
                            </div>
                            <Image className={styles.deleteButton} src="/button/delete.png" alt="delete" width={38}
                                   height={39}/>
                        </div>
                    ))}
                </div>
            </div>
            <div className={styles.editButton}>수정</div>
        </div>
    );
}