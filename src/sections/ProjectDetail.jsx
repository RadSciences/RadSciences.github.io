import { useParams, useNavigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { ease } from '../utils/motion';
import styles from './ProjectDetail.module.css';

const item = (delay = 0) => ({
  hidden: { opacity: 0, y: 30 },
  show: { opacity: 1, y: 0, transition: { duration: 0.75, delay, ease } },
});

export default function ProjectDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { t, currentLang } = useLanguage();

  const items = t('projects.items', { returnObjects: true });
  const project = Array.isArray(items) ? items.find((p) => p.id === id) : null;

  const backLabel = currentLang === 'ko' ? '목록으로' : 'Back to Lists';
  const notFound = currentLang === 'ko' ? '프로젝트를 찾을 수 없습니다.' : 'Project not found.';
  const visitLabel = currentLang === 'ko' ? '사이트 방문' : 'Visit Site';
  // 컴포넌트 안에 추가
  const [dots, setDots] = useState('');

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prev => prev.length >= 3 ? '' : prev + '.');
    }, 200);
    return () => clearInterval(interval);
  }, []);

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
      <motion.button
        onClick={() => navigate('/', { state: { scrollTo: 'projects' } })}
        className={styles.backButton}
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6, ease }}
      >
        {backLabel}
      </motion.button>

      <motion.div
        className={styles.header}
        initial="hidden"
        animate="show"
      >
        <motion.span
          className={`${styles.badge} ${styles[project.status]}`}
          variants={item(0.05)}
        >
          {project.status === 'live' ? 'Live' : 'In Progress'}
        </motion.span>
        <div style={{ overflow: 'hidden' }}>
          <motion.h1
            className="section-title"
            variants={item(0.12)}
          >
            {project.title}
          </motion.h1>
        </div>
      </motion.div>

      <div className={styles.layoutContainer}>
        <motion.div
          className={styles.mediaSide}
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.2, ease }}
        >
          {project.demo ? (
            <video
              className={styles.mainVideo}
              src={project.demo}
              playsInline controls
            />
          ) : (
            <div className={styles.mainImage}>
              <span>
                {currentLang === "ko" ? "준비중입니다" : "In preparation"}
                <span className={styles.dots}>{dots}</span>
              </span>
            </div>
          )}
        </motion.div>

        <motion.div
          className={styles.infoSide}
          initial={{ opacity: 0, x: 50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.85, delay: 0.3, ease }}
        >
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
        </motion.div>
      </div>
    </article>
  );
}
