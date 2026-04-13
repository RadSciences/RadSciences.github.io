import { useTranslation } from 'react-i18next';

export const useLanguage = () => {
  const { t, i18n } = useTranslation();

  // 1. 중복 참조 제거 및 resolvedLanguage 사용
  // i18n.language 대신 i18n.resolvedLanguage를 쓰면 
  // 실제 로드된 언어를 가져오므로 훨씬 안정적입니다.
  const currentLang = i18n.resolvedLanguage || i18n.language;
  const isKo = currentLang === 'ko';

  // 2. 언어 변경 함수 (toggle)
  const toggleLanguage = () => {
    i18n.changeLanguage(isKo ? 'en' : 'ko');
  };

  // 3. 수동 언어 설정
  const setLanguage = (lang) => {
    if (currentLang !== lang) { // 현재 언어와 같으면 실행 안 함 (성능 최적화)
      i18n.changeLanguage(lang);
    }
  };

  return {
    t,
    isKo,
    currentLang,
    toggleLanguage,
    setLanguage
  };
};