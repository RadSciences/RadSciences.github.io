import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import ScatterVisual from '../components/ScatterVisual';
import DnaVisual from '../components/DnaVisual';
import styles from './Hero.module.css';

const ease = [0.16, 1, 0.3, 1];

const heroItem = (delay = 0) => ({
  hidden: { opacity: 0, y: 40 },
  show: { opacity: 1, y: 0, transition: { duration: 0.9, delay, ease } },
});

const BADGES = [
  { id: 1, text: 'Research Software Development' },
  { id: 2, text: 'Topological Data Analysis' },
  { id: 3, text: 'Deep Learning w/ Biomedical Data' },
  // { id: 4, text: 'Predictive Insights' },
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
      <motion.div
        className={styles.headerSection}
        initial="hidden"
        animate="show"
      >
        <motion.span className={styles.title} variants={heroItem(0)}>
          Full-Scope Biomedical Research Partner
        </motion.span>

        <div style={{ overflow: 'hidden' }}>
          <motion.h2
            className={styles.copy}
            variants={heroItem(0.1)}
          >
            {t('highlight.title')}
          </motion.h2>
        </div>

        <motion.div className={styles.badgeStage} variants={heroItem(0.25)}>
          <div className={styles.badgeWrapper}>
            {BADGES.map((badge, index) => (
              <span key={badge.id} className={`${styles.badge} ${getBadgeClass(index)}`}>
                {badge.text}
              </span>
            ))}
          </div>
        </motion.div>
      </motion.div>

      <motion.div
        className={styles.visualContainer}
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1.1, delay: 0.4, ease }}
      >
        <div className={`${styles.visualCard} ${styles.dnaWrapper}`}>
          <DnaVisual />
        </div>
        <div className={`${styles.visualCard} ${styles.graphWrapper}`}>
          <ScatterVisual />
        </div>
      </motion.div>
    </section>
  );
}
