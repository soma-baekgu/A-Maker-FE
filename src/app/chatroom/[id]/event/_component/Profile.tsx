import styles from './profile.module.css';
import Image from "next/image";

type Props = {
    name: string,
    img: string,
    isComment: boolean
}

export default function Profile({name, img, isComment = false}: Props) {
    return (
        <div className={styles.component}>
            <Image className={styles.profileImg} width={24} height={24} src={img} alt='profile'></Image>
            <div className={isComment ? styles.profileNameInComment : styles.profileName}>{name}</div>
        </div>
    );
}