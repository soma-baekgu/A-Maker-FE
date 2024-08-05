import styles from './memberInviter.module.css';

export default function MemberInviter() {
    const invitedUsers = [
        {
            id: 56,
            name: '홍길동',
            email: 'aaa@gmail.com',
            imgUrl: '/defaultImg'
        },
        {
            id: 51,
            name: '가나다',
            email: 'aaa@gmail.com',
            imgUrl: '/defaultImg'
        },
    ];


    return (
        <div className={styles.component}>
            <div className={styles.title}>팀원 초대</div>
            <div className={styles.section}>
                <div className={styles.help}>초대할 팀원의 이메일을 입력해주세요. 팀원은 A-Maker에 가입되있어야 합니다.</div>
                <div className={styles.inputContainer}>
                    <input type="text" className={styles.input}/>
                    <div className={styles.inviteButton}>초대</div>
                </div>
                <div className={styles.error}>A-Maker에 가입된 이메일이 아닙니다.</div>
            </div>
            <div className={styles.list}>
                {invitedUsers.map((user, index) => (
                    <div key={index} className={styles.user}>
                        <img src={user.imgUrl} className={styles.profileImage} alt="profileImage"/>
                        <div className={styles.userInfo}>
                            <div>{user.name}</div>
                            <div>{user.email}</div>
                        </div>
                        <div className={styles.state}>초대 수락 대기중</div>
                    </div>
                ))}
            </div>
        </div>
    );
}