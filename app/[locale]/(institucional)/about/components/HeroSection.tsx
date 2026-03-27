"use client";

import { useEffect, useRef, useState } from "react";

// ── Particle config (mimics Google Antigravity's confetti dashes) ──────────
const COLORS = [
  "#4285F4", // Google Blue
  "#EA4335", // Google Red
  "#FBBC04", // Google Yellow
  "#34A853", // Google Green
];

interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  len: number;
  thickness: number;
  color: string;
  angle: number;
  rotSpeed: number;
  alpha: number;
}

function randomParticle(w: number, h: number): Particle {
  return {
    x: Math.random() * w,
    y: Math.random() * h,
    vx: (Math.random() - 0.5) * 0.35,
    vy: (Math.random() - 0.5) * 0.35,
    len: Math.random() * 10 + 5,
    thickness: Math.random() * 1.5 + 0.6,
    color: COLORS[Math.floor(Math.random() * COLORS.length)],
    angle: Math.random() * Math.PI * 2,
    rotSpeed: (Math.random() - 0.5) * 0.012,
    alpha: Math.random() * 0.45 + 0.15,
  };
}

// ── Typewriter config ──────────────────────────────────────────────────────
const FULL = "Hi, I'm Gabriel Gama, a Front-end Software Engineer";
const SPEED = 55; // ms per character

export function HeroSection() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);

  const [typed, setTyped] = useState("");
  const [done, setDone] = useState(false);

  // ── Canvas: confetti dashes ────────────────────────────────────────────
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    function resize() {
      if (!canvas) return;
      canvas.width = canvas.offsetWidth;
      canvas.height = canvas.offsetHeight;
    }
    resize();
    window.addEventListener("resize", resize);

    // spawn 140 dashes scattered across the full canvas
    particlesRef.current = Array.from({ length: 140 }, () =>
      randomParticle(canvas.width, canvas.height)
    );

    function draw() {
      if (!canvas || !ctx) return;
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      for (const p of particlesRef.current) {
        // drift
        p.x += p.vx;
        p.y += p.vy;
        p.angle += p.rotSpeed;

        // wrap around edges
        if (p.x < -20) p.x = canvas.width + 20;
        if (p.x > canvas.width + 20) p.x = -20;
        if (p.y < -20) p.y = canvas.height + 20;
        if (p.y > canvas.height + 20) p.y = -20;

        // draw a short, rotated rounded line (dash)
        ctx.save();
        ctx.translate(p.x, p.y);
        ctx.rotate(p.angle);
        ctx.globalAlpha = p.alpha;
        ctx.strokeStyle = p.color;
        ctx.lineWidth = p.thickness;
        ctx.lineCap = "round";
        ctx.beginPath();
        ctx.moveTo(-p.len / 2, 0);
        ctx.lineTo(p.len / 2, 0);
        ctx.stroke();
        ctx.restore();
      }

      rafRef.current = requestAnimationFrame(draw);
    }

    draw();
    return () => {
      window.removeEventListener("resize", resize);
      cancelAnimationFrame(rafRef.current);
    };
  }, []);

  // ── Typewriter: types once and stops ──────────────────────────────────
  useEffect(() => {
    if (done) return;
    if (typed.length >= FULL.length) {
      setDone(true);
      return;
    }
    const t = setTimeout(
      () => setTyped(FULL.slice(0, typed.length + 1)),
      SPEED
    );
    return () => clearTimeout(t);
  }, [typed, done]);

  return (
    <section
      style={{
        position: "relative",
        width: "100%",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        background: "var(--background)",
        overflow: "hidden",
      }}
    >
      {/* ── Canvas background ── */}
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          pointerEvents: "none",
        }}
      />

      {/* ── Hero content ── */}
      <div
        style={{
          position: "relative",
          zIndex: 1,
          textAlign: "center",
          padding: "0 1.5rem",
          maxWidth: "820px",
        }}
      >
        {/* Badge */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: "6px",
            fontSize: "0.82rem",
            fontWeight: 500,
            color: "#5f6368",
            letterSpacing: "0.04em",
            marginBottom: "1.6rem",
          }}
        >
          <span
            style={{
              width: 7,
              height: 7,
              borderRadius: "50%",
              background: "#34a853",
              display: "inline-block",
              animation: "ag-pulse 2.4s ease-in-out infinite",
            }}
          />
          gabriel gama
        </div>

        {/* Headline with typewriter */}
        <h1
          style={{
            fontSize: "clamp(2.4rem, 6.5vw, 5rem)",
            fontWeight: 700,
            lineHeight: 1.12,
            color: "var(--foreground)",
            letterSpacing: "-0.02em",
            margin: "0 0 1.4rem",
            minHeight: "1.2em",
            fontFamily: "var(--font-google), ui-sans-serif, system-ui, sans-serif",
          }}
        >
          {typed}
          {!done && (
            <span
              aria-hidden="true"
              style={{
                display: "inline-block",
                width: 3,
                height: "0.85em",
                background: "var(--foreground)",
                borderRadius: 2,
                marginLeft: 4,
                verticalAlign: "middle",
                animation: "ag-blink 1s step-end infinite",
              }}
            />
          )}
        </h1>

        {/* Sub-text */}
        <p
          style={{
            fontSize: "clamp(1rem, 2vw, 1.15rem)",
            color: "#5f6368",
            fontWeight: 400,
            margin: "0 0 2.4rem",
            lineHeight: 1.6,
          }}
        >
          Building fast, beautiful, and meaningful digital experiences.
        </p>

        {/* CTAs */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            gap: "0.85rem",
            flexWrap: "wrap",
          }}
        >
          <a
            href="mailto:gabrielvgama@gmail.com"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.72rem 1.65rem",
              borderRadius: 999,
              background: "var(--foreground)",
              color: "var(--background)",
              fontSize: "0.93rem",
              fontWeight: 500,
              textDecoration: "none",
              letterSpacing: "0.01em",
              transition: "opacity 0.18s, transform 0.14s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "0.82";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.opacity = "1";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Contact me
          </a>

          <a
            href="#about"
            style={{
              display: "inline-flex",
              alignItems: "center",
              padding: "0.72rem 1.65rem",
              borderRadius: 999,
              background: "rgba(0,0,0,0.065)",
              color: "var(--foreground)",
              fontSize: "0.93rem",
              fontWeight: 500,
              textDecoration: "none",
              letterSpacing: "0.01em",
              transition: "background 0.18s, transform 0.14s",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.11)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.background = "rgba(0,0,0,0.065)";
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
            }}
          >
            Explore
          </a>
        </div>
      </div>

      {/* ── Keyframe styles ── */}
      <style>{`
        @keyframes ag-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.45; transform: scale(0.72); }
        }
        @keyframes ag-blink {
          0%, 100% { opacity: 1; }
          50% { opacity: 0; }
        }
      `}</style>
    </section>
  );
}
