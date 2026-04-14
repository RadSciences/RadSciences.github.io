import { useEffect, useRef } from 'react';

const SPEED = 0.008; 

export default function SmoothDnaVisual() {
  const canvasRef = useRef(null);
  const containerRef = useRef(null);
  const tRef = useRef(0);
  const rafRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    // 배경 투명도를 허용하기 위해 alpha: true 유지
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

    function draw() {
      const t = tRef.current;
      
      // --- 수정: 배경을 흰색으로 채우는 대신 매 프레임 투명하게 지우기 ---
      ctx.clearRect(0, 0, w, h);

      const cx = w / 2;
      const cy = h / 2;
      const hW = Math.min(w * 0.22, 75); 
      const hH = h * 0.8;
      const strands = 30; 

      ctx.save();
      ctx.translate(cx, cy);

      for (let i = 0; i < strands; i++) {
        const f = i / (strands - 1);
        const y = -hH / 2 + f * hH;
        
        const ang = f * Math.PI * 4 - t;
        const x1 = Math.cos(ang) * hW;
        const x2 = Math.cos(ang + Math.PI) * hW;
        const z1 = Math.sin(ang); 
        const z2 = Math.sin(ang + Math.PI);

        // 1. 가로 연결선 (다크 테마에 맞춰 선명도 조절)
        const lineAlpha = Math.max(0, (z1 + z2 + 2) / 4) * 0.25; 
        ctx.strokeStyle = `rgba(129, 140, 248, ${lineAlpha})`; // Indigo-400 계열
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(x1, y);
        ctx.lineTo(x2, y);
        ctx.stroke();

        // 2. 노드 렌더링
        const drawNode = (x, z, color1, color2) => {
          const size = 3 + z * 1.8;
          const alpha = 0.4 + (z + 1) * 0.3; 
          
          ctx.save();
          ctx.globalAlpha = alpha;
          
          // --- 다크 테마용 네온 효과: 살짝 강화 ---
          ctx.shadowBlur = 8; 
          ctx.shadowColor = color1;
          
          const grad = ctx.createRadialGradient(x, y, 0, x, y, size);
          grad.addColorStop(0, '#fff'); 
          grad.addColorStop(0.4, color1); 
          grad.addColorStop(1, color2); 
          
          ctx.fillStyle = grad;
          ctx.beginPath();
          ctx.arc(x, y, size, 0, Math.PI * 2);
          ctx.fill();
          ctx.restore();
        };

        // 노드 1 (Indigo) / 노드 2 (Cyan) - 다크 배경에서 잘 보이는 색상 유지
        drawNode(x1, z1, '#818cf8', '#4f46e5');
        drawNode(x2, z2, '#22d3ee', '#0891b2');
      }
      
      ctx.restore();

      tRef.current += SPEED;
      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  return (
    // 배경색 제거 (background: 'transparent')
    <div ref={containerRef} style={{ width: '100%', height: '100%', minHeight: '400px', background: 'transparent' }}>
      <canvas ref={canvasRef} style={{ display: 'block', width: '100%', height: '100%' }} />
    </div>
  );
}