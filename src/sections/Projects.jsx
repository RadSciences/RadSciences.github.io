import styles from './Projects.module.css';

export default function Projects({ setView }) {
  return (
    <section id="projects" className={styles.section}>
      <h2 className={styles.title}>Our Work</h2>
      
      <div className={styles.ctaBox}>
        <p className={styles.description}>
          최근 진행한 성공적인 프로젝트들을 확인해보세요.
        </p>
        <button 
          onClick={() => setView('detail')}
          className={styles.detailButton}
        >
          상세 프로젝트 보기
        </button>
      </div>
    </section>
  );
}