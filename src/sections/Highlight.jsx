import ScatterVisual from '../components/ScatterVisual';
import DnaVisual from '../components/DnaVisual';
import styles from './Highlight.module.css'; 

export default function Highlight() {
  return (
    <section className={styles.section}>
      
      {/* 1. 상단 텍스트 영역 (Header) */}
      <div className={styles.headerSection}>
        <span className={styles.title}>ADVANCED BIOMEDICAL ANALYTICS</span>
        <p className={styles.copy}>
          정밀한 분석을 통한 시각화와 클러스터링을 통해 <br />
          복잡한 데이터 속에서 유의미한 상관관계를 도출합니다.
        </p>
      </div>

      {/* 2. 하단 시각화 영역 (Main Content) */}
      <div className={styles.visualContainer}>
        <div className={`${styles.visualCard} ${styles.dnaWrapper}`}>
          <DnaVisual />
        </div>
        <div className={`${styles.visualCard} ${styles.graphWrapper}`}>
          <ScatterVisual />
        </div>
      </div>

    </section>
  );
}