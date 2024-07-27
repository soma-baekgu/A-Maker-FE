'use client';

import styles from './page.module.css';
import Image from "next/image";
import axios from "axios";
import {useRouter} from "next/navigation";
import {useEffect, useState} from "react";

export default function Page() {
    const router = useRouter();
    const [authCode, setAuthCode] = useState<string | null>(null);

    useEffect(() => {
        const queryParam = new URLSearchParams(window.location.search).get('code');
        if (queryParam)
            setAuthCode(queryParam);
    }, []);

    useEffect(() => {
        if (authCode) {
            axios.post(`${process.env.NEXT_PUBLIC_SERVER_URL}/api/v1/auth/oauth/google`, {
                code: authCode,
            }).then(response => {
                console.log(response.data);
                router.push('/home');
            }).catch(error => {
                console.error(error);
            });
        }
    },[authCode]);

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