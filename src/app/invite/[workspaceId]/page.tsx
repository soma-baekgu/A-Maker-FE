'use client';

import styles from './page.module.css';
import React, {useEffect, useState} from "react";
import Image from "next/image";
import workspaceApi from "@/app/(api)/workspace";
import {useRouter} from "next/navigation";

type workspaceInfo = {
    id: number,
    name: string,
    thumbnail: string,
}

type Props = {
    params: {
        workspaceId: string
    }
}

export default function Page(props: Props) {
    const [workspaceInfo, setWorkspaceInfo] = useState<workspaceInfo | null>(null);
    const [isLoaded, setIsLoaded] = useState(false);

    const workspaceId = Number(props.params.workspaceId);

    const router = useRouter();

    useEffect(() => {
        fetchWorkspace().then(() => setIsLoaded(true));
    }, []);

    const fetchWorkspace = async () => {
        const res = await workspaceApi.get(workspaceId);
        setWorkspaceInfo(res.data.data);
    }

    const handleApprove = () => {
        workspaceApi.approve(workspaceId).then(() => {
            router.replace(`/home/${workspaceId}`);
        });
    }

    return (
        <div className={styles.page}>
            {isLoaded ?
                <>
                    <Image src={"/login/pattern3.png"} alt={"pattern"}
                           className={styles.pattern}
                           width={390} height={844}/>
                    <div className={styles.logo}>A-MAKER</div>
                    <div className={styles.content}>
                        <div className={styles.title}>
                            <Image className={styles.image} src={workspaceInfo!.thumbnail} alt="img" width={42}
                                   height={42}/>
                            <div>{workspaceInfo!.name}</div>
                        </div>
                        <div className={styles.help}>
                            워크스페이스에 초대되었습니다.<br/>
                            버튼을 클릭해 워크스페이스에 참가해보세요!
                        </div>
                        <div className={styles.main}>
                            <Image src={"/login/people.png"} alt={"people"} width={358} height={147}
                            className={styles.people}/>
                            <div className={styles.button} onClick={handleApprove}>
                                <div>워크스페이스 참가</div>
                                <Image src={"/login/invite.png"} alt={"join"} width={24} height={24}/>
                            </div>
                        </div>
                    </div>
                </>
                :
                <>
                    Loading...
                </>
            }
        </div>
    )
}