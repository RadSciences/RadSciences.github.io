import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useLanguage } from '../hooks/useLanguage';
import styles from './Projects.module.css';

export default function Projects() {
  const { t } = useLanguage();
  const navigate = useNavigate();

  const items = t('projects.items', { returnObjects: true });
  const [currentIndex, setCurrentIndex] = useState(0);
  const [itemsPerView, setItemsPerView] = useState(3); // 현재 화면에 보이는 카드 수

  const totalItems = Array.isArray(items) ? items.length : 0;
  const gap = 20; // CSS의 gap: 20px과 동일해야 함

  // 1. 브라우저 너비에 따라 보여줄 카드 개수 동적 계산
  useEffect(() => {
    const updateItemsPerView = () => {
      if (window.innerWidth <= 600) setItemsPerView(1);
      else if (window.innerWidth <= 1024) setItemsPerView(2);
      else setItemsPerView(3);
    };

    updateItemsPerView();
    window.addEventListener('resize', updateItemsPerView);
    return () => window.removeEventListener('resize', updateItemsPerView);
  }, []);

  // 2. 최대 이동 가능 인덱스 (전체 - 현재 보이는 수)
  const maxIndex = Math.max(0, totalItems - itemsPerView);

  const nextSlide = () => {
    setCurrentIndex((prev) => (prev >= maxIndex ? 0 : prev + 1));
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => (prev <= 0 ? maxIndex : prev - 1));
  };

  // 3. 이동 거리 계산 (너비 % + gap 보정값)
  // CSS에서 card 너비를 calc(33.33% - 13.33px) 처럼 잡았을 때 정확히 맞는 공식
  const calculateTranslate = () => {

    if (currentIndex === 0) return '0%';

    // 모바일(1개일 때)은 간편하게 인덱스 * 100% + 간격만큼 이동
    if (itemsPerView === 1) {
      return `calc(-${currentIndex} * (100% + ${gap}px))`;
    }

    // PC/태블릿: (카드너비 + gap)을 통째로 이동
    // 카드너비 = (100% - (gap * (view-1))) / view
    return `calc(-${currentIndex} * ((100% - ${gap * (itemsPerView - 1)}px) / ${itemsPerView} + ${gap}px))`;
  };


  return (
    <section id="projects" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.headerRow}>
            <span className={styles.subtitle}>OUR WORKS</span>
            <h4 className={styles.title}>Projects</h4>
        </div>
        <div className={styles.controls}>
          <button onClick={prevSlide} className={styles.navButton}>&larr;</button>
          <button onClick={nextSlide} className={styles.navButton}>&rarr;</button>
        </div>
        <div className={styles.sliderWindow}>
          <div
            className={styles.grid}
            style={{
              transform: `translateX(${calculateTranslate()})`,
              display: 'flex',
              gap: `${gap}px`,
              transition: 'transform 0.6s cubic-bezier(0.23, 1, 0.32, 1)'
            }}
          >
            {Array.isArray(items) && items.map((project) => (
              <div
                key={project.id}
                className={styles.card}
                onClick={() => navigate(`/projects/${project.id}`)}
                // CSS 모듈 사용 시 flex-shrink 보장
                style={{ flexShrink: 0 }}
              >
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