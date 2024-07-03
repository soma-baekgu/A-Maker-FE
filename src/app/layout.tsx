import styles from './layout.module.css';
import Link from "next/link";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={styles.body}>
        <div className={styles.main}>
          <div className={styles.topBar}>
            <div className={styles.topBarButton}></div>
            <div className={styles.workspaceTitle}>
              캡스톤디자인 A조
            </div>
            <div className={styles.topBarButton}></div>
          </div>
          <div className={styles.content}>
            {children}
          </div>
        </div>
        <div className={styles.navBar}>
          <Link href="/main" className={styles.navButton}>
            <div className={styles.buttonIcon}></div>
          </Link>
          <Link href="/chatting" className={styles.navButton}>
            <div className={styles.buttonIcon}></div>
          </Link>
          <Link href="/dm" className={styles.navButton}>
            <div className={styles.buttonIcon}></div>
          </Link>
          <Link href="/task" className={styles.navButton}>
            <div className={styles.buttonIcon}></div>
          </Link>
        </div>
      </body>
    </html>
  );
}
