import styles from './ClosureNotice.module.css';

function ClosureNotice() {
  return (
    <div className={styles.overlay} role="alertdialog" aria-modal="true" aria-labelledby="closure-notice-title">
      <div className={styles.modal}>
        <h2 id="closure-notice-title" className={styles.title}>
          안내
        </h2>
        <p className={styles.message}>
          안녕하세요.
          <br />
          저희 회사가 법인 전환하여 아래의 리뉴얼된 페이지로 안내드립니다.
        </p>
        <a
          className={styles.link}
          href="https://radscience.ai.kr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          https://radscience.ai.kr/
        </a>
      </div>
    </div>
  );
}

export default ClosureNotice;
