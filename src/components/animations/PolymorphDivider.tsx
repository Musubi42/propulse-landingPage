'use client';

interface PolymorphDividerProps {
  variant?: 'wave1' | 'wave2' | 'wave3' | 'curve1' | 'curve2';
  flip?: boolean;
  color?: string;
  className?: string;
}

export function PolymorphDivider({
  variant = 'wave1',
  flip = false,
  color = 'rgb(250, 246, 240)', // --background color
  className = '',
}: PolymorphDividerProps) {
  const paths = {
    wave1: 'M0,64L48,80C96,96,192,128,288,128C384,128,480,96,576,90.7C672,85,768,107,864,112C960,117,1056,107,1152,96C1248,85,1344,75,1392,69.3L1440,64L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
    wave2: 'M0,96L48,112C96,128,192,160,288,160C384,160,480,128,576,112C672,96,768,96,864,106.7C960,117,1056,139,1152,144C1248,149,1344,139,1392,133.3L1440,128L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
    wave3: 'M0,160L48,154.7C96,149,192,139,288,149.3C384,160,480,192,576,197.3C672,203,768,181,864,165.3C960,149,1056,139,1152,144C1248,149,1344,171,1392,181.3L1440,192L1440,320L1392,320C1344,320,1248,320,1152,320C1056,320,960,320,864,320C768,320,672,320,576,320C480,320,384,320,288,320C192,320,96,320,48,320L0,320Z',
    curve1: 'M0,224L1440,96L1440,320L0,320Z',
    curve2: 'M0,96L1440,224L1440,320L0,320Z',
  };

  return (
    <div className={`relative w-full ${className}`}>
      <svg
        className="w-full h-auto"
        style={{ transform: flip ? 'scaleY(-1)' : 'none' }}
        viewBox="0 0 1440 320"
        preserveAspectRatio="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path fill={color} d={paths[variant]}></path>
      </svg>
    </div>
  );
}
