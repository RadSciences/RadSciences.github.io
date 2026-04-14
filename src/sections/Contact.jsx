import { useState } from 'react';
import styles from './Contact.module.css';

export default function Contact() {
  const [formData, setFormData] = useState({ name: '', email: '', message: '' });

  const handleSubmit = (e) => {
    e.preventDefault();
    alert("문의가 접수되었습니다.");
  };

  return (
    <section id="contact" className={styles.section}>
      <div className={styles.container}>
        {/* 좌측: 트렌디한 정보 레이아웃 */}
        <div className={styles.infoArea}>
          <div className={styles.tag}>CONTACT US</div>
          <h2 className={styles.title}>
            Let’s decode <br /> 
            <span className={styles.highlight}>your data together.</span>
          </h2>
          <p className={styles.description}>
            우리는 복잡한 생물학적 난제를 정밀한 데이터 사이언스로 해결합니다. 
            분석 파트너십부터 기술 도입까지, 당신의 프로젝트를 확장하세요.
          </p>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNum}>99%</span>
              <span className={styles.statLabel}>Accuracy</span>
            </div>
            <div className={styles.statItem}>
              <span className={styles.statNum}>24h</span>
              <span className={styles.statLabel}>Response</span>
            </div>
          </div>

          <div className={styles.contactDetails}>
            <div className={styles.detailLink}>
              <small>Email Inquiry</small>
              <p>info@redscience.ai</p>
            </div>
            <div className={styles.detailLink}>
              <small>Office</small>
              <p>Seoul, Tech Valley, KR</p>
            </div>
          </div>
        </div>

        {/* 우측: 폼 영역 (기존 유지) */}
        <form className={styles.form} onSubmit={handleSubmit}>
          {/* ... 기존 Input 그룹들 ... */}
          <div className={styles.inputGroup}>
            <input type="text" placeholder="Full Name" required onChange={(e) => setFormData({...formData, name: e.target.value})} />
          </div>
          <div className={styles.inputGroup}>
            <input type="email" placeholder="Email Address" required onChange={(e) => setFormData({...formData, email: e.target.value})} />
          </div>
          <div className={styles.inputGroup}>
            <textarea placeholder="Tell us about your project" rows="5" required onChange={(e) => setFormData({...formData, message: e.target.value})} />
          </div>
          <button type="submit" className={styles.contactButton}>
            Send Message
          </button>
        </form>
      </div>
    </section>
  );
}