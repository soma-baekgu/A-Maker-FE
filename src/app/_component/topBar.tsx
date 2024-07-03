import styles from './topBar.module.css';

type Props = {
    workspaceName: string
}

export default function TopBar({workspaceName}: Props) {
    return (
        <div className={styles.topBar}>
            <div className={styles.topBarButton}></div>
            <div className={styles.workspaceTitle}>
                {workspaceName}
            </div>
            <div className={styles.topBarButton}></div>
        </div>
    )
};