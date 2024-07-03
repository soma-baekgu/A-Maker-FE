'use client';
import styles from './topBar.module.css';
import {usePathname} from "next/navigation";
import Link from "next/link";

type Props = {
    workspaceName: string
}

export default function TopBar({workspaceName}: Props) {
    const pathName = usePathname();

    return (
        <>
            {pathName !== '/workspaces' &&
                <div className={styles.topBar}>
                    <Link href="/workspaces">
                        <div className={styles.topBarButton}></div>
                    </Link>
                    <div className={styles.workspaceTitle}>
                        {workspaceName}
                    </div>
                    <div className={styles.topBarButton}></div>
                </div>
            }
        </>
    )
};