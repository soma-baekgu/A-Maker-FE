'use client';

import styles from './page.module.css';
import Image from "next/image";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import authApi from "@/app/(api)/auth";
import {useStore} from "@/app/store";

export default function Page() {
    const router = useRouter();
    const [authCode, setAuthCode] = useState<string | null>(null);
    const {setAccessToken} = useStore();

    useEffect(() => {
        const queryParam = new URLSearchParams(window.location.search).get('code');
        if (queryParam)
            setAuthCode(queryParam);
    }, []);

    useEffect(() => {
        const login = async () => {
            const res = await authApi.login(authCode);
            setAccessToken(res.data.data.token);
            return res;
        }
        if (authCode)
            login().then(() => router.push('/home'));
    }, [authCode]);

    const onClickLogin = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/oauth/google`);
        window.location.href = response.data.data.url;
    }

    return (
        <div className={styles.page}>
            <div className={styles.logo}>A-MAKER</div>
            <div className={styles.button} onClick={onClickLogin}>
                <Image src="/button/google.png" alt="google" width={58} height={54}/>
                <div>Google 로그인</div>
            </div>
        </div>
    );
}