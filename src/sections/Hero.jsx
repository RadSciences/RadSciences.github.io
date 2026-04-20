import { useState, useEffect } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import ScatterVisual from '../components/ScatterVisual';
import DnaVisual from '../components/DnaVisual';
import styles from './Hero.module.css';

const BADGES = [
  { id: 1, text: 'Precision Analytics' },
  { id: 2, text: 'Scalable Architecture' },
  { id: 3, text: 'Pattern Recognition' },
  { id: 4, text: 'Predictive Insights' },
];

export default function Hero() {
  const { t } = useLanguage();
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % BADGES.length);
    }, 3000);
    return () => clearInterval(timer);
  }, []);

  const getBadgeClass = (index) => {
    if (index === currentIndex) return styles.active;
    if (index === (currentIndex - 1 + BADGES.length) % BADGES.length) return styles.exit;
    return styles.hidden;
  };

  return (
    <section className={styles.section}>
      <div className={styles.headerSection}>
        <span className={styles.title}>INTELLIGENT BIO-DATA ENGINE</span>
        <h2 className={styles.copy}>{t('highlight.title')}</h2>

        <div className={styles.badgeStage}>
          <div className={styles.badgeWrapper}>
            {BADGES.map((badge, index) => (
              <span key={badge.id} className={`${styles.badge} ${getBadgeClass(index)}`}>
                {badge.text}
              </span>
            ))}
          </div>
        </div>
      </div>

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
