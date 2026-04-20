import { useLanguage } from '../hooks/useLanguage';
import styles from './ProjectDetail.module.css';

export default function ProjectDetail({ setView }) {
  const { t, currentLang } = useLanguage();
  const isKo = currentLang === 'ko';

  return (
    <article className={styles.section}>
      <button onClick={() => setView('main')} className={styles.backButton}>
        ← 프로젝트 목록으로 돌아가기
      </button>

      <h1 className={styles.title}>Project Details</h1>

      <div className={styles.mainImage} />

      <div className={styles.contentBody}>
        <p>
          이 프로젝트는 사용자의 편의성을 최우선으로 고려하여 설계되었습니다.
          최신 웹 기술을 활용하여 빠르고 안정적인 서비스를 구현했으며,
          데이터 분석을 통한 비즈니스 인사이트를 시각적으로 제공하는 데 집중했습니다.
        </p>
        <p>
          주요 기술 스택으로는 React와 Spring Boot를 사용하였으며,
          효율적인 데이터 관리를 위해 MySQL과 연동하여 실시간 대시보드를 구축했습니다.
        </p>
      </div>
    </article>
  );
}
