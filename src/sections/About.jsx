import aboutPic from '../assets/images/main/aboutReal.png';
import { motion } from 'framer-motion';
import { useLanguage } from '../hooks/useLanguage';
import { fadeUp, headerContainer, titleReveal, slideLeft, slideRight, stagger, viewportOpts } from '../utils/motion';
import styles from './About.module.css';

export default function About() {
  const { t } = useLanguage();

  // returnObjects: true 옵션이 i18n 설정에 따라 작동하지 않을 수 있으니 확인 필요
  const stats = t('company.stats', { returnObjects: true }) || [];


  const statStagger = stagger(0.1);

  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOpts}
        >
          <span className="section-subtitle">{t('sections.about.subtitle')}</span>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2 className="section-title" variants={titleReveal}>
              {t('sections.about.title')}
            </motion.h2>
          </div>
        </motion.div>

        <div className={styles.mainGrid}>
          <motion.div
            className={styles.visualSide}
            variants={slideLeft}
            initial="hidden"
            whileInView="show"
            viewport={viewportOpts}
          >
            <div className={styles.imgContainer}>
              <img className={styles.img} src={aboutPic} />
            </div>

            <motion.div
              className={styles.statsContainer}
              variants={statStagger}
              initial="hidden"
              whileInView="show"
              viewport={viewportOpts}
            >
              {Array.isArray(stats) && stats.map((stat, i) => (
                <motion.div className={styles.statItem} key={i} variants={fadeUp}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>

          <motion.div
            className={styles.textSide}
            variants={slideRight}
            initial="hidden"
            whileInView="show"
            viewport={viewportOpts}
          >
            <div className={styles.introduction}>
              <h3 className={styles.slogan}>{t('company.slogan')}</h3>
              <p className={styles.description}>{t('company.description')}</p>
              <p className={styles.detail}>{t('company.detail')}</p>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}