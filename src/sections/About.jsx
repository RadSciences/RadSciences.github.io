import aboutPic from '../assets/images/main/aboutReal.png'
import { useLanguage } from '../hooks/useLanguage';
import styles from './About.module.css';

export default function About() {
  const { t } = useLanguage();

  // returnObjects: true 옵션이 i18n 설정에 따라 작동하지 않을 수 있으니 확인 필요
  const stats = t('company.stats', { returnObjects: true }) || [];


  return (
    <section id="about" className={styles.section}>
      <div className={styles.container}>
        <div className={styles.header}>
          <span className={styles.subtitle}>About us</span>
          <h2 className={styles.title}>Rad Science</h2>
        </div>

        <div className={styles.mainGrid}>
          <div className={styles.visualSide}>
            <div className={styles.imgContainer}>
              {/* <img className={styles.img} src='./aboutSimple.png'></img> */}
              <img className={styles.img} src={aboutPic} />
            </div>

            <div className={styles.statsContainer}>
              {Array.isArray(stats) && stats.map((stat, i) => (
                <div className={styles.statItem} key={i}>
                  <span className={styles.statValue}>{stat.value}</span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>

          <div className={styles.textSide}>
            <div className={styles.introduction}>
              <h3 className={styles.slogan}>{t('company.slogan')}</h3>
              <p className={styles.description}>{t('company.description')}</p>
              <p className={styles.detail}>{t('company.detail')}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}