import React, { useEffect, useRef } from 'react';

interface ConfettiProps {
  active: boolean;
}

class Particle {
  x: number = 0;
  y: number = 0;
  size: number = 0;
  color: string = '#fed130';
  speedY: number = 0;
  speedX: number = 0;
  rotation: number = 0;
  rotSpeed: number = 0;
  type: 'rect' | 'circle' | 'star' = 'rect';
  width: number;
  height: number;

  constructor(width: number, height: number, burst: boolean = false) {
    this.width = width;
    this.height = height;
    this.reset(burst);
  }

  reset(burst: boolean = false) {
    const colors = ['#fed130', '#ea2825', '#1b5ca8', '#4aa3df', '#99cf33', '#f46e1d', '#ea5d98', '#9b59b6'];
    this.color = colors[Math.floor(Math.random() * colors.length)];
    this.size = Math.random() * 8 + 6;
    this.rotation = Math.random() * 360;
    this.rotSpeed = (Math.random() - 0.5) * 7;
    const shapeRoll = Math.random();
    this.type = shapeRoll > 0.6 ? 'star' : shapeRoll > 0.3 ? 'rect' : 'circle';

    if (burst) {
      this.x = this.width / 2 + (Math.random() - 0.5) * 100;
      this.y = this.height * 0.45;
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 4;
      this.speedX = Math.cos(angle) * speed;
      this.speedY = Math.sin(angle) * speed - 5;
    } else {
      this.x = Math.random() * this.width;
      this.y = Math.random() * -this.height * 0.4;
      this.speedY = Math.random() * 3.5 + 2;
      this.speedX = (Math.random() - 0.5) * 2.8;
    }
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.speedY += 0.08; // gravity
    this.speedX *= 0.99; // drag
    this.rotation += this.rotSpeed;

    if (this.y > this.height + 20) {
      this.reset(false);
    }
  }

  draw(ctx: CanvasRenderingContext2D) {
    ctx.save();
    ctx.translate(this.x, this.y);
    ctx.rotate((this.rotation * Math.PI) / 180);
    ctx.fillStyle = this.color;

    if (this.type === 'rect') {
      ctx.fillRect(-this.size / 2, -this.size / 2, this.size, this.size * 0.7);
    } else if (this.type === 'circle') {
      ctx.beginPath();
      ctx.arc(0, 0, this.size / 2, 0, Math.PI * 2);
      ctx.fill();
    } else {
      // Small 5-point star
      ctx.beginPath();
      for (let i = 0; i < 5; i++) {
        ctx.lineTo(Math.cos(((18 + i * 72) * Math.PI) / 180) * (this.size * 0.6), -Math.sin(((18 + i * 72) * Math.PI) / 180) * (this.size * 0.6));
        ctx.lineTo(Math.cos(((54 + i * 72) * Math.PI) / 180) * (this.size * 0.3), -Math.sin(((54 + i * 72) * Math.PI) / 180) * (this.size * 0.3));
      }
      ctx.closePath();
      ctx.fill();
    }

    ctx.restore();
  }
}

export const ConfettiCanvas: React.FC<ConfettiProps> = ({ active }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    if (!active) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    let animId: number;
    let particles: Particle[] = [];

    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
      particles = Array.from({ length: 110 }, () => new Particle(canvas.width, canvas.height, true));
    };

    handleResize();
    window.addEventListener('resize', handleResize);

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      particles.forEach((p) => {
        p.update();
        p.draw(ctx);
      });
      animId = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener('resize', handleResize);
      if (ctx) {
        ctx.clearRect(0, 0, canvas.width, canvas.height);
      }
    };
  }, [active]);

  if (!active) return null;

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-50"
    />
  );
};
