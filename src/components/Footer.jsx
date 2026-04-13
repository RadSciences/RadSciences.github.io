import styles from './Footer.module.css';

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <p className={styles.copyright}>
          © 2026 Company Name. All rights reserved.
        </p>
        
        <div className={styles.links}>
          <span className={styles.linkItem}>Terms</span>
          <span className={styles.linkItem}>Privacy</span>
        </div>
      </div>
    </footer>
  );
}