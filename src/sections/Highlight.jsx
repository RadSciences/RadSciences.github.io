import React from 'react';
import styles from './Highlight.module.css';

export default function Highlight() {
  return (
    <section id="home" className={styles.section}>
      <h1 className={styles.title}>Innovative Future</h1>
      <p className={styles.description}>우리는 해낼겁니다. 그러니 걱정말아요.</p>
    </section>
  );
}