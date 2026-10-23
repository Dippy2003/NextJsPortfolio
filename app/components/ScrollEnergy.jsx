'use client';

import { useEffect, useRef } from 'react';
import { usePreferences } from './Preferences';

const clamp = (value, min, max) => Math.max(min, Math.min(max, value));
const point = (phase, width, height) => ({
  x: width * (0.5 + 0.46 * Math.sin(phase * Math.PI * 2 * 1.1)),
  y: height * (0.5 + 0.4 * Math.cos(phase * Math.PI * 2 * 1.7)),
});

export default function ScrollEnergy() {
  const canvas = useRef(null);
  const { motionEnabled, theme } = usePreferences();

  useEffect(() => {
    if (!motionEnabled) return;
    const element = canvas.current;
    const context = element?.getContext('2d');
    if (!context) return;
    let width = 0;
    let height = 0;
    let documentTravel = 1;
    let target = 0;
    let position = 0;
    let previousScroll = window.scrollY;
    let energy = 0;
    let frame = 0;
    let lastTime = 0;
    const rgb = theme === 'light' ? '151, 99, 34' : '230, 184, 108';
    const teal = theme === 'light' ? '43, 111, 105' : '111, 194, 177';

    const draw = (now) => {
      frame = 0;
      const delta = Math.min((now - (lastTime || now - 16)) / 1000, 0.05);
      lastTime = now;
      position += (target - position) * (1 - Math.exp(-delta * 9));
      energy *= Math.exp(-delta * 3.4);
      context.clearRect(0, 0, width, height);
      if (document.hidden) return;
      const phase = 0.12 + position * 2.8;
      const points = Array.from({ length: 48 }, (_, index) =>
        point(phase - (1 - index / 47) * 0.16, width, height),
      );
      const head = points[47];
      const tail = points[0];
      const glow = context.createLinearGradient(tail.x, tail.y, head.x, head.y);
      glow.addColorStop(0, `rgba(${rgb}, 0)`);
      glow.addColorStop(0.65, `rgba(${rgb}, ${energy * 0.35})`);
      glow.addColorStop(1, `rgba(${rgb}, ${energy * 0.85})`);
      context.lineCap = 'round';
      context.lineJoin = 'round';
      context.beginPath();
      points.forEach((p, index) => (index ? context.lineTo(p.x, p.y) : context.moveTo(p.x, p.y)));
      context.strokeStyle = glow;
      context.shadowColor = `rgba(${rgb}, ${energy * 0.75})`;
      context.shadowBlur = 24;
      context.lineWidth = width < 600 ? 2 : 3;
      context.stroke();
      context.shadowBlur = 0;
      context.lineWidth = 0.8;
      context.strokeStyle = `rgba(${rgb}, ${energy * 0.4})`;
      context.stroke();
      const halo = context.createRadialGradient(head.x, head.y, 0, head.x, head.y, 100);
      halo.addColorStop(0, `rgba(${teal}, ${energy * 0.14})`);
      halo.addColorStop(1, `rgba(${teal}, 0)`);
      context.fillStyle = halo;
      context.fillRect(head.x - 100, head.y - 100, 200, 200);
      for (let index = 0; index < 7; index++) {
        const p = point(phase - index * 0.016, width, height);
        context.beginPath();
        context.arc(
          p.x + Math.sin(index * 3) * 10,
          p.y + Math.cos(index * 2) * 9,
          index === 0 ? 2 : 1,
          0,
          Math.PI * 2,
        );
        context.fillStyle = `rgba(${index % 2 ? teal : rgb}, ${energy * (1 - index / 8) * 0.8})`;
        context.fill();
      }
      if (energy > 0.008 || Math.abs(target - position) > 0.0001)
        frame = requestAnimationFrame(draw);
      else {
        context.clearRect(0, 0, width, height);
        lastTime = 0;
      }
    };
    const schedule = () => {
      if (!frame && !document.hidden) frame = requestAnimationFrame(draw);
    };
    const resize = () => {
      width = window.innerWidth;
      height = window.innerHeight;
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      element.width = Math.round(width * dpr);
      element.height = Math.round(height * dpr);
      context.setTransform(dpr, 0, 0, dpr, 0, 0);
      documentTravel = Math.max(1, document.documentElement.scrollHeight - height);
      target = clamp(window.scrollY / documentTravel, 0, 1);
      position = target;
    };
    const scroll = () => {
      const y = window.scrollY;
      target = clamp(y / documentTravel, 0, 1);
      energy = clamp(energy + Math.abs(y - previousScroll) / 400, 0, 1);
      previousScroll = y;
      schedule();
    };
    const visibility = () => {
      if (document.hidden) {
        cancelAnimationFrame(frame);
        frame = 0;
        lastTime = 0;
      } else if (energy > 0.008) schedule();
    };
    resize();
    const observer = new ResizeObserver(resize);
    observer.observe(document.body);
    window.addEventListener('resize', resize);
    window.addEventListener('scroll', scroll, { passive: true });
    document.addEventListener('visibilitychange', visibility);
    return () => {
      cancelAnimationFrame(frame);
      observer.disconnect();
      window.removeEventListener('resize', resize);
      window.removeEventListener('scroll', scroll);
      document.removeEventListener('visibilitychange', visibility);
      context.clearRect(0, 0, width, height);
    };
  }, [motionEnabled, theme]);

  return <canvas ref={canvas} className="scroll-energy" aria-hidden="true" />;
}
