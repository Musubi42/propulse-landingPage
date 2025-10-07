'use client';

import { GraduationCap, Users, Building2, LucideIcon } from 'lucide-react';
import { FadeIn } from '@/components/animations';

interface CTAButton {
  href: string;
  icon: LucideIcon;
  label: string;
  sublabel: string;
  colorVar: string;
  hoverColorVar: string;
}

interface TriadCTAButtonsProps {
  delay?: number;
  className?: string;
}

export function TriadCTAButtons({ delay = 0.7, className = '' }: TriadCTAButtonsProps) {
  const buttons: CTAButton[] = [
    {
      href: '#',
      icon: GraduationCap,
      label: 'Lycéen',
      sublabel: "Je m'inscris",
      colorVar: 'var(--lyceen-primary)',
      hoverColorVar: 'var(--lyceen-hover)',
    },
    {
      href: '#',
      icon: Users,
      label: 'Mentor',
      sublabel: 'Je participe',
      colorVar: 'var(--mentor-primary)',
      hoverColorVar: 'var(--mentor-hover)',
    },
    {
      href: '#',
      icon: Building2,
      label: 'Lycée',
      sublabel: 'Partenariat',
      colorVar: 'var(--lycee-primary)',
      hoverColorVar: 'var(--lycee-hover)',
    },
  ];

  return (
    <FadeIn direction="up" delay={delay}>
      <div className={`flex flex-col md:grid md:grid-cols-3 gap-3 md:gap-4 mt-6 md:mt-8 lg:mt-12 items-center ${className}`}>
        {buttons.map((button, index) => {
          const Icon = button.icon;
          return (
            <a
              key={index}
              href={button.href}
              className="w-3/4 md:w-full group relative inline-flex flex-row md:flex-col items-center justify-between px-3 py-3 md:px-6 md:py-5 text-white font-semibold rounded-full hover:bg-[rgb(var(--lycee-hover))] transition-all duration-300 shadow-lg hover:shadow-xl hover:scale-105 overflow-hidden"
              style={{
                backgroundColor: `rgb(${button.colorVar})`,
              }}
            >
              <div className="w-1/5">
                <Icon className="w-5 h-5 md:w-8 md:h-8 ml-1 mb-1 md:mb-2" />
              </div>
              <div className="flex flex-col items-center w-4/5 mr-[18%] md:mr-0">
                <span className="text-sm md:text-base lg:text-lg">{button.label}</span>
                <span className="text-xs md:text-sm font-normal opacity-90 mt-0.5 md:mt-1">
                  {button.sublabel}
                </span>
              </div>
            </a>
          );
        })}
      </div>
    </FadeIn>
  );
}
