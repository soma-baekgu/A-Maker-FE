"use client";

import styles from './layout.module.css';
import localFont from "next/font/local";

const pretendard = localFont({
    src: "./fonts/PretendardVariable.woff2",
    display: "swap",
    weight: "45 920",
});

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={`${styles.body} ${pretendard.className}`}>
        <div className={styles.content}>{children}</div>
        </body>
        </html>
    );
}
