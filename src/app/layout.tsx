"use client";

import styles from './layout.module.css';
import Link from "next/link";
import TopBar from "@/app/_component/TopBar";
import NavBar from "@/app/_component/navBar";
import BottomBar from "@/app/_component/BottomBar";
import {usePathname} from "next/navigation";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={styles.body}>
        <div className={styles.content}>{children}</div>
        <BottomBar/>
        </body>
        </html>
    );
}
