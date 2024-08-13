import styles from './profileImageGroup.module.css';

type Props = {
    imageUrls: string[],
    size: 'large' | 'small'
}

export default function ProfileImageGroup({imageUrls, size}: Props) {
    const cnt = imageUrls.length;
    const componentSize = size === 'large' ? styles.large : styles.small;

    return (
        <div className={`${styles.component} ${componentSize}`}>
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