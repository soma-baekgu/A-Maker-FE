import styles from './profileImageGroup.module.css';

type Props = {
    imageUrls: string[]
}

export default function ProfileImageGroup({imageUrls}: Props) {
    const cnt = imageUrls.length;

    return (
        <div className={styles.component}>
            <div className={styles.profileImages}>
                {
                    cnt >= 1
                    &&
                    <div className={styles.profileImage}>
                    </div>
                }
                {
                    cnt >= 3
                    &&
                    <div className={styles.profileImage}>
                    </div>
                }
            </div>
            {cnt >= 2
                &&
                <div className={styles.profileImages}>
                    <div className={styles.profileImage}>
                    </div>
                    {
                        cnt >= 4
                        &&
                        <div className={styles.profileImage}>
                        </div>
                    }
                </div>
            }
        </div>
    );
}