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
          {children}
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
