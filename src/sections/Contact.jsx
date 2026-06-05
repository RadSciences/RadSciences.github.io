import { useEffect, useState, useRef } from 'react';
import { useLanguage } from '../hooks/useLanguage';
import { motion, useInView, animate } from 'framer-motion';
import emailjs from '@emailjs/browser';
import { slideLeft, slideRight, headerContainer, titleReveal, viewportOpts } from '../utils/motion';
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
    if (!isInView) return;

    let stopped = false;

    const runCycle = () => {
      if (stopped) return;

      // 리셋
      setAccuracy(0);
      setResponse(0);

      // 약간 딜레이 후 카운트업 시작
      const delay = setTimeout(() => {
        if (stopped) return;

        animate(0, 100, {
          duration: 2.5,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (latest) => setAccuracy(Math.round(latest)),
        });

        animate(0, 24, {
          duration: 1.8,
          ease: [0.16, 1, 0.3, 1],
          onUpdate: (latest) => setResponse(Math.round(latest)),
          onComplete: () => {
            // 가장 긴 애니메이션(2.5s)이 끝나고 잠시 대기 후 재시작
            const pause = setTimeout(runCycle, 2000); // 1.5초 유지 후 반복
            return () => clearTimeout(pause);
          },
        });
      }, 200); // 리셋 후 0.2초 대기

      return () => clearTimeout(delay);
    };

    runCycle();

    return () => {
      stopped = true;
    };
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
        <motion.div
          className={styles.infoArea}
          variants={slideLeft}
          initial="hidden"
          whileInView="show"
          viewport={viewportOpts}
        >
          <motion.div
            className={styles.sectionHeader}
            variants={headerContainer}
          >
            <span className="section-subtitle">{t('sections.contact.subtitle')}</span>
            <div style={{ overflow: 'hidden' }}>
              <motion.h2 className="section-title" variants={titleReveal}>
                {t('sections.contact.titleLine1')} <br />
                <span className={styles.highlight}>{t('sections.contact.titleLine2')}</span>
              </motion.h2>
            </div>
          </motion.div>

          <p className={styles.description}>{t('contact.description')}</p>

          <div className={styles.statItem}>
            <span className={styles.statNum}>
              <span className={styles.statDigit}>{accuracy}</span> %
            </span>
            <span className={styles.statLabel}>Delivery Success Rate</span>
          </div>

          <div className={styles.statItem}>
            <span className={styles.statNum}>
              <span className={styles.statDigit}>{response}</span> h
            </span>
            <span className={styles.statLabel}>Response</span>
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
        </motion.div>

        <motion.form
          className={styles.form}
          onSubmit={handleSubmit}
          variants={slideRight}
          initial="hidden"
          whileInView="show"
          viewport={viewportOpts}
        >
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
        </motion.form>
      </div>
    </section>
  );
}