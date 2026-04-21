import { useParams, useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import styles from './ProjectDetail.module.css';

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, currentLang } = useLanguage();

  const items = t('projects.items', { returnObjects: true });
  const project = Array.isArray(items) ? items.find((p) => p.id === id) : null;

  const backLabel = currentLang === 'ko' ? '← 프로젝트 목록으로' : '← Back to Projects';
  const notFound = currentLang === 'ko' ? '프로젝트를 찾을 수 없습니다.' : 'Project not found.';
  const visitLabel = currentLang === 'ko' ? '사이트 방문' : 'Visit Site';

  if (!project) {
    return (
      <article className={styles.section}>
        <button onClick={() => navigate('/', { state: { scrollTo: 'projects' } })} className={styles.backButton}>
          {backLabel}
        </button>
        <p className={styles.notFound}>{notFound}</p>
      </article>
    );
  }

  const hasLink = project.link && project.link !== '__Link__';

  return (
    <article className={styles.section}>
      <button onClick={() => navigate('/', { state: { scrollTo: 'projects' } })} className={styles.backButton}>
        {backLabel}
      </button>

      <div className={styles.header}>
        <h1 className={styles.title}>{project.title}</h1>
        <span className={`${styles.badge} ${styles[project.status]}`}>
          {project.status === 'live' ? 'Live' : 'In Progress'}
        </span>
      </div>

      {/* 미디어와 정보를 감싸는 컨테이너 */}
      <div className={styles.layoutContainer}>

        {/* 왼쪽: 비주얼 영역 */}
        <div className={styles.mediaSide}>
          {project.demo ? (
            <video
              className={styles.mainVideo}
              src={project.demo}
              autoPlay muted loop playsInline controls
            />
          ) : (
            <div className={styles.mainImage}>
              <span>{currentLang === "ko" ? "준비중입니다." : "In preparation"}</span>
            </div>
          )}
        </div>

        {/* 오른쪽: 텍스트 정보 영역 */}
        <div className={styles.infoSide}>
          {project.affiliation && <p className={styles.affiliation}>{project.affiliation}</p>}
          {project.context && <p className={styles.context}>{project.context}</p>}

          <div className={styles.contentBody}>
            <p>{project.description}</p>
          </div>

          <div className={styles.tags}>
            {project.tags.map((tag) => (
              <span key={tag} className={styles.tag}>{tag}</span>
            ))}
          </div>

          {hasLink && (
            <a href={project.link} target="_blank" rel="noopener noreferrer" className={styles.link}>
              {project.linkLabel || visitLabel} →
            </a>
          )}
        </div>
      </div>
    </article>
  );
}
