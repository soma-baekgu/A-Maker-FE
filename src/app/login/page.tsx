'use client';

import styles from './page.module.css';
import Image from "next/image";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";
import authApi from "@/app/(api)/auth";
import {useStore} from "@/app/store";
import workspaceApi from "@/app/(api)/workspace";

interface AccessTokenStore {
    setAccessToken: (token: string) => void;
}

interface EmailStore {
    setEmail: (email: string) => void;
}

export default function Page() {
    const router = useRouter();
    const [authCode, setAuthCode] = useState<string | null>(null);
    const {setAccessToken} = useStore() as AccessTokenStore;
    const {setEmail} = useStore() as EmailStore;

    useEffect(() => {
        const queryParam = new URLSearchParams(window.location.search).get('code');
        if (queryParam)
            setAuthCode(queryParam);
    }, []);

    useEffect(() => {
        const login = async () => {
            if (authCode !== null) {
                const res = await authApi.login(authCode);
                setAccessToken(res.data.data.token);
                setEmail(res.data.data.email);
                return res;
            }
        }
        if (authCode) {
            login().then(() => router.push('/'));
        }
    }, [authCode]);

    const onClickLogin = async () => {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/oauth/google`);
        window.location.href = response.data.data.url;
    }

    return (
        <div className={styles.page}>
            <Image src={"/login/pattern.png"} alt={"pattern"}
                   className={styles.pattern}
                   width={390} height={844}/>
            <div className={styles.logo}>A-MAKER</div>
            <div className={styles.button} onClick={onClickLogin}>
                <Image src="/login/google.png" alt="google" width={24} height={24}/>
                <div>Google 로그인</div>
            </div>
        </div>
    );
}