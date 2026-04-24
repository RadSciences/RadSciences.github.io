import logo from '../assets/logos/logo_only.png';
import { useLanguage } from '../hooks/useLanguage';
import { useMemo } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import styles from './Header.module.css';

export default function Header() {
  const { t, currentLang, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();

  const navItems = useMemo(() => [
    { name: t('header.about'),    href: '#about' },
    { name: t('header.services'), href: '#services' },
    { name: t('header.projects'), href: '#projects' },
    { name: t('header.contact'),  href: '#contact' },
  ], [t]);

  // 메인 페이지면 anchor 스크롤, 상세 페이지면 메인으로 이동 후 스크롤
  const handleNavClick = (e, href) => {
    e.preventDefault();
    if (location.pathname === '/') {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      // 이동 후 DOM 렌더 기다렸다가 스크롤
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  };

  const handleLogoClick = () => {
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  };

  return (
    <motion.header
      className={styles.header}
      initial={{ y: -70, opacity: 1 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: 'spring', stiffness: 60, damping: 10 }}
    >
      <nav className={styles.nav}>
        {/* 로고 영역 */}
        <div className={styles.logoArea} onClick={handleLogoClick}>
          <img src={logo} alt="Red Science Logo" className={styles.logoImage} />
          <span className={styles.name}>Rad Science</span>
        </div>

        {/* 메뉴 영역 */}
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.name}>
              <a
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={styles.navLink}
              >
                {item.name}
              </a>
            </li>
          ))}

          {/* 언어 스위치 */}
          <li className={styles.langSwitchWrapper}>
            <div className={styles.pillContainer}>
              {['ko', 'en'].map((lang) => (
                <button
                  key={lang}
                  onClick={() => setLanguage(lang)}
                  className={`${styles.pillButton} ${currentLang === lang ? styles.active : ''}`}
                  aria-pressed={currentLang === lang}
                >
                  {lang.toUpperCase()}
                </button>
              ))}
            </div>
          </li>
        </ul>
      </nav>
    </motion.header>
  );
}
