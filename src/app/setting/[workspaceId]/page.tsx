import styles from './page.module.css';
import WorkspaceInfo from "@/app/setting/_component/WorkspaceInfo";
import MemberInvitor from "@/app/setting/_component/MemberInviter";
import WorkspaceDeleter from "@/app/setting/_component/WorkspaceDeleter";
import TopBar from "@/app/_component/TopBar";

type Props = {
    params: {
        workspaceId: string
    }
}

export default function Page(props: Props) {
    const workspaceId: number = Number(props.params.workspaceId);

    return (
        <div className={styles.page}>
            <TopBar pageType={'워크스페이스 설정'} workspaceId={workspaceId}/>
            <WorkspaceInfo/>
            <MemberInvitor workspaceId={workspaceId}/>
            <WorkspaceDeleter/>
        </div>
    );
}