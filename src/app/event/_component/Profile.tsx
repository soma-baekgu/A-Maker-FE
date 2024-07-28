import styles from './profile.module.css';

type Props = {
    name: string,
    img: string
}

export default function Profile({name, img}: Props) {
    return (
        <div className={styles.component}>
            <div className={styles.profileImg}></div>
            <div className={styles.profileName}>{name}</div>
        </div>
    );
}