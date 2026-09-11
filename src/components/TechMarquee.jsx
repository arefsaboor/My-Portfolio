import { techStack } from '../data/techStack';

export default function TechMarquee() {
  const run = [...techStack, ...techStack];
  return (
    <div className="tm" aria-label="Tools and technologies I work with">
      <ul className="tm-track">
        {run.map((t, i) => (
          <li key={`${t.name}-${i}`} aria-hidden={i >= techStack.length}>
            <img src={t.src} alt={i < techStack.length ? t.name : ''} loading="lazy" decoding="async" />
          </li>
        ))}
      </ul>
    </div>
  );
}
