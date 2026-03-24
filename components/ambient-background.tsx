const particles = Array.from({ length: 18 });

export function AmbientBackground() {
  return (
    <div className="pointer-events-none fixed inset-0 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_top,rgba(139,0,0,0.24),transparent_30%),radial-gradient(circle_at_bottom_right,rgba(212,175,55,0.14),transparent_22%),linear-gradient(180deg,#050505_0%,#0B0B0B_38%,#120707_100%)]" />
      <div className="absolute left-1/2 top-[-16rem] h-[32rem] w-[32rem] -translate-x-1/2 rounded-full bg-gold/10 blur-[130px]" />
      <div className="absolute bottom-[-12rem] right-[-8rem] h-[24rem] w-[24rem] rounded-full bg-crimson/30 blur-[120px]" />

      {particles.map((_, index) => (
        <span
          key={index}
          className="absolute h-1.5 w-1.5 rounded-full bg-gold/40 animate-twinkle"
          style={{
            left: `${(index * 11) % 100}%`,
            top: `${(index * 17) % 100}%`,
            animationDelay: `${index * 0.4}s`,
            animationDuration: `${4 + (index % 5)}s`
          }}
        />
      ))}
    </div>
  );
}
