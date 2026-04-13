import logoWhite from '../assets/logos/logo_white.png';
import { useLanguage } from '../hooks/useLanguage';
import React, { useMemo } from 'react'; // useMemo 추가
import styles from './Header.module.css';

export default function Header({ setView }) {
  const { t, currentLang, setLanguage } = useLanguage();

  // 리렌더링 시 배열 재생성 방지 (언어 변경 시에만 재계산)
  const navItems = useMemo(() => [
    { name: t('header.about'), href: '#about' },
    { name: t('header.services'), href: '#services' },
    { name: t('header.projects'), href: '#projects' },
    { name: t('header.contact'), href: '#contact' },
  ], [t]);

  const handleNavClick = () => {
    setView('main');
  };

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        {/* 로고 영역 */}
        <div className={styles.logoArea} onClick={handleNavClick}>
          <a href="#home">
            <img src={logoWhite} alt="Red Science Logo" className={styles.logoImage} />
          </a>
        </div>

        {/* 메뉴 영역 */}
        <ul className={styles.navList}>
          {navItems.map((item) => (
            <li key={item.name}>
              <a 
                href={item.href} 
                onClick={handleNavClick} 
                className={styles.navLink}
              >
                {item.name}
              </a>
            </li>
          ))}

          {/* 알약형 언어 스위치 */}
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
    </header>
  );
}