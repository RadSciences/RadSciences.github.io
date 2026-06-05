export const ease = [0.16, 1, 0.3, 1];

export const fadeUp = {
  hidden: { opacity: 0, y: 60 },
  show: { opacity: 1, y: 0, transition: { duration: 0.85, ease } },
};

// 섹션 헤더 전용: 자식에게 stagger 전파
export const headerContainer = {
  hidden: { opacity: 0, y: 40 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease, staggerChildren: 0.12 },
  },
};

// overflow:hidden 래퍼 안 h2의 아래-위 reveal
export const titleReveal = {
  hidden: { y: '110%' },
  show: { y: '0%', transition: { duration: 0.8, ease } },
};

export const fadeIn = {
  hidden: { opacity: 0 },
  show: { opacity: 1, transition: { duration: 0.8, ease } },
};

export const slideLeft = {
  hidden: { opacity: 0, x: -70 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease } },
};

export const slideRight = {
  hidden: { opacity: 0, x: 70 },
  show: { opacity: 1, x: 0, transition: { duration: 0.9, ease } },
};

export const scaleIn = {
  hidden: { opacity: 0, scale: 0.92 },
  show: { opacity: 1, scale: 1, transition: { duration: 0.9, ease } },
};

export const stagger = (delay = 0.12) => ({
  hidden: {},
  show: { transition: { staggerChildren: delay, delayChildren: 0 } },
});

export const viewportOpts = { once: false, margin: '-80px' };
