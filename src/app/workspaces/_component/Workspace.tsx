import styles from './workspace.module.css';
import Image from "next/image";

type Props = {
    thumbnail: string,
    workspaceName: string
}

export default function Workspace({thumbnail, workspaceName}: Props){
    return(
        <div className={styles.element}>
            <div className={styles.thumbnail}>
                <Image src={thumbnail} alt="thumbnail" layout="fill" objectFit="contain"/>
            </div>
            <div className={styles.workspaceName}>
                {workspaceName}
            </div>
            <div className={styles.moreButton}></div>
        </div>
    )
}