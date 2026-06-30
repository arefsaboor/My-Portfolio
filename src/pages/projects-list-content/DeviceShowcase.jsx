import { useState } from 'react';

const deviceTabs = [
  { id: 'desktop', label: 'Desktop' },
  { id: 'tablet', label: 'Tablet' },
  { id: 'mobile', label: 'Mobile' },
];

const tones = {
  light: {
    tabWrap: 'bg-[#eef1f0] shadow-[8px_8px_20px_#d1d5d4,-8px_-8px_20px_#ffffff] border border-teal-600/40',
    active: 'bg-teal-600 text-white shadow-md',
    inactive: 'text-slate-500 hover:text-teal-600',
    chrome: 'bg-[#eef1f0] shadow-[8px_8px_20px_#d1d5d4,-8px_-8px_20px_#ffffff] border border-teal-600/40',
    urlBar: 'bg-white/60 text-slate-400',
  },
  dark: {
    tabWrap: 'bg-[#1a1f2e] shadow-[8px_8px_20px_#0d0f17,-8px_-8px_20px_#262d42] border border-teal-500/30',
    active: 'bg-teal-500 text-slate-950 shadow-md',
    inactive: 'text-slate-400 hover:text-teal-300',
    chrome: 'bg-[#1a1f2e] shadow-[8px_8px_20px_#0d0f17,-8px_-8px_20px_#262d42] border border-teal-500/30',
    urlBar: 'bg-black/30 text-slate-500',
  },
  glass: {
    tabWrap: 'bg-white/10 backdrop-blur-xl border border-white/20',
    active: 'bg-teal-400 text-slate-950 shadow-md',
    inactive: 'text-slate-300 hover:text-white',
    chrome: 'bg-white/10 backdrop-blur-xl border border-white/20',
    urlBar: 'bg-white/10 text-slate-300',
  },
};

export default function DeviceShowcase({ project, tone = 'light', frameHeight = 460 }) {
  const [device, setDevice] = useState('desktop');
  const t = tones[tone];

  return (
    <div>
      <div className={`${t.tabWrap} flex w-full gap-1 p-1.5 rounded-lg mb-7`}>
        {deviceTabs.map((d) => (
          <button
            key={d.id}
            onClick={() => setDevice(d.id)}
            className={`flex-1 px-4 py-2.5 rounded-md text-xs font-bold uppercase tracking-wide transition-all ${
              device === d.id ? t.active : t.inactive
            }`}
          >
            {d.label}
          </button>
        ))}
      </div>

      <div style={{ height: `${frameHeight}px` }} className="flex items-center justify-center">
        {device === 'desktop' && (
          <div className={`${t.chrome} rounded-lg p-2.5 w-full max-w-lg`}>
            <div className="flex items-center gap-3 px-3 py-2.5">
              <div className="flex items-center gap-1.5">
                <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-amber-400/70" />
                <span className="w-2.5 h-2.5 rounded-full bg-green-400/70" />
              </div>
              <div className={`flex-1 text-[10px] rounded px-3 py-1 truncate ${t.urlBar}`}>{project.liveUrl?.replace('https://', '')}</div>
            </div>
            <img src={project.screens.desktop} alt={`${project.name} desktop view`} className="w-full h-auto rounded-md" loading="lazy" />
          </div>
        )}
        {device === 'tablet' && (
          <div className="bg-slate-900 rounded-[1rem] p-1.5 h-[440px] w-fit shadow-xl">
            <div className="relative h-full flex items-center justify-center">
              <span className="absolute top-0 left-1/2 -translate-x-1/2 w-1 h-1 rounded-full bg-slate-600 ring-1 ring-slate-700 z-10" />
              <img src={project.screens.tablet} alt={`${project.name} tablet view`} className="h-full w-auto object-cover rounded-[0.5rem]" loading="lazy" />
            </div>
          </div>
        )}
        {device === 'mobile' && (
          <div className="bg-slate-900 rounded-[1.4rem] p-1.5 h-[440px] w-fit shadow-xl relative">
            <span className="absolute top-2 left-1/2 -translate-x-1/2 w-9 h-2 rounded-full bg-black z-10" />
            <span className="absolute -left-[1px] top-[28%] w-[2px] h-7 bg-slate-700 rounded-r" />
            <span className="absolute -right-[1px] top-[24%] w-[2px] h-10 bg-slate-700 rounded-l" />
            <div className="relative h-full flex items-center justify-center">
              <img src={project.screens.mobile} alt={`${project.name} mobile view`} className="h-full w-auto object-cover rounded-[1rem]" loading="lazy" />
            </div>
            <span className="absolute bottom-1 left-1/2 -translate-x-1/2 w-16 h-[3px] rounded-full bg-slate-600" />
          </div>
        )}
      </div>
    </div>
  );
}
