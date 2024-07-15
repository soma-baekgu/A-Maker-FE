"use client";

import styles from './layout.module.css';
import Link from "next/link";
import TopBar from "@/app/_component/TopBar";
import NavBar from "@/app/_component/navBar";
import BottomBar from "@/app/_component/BottomBar";
import {usePathname} from "next/navigation";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    const pathname = usePathname();
    let pageType;

    if (pathname === '/home') {
        pageType = '홈';
    } else if (pathname === '/chat') {
        pageType = '채팅';
    } else if (pathname === '/alarm') {
        pageType = '알림';
    } else if (pathname === '/setting') {
        pageType = '설정';
    } else {
        pageType = '기타';
    }

    return (
        <html lang="en">
        <body className={styles.body}>
        <TopBar pageType={pageType}/>
        <div className={styles.content}>{children}</div>
        <BottomBar/>
        </body>
        </html>
    );
}
