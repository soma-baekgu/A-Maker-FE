"use client";

import styles from './layout.module.css';

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    return (
        <html lang="en">
        <body className={styles.body}>
        <div className={styles.content}>{children}</div>
        </body>
        </html>
    );
}
