import styles from './Contact.module.css';

export default function Contact() {
  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Ready to Start?</h2>
        <p className={styles.description}>
          프로젝트 문의는 언제든 환영입니다.
        </p>
        <button className={styles.contactButton}>
          Contact Us
        </button>
      </div>
    </section>
  );
}