import styles from './layout.module.css';
import Link from "next/link";
import TopBar from "@/app/_component/topBar";
import NavBar from "@/app/_component/navBar";
import BottomBar from "@/app/_component/BottomBar";

export default function RootLayout({children}: Readonly<{ children: React.ReactNode }>) {
    const workspaceName = "캡스톤 디자인 A조";

    return (
        <html lang="en">
        <body className={styles.body}>
        <div className>
            <TopBar workspaceName={workspaceName}/>
            <div className={styles.content}>{children}</div>
        </div>
        <BottomBar/>
        </body>
        </html>
    );
}
