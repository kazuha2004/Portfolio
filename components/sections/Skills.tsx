'use client';

import SkillsGalaxyScene from '@/components/ui/SkillsGalaxyScene';

const SKILL_GROUPS = [
  {
    category: 'Languages',
    skills: ['Python', 'TypeScript', 'JavaScript', 'C++', 'SQL'],
  },
  {
    category: 'Frontend',
    skills: [
      'Next.js',
      'React',
      'Three.js',
      'GSAP',
      'Framer Motion',
      'Tailwind CSS',
      'HTML5',
      'CSS3',
    ],
  },
  {
    category: 'Backend',
    skills: ['Django', 'Django REST', 'Node.js', 'FastAPI', 'JWT', 'REST APIs'],
  },
  {
    category: 'Databases',
    skills: ['MongoDB', 'MySQL', 'PostgreSQL', 'Redis'],
  },
  {
    category: 'AI / ML',
    skills: [
      'OpenCV',
      'TensorFlow',
      'Computer Vision',
      'LBPH',
      'Haar Cascade',
      'OpenAI API',
    ],
  },
  {
    category: 'Tools & Cloud',
    skills: ['Git', 'Docker', 'Vercel', 'AWS', 'Linux', 'Postman'],
  },
];

export default function Skills() {
  return (
    <section
      id="skills"
      className="relative py-16 sm:py-24 md:py-32 overflow-hidden"
    >
      {/* Ambient */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background:
            'radial-gradient(ellipse at 50% 30%, rgba(124,58,237,0.05) 0%, transparent 60%)',
        }}
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
        {/* Label */}
        <div className="flex items-center gap-3 mb-10 sm:mb-16 md:mb-20">
          <span className="section-label">04 — Skills</span>
          <span className="flex-1 h-px bg-white/5" />
        </div>

        {/* Heading */}
        <div className="mb-10 sm:mb-16 max-w-2xl">
          <h2 className="text-display-lg font-black text-white leading-none mb-4">
            The <span className="gradient-text-purple">Arsenal</span>
          </h2>

          <p className="text-[#71717A] text-sm sm:text-base">
            Tools I&apos;ve used in production. No progress bars — just shipped
            code.
          </p>
        </div>

        {/* 3D Skills Galaxy */}
        <div className="mb-20">
          <SkillsGalaxyScene />
        </div>

        {/* Grouped pills */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-8">
          {SKILL_GROUPS.map((group) => (
            <div
              key={group.category}
              className="rounded-2xl p-6 group hover:border-white/10 transition-colors duration-300"
              style={{
                background: 'rgba(255,255,255,0.02)',
                border: '1px solid rgba(255,255,255,0.05)',
              }}
            >
              <h3 className="text-xs font-bold tracking-[0.12em] uppercase text-[#52525B] mb-4 group-hover:text-[#7C3AED] transition-colors">
                {group.category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill) => (
                  <span key={skill} className="skill-pill">
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}