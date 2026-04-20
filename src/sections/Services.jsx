import { useLanguage } from '../hooks/useLanguage';
import { motion } from 'framer-motion';
import styles from './Services.module.css';

export default function Services() {
  const { t } = useLanguage();
  const features = t('company.features', { returnObjects: true }) || [];

  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Our Services</h2>

        {/* 슬라이드 컨테이너: 드래그 기능을 위해 motion.div 활용 */}
        <motion.div 
          className={styles.sliderWrapper}
          drag="x"
          dragConstraints={{ right: 0, left: -((features.length - 3) * 400) }} // 데이터 개수에 따라 제한 범위 자동 계산
        >
          <div className={styles.grid}>
            {Array.isArray(features) && features.map((feature, i) => (
              <motion.div 
                className={styles.featureItem} 
                key={i}
                whileHover={{ y: -10 }} // 살짝 떠오르는 효과
              >
                <div className={styles.featureNumber}>0{i + 1}</div>
                <div className={styles.featureText}>
                  <h4 className={styles.featureTitle}>{feature.title}</h4>
                  <p className={styles.featureDesc}>{feature.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </motion.div>
        
        {/* 안내 문구 (데이터가 많을 때만 표시하면 좋음) */}
        {features.length > 3 && (
          <p className={styles.scrollHint}>← Drag to Explore →</p>
        )}
      </div>
    </section>
  );
}