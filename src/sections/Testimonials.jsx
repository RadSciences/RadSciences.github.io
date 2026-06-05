import { useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { motion, useInView } from 'framer-motion';
import { headerContainer, titleReveal, viewportOpts } from '../utils/motion';
import styles from './Testimonials.module.css';

const PLACEHOLDER = '/images/testimonials/placeholder.svg';

const handleImgError = (e) => {
  e.currentTarget.src = PLACEHOLDER;
};

export default function Testimonials() {
  const { t } = useLanguage();
  const items = t('testimonials.items', { returnObjects: true });
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: '-80px' });

  return (
    <section id="testimonials" className={styles.section}>
      <div className={styles.container}>
        <motion.div
          className={styles.sectionHeader}
          variants={headerContainer}
          initial="hidden"
          whileInView="show"
          viewport={viewportOpts}
        >
          <span className="section-subtitle">{t('testimonials.subtitle')}</span>
          <div style={{ overflow: 'hidden' }}>
            <motion.h2 className="section-title" variants={titleReveal}>
              {t('testimonials.sectionTitle')}
            </motion.h2>
          </div>
        </motion.div>

        <div className={styles.grid} ref={ref}>
          {Array.isArray(items) && items.map((item, i) => (
            <motion.div
              key={i}
              className={styles.card}
              initial={{ opacity: 0, y: 40 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.16, 1, 0.3, 1] }}
            >
              <span className={styles.quoteIcon}>&ldquo;</span>
              <p className={styles.quote}>{item.quote}</p>
              <div className={styles.author}>
                <img
                  src={item.photo || PLACEHOLDER}
                  alt={item.name}
                  className={styles.photo}
                  onError={handleImgError}
                />
                <div className={styles.authorInfo}>
                  <strong className={styles.authorName}>{item.name}</strong>
                  <span className={styles.authorMeta}>{item.title} &middot; {item.institution}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
