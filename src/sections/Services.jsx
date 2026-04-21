import { useLanguage } from '../hooks/useLanguage';
import { motion } from 'framer-motion';
import styles from './Services.module.css';

const iconStroke = {
  fill: 'none',
  stroke: 'currentColor',
  strokeWidth: 1.8,
  strokeLinecap: 'round',
  strokeLinejoin: 'round',
};

function renderElement(el, i) {
  const isLine = ['line', 'polyline', 'path', 'ellipse'].includes(el.type);
  const strokeProps = el.filled ? {} : iconStroke;
  const fillVal = el.filled ? 'currentColor' : 'none';

  switch (el.type) {
    case 'circle':
      return <circle key={i} cx={el.cx} cy={el.cy} r={el.r} {...strokeProps} fill={fillVal} />;
    case 'ellipse':
      return <ellipse key={i} cx={el.cx} cy={el.cy} rx={el.rx} ry={el.ry} {...iconStroke} fill="none" />;
    case 'line':
      return <line key={i} x1={el.x1} y1={el.y1} x2={el.x2} y2={el.y2} {...iconStroke} strokeDasharray={el.strokeDasharray || undefined} />;
    case 'polyline':
      return <polyline key={i} points={el.points} {...iconStroke} fill="none" />;
    case 'path':
      return <path key={i} d={el.d} {...iconStroke} fill="none" />;
    case 'rect':
      return <rect key={i} x={el.x} y={el.y} width={el.width} height={el.height} rx={el.rx} {...iconStroke} fill="none" />;
    default:
      return null;
  }
}

function ServiceIcon({ icon }) {
  if (!icon) return null;
  return (
    <svg viewBox={icon.viewBox} className={styles.icon} aria-hidden="true">
      {icon.elements.map((el, i) => renderElement(el, i))}
    </svg>
  );
}

const containerVariants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08 } },
};

const cardVariants = {
  hidden: { opacity: 0, y: 24 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } },
};

export default function Services() {
  const { t } = useLanguage();
  const features = t('company.features', { returnObjects: true }) || [];

  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>

        <div className={styles.header}>
          <span className={styles.subtitle}>What we do</span>
          <h2 className={styles.title}>Our Services</h2>
        </div>

        <motion.div
          className={styles.grid}
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, margin: '-80px' }}
        >
          {Array.isArray(features) && features.map((feature, i) => (
            <motion.div
              key={i}
              className={styles.card}
              variants={cardVariants}
              whileHover={{ y: -6, transition: { duration: 0.2 } }}
            >
              <div className={styles.iconWrap}>
                <ServiceIcon icon={feature.icon} />
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTitle}>{feature.title}</div>
                <p className={styles.cardDesc}>{feature.desc}</p>
              </div>
            </motion.div>
          ))}
        </motion.div>

      </div>
    </section>
  );
}
