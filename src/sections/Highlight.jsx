import React, { useState, useEffect } from 'react';
import ScatterVisual from '../components/ScatterVisual';
import DnaVisual from '../components/DnaVisual';
import styles from './Highlight.module.css';

export default function Highlight() {
  const badges = [
    { id: 1, text: "Precision Analytics" },
    { id: 2, text: "Scalable Architecture" },
    { id: 3, text: "Pattern Recognition" },
    { id: 4, text: "Predictive Insights" }
  ];

  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % badges.length);
    }, 3000);
    return () => clearInterval(timer);
  }, [badges.length]);

  return (
    <section className={styles.section}>
      <div className={styles.headerSection}>
        <span className={styles.title}>INTELLIGENT BIO-DATA ENGINE</span>
        <h2 className={styles.copy}>
          데이터 속 숨겨진 <br />
          패턴을 시각화합니다.
        </h2>

        {/* 🪄 요즘 트렌드: 배지 슬라이더 */}
        <div className={styles.badgeStage}>
          <div className={styles.badgeWrapper}>
            {badges.map((badge, index) => (
              <span
                key={badge.id}
                className={`${styles.badge} ${
                  index === currentIndex ? styles.active : 
                  index === (currentIndex - 1 + badges.length) % badges.length ? styles.exit : styles.hidden
                }`}
              >
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