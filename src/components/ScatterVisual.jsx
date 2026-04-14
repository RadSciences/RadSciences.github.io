import { useEffect, useRef } from 'react';

const ROTATION_STRENGTH = 0.0005; 
const CLUSTER_COLORS = ['#60A5FA', '#818CF8', '#3B82F6', '#93C5FD']; // 다크모드에 맞춰 채도 조절
const LABELS = ['Cluster α', 'Cluster β', 'Cluster γ', 'Cluster δ'];

const makeRng = (seed) => {
  let s = seed;
  return () => { s = (s * 1664525 + 1013904223) & 0xffffffff; return (s >>> 0) / 0xffffffff; };
};
const rng = makeRng(303);

const CLUSTERS = CLUSTER_COLORS.length;
const TOTAL_POINTS = 400;

const clusterConfigs = [
  { x: 0,   y: 80,  z: 0,   spreadX: 12, spreadY: 40, spreadZ: 12 },
  { x: 110, y: -70, z: 40,  spreadX: 45, spreadY: 15, spreadZ: 35 },
  { x: -100,y: 0,   z: -30, spreadX: 10, spreadY: 100,spreadZ: 10 },
  { x: 20,  y: 20,  z: -110,spreadX: 40, spreadY: 40, spreadZ: 40 }
];

const points3d = Array.from({ length: TOTAL_POINTS }, () => {
  const clusterIdx = Math.floor(rng() * CLUSTERS);
  const config = clusterConfigs[clusterIdx];
  const normRng = () => (rng() + rng() - 1); 
  return {
    x: config.x + normRng() * config.spreadX,
    y: config.y + normRng() * config.spreadY,
    z: config.z + normRng() * config.spreadZ,
    col: CLUSTER_COLORS[clusterIdx],
  };
});

export default function LargeScatterVisual() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const lastTimeRef = useRef(0);
  const angleRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    // --- 수정 1: alpha를 true로 설정하여 배경 투명 허용 ---
    const ctx = canvas.getContext('2d', { alpha: true });
    const dpr = window.devicePixelRatio || 1;

    let w, h;
    function resize() {
      if (!containerRef.current) return;
      w = containerRef.current.offsetWidth;
      h = containerRef.current.offsetHeight;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    }
    
    resize();
    window.addEventListener('resize', resize);

    function draw(currentTime) {
      if (!lastTimeRef.current) lastTimeRef.current = currentTime;
      const deltaTime = currentTime - lastTimeRef.current;
      lastTimeRef.current = currentTime;
      
      angleRef.current += deltaTime * ROTATION_STRENGTH;
      const angle = angleRef.current;

      // --- 수정 2: 흰색 배경 대신 clearRect로 매 프레임 투명하게 지움 ---
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      ctx.save();
      ctx.translate(cx, cy);

      const rotY = angle;
      const rotX = -0.4; 
      const cosY = Math.cos(rotY), sinY = Math.sin(rotY);
      const cosX = Math.cos(rotX), sinX = Math.sin(rotX);

      const viewScale = 1.2; // 420px 높이에 맞춰 배율 소폭 조정

      const project = (x, y, z) => {
        const tx = (x * cosY - z * sinY) * viewScale;
        const tz = x * sinY + z * cosY;
        const ty = (y * cosX - tz * sinX) * viewScale;
        const fZ = y * sinX + tz * cosX;
        return { tx, ty, fZ };
      };

      // 3. 그리드 선 색상 수정 (다크 모드에 맞춰 연하게)
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.05)';
      const gridRange = 160; 
      const step = 35;
      for (let y = -gridRange; y <= gridRange; y += step * 2.5) { 
        for (let i = -gridRange; i <= gridRange; i += step) {
          let p1 = project(-gridRange, y, i);
          let p2 = project(gridRange, y, i);
          ctx.beginPath(); ctx.moveTo(p1.tx, p1.ty); ctx.lineTo(p2.tx, p2.ty); ctx.stroke();
          p1 = project(i, y, -gridRange);
          p2 = project(i, y, gridRange);
          ctx.beginPath(); ctx.moveTo(p1.tx, p1.ty); ctx.lineTo(p2.tx, p2.ty); ctx.stroke();
        }
      }

      // 포인트 렌더링
      const sortedPoints = points3d.map(p => ({ ...p, ...project(p.x, p.y, p.z) }))
        .sort((a, b) => a.fZ - b.fZ);

      sortedPoints.forEach(p => {
        const d = (p.fZ + 300) / 600;
        ctx.globalAlpha = 0.2 + d * 0.8;
        ctx.fillStyle = p.col;
        ctx.beginPath();
        ctx.arc(p.tx, p.ty, 1.8, 0, Math.PI * 2); // 점 크기 시인성 확보
        ctx.fill();
      });

      // 라벨 렌더링 (다크 테마용 화이트 텍스트)
      clusterConfigs.forEach((c, i) => {
        const topY = c.y - c.spreadY - 20;
        const p = project(c.x, topY, c.z);
        ctx.globalAlpha = 0.6;
        ctx.fillStyle = '#CBD5E1'; // Light Blue-Grey
        ctx.font = '600 11px "Inter", sans-serif';
        ctx.textAlign = 'center';
        ctx.fillText(LABELS[i], p.tx, p.ty);
      });

      ctx.restore();
      rafRef.current = requestAnimationFrame(draw);
    }

    rafRef.current = requestAnimationFrame(draw);
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    // --- 수정 3: 높이를 CSS에 맞춘 420px 및 배경 투명화 ---
    <div ref={containerRef} style={{ width: '100%', height: '420px', background: 'transparent' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}