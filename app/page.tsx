"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useRef, useState } from "react"
import {
  Trophy,
  GraduationCap,
  Briefcase,
  Wallet,
  Globe,
  Music,
  Mic,
  ArrowRight,
  ArrowUpRight,
  Download,
  FileText,
  Award,
  Play,
  Sparkles,
  Database,
  Link2,
  PenTool,
  Code2,
  MapPin,
  X,
  Menu,
} from "lucide-react"

const PRAMAAN_VIDEO_URL = "/videos/pramaan-demo.mp4"
const PRAMAAN_VIDEO_POSTER = "/videos/pramaan-poster.jpg"

const IEEE_PAPER_URL = "https://ieeexplore.ieee.org/document/11337270"
const SCITEPRESS_PAPER_URL = "https://www.scitepress.org/Papers/2025/placeholder/placeholder.pdf"

// Image paths — drop real photos at the paths below (see /MEDIA_README.md)
const IMG = {
  hero: "/images/hero/portrait.jpeg",
  gallery: {
    piano1: "/images/gallery/piano-1.jpeg",
    piano2: "/images/gallery/piano-2.jpeg",
    students1: "/images/gallery/students-1.jpeg",
    students2: "/images/gallery/students-2.avif",
    speaking1: "/images/gallery/speaking-1.jpeg",
    hackathon1: "/images/gallery/hackathon-1.jpeg",
    studentOfYear: "/images/gallery/student-of-year.jpeg",
  },
  snowflake: [
    "/images/snowflake/badge-1.png",
    "/images/snowflake/badge-2.png",
    "/images/snowflake/badge-3.png",
  ],
}

function isEmbedUrl(url: string) {
  return /youtube\.com|youtu\.be|vimeo\.com/.test(url)
}

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [cursor, setCursor] = useState({ x: 0, y: 0, visible: false })
  const [lightbox, setLightbox] = useState<{ src: string; alt: string } | null>(null)
  const sectionsRef = useRef<(HTMLElement | null)[]>([])

  useEffect(() => {
    document.documentElement.classList.toggle("dark", isDark)
  }, [isDark])

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in-up")
            setActiveSection(entry.target.id)
          }
        })
      },
      { threshold: 0.2, rootMargin: "0px 0px -15% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  useEffect(() => {
    const onMove = (e: MouseEvent) => setCursor({ x: e.clientX, y: e.clientY, visible: true })
    const onLeave = () => setCursor((c) => ({ ...c, visible: false }))
    window.addEventListener("mousemove", onMove)
    window.addEventListener("mouseleave", onLeave)
    return () => {
      window.removeEventListener("mousemove", onMove)
      window.removeEventListener("mouseleave", onLeave)
    }
  }, [])

  useEffect(() => {
    if (!lightbox) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setLightbox(null)
    }
    window.addEventListener("keydown", onKey)
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = "hidden"
    return () => {
      window.removeEventListener("keydown", onKey)
      document.body.style.overflow = prevOverflow
    }
  }, [lightbox])

  const toggleTheme = () => setIsDark(!isDark)

  const navSections = [
    { id: "intro", label: "Home" },
    { id: "about", label: "About" },
    { id: "experience", label: "Experience" },
    { id: "work", label: "Projects" },
    { id: "research", label: "Research" },
    { id: "certifications", label: "Snowflake" },
    { id: "achievements", label: "Recognition" },
    { id: "gallery", label: "Beyond Code" },
    { id: "connect", label: "Contact" },
  ]

  return (
    <div className="min-h-screen bg-background text-foreground relative overflow-x-hidden">
      {/* ambient gradient mesh */}
      <div aria-hidden className="pointer-events-none fixed inset-0 -z-10 overflow-hidden">
        {/* aurora at top */}
        <div className="absolute -top-60 left-1/2 -translate-x-1/2 h-[800px] w-[1200px] rounded-full blur-3xl opacity-50 dark:opacity-40 bg-aurora" />
        {/* animated blobs */}
        <div className="absolute -top-40 -left-40 h-[520px] w-[520px] rounded-full blur-3xl opacity-60 dark:opacity-45 animate-blob bg-blob-1" />
        <div className="absolute top-1/3 -right-40 h-[560px] w-[560px] rounded-full blur-3xl opacity-55 dark:opacity-40 animate-blob-slow bg-blob-2" />
        <div className="absolute bottom-0 left-1/3 h-[480px] w-[480px] rounded-full blur-3xl opacity-50 dark:opacity-35 animate-blob bg-blob-3" />
        {/* grid + noise + vignette */}
        <div className="absolute inset-0 bg-grid opacity-70 [mask-image:radial-gradient(ellipse_at_center,black_35%,transparent_80%)]" />
        <div className="absolute inset-0 bg-dots opacity-40 dark:opacity-50 [mask-image:radial-gradient(ellipse_at_center,black_10%,transparent_65%)]" />
        <div className="absolute inset-0 bg-noise opacity-[0.10] dark:opacity-[0.14] mix-blend-overlay" />
        <div className="absolute inset-0 bg-vignette" />
      </div>

      {/* cursor glow */}
      <div
        aria-hidden
        className="pointer-events-none fixed z-0 h-[200px] w-[200px] md:h-[340px] md:w-[340px] -translate-x-1/2 -translate-y-1/2 rounded-full blur-3xl transition-opacity duration-300"
        style={{
          left: cursor.x,
          top: cursor.y,
          opacity: cursor.visible ? 0.18 : 0,
          background:
            "radial-gradient(circle at center, rgba(140,130,255,0.8), rgba(255,119,180,0.4) 40%, transparent 70%)",
        }}
      />

      {/* side nav */}
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-20 hidden lg:block">
        <div className="flex flex-col gap-3">
          {navSections.map((section) => (
            <button
              key={section.id}
              onClick={() => document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })}
              className="group relative flex items-center gap-3"
              aria-label={`Navigate to ${section.label}`}
            >
              <span
                className={`block h-[2px] rounded-full transition-all duration-500 ${
                  activeSection === section.id
                    ? "w-10 bg-foreground"
                    : "w-5 bg-muted-foreground/40 group-hover:w-8 group-hover:bg-muted-foreground"
                }`}
              />
              <span
                className={`font-mono text-[10px] tracking-widest uppercase transition-opacity duration-300 ${
                  activeSection === section.id ? "opacity-100" : "opacity-0 group-hover:opacity-100"
                }`}
              >
                {section.label}
              </span>
            </button>
          ))}
        </div>
      </nav>

      {/* mobile nav toggle */}
      <div className="fixed top-4 right-4 z-40 lg:hidden">
        <button
          onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          className="p-2 backdrop-blur-md bg-background/50 border border-border/60 rounded-xl"
          aria-label="Toggle menu"
        >
          {isMobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
        </button>
      </div>

      {/* mobile nav menu */}
      <div
        className={`fixed inset-0 z-30 bg-background/95 backdrop-blur-sm transition-all duration-300 lg:hidden ${
          isMobileMenuOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
      >
        <nav className="flex flex-col items-center justify-center h-full gap-6">
          {navSections.map((section) => (
            <button
              key={section.id}
              onClick={() => {
                setIsMobileMenuOpen(false)
                document.getElementById(section.id)?.scrollIntoView({ behavior: "smooth" })
              }}
              className="text-lg font-mono tracking-widest uppercase text-muted-foreground hover:text-foreground transition-colors"
            >
              {section.label}
            </button>
          ))}
        </nav>
      </div>

      <main className="max-w-6xl mx-auto px-6 sm:px-8 lg:px-16 relative">
        {/* ───────────────────────────── HERO ───────────────────────────── */}
        <header
          id="intro"
          ref={(el) => (sectionsRef.current[0] = el)}
          className="min-h-screen flex items-center opacity-0 pt-10"
        >
          <div className="grid lg:grid-cols-12 gap-10 sm:gap-16 w-full items-center">
            <div className="lg:col-span-7 space-y-8">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-xs font-mono tracking-widest text-muted-foreground px-3 py-1 border border-border/60 rounded-full backdrop-blur">
                  <Sparkles className="w-3 h-3" />
                  PORTFOLIO · 2026
                </div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl xl:text-8xl font-light tracking-tighter leading-[0.95]">
                  <span className="block">Devang</span>
                  <span className="block text-gradient">Gandhi.</span>
                </h1>
              </div>

              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-2xl">
                SDE at <span className="text-foreground font-medium">Tulapi.ai</span> — building
                full-stack products by day, shipping <span className="text-foreground">decentralized
                  protocols</span> and <span className="text-foreground">ZK-powered systems</span> by
                night. Researcher, technical writer at{" "}
                <span className="text-foreground">Blok Capital</span>, and a classically trained
                pianist who happens to write a lot of Solidity.
              </p>

              <div className="flex flex-wrap items-center gap-3 sm:gap-4 text-sm">
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-background/40 backdrop-blur">
                  <span className="relative flex h-2 w-2">
                    <span className="absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-70 animate-ping" />
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-green-500" />
                  </span>
                  <span className="text-muted-foreground">Open to collaborations</span>
                </div>
                <div className="flex items-center gap-2 px-3 py-1.5 rounded-full border border-border/60 bg-background/40 backdrop-blur text-muted-foreground">
                  <MapPin className="w-3.5 h-3.5" />
                  Pune, India
                </div>
                <Link
                  href="#connect"
                  onClick={(e) => {
                    e.preventDefault()
                    document.getElementById("connect")?.scrollIntoView({ behavior: "smooth" })
                  }}
                  className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-foreground text-background text-sm hover:opacity-90 transition-opacity"
                >
                  Let&apos;s talk <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>

              <div className="pt-4 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-xl">
                {[
                  { k: "Hackathons Won", v: "5+" },
                  { k: "Research Papers", v: "2" },
                  { k: "Piano Students", v: "300+" },
                  { k: "Years Building", v: "3+" },
                ].map((s) => (
                  <div key={s.k} className="group">
                    <div className="text-2xl sm:text-3xl font-light tracking-tight text-foreground">
                      {s.v}
                    </div>
                    <div className="text-xs text-muted-foreground font-mono tracking-wider">
                      {s.k}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* hero portrait */}
            <div className="lg:col-span-5 relative">
              <div className="relative aspect-[4/5] w-[calc(100%-2rem)] max-w-sm mx-auto lg:ml-auto animate-float">
                <div className="absolute -inset-4 sm:-inset-6 rounded-[2rem] bg-gradient-to-tr from-violet-500/20 via-fuchsia-500/15 to-sky-500/20 blur-2xl" />
                <div className="relative h-full w-full overflow-hidden rounded-[2rem] border border-border/60 bg-background/40 backdrop-blur-sm">
                  <Image
                    src={IMG.hero}
                    alt="Devang Gandhi"
                    fill
                    sizes="(max-width: 768px) 80vw, 400px"
                    className="object-cover grayscale-[15%] hover:grayscale-0 transition-all duration-700"
                    priority
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
                </div>
                <div className="absolute -bottom-2 -left-2 sm:-bottom-5 sm:-left-5 rounded-2xl border border-border/60 bg-background/80 backdrop-blur px-4 py-3 shadow-2xl">
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    Currently
                  </div>
                  <div className="text-sm font-medium">SDE @ Tulapi.ai</div>
                </div>
                <div className="absolute -top-2 -right-2 sm:-top-5 sm:-right-5 rounded-2xl border border-border/60 bg-background/80 backdrop-blur px-4 py-3 shadow-2xl">
                  <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                    Writing
                  </div>
                  <div className="text-sm font-medium">Blok Capital</div>
                </div>
              </div>
            </div>
          </div>

          {/* skills marquee */}
          <div className="absolute bottom-4 sm:bottom-10 inset-x-0 overflow-hidden pointer-events-none block">
            <div className="flex animate-marquee whitespace-nowrap opacity-20 sm:opacity-30">
              {[
                "Solidity",
                "Zero-Knowledge Proofs",
                "TypeScript",
                "Next.js",
                "Node.js",
                "Foundry",
                "Hardhat",
                "Snowflake",
                "Python",
                "EIP-8004",
                "x402",
                "Sui Move",
                "PostgreSQL",
                "Research",
                "Piano",
              ]
                .concat([
                  "Solidity",
                  "Zero-Knowledge Proofs",
                  "TypeScript",
                  "Next.js",
                  "Node.js",
                  "Foundry",
                  "Hardhat",
                  "Snowflake",
                  "Python",
                  "EIP-8004",
                  "x402",
                  "Sui Move",
                  "PostgreSQL",
                  "Research",
                  "Piano",
                ])
                .map((t, i) => (
                  <span
                    key={i}
                    className="mx-8 font-mono text-xs tracking-widest uppercase text-muted-foreground"
                  >
                    {t} ◇
                  </span>
                ))}
            </div>
          </div>
        </header>

        {/* ───────────────────────────── ABOUT / STORY ───────────────────────────── */}
        <section
          id="about"
          ref={(el) => (sectionsRef.current[1] = el)}
          className="py-24 sm:py-32 opacity-0"
        >
          <div className="grid lg:grid-cols-12 gap-12">
            <div className="lg:col-span-5 space-y-4 lg:sticky lg:top-24 self-start">
              <div className="text-sm text-muted-foreground font-mono tracking-widest">01 / ABOUT</div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                Engineer, researcher,
                <br />
                <span className="text-muted-foreground">musician.</span>
              </h2>
            </div>

            <div className="lg:col-span-7 space-y-6 text-lg text-muted-foreground leading-relaxed">
              <p>
                I&apos;m a Software Development Engineer at{" "}
                <span className="text-foreground font-medium">Tulapi.ai</span>, where I&apos;m
                currently shipping on production products at the intersection of AI and
                full-stack engineering.
              </p>
              <p>
                Outside of work, I live in the{" "}
                <span className="text-foreground">decentralization</span> space — exploring emerging
                standards like <span className="text-foreground font-mono text-sm">x402</span> and{" "}
                <span className="text-foreground font-mono text-sm">EIP-8004</span>, and writing deep
                technical breakdowns as a Technical Writer at{" "}
                <span className="text-foreground">Blok Capital</span>.
              </p>
              <p>
                I&apos;ve co-authored{" "}
                <span className="text-foreground">two peer-reviewed research papers</span>, earned{" "}
                <span className="text-foreground">Snowflake badges & certifications</span> in data
                engineering, and won multiple international hackathons including ETHGlobal.
              </p>
              <p>
                When I step away from the keyboard, I&apos;m usually at a piano — I&apos;ve taught
                over 300 students and still believe the best engineers are the ones who make time
                for something completely unrelated to engineering.
              </p>

              <div className="pt-4 flex flex-wrap gap-2">
                {[
                  { icon: Code2, label: "Full-Stack" },
                  { icon: Link2, label: "Decentralization" },
                  { icon: Database, label: "Data" },
                  { icon: PenTool, label: "Technical Writing" },
                  { icon: Music, label: "Music" },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 px-3 py-1.5 text-xs border border-border/60 rounded-full text-foreground/80 bg-background/40 backdrop-blur hover:border-muted-foreground/50 transition-colors"
                  >
                    <Icon className="w-3.5 h-3.5" />
                    {label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────────── EXPERIENCE ───────────────────────────── */}
        <section
          id="experience"
          ref={(el) => (sectionsRef.current[2] = el)}
          className="py-24 sm:py-32 opacity-0"
        >
          <div className="space-y-14">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-widest">
                  02 / EXPERIENCE
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">Where I&apos;ve built</h2>
              </div>
              <div className="text-sm text-muted-foreground font-mono">2023 — Present</div>
            </div>

            <ol className="relative border-l border-border/60 ml-2 space-y-10">
              {[
                {
                  role: "Software Development Engineer",
                  company: "Tulapi.ai",
                  period: "2026 — Present",
                  now: true,
                  bullets: [
                    "Shipping production features across the full stack on active client projects.",
                    "Working on AI-powered workflows, backend services, and modern TypeScript frontends.",
                  ],
                },
                {
                  role: "Technical Writer",
                  company: "Blok Capital",
                  period: "2025 — Present",
                  bullets: [
                    "Writing deep-dive articles on emerging Web3 standards: x402 micropayments, EIP-8004 identity, and L2 ecosystems.",
                    "Translating complex on-chain primitives into accessible, publishable research.",
                  ],
                },
                {
                  role: "Secretary & Treasurer",
                  company: "IOIT ACM Student Chapter",
                  period: "2023 — 2025",
                  bullets: [
                    "Led 200+ member student chapter; organized blockchain and development workshops.",
                    "Managed ₹5L+ annual budget; coordinated sponsorships for hackathons and tech events.",
                  ],
                },
                {
                  role: "Finance Head",
                  company: "Model United Nations",
                  period: "2023 — 2024",
                  bullets: [
                    "Handled complete financial operations for two large-scale MUN conferences (500+ participants).",
                  ],
                },
                {
                  role: "Piano Instructor & Mentor",
                  company: "Community Teaching",
                  period: "2022 — Present",
                  bullets: [
                    "Mentored 300+ students in piano and music theory across age groups and skill levels.",
                  ],
                },
              ].map((item, i) => (
                <li key={i} className="pl-8 relative group">
                  <span
                    className={`absolute -left-[7px] top-1.5 h-3 w-3 rounded-full ring-4 ring-background ${
                      item.now ? "bg-green-500 animate-pulse" : "bg-muted-foreground/50 group-hover:bg-foreground"
                    } transition-colors`}
                  />
                  <div className="flex flex-col sm:flex-row sm:items-baseline sm:justify-between gap-1">
                    <div className="space-y-1">
                      <h3 className="text-xl font-medium">
                        {item.role}{" "}
                        <span className="text-muted-foreground font-light">· {item.company}</span>
                      </h3>
                    </div>
                    <div className="text-xs font-mono text-muted-foreground tracking-widest">
                      {item.period}
                    </div>
                  </div>
                  <ul className="mt-3 space-y-1.5 text-muted-foreground leading-relaxed">
                    {item.bullets.map((b, j) => (
                      <li key={j} className="text-sm sm:text-base">
                        — {b}
                      </li>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </section>

        {/* ───────────────────────────── FEATURED PROJECT: PRAMAAN ───────────────────────────── */}
        <section className="py-20 sm:py-28">
          <div className="space-y-10">
            <div className="flex items-end justify-between gap-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-widest">
                  FEATURED PROJECT
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">Pramaan</h2>
              </div>
              <span className="hidden sm:inline-flex items-center gap-1 text-xs px-3 py-1 rounded-full border border-border/60 font-mono text-muted-foreground">
                <Sparkles className="w-3 h-3" /> ZKP · RaaS
              </span>
            </div>

            <div className="grid lg:grid-cols-12 gap-8 items-start">
              {/* Video */}
              <div className="lg:col-span-7 group relative rounded-2xl overflow-hidden border border-border/60 bg-background/40 backdrop-blur aspect-video glow-ring">
                {isEmbedUrl(PRAMAAN_VIDEO_URL) ? (
                  <iframe
                    src={PRAMAAN_VIDEO_URL}
                    title="Pramaan demo"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                    className="absolute inset-0 w-full h-full"
                  />
                ) : (
                  <video
                    src={PRAMAAN_VIDEO_URL}
                    poster={PRAMAAN_VIDEO_POSTER}
                    controls
                    preload="metadata"
                    className="absolute inset-0 w-full h-full object-cover"
                  >
                    Demo video — drop the file at{" "}
                    <code>public/videos/pramaan-demo.mp4</code> to play it here.
                  </video>
                )}
                <div className="pointer-events-none absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                  <div className="rounded-full bg-background/70 backdrop-blur p-4">
                    <Play className="w-6 h-6" />
                  </div>
                </div>
              </div>

              <div className="lg:col-span-5 space-y-5">
                <p className="text-muted-foreground leading-relaxed">
                  A decentralized{" "}
                  <span className="text-foreground font-medium">Reputation-as-a-Service (RaaS)</span>{" "}
                  protocol that converts professional work history into a portable, on-chain credit
                  identity. Pramaan uses{" "}
                  <span className="text-foreground font-medium">Zero-Knowledge Proofs</span> to
                  aggregate verified data from platforms like GitHub, Uber, and LinkedIn —
                  letting gig workers prove creditworthiness to lenders{" "}
                  <span className="text-foreground">without ever compromising their privacy</span>.
                </p>

                <div className="flex flex-wrap gap-2">
                  {["ZKP", "Solidity", "Next.js", "The Graph", "IPFS", "TypeScript"].map((t) => (
                    <span
                      key={t}
                      className="px-2.5 py-1 text-xs border border-border/60 rounded-full text-foreground/80 bg-background/40"
                    >
                      {t}
                    </span>
                  ))}
                </div>

                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div className="p-4 rounded-xl border border-border/60 bg-background/30 backdrop-blur">
                    <div className="text-xs font-mono uppercase text-muted-foreground tracking-widest">
                      Core
                    </div>
                    <div className="text-sm mt-1">Privacy-preserving credit</div>
                  </div>
                  <div className="p-4 rounded-xl border border-border/60 bg-background/30 backdrop-blur">
                    <div className="text-xs font-mono uppercase text-muted-foreground tracking-widest">
                      Users
                    </div>
                    <div className="text-sm mt-1">Gig workers · Lenders</div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────────── WORK ───────────────────────────── */}
        <section
          id="work"
          ref={(el) => (sectionsRef.current[3] = el)}
          className="py-24 sm:py-32 opacity-0"
        >
          <div className="space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-widest">
                  03 / SELECTED WORK
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">Things I&apos;ve built</h2>
              </div>
              <div className="text-sm text-muted-foreground font-mono">2024 — 2025</div>
            </div>

            <div className="space-y-6">
              {[
                {
                  year: "2025",
                  role: "BugChan — Decentralized Bug Bounty Platform",
                  achievement: "ETHGlobal · Blockscout Partner Prize Winner",
                  description:
                    "Solidity smart contracts for bounty creation, staking, escrow, and automated reward distribution. A transparent, censorship-resistant Web3 bug bounty system with encrypted IPFS submissions and on-chain settlement.",
                  tech: ["Solidity", "Hardhat", "IPFS", "React", "Blockscout"],
                  link: "https://bugchan.xyz",
                },
                {
                  year: "2025",
                  role: "Sui Loyalty DApp",
                  achievement: "Winner — Hash Hunt: Code Deploy Dominate",
                  description:
                    "Full-stack NFT loyalty card DApp with wallet integration on Sui blockchain. Designed seamless UX focusing on scalability and decentralization for businesses issuing blockchain-based loyalty rewards.",
                  tech: ["React", "Vite", "Sui DApp Kit", "TypeScript"],
                  link: "https://sui-workshop.vercel.app/",
                },
                {
                  year: "2025",
                  role: "DAO Governance Platform",
                  achievement: "Ethereum-based Decentralized Governance",
                  description:
                    "Complete DAO system enabling proposal creation, voting, and on-chain execution. Solidity contracts built with Foundry, React frontend for real-time tracking and treasury management.",
                  tech: ["Solidity", "Foundry", "React", "Ethers.js"],
                  link: "https://dev4057.github.io/DAO-dApp/",
                },
                {
                  year: "2024",
                  role: "Coal Carbon Zero (CCZ)",
                  achievement: "2nd Place — Smart India Hackathon (Inter-College)",
                  description:
                    "Data-driven carbon emissions management platform for coal mines, delivering actionable insights on carbon neutrality. Streamlined real-time emissions tracking and sustainability reporting.",
                  tech: ["React.js", "Flask", "Firebase", "Python"],
                  link: "https://github.com/Dev4057/Carbon-Trace",
                },
              ].map((project, index) => (
                <Link
                  key={index}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 p-6 sm:p-8 rounded-2xl border border-border/60 bg-background/30 backdrop-blur card-hover glow-ring"
                >
                  <div className="lg:col-span-2">
                    <div className="text-3xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {project.year}
                    </div>
                  </div>

                  <div className="lg:col-span-7 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium flex items-center gap-2">
                        {project.role}
                        <ArrowUpRight className="w-4 h-4 opacity-0 -translate-x-2 group-hover:opacity-100 group-hover:translate-x-0 transition-all" />
                      </h3>
                      <div className="text-muted-foreground text-sm">{project.achievement}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-2xl text-sm sm:text-base">
                      {project.description}
                    </p>
                  </div>

                  <div className="lg:col-span-3 flex flex-wrap gap-2 lg:justify-end mt-1 lg:mt-0">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground border border-border/50 rounded-full group-hover:border-muted-foreground/50 transition-colors duration-500"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────────────── RESEARCH ───────────────────────────── */}
        <section
          id="research"
          ref={(el) => (sectionsRef.current[4] = el)}
          className="py-24 sm:py-32 opacity-0"
        >
          <div className="space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-widest">
                  04 / RESEARCH
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                  Peer-reviewed publications
                </h2>
              </div>
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              {[
                {
                  venue: "IEEE Xplore",
                  title: "Hybrid LSTM-Based Real Time Energy Demand Forecasting for Smart Grids with Edge Computing",
                  description:
                    "Co-authored paper indexed on IEEE Xplore — a hybrid LSTM approach for real-time energy demand forecasting on edge-deployed smart-grid infrastructure.",
                  url: IEEE_PAPER_URL,
                  tag: "IEEE",
                },
                {
                  venue: "SciTePress",
                  title: "Second Publication (Coming Soon)",
                  description:
                    "Second co-authored paper accepted for publication. The final DOI / SciTePress URL will be live shortly — link placeholder for now.",
                  url: SCITEPRESS_PAPER_URL,
                  tag: "SciTePress",
                },
              ].map((p) => (
                <Link
                  key={p.title}
                  href={p.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 sm:p-8 rounded-2xl border border-border/60 bg-background/30 backdrop-blur card-hover glow-ring"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <FileText className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                      <span className="text-[10px] font-mono tracking-widest px-2 py-1 border border-border/60 rounded-full text-muted-foreground uppercase">
                        {p.tag}
                      </span>
                    </div>
                    <div>
                      <div className="text-xs text-muted-foreground font-mono tracking-widest uppercase">
                        {p.venue}
                      </div>
                      <h3 className="text-lg font-medium mt-1 group-hover:text-muted-foreground transition-colors">
                        {p.title}
                      </h3>
                    </div>
                    <p className="text-sm text-muted-foreground leading-relaxed">{p.description}</p>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      Read paper
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────────────── CERTIFICATIONS (Snowflake) ───────────────────────────── */}
        <section
          id="certifications"
          ref={(el) => (sectionsRef.current[5] = el)}
          className="py-24 sm:py-32 opacity-0"
        >
          <div className="space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-widest">
                  05 / CERTIFICATIONS
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                  Snowflake badges & certifications
                </h2>
                <p className="text-muted-foreground max-w-xl">
                  Hands-on data engineering credentials earned across Snowflake&apos;s core, data
                  warehousing, and AI-native data platform tracks.
                </p>
              </div>
              <Award className="w-10 h-10 text-muted-foreground hidden sm:block" />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6">
              {IMG.snowflake.map((src, i) => (
                <div
                  key={src}
                  className="group relative aspect-square rounded-2xl overflow-hidden border border-border/60 bg-background/40 backdrop-blur card-hover"
                >
                  <Image
                    src={src}
                    alt={`Snowflake badge ${i + 1}`}
                    fill
                    sizes="(max-width: 640px) 45vw, 220px"
                    className="object-contain p-4 transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-x-0 bottom-0 p-3 bg-gradient-to-t from-background/90 to-transparent opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="text-xs font-mono uppercase tracking-widest text-muted-foreground">
                      Snowflake · Badge {i + 1}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────────────── ACHIEVEMENTS ───────────────────────────── */}
        <section
          id="achievements"
          ref={(el) => (sectionsRef.current[6] = el)}
          className="py-24 sm:py-32 opacity-0"
        >
          <div className="space-y-12">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground font-mono tracking-widest">
                06 / RECOGNITION
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                Achievements & leadership
              </h2>
            </div>

            {/* ───── Featured: Student of the Year ───── */}
            <div className="relative rounded-3xl overflow-hidden border border-border/60 bg-background/40 backdrop-blur">
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full blur-3xl opacity-60 bg-[radial-gradient(circle_at_center,rgba(255,200,80,0.35),transparent_60%)]" />
                <div className="absolute -bottom-24 -right-24 h-72 w-72 rounded-full blur-3xl opacity-50 bg-[radial-gradient(circle_at_center,rgba(255,119,180,0.35),transparent_60%)]" />
                <div className="absolute inset-0 bg-grid opacity-30 [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]" />
              </div>

              <div className="relative grid lg:grid-cols-[1.3fr_1fr] gap-0">
                <div className="p-8 sm:p-10 lg:p-12 space-y-6">
                  <div className="flex items-center gap-3">
                    <span className="inline-flex items-center gap-2 text-[10px] font-mono tracking-widest uppercase px-3 py-1 rounded-full border border-border/60 bg-background/50">
                      <Sparkles className="w-3 h-3" />
                      Featured Honor · 2026
                    </span>
                  </div>

                  <div className="space-y-3">
                    <h3 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight leading-[1.1]">
                      Best Outgoing Student
                      <span className="block text-xl sm:text-2xl text-muted-foreground font-light mt-2">
                        Student of the Year · AISSMS IOIT &amp; Computer Department
                      </span>
                    </h3>
                    <div className="flex flex-wrap gap-2 pt-2">
                      <span className="text-xs px-3 py-1.5 rounded-full border border-border/60 bg-background/50 text-foreground">
                        College-wide Award
                      </span>
                      <span className="text-xs px-3 py-1.5 rounded-full border border-border/60 bg-background/50 text-foreground">
                        Computer Department
                      </span>
                      <span className="text-xs px-3 py-1.5 rounded-full border border-border/60 bg-background/50 text-muted-foreground">
                        Class of 2026
                      </span>
                    </div>
                  </div>

                  <p className="text-sm sm:text-base text-muted-foreground leading-relaxed max-w-2xl">
                    Recognized for balancing engineering studies, leading the IOIT ACM Student
                    Chapter, pursuing a parallel music career, and stepping into a professional
                    SDE role at Tulapi.ai — all at once. This honor is a reminder that
                    discipline, consistency, and showing up every day truly pay off.
                  </p>

                  <div className="pt-2 space-y-2 text-xs sm:text-sm text-muted-foreground leading-relaxed">
                    <div className="font-mono tracking-widest uppercase text-[10px] text-muted-foreground/80">
                      With gratitude to
                    </div>
                    <p className="leading-relaxed">
                      <span className="text-foreground">Dr. Pradeep Mane</span> (Principal),{" "}
                      <span className="text-foreground">Dr. Kishor Wagh</span> (HoD, Computer),{" "}
                      <span className="text-foreground">Dr. Sarika Zaware</span> (Dean, IQAC),
                      and mentors <span className="text-foreground">Dr. Girish Navale</span> &amp;{" "}
                      <span className="text-foreground">Dr. Meenakshi Thalor</span> for their
                      unwavering guidance.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={() =>
                    setLightbox({
                      src: IMG.gallery.studentOfYear,
                      alt: "Devang Gandhi — Best Outgoing Student, AISSMS IOIT 2026",
                    })
                  }
                  aria-label="View Student of the Year photo full-size"
                  className="group relative min-h-[260px] lg:min-h-full border-t lg:border-t-0 lg:border-l border-border/60 overflow-hidden cursor-zoom-in text-left"
                >
                  <Image
                    src={IMG.gallery.studentOfYear}
                    alt="Devang Gandhi — Best Outgoing Student, AISSMS IOIT 2026"
                    fill
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-105"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t lg:bg-gradient-to-r from-background/80 via-background/10 to-transparent" />
                  <div className="absolute bottom-4 right-4 flex items-center gap-2 text-xs font-mono tracking-widest uppercase text-foreground/90 bg-background/60 backdrop-blur px-3 py-1.5 rounded-full border border-border/60">
                    <Award className="w-3.5 h-3.5" />
                    AISSMS IOIT · 2026
                  </div>
                </button>
              </div>
            </div>

            <div className="grid lg:grid-cols-2 gap-6">
              {/* ETHGlobal */}
              <Link
                href="https://drive.google.com/file/d/1OpSQ7xkoPT7gPNceUBDg89STHHIYeE3g/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 sm:p-8 rounded-2xl border border-border/60 bg-background/30 backdrop-blur card-hover glow-ring"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Trophy className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="text-xs px-2 py-1 border border-border rounded-full text-muted-foreground">
                      Blockchain
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium">
                      ETHGlobal — Blockscout Partner Prize
                    </h3>
                    <div className="text-sm text-muted-foreground">ETHGlobal</div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Winner for developing BugChan, a decentralized bug bounty platform integrating
                    Blockscout for on-chain data visibility and analytics.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-mono">October 2024</span>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      <span>View Certificate</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* ACM Summer School */}
              <Link
                href="https://drive.google.com/file/d/1PlFbldy9hLge9sySE8hOY-xPi_33Hmhp/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 sm:p-8 rounded-2xl border border-border/60 bg-background/30 backdrop-blur card-hover glow-ring"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <GraduationCap className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="text-xs px-2 py-1 border border-border rounded-full text-muted-foreground">
                      IoT & Networks
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium">
                      ACM Summer School on IoT & Next-Gen Networks
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      Association for Computing Machinery
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Intensive training covering 5G, IoT protocols (Zigbee, LoRa), SDN/NFV, and LLMs
                    with hands-on implementation projects.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-mono">June 2024</span>
                    <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors">
                      <span>View Certificate</span>
                      <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                    </div>
                  </div>
                </div>
              </Link>

              {/* ACM Secretary */}
              <Link
                href="https://drive.google.com/file/d/1uJeKn4W92W4p9mJy4LKbvUnzysM8xW2O/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 sm:p-8 rounded-2xl border border-border/60 bg-background/30 backdrop-blur card-hover glow-ring"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Briefcase className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="text-xs px-2 py-1 border border-border rounded-full text-muted-foreground">
                      Leadership
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium">Secretary</h3>
                    <div className="text-sm text-muted-foreground">IOIT ACM Student Chapter</div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Leading technical initiatives, organizing blockchain and development workshops,
                    and managing chapter operations.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-mono">2024 — 2025</span>
                    <span className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
                      200+ Members
                    </span>
                  </div>
                </div>
              </Link>

              {/* Treasurer */}
              <Link
                href="https://drive.google.com/file/d/1m8e1B2hEf8A9Nj3jdZRCSxUq0r03XN9v/view?usp=drive_link"
                target="_blank"
                rel="noopener noreferrer"
                className="group p-6 sm:p-8 rounded-2xl border border-border/60 bg-background/30 backdrop-blur card-hover glow-ring"
              >
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Wallet className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="text-xs px-2 py-1 border border-border rounded-full text-muted-foreground">
                      Leadership
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium">Treasurer</h3>
                    <div className="text-sm text-muted-foreground">IOIT ACM Student Chapter</div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Managed annual budget, financial planning for technical events, hackathons, and
                    coordinated sponsorships.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-mono">2023 — 2024</span>
                    <span className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
                      ₹5L+ Budget
                    </span>
                  </div>
                </div>
              </Link>

              {/* MUN Finance Head */}
              <div className="group p-6 sm:p-8 rounded-2xl border border-border/60 bg-background/30 backdrop-blur card-hover">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Globe className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="text-xs px-2 py-1 border border-border rounded-full text-muted-foreground">
                      Leadership
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium">Finance Head</h3>
                    <div className="text-sm text-muted-foreground">Model United Nations</div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Managed complete financial operations and sponsorship coordination for two
                    large-scale MUN conferences.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-mono">2023 — 2024</span>
                    <span className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
                      500+ Participants
                    </span>
                  </div>
                </div>
              </div>

              {/* Piano Mentor */}
              <div className="group p-6 sm:p-8 rounded-2xl border border-border/60 bg-background/30 backdrop-blur card-hover">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Music className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="text-xs px-2 py-1 border border-border rounded-full text-muted-foreground">
                      Mentorship
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium">Piano Instructor & Mentor</h3>
                    <div className="text-sm text-muted-foreground">Community Teaching</div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Conducting piano and music theory classes, providing individual mentorship,
                    and fostering musical talent in students of all age groups.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-mono">2022 — Present</span>
                    <span className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
                      300+ Students
                    </span>
                  </div>
                </div>
              </div>

              {/* Speaker */}
              <div className="group p-6 sm:p-8 rounded-2xl border border-border/60 bg-background/30 backdrop-blur card-hover lg:col-span-2">
                <div className="space-y-4">
                  <div className="flex items-center justify-between">
                    <Mic className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors" />
                    <span className="text-xs px-2 py-1 border border-border rounded-full text-muted-foreground">
                      Speaking
                    </span>
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-medium">
                      Technical Speaker & Workshop Facilitator
                    </h3>
                    <div className="text-sm text-muted-foreground">
                      College Events & Tech Conferences
                    </div>
                  </div>
                  <p className="text-muted-foreground leading-relaxed text-sm">
                    Delivered technical talks on blockchain technology, Web3 development, and
                    full-stack engineering at college fests and community workshops.
                  </p>
                  <div className="flex items-center justify-between">
                    <span className="text-xs text-muted-foreground font-mono">2022 — Present</span>
                    <span className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
                      10+ Events
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* ───────────────────────────── GALLERY ───────────────────────────── */}
        <section
          id="gallery"
          ref={(el) => (sectionsRef.current[7] = el)}
          className="py-24 sm:py-32 opacity-0"
        >
          <div className="space-y-12">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <div className="space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-widest">
                  07 / BEYOND THE CODE
                </div>
                <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">
                  Moments that shape me
                </h2>
                <p className="text-muted-foreground max-w-xl">
                  Piano keys, students, stages — the world I build outside the terminal.
                </p>
              </div>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-6 auto-rows-[160px] sm:auto-rows-[220px] gap-3 sm:gap-4">
              {[
                { src: IMG.gallery.piano1, alt: "Playing piano", cls: "col-span-2 row-span-2", label: "Piano · Stage" },
                { src: IMG.gallery.students1, alt: "With students", cls: "col-span-2 row-span-1", label: "Teaching" },
                { src: IMG.gallery.speaking1, alt: "Technical talk", cls: "col-span-2 row-span-1", label: "Speaking" },
                { src: IMG.gallery.hackathon1, alt: "Hackathon", cls: "col-span-2 row-span-2", label: "Hackathon Win" },
                { src: IMG.gallery.piano2, alt: "Piano closeup", cls: "col-span-2 row-span-1", label: "Music" },
                { src: IMG.gallery.students2, alt: "Workshop", cls: "col-span-2 row-span-1", label: "Workshop" },
              ].map((g, i) => (
                <button
                  key={i}
                  type="button"
                  onClick={() => setLightbox({ src: g.src, alt: g.alt })}
                  aria-label={`View ${g.label} full-size`}
                  className={`group relative overflow-hidden rounded-2xl border border-border/60 bg-background/40 backdrop-blur gallery-tilt cursor-zoom-in text-left ${g.cls}`}
                >
                  <Image
                    src={g.src}
                    alt={g.alt}
                    fill
                    sizes="(max-width: 768px) 50vw, 33vw"
                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-background/80 via-background/10 to-transparent opacity-70 group-hover:opacity-50 transition-opacity" />
                  <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                    <div className="flex items-center gap-1.5 text-[10px] font-mono uppercase tracking-widest text-white/90 bg-black/40 backdrop-blur px-2 py-1 rounded-full border border-white/20">
                      <Sparkles className="w-3 h-3" />
                      View
                    </div>
                  </div>
                  <figcaption className="absolute bottom-3 left-3 right-3 flex items-center justify-between">
                    <span className="text-xs font-mono uppercase tracking-widest text-white/90 drop-shadow">
                      {g.label}
                    </span>
                  </figcaption>
                </button>
              ))}
            </div>
          </div>
        </section>

        {/* ───────────────────────────── CONNECT ───────────────────────────── */}
        <section
          id="connect"
          ref={(el) => (sectionsRef.current[8] = el)}
          className="py-24 sm:py-32 opacity-0"
        >
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono tracking-widest">
                08 / CONTACT
              </div>
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-light tracking-tight">Let&apos;s build something.</h2>
              <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-md">
                Open to full-stack roles, Web3 collaborations, research conversations, and good old
                technical deep-dives over coffee.
              </p>

              <div className="space-y-4 pt-2">
                <Link
                  href="mailto:devanggandhi04@gmail.com"
                  className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors"
                >
                  <span className="text-base sm:text-lg">devanggandhi04@gmail.com</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
                <Link
                  href="tel:+917385234057"
                  className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors"
                >
                  <span className="text-base sm:text-lg">+91 7385234057</span>
                  <ArrowRight className="w-5 h-5 transform group-hover:translate-x-1 transition-transform" />
                </Link>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono tracking-widest">
                ELSEWHERE
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {[
                  { name: "GitHub", handle: "Dev4057", url: "https://github.com/Dev4057" },
                  {
                    name: "LinkedIn",
                    handle: "Devang Gandhi",
                    url: "https://www.linkedin.com/in/devang-gandhi-917304213/",
                  },
                  { name: "LeetCode", handle: "Devang_007", url: "https://leetcode.com/u/Devang_007/" },
                  { name: "X (Twitter)", handle: "Dev_9007", url: "https://x.com/Dev_9007" },
                ].map((social) => (
                  <Link
                    key={social.name}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group p-4 rounded-xl border border-border/60 bg-background/30 backdrop-blur card-hover"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors flex items-center justify-between">
                        {social.name}
                        <ArrowUpRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity" />
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}

                <a
                  href="/Devang-Gandhi-Resume.txt"
                  download="Devang-Gandhi-Resume.txt"
                  className="group p-4 rounded-xl border border-border/60 bg-background/30 backdrop-blur card-hover"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-foreground group-hover:text-muted-foreground transition-colors">
                      <Download className="w-4 h-4" />
                      Resume
                    </div>
                    <div className="text-sm text-muted-foreground">Download</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </section>

        <footer className="py-12 sm:py-16 border-t border-border/60">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">
                © 2026 Devang Gandhi
              </div>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={toggleTheme}
                className="group p-3 rounded-lg border border-border hover:border-muted-foreground/50 transition-all duration-300"
                aria-label="Toggle theme"
              >
                {isDark ? (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 2a1 1 0 011 1v1a1 1 0 11-2 0V3a1 1 0 011-1zm4 8a4 4 0 11-8 0 4 4 0 018 0zm-.464 4.95l.707.707a1 1 0 001.414-1.414l-.707-.707a1 1 0 00-1.414 1.414zm2.12-10.607a1 1 0 010 1.414l-.706.707a1 1 0 11-1.414-1.414l.707-.707a1 1 0 011.414 0zM17 11a1 1 0 100-2h-1a1 1 0 100 2h1zm-7 4a1 1 0 011 1v1a1 1 0 11-2 0v-1a1 1 0 011-1zM5.05 6.464A1 1 0 106.465 5.05l-.708-.707a1 1 0 00-1.414 1.414l.707.707a1 1 0 001.414 0zM4 11a1 1 0 100-2H3a1 1 0 000 2h1z"
                      clipRule="evenodd"
                    />
                  </svg>
                ) : (
                  <svg
                    className="w-4 h-4 text-muted-foreground group-hover:text-foreground transition-colors duration-300"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M17.293 13.293A8 8 0 016.707 2.707a8.001 8.001 0 1010.586 10.586z" />
                  </svg>
                )}
              </button>
            </div>
          </div>
        </footer>
      </main>

      {/* ───────────────────────────── LIGHTBOX ───────────────────────────── */}
      {lightbox && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label={lightbox.alt}
          onClick={() => setLightbox(null)}
          className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-8 bg-black/85 backdrop-blur-md animate-fade-in-up cursor-zoom-out"
        >
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation()
              setLightbox(null)
            }}
            aria-label="Close"
            className="absolute top-4 right-4 sm:top-6 sm:right-6 z-10 p-2.5 rounded-full border border-white/20 bg-black/40 text-white/90 hover:bg-white hover:text-black transition-colors"
          >
            <X className="w-5 h-5" />
          </button>
          <div
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-[95vw] max-h-[90vh] w-full h-full cursor-default"
          >
            <Image
              src={lightbox.src}
              alt={lightbox.alt}
              fill
              sizes="100vw"
              priority
              className="object-contain"
            />
          </div>
          <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-xs font-mono uppercase tracking-widest text-white/70 bg-black/40 backdrop-blur px-3 py-1.5 rounded-full border border-white/10">
            Press ESC or click anywhere to close
          </div>
        </div>
      )}
    </div>
  )
}
