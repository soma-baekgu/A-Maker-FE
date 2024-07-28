'use client';

import {useStore} from "@/app/store";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

export default function Page() {
    const {accessToken} = useStore();
    const router = useRouter();

    useEffect(() => {
        if (accessToken)
            router.push('/home');
        else
            router.push('/login');
    })

    return (
        <></>
    );
}