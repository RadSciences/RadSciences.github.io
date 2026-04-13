import styles from './Services.module.css';

export default function Services() {
  const serviceList = ["Web Development", "UI/UX Design", "Cloud Solutions", "Consulting"];
  
  return (
    <section id="services" className={styles.section}>
      <div className={styles.container}>
        <h2 className={styles.title}>Our Services</h2>
        
        <div className={styles.grid}>
          {serviceList.map((item) => (
            <div key={item} className={styles.card}>
              <div className={styles.iconPlaceholder}></div>
              <h3 className={styles.cardTitle}>{item}</h3>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}