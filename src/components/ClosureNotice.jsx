import styles from './ClosureNotice.module.css';

function ClosureNotice() {
  return (
    <div className={styles.overlay} role="alertdialog" aria-modal="true" aria-labelledby="closure-notice-title">
      <div className={styles.modal}>
        <h2 id="closure-notice-title" className={styles.title}>
          안내
        </h2>
        <p className={styles.message}>
          Rad Science는 2026년 07월 11일 부로 
          <br />
           법인 전환하여 기존 페이지 운영을 중단합니다.
        </p>
        <a
          className={styles.link}
          href="https://radscience.ai.kr/"
          target="_blank"
          rel="noopener noreferrer"
        >
          리뉴얼 페이지 바로가기
        </a>
      </div>
    </div>
  );
}

export default ClosureNotice;
