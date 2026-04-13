import React from 'react';
import styles from './Highlight.module.css';

export default function Highlight() {
  return (
    <section id="home" className={styles.section}>
      <h1 className={styles.title}>Innovative Future</h1>
      <p className={styles.description}>우리는 기술ss로 세상을 변화시킵니다.</p>
    </section>
  );
}