// components/SkillsRadar.tsx
"use client";
import React, { useEffect, useRef, useState } from 'react';

interface Skill {
  name: string;
  value: number;
  color: string;
}

interface SkillsRadarProps {
  skills?: Skill[];
  size?: number;
}

const SkillsRadar: React.FC<SkillsRadarProps> = ({ skills, size = 300 }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [hoveredSkill, setHoveredSkill] = useState<number | null>(null);
  const animationProgress = useRef<number>(0);
  const animationId = useRef<number | null>(null);

  const defaultSkills: Skill[] = [
    { name: 'RPA Development', value: 95, color: '#06b6d4' },
    { name: 'Python', value: 90, color: '#3b82f6' },
    { name: 'AI/ML', value: 85, color: '#8b5cf6' },
    { name: 'Process Automation', value: 92, color: '#10b981' },
    { name: 'Data Analysis', value: 80, color: '#f59e0b' },
    { name: 'Cloud Integration', value: 75, color: '#ef4444' },
    { name: 'API Development', value: 85, color: '#ec4899' },
    { name: 'Database Management', value: 78, color: '#14b8a6' }
  ];

  const skillsData: Skill[] = skills || defaultSkills;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const centerX = size / 2;
    const centerY = size / 2;
    const maxRadius = size * 0.35;

    // Animation
    const animate = (): void => {
      if (animationProgress.current < 1) {
        animationProgress.current += 0.02;
        drawRadar();
        animationId.current = requestAnimationFrame(animate);
      }
    };

    const drawRadar = (): void => {
      ctx.clearRect(0, 0, size, size);
      
      // Draw background circles
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.1)';
      ctx.lineWidth = 1;
      for (let i = 1; i <= 5; i++) {
        ctx.beginPath();
        ctx.arc(centerX, centerY, (maxRadius * i) / 5, 0, Math.PI * 2);
        ctx.stroke();
      }

      // Draw axes
      ctx.strokeStyle = 'rgba(255, 255, 255, 0.2)';
      ctx.lineWidth = 0.5;
      const angleStep = (Math.PI * 2) / skillsData.length;
      
      skillsData.forEach((_, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const x = centerX + Math.cos(angle) * maxRadius;
        const y = centerY + Math.sin(angle) * maxRadius;
        
        ctx.beginPath();
        ctx.moveTo(centerX, centerY);
        ctx.lineTo(x, y);
        ctx.stroke();
      });

      // Draw skill polygons
      ctx.lineWidth = 2;
      
      // Background polygon
      ctx.beginPath();
      ctx.strokeStyle = 'rgba(6, 182, 212, 0.3)';
      ctx.fillStyle = 'rgba(6, 182, 212, 0.1)';
      
      skillsData.forEach((skill, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const progress = animationProgress.current;
        const radius = (maxRadius * (skill.value / 100)) * progress;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        if (index === 0) {
          ctx.moveTo(x, y);
        } else {
          ctx.lineTo(x, y);
        }
      });
      
      ctx.closePath();
      ctx.fill();
      ctx.stroke();

      // Draw skill points and labels
      skillsData.forEach((skill, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const progress = animationProgress.current;
        const radius = (maxRadius * (skill.value / 100)) * progress;
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        // Draw point
        ctx.beginPath();
        ctx.fillStyle = skill.color;
        ctx.arc(x, y, hoveredSkill === index ? 6 : 4, 0, Math.PI * 2);
        ctx.fill();
        
        // Draw glow effect
        if (hoveredSkill === index) {
          ctx.beginPath();
          ctx.shadowColor = skill.color;
          ctx.shadowBlur = 20;
          ctx.arc(x, y, 8, 0, Math.PI * 2);
          ctx.fillStyle = `${skill.color}20`;
          ctx.fill();
          ctx.shadowBlur = 0;
        }

        // Draw labels
        const labelRadius = maxRadius + 20;
        const labelX = centerX + Math.cos(angle) * labelRadius;
        const labelY = centerY + Math.sin(angle) * labelRadius;
        
        ctx.fillStyle = hoveredSkill === index ? skill.color : 'rgba(255, 255, 255, 0.8)';
        ctx.font = hoveredSkill === index ? 'bold 12px Inter' : '11px Inter';
        ctx.textAlign = labelX > centerX ? 'left' : 'right';
        ctx.textBaseline = 'middle';
        ctx.fillText(skill.name, labelX, labelY);
        
        // Draw value
        if (hoveredSkill === index) {
          ctx.fillStyle = skill.color;
          ctx.font = 'bold 10px Inter';
          ctx.textAlign = 'center';
          ctx.fillText(`${skill.value}%`, labelX, labelY + 15);
        }
      });
    };

    // Mouse interaction
    const handleMouseMove = (e: MouseEvent): void => {
      const rect = canvas.getBoundingClientRect();
      const mouseX = e.clientX - rect.left;
      const mouseY = e.clientY - rect.top;
      
      const angleStep = (Math.PI * 2) / skillsData.length;
      let closestSkill: number | null = null;
      let minDistance = Infinity;
      
      skillsData.forEach((skill, index) => {
        const angle = index * angleStep - Math.PI / 2;
        const radius = (maxRadius * (skill.value / 100));
        const x = centerX + Math.cos(angle) * radius;
        const y = centerY + Math.sin(angle) * radius;
        
        const distance = Math.sqrt((mouseX - x) ** 2 + (mouseY - y) ** 2);
        if (distance < 20 && distance < minDistance) {
          minDistance = distance;
          closestSkill = index;
        }
      });
      
      if (closestSkill !== hoveredSkill) {
        setHoveredSkill(closestSkill);
        drawRadar();
      }
    };

    const handleMouseLeave = (): void => {
      setHoveredSkill(null);
      drawRadar();
    };

    canvas.addEventListener('mousemove', handleMouseMove);
    canvas.addEventListener('mouseleave', handleMouseLeave);

    // Start animation
    animate();

    return () => {
      canvas.removeEventListener('mousemove', handleMouseMove);
      canvas.removeEventListener('mouseleave', handleMouseLeave);
      if (animationId.current) {
        cancelAnimationFrame(animationId.current);
      }
    };
  }, [skills, size, hoveredSkill]);

  return (
    <div className="flex flex-col items-center space-y-4">
      <canvas
        ref={canvasRef}
        width={size}
        height={size}
        className="cursor-pointer"
        style={{ background: 'transparent' }}
      />
      
      {/* Legend */}
      <div className="grid grid-cols-2 gap-2 text-sm">
        {skillsData.map((skill, index) => (
          <div
            key={index}
            className={`flex items-center gap-2 p-2 rounded-lg transition-all duration-200 ${
              hoveredSkill === index ? 'bg-white/10 scale-105' : 'bg-white/5'
            }`}
            onMouseEnter={() => setHoveredSkill(index)}
            onMouseLeave={() => setHoveredSkill(null)}
          >
            <div
              className="w-3 h-3 rounded-full"
              style={{ backgroundColor: skill.color }}
            />
            <span className="text-cyan-100/80">{skill.name}</span>
            <span className="text-cyan-400 ml-auto">{skill.value}%</span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default SkillsRadar;