import styles from './profile.module.css';
import Image from "next/image";

type Props = {
    name: string,
    img: string
}

export default function Profile({name, img}: Props) {
    return (
        <div className={styles.component}>

            <Image className={styles.profileImg} width={45} height={45} src={img} alt='profile'></Image>
            <div className={styles.profileName}>{name}</div>
        </div>
    );
}