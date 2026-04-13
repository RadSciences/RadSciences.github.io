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
            여기에 회사에 대한 자세한 설명을 적으세요. 
            우리의 비전과 목표, 그리고 팀원들의 열정을 담은 문구가 들어갈 자리입니다.
          </p>
        </div>
      </div>
    </section>
  );
}