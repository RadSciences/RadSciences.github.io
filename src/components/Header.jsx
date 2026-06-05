import logo from '../assets/images/logo/logo_only.png';
import { useLanguage } from '../hooks/useLanguage';
import { useMemo, useState, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion'; // eslint-disable-line no-unused-vars
import { RiMenu3Line, RiCloseLine } from 'react-icons/ri';
import styles from './Header.module.css';

export default function Header() {
  const { t, currentLang, setLanguage } = useLanguage();
  const navigate = useNavigate();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  const navItems = useMemo(() => [
    { name: t('header.about'), href: '#about' },
    { name: t('header.services'), href: '#services' },
    { name: t('header.projects'), href: '#projects' },
    { name: t('header.contact'), href: '#contact' },
  ], [t]);

  // 스크롤 시 헤더 배경 불투명하게 + 메뉴 닫기
  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 10);
      setMenuOpen(false);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // 메뉴 열릴 때 스크롤 잠금
  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [menuOpen]);

  const handleNavClick = useCallback((e, href) => {
    e.preventDefault();
    setMenuOpen(false);
    if (location.pathname === '/') {
      const el = document.querySelector(href);
      el?.scrollIntoView({ behavior: 'smooth' });
    } else {
      navigate('/');
      setTimeout(() => {
        const el = document.querySelector(href);
        el?.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    }
  }, [location.pathname, navigate]);

  const handleLogoClick = useCallback(() => {
    setMenuOpen(false);
    if (location.pathname === '/') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    } else {
      navigate('/');
    }
  }, [location.pathname, navigate]);

  return (
    <motion.header
      className={`${styles.header} ${scrolled ? styles.scrolled : ''}`}
      initial={{ y: -84 }}
      animate={{ y: 0 }}
      transition={{ type: 'tween', duration: 0.35, ease: 'easeOut' }}
    >
      <nav className={styles.nav}>
        {/* 로고 영역 */}
        <div className={styles.logoArea} onClick={handleLogoClick}>
          <div className={styles.imgContainer}>
            <img src={logo} alt="Rad Science Logo" className={styles.logoImage} />
          </div>
          <span className={styles.name}><em>Rad</em> Science</span>
        </div>

        {/* 데스크톱 메뉴 */}
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
          <li>
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

        {/* 모바일 우측: 언어 스위치 + 햄버거 */}
        <div className={styles.mobileRight}>
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
          <button
            className={styles.hamburger}
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? '메뉴 닫기' : '메뉴 열기'}
            aria-expanded={menuOpen}
          >
            {menuOpen
              ? <RiCloseLine size={24} color="#e2e8f0" />
              : <RiMenu3Line size={24} color="#e2e8f0" />
            }
          </button>
        </div>
      </nav>

      {/* 모바일 드롭다운 메뉴 */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.2 }}
          >
            {navItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                onClick={(e) => handleNavClick(e, item.href)}
                className={styles.mobileNavLink}
              >
                {item.name}
              </a>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
