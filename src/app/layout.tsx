"use client";

import styles from './layout.module.css';
import BottomBar from "@/app/_component/BottomBar";

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
