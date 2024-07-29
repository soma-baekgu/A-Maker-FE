import styles from './miniProfileImageGroup.module.css';

type Props = {
    imageUrls: string[]
}

export default function MiniProfileImageGroup({imageUrls}: Props) {
    const cnt = imageUrls.length;

    return (
        <div className={styles.component}>
            <div className={styles.profileImages}>
                {
                    cnt >= 1
                    &&
                    <img className={styles.profileImage} src={imageUrls[0]}/>
                }
                {
                    cnt >= 3
                    &&
                    <img className={styles.profileImage} src={imageUrls[2]}/>
                }
            </div>
            {cnt >= 2
                &&
                <div className={styles.profileImages}>
                    <img className={styles.profileImage} src={imageUrls[1]}/>
                    {
                        cnt >= 4
                        &&
                        <img className={styles.profileImage} src={imageUrls[3]}/>
                    }
                </div>
            }
        </div>
    );
}