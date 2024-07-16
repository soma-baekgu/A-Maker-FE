import styles from './page.module.css';
import Workspace from "@/app/workspaces/_component/Workspace";

export default function Workspaces() {
    const workspaceData = [
        {
            thumbnail: '/thumb1.png',
            workspaceName: '캡스톤디자인 A조'
        },
        {
            thumbnail: '/thumb2.png',
            workspaceName: '전공종합설계 2조'
        }
    ];

    return (
        <>
            <ModalTopBar barDescription={'워크스페이스 목록'}/>
            <div className={styles.workspaceList}>
                {workspaceData.map((workspace, index) => (
                    <Workspace key={index} thumbnail={workspace.thumbnail} workspaceName={workspace.workspaceName}/>
                ))}
            </div>
            <div className={styles.newWorkspaceButton}>
                새 워크스페이스 추가
            </div>
        </>
    );
}