'use client';

import {useStore} from "@/app/store";
import {useRouter} from "next/navigation";
import {useEffect} from "react";
import workspaceApi from "@/app/(api)/workspace";

export default function Page() {
    const {accessToken} = useStore();
    const router = useRouter();

    useEffect(() => {
        if (accessToken) {
            workspaceApi.recent()
                .then((res) => {
                    const workspaceId = res.data.data.workspaceId;
                    router.replace(`/home/${workspaceId}`);
                });
        } else {
            router.replace('/login');
        }
    })

    return (
        <></>
    );
}