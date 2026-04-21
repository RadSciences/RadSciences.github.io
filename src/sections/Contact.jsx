import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { motion, useInView, animate } from 'framer-motion';
import emailjs from '@emailjs/browser';
import styles from './Contact.module.css';

const EMAILJS_PUBLIC_KEY = 'jNX9WemJdiGCJieCc';
const EMAILJS_SERVICE_ID = 'service_ulbc9zl';
const EMAILJS_TEMPLATE_ID = 'template_c48is6f';

export default function Contact() {
  const { t, currentLang } = useLanguage();
  const isKo = currentLang === 'ko';

  // 1. 숫자를 저장할 상태값들
  const [accuracy, setAccuracy] = useState(0);
  const [response, setResponse] = useState(0);

  // 2. 화면에 보이는지 감지 (ref를 section에 연결)
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  useEffect(() => {
    if (isInView) {
      // Accuracy 카운트업 (0 -> 99)
      animate(0, 99, {
        duration: 2.5,         // 시간을 약간 늘려 여유를 줌
        ease: [0.16, 1, 0.3, 1], // Custom Ease: 초반에 빠르고 끝에서 아주 부드럽게 (Power4 easeOut)
        onUpdate: (latest) => setAccuracy(Math.round(latest)),
      });

      // Response 카운트업 (0 -> 24)
      animate(0, 24, {
        duration: 1.8,         // 타겟 숫자가 작으므로 조금 더 빠르게 완료
        ease: [0.16, 1, 0.3, 1],
        onUpdate: (latest) => setResponse(Math.round(latest)),
      });
    }
  }, [isInView]);

  const [formData, setFormData] = useState({ name: '', email: '', message: '' });
  const [isSending, setIsSending] = useState(false);

  const handleChange = (field) => (e) =>
    setFormData((prev) => ({ ...prev, [field]: e.target.value }));

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSending(true);

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          receiver_email: 'contact@radscience.kr',
          email_subject: `[NEW INQUIRY] ${formData.name}님으로부터`,
          from_name: formData.name,
          from_email: formData.email,
          user_message: formData.message,
        },
        EMAILJS_PUBLIC_KEY
      );

      alert(isKo ? '문의가 성공적으로 접수되었습니다.' : 'Inquiry submitted successfully.');
      setFormData({ name: '', email: '', message: '' });
    } catch (error) {
      console.error('전송 오류:', error);
      alert(isKo ? '전송 중 오류가 발생했습니다.' : 'An error occurred during submission.');
    } finally {
      setIsSending(false);
    }
  };



  return (
    <section id="contact" className={styles.section} ref={ref}>
      <div className={styles.container}>
        <div className={styles.infoArea}>
          <div className={styles.subtitle}>CONTACT US</div>
          <h2 className={styles.title}>
            Let's decode <br />
            <span className={styles.highlight}>your data together.</span>
          </h2>
          <p className={styles.description}>{t('contact.description')}</p>

          <div className={styles.stats}>
            <div className={styles.statItem}>
              <span className={styles.statNum}>{accuracy} %</span>
              <span className={styles.statLabel}>Accuracy</span>
            </div>

            <div className={styles.statItem}>
              <span className={styles.statNum}>{response} h</span>
              <span className={styles.statLabel}>Response</span>
            </div>
          </div>

          <div className={styles.contactDetails}>
            <div className={styles.detailLink}>
              <small>Email Inquiry</small>
              <p>              
                contact@radscience.kr
              </p>
            </div>
            <div className={styles.detailLink}>
              <small>Office</small>
              <p>SEOUL, KOREA</p>
            </div>
          </div>
        </div>

        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.inputGroup}>
            <input
              type="text"
              placeholder={isKo ? '성함' : 'Full Name'}
              value={formData.name}
              required
              onChange={handleChange('name')}
            />
          </div>
          <div className={styles.inputGroup}>
            <input
              type="email"
              placeholder={isKo ? '이메일 주소' : 'Email Address'}
              value={formData.email}
              required
              onChange={handleChange('email')}
            />
          </div>
          <div className={styles.inputGroup}>
            <textarea
              placeholder={isKo ? '프로젝트에 대해 알려주세요' : 'Tell us about your project'}
              rows="5"
              value={formData.message}
              required
              onChange={handleChange('message')}
            />
          </div>
          <button type="submit" className={styles.contactButton} disabled={isSending}>
            {isSending
              ? (isKo ? '전송 중...' : 'Sending...')
              : (isKo ? '메시지 보내기' : 'Send Message')}
          </button>
        </form>
      </div>
    </section>
  );
}