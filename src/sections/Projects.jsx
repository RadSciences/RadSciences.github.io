import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import styles from './Projects.module.css';

export default function Projects() {
  const { t, currentLang } = useLanguage();
  const navigate = useNavigate();
  
  const items = t('projects.items', { returnObjects: true });
  
  // 슬라이드 상태 관리
  const [currentIndex, setCurrentIndex] = useState(0);
  const totalItems = Array.isArray(items) ? items.length : 0;
  const maxIndex = Math.max(0, totalItems - 3); // 한 번에 3개 보이므로

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <span className={styles.subtitle}>OUR WORKS</span>
        <div className={styles.headerRow}>
          <div>
            <h4 className={styles.title}>Projects</h4>
          </div>
          
          {/* 슬라이드 컨트롤 버튼 */}
          <div className={styles.controls}>
            <button onClick={prevSlide} className={styles.navButton}>&larr;</button>
            <button onClick={nextSlide} className={styles.navButton}>&rarr;</button>
          </div>
        </div>

        <div className={styles.sliderWindow}>
          <div 
            className={styles.grid} 
            style={{ transform: `translateX(-${currentIndex * (100 / 3)}%)` }}
          >
            {Array.isArray(items) && items.map((project) => (
              <div key={project.id} className={styles.card} onClick={() => navigate(`/projects/${project.id}`)}>
                <span className={`${styles.badge} ${styles[project.status]}`}>
                  {project.status === 'live' ? 'Live' : 'In Progress'}
                </span>

                <h3 className={styles.cardTitle}>{project.title}</h3>

                {project.affiliation && (
                  <p className={styles.affiliation}>{project.affiliation}</p>
                )}

                <p className={styles.cardDesc}>{project.description}</p>

                <div className={styles.tags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className={styles.tag}>{tag}</span>
                  ))}
                </div>

              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}