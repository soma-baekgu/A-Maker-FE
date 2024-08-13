'use client';

import styles from './page.module.css';
import {useState} from "react";
import Image from "next/image";
import workspaceApi from "@/app/(api)/workspace";
import {useRouter} from "next/navigation";

type workspaceInfo = {
    id: number,
    name: string,
    imgUrl: string,
}

type Props = {
    params: {
        workspaceId: string
    }
}

export default function Page(props: Props) {
    const [workspaceInfo, setWorkspaceInfo] = useState<workspaceInfo>({
        id: 1,
        name: '캡스톤 디자인 2조',
        imgUrl: '/images/default_thumbnail.png'
    });

    const workspaceId = Number(props.params.workspaceId);

    const router = useRouter();

    const handleApprove = () => {
        workspaceApi.approve(workspaceId).then(() => {
            router.replace(`/home/${workspaceId}`);
        });
    }

    return (
        <div className={styles.page}>
            <div className={styles.title}>
                <Image className={styles.image} src={workspaceInfo.imgUrl} alt="img" width={60} height={60}/>
                <div>{workspaceInfo.name}</div>
            </div>
            <div className={styles.help}>
                워크스페이스에 초대되었습니다.<br/>
                버튼을 클릭해 워크스페이스에 참가해보세요!
            </div>
            <div className={styles.button} onClick={handleApprove}>워크스페이스 참가</div>
        </div>
    )
}