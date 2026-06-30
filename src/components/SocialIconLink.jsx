export default function SocialIconLink({ link, className }) {
  return (
    <a href={link.href} target="_blank" rel="noopener noreferrer" className={className} aria-label={link.label} title={link.label}>
      <svg className="w-5 h-5" fill="currentColor" viewBox="0 0 24 24"><path d={link.path} /></svg>
    </a>
  );
}
