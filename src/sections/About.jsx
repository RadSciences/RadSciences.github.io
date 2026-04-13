import styles from './About.module.css';

export default function About() {
  return (
    <section id="about" className={styles.section}>
      <h2 className={styles.title}>About Us</h2>
      
      <div className={styles.contentGrid}>
        {/* 이미지 들어갈 자리 */}
        <div className={styles.imagePlaceholder}></div>
        
        {/* 텍스트 내용 */}
        <div className={styles.textContent}>
          <p className={styles.description}>
            회사 설명설명입니다. 회사 설명! 
            우리의 비전과 목표 설명설명
          </p>
        </div>
      </div>
    </section>
  );
}