"use client"

export default function FloatingParticles() {
  return (
    <div className="pointer-events-none absolute inset-0 overflow-hidden">
      {[...Array(12)].map((_, i) => (
        <span
          key={i}
          className="particle"
          style={{
            left: `${Math.random() * 100}%`,
            animationDelay: `${Math.random() * 20}s`,
            animationDuration: `${30 + Math.random() * 20}s`,
            transform: `scale(${0.6 + Math.random() * 0.8})`,
          }}
        />
      ))}
    </div>
  )
}
