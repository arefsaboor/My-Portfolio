const tones = {
  light: {
    primary: 'bg-teal-600 text-white hover:bg-teal-700 shadow-md',
    secondary: 'bg-[#eef1f0] text-slate-700 shadow-[4px_4px_10px_#d1d5d4,-4px_-4px_10px_#ffffff] border border-teal-600/30 hover:text-teal-700',
  },
  dark: {
    primary: 'bg-teal-500 text-slate-950 hover:bg-teal-400 shadow-md',
    secondary: 'bg-[#1a1f2e] text-slate-300 shadow-[4px_4px_10px_#0d0f17,-4px_-4px_10px_#262d42] border border-teal-500/20 hover:text-teal-300',
  },
  glass: {
    primary: 'bg-teal-400 text-slate-950 hover:bg-teal-300 shadow-md',
    secondary: 'bg-white/10 backdrop-blur text-slate-200 border border-white/20 hover:text-white',
  },
};

const ExternalIcon = () => (
  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
);

export default function LinkButtons({ project, tone = 'light', className = '' }) {
  const t = tones[tone];
  const secondaryLinks = [
    project.vercelUrl && { label: 'Live Vercel', href: project.vercelUrl },
    project.githubUrl && { label: 'GitHub', href: project.githubUrl },
    project.figmaUrl && { label: 'Figma', href: project.figmaUrl },
    project.framerUrl && { label: 'Framer', href: project.framerUrl },
    project.caseStudyUrl && { label: 'Case Study', href: project.caseStudyUrl },
  ].filter(Boolean);

  return (
    <div className={`flex flex-wrap gap-3 ${className}`}>
      {project.liveUrl && (
        <a
          href={project.liveUrl}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-6 py-3 text-sm font-semibold rounded-lg transition-colors ${t.primary}`}
        >
          Visit Live <ExternalIcon />
        </a>
      )}
      {secondaryLinks.map((link) => (
        <a
          key={link.label}
          href={link.href}
          target="_blank"
          rel="noopener noreferrer"
          className={`inline-flex items-center gap-2 px-5 py-3 text-sm font-medium rounded-lg transition-colors ${t.secondary}`}
        >
          {link.label} <ExternalIcon />
        </a>
      ))}
    </div>
  );
}
