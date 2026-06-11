'use client';

const SKILLS = [
  'Python', 'Django', 'Next.js', 'React', 'Three.js', 'TypeScript',
  'JavaScript', 'Node.js', 'OpenCV', 'MongoDB', 'MySQL', 'PostgreSQL',
  'JWT', 'REST APIs', 'Machine Learning', 'Computer Vision', 'GSAP',
  'Framer Motion', 'Tailwind CSS', 'HTML5', 'CSS3', 'Git', 'Docker',
  'Vercel', 'AWS', 'Redis', 'GraphQL', 'FastAPI', 'TensorFlow',
];

export default function Marquee() {
  const doubled = [...SKILLS, ...SKILLS];

  return (
    <div className="marquee-wrapper py-2">
      <div className="marquee-track">
        {doubled.map((skill, i) => (
          <span key={i} className="flex items-center gap-3 px-4">
            <span className="text-sm font-medium text-[#A1A1AA] whitespace-nowrap hover:text-white transition-colors cursor-default">
              {skill}
            </span>
            <span className="text-[#2A2A2A] text-lg leading-none">·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
