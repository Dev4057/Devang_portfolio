"use client"

import Link from "next/link"
import { useEffect, useRef, useState } from "react"
import { Trophy, GraduationCap, Briefcase, Wallet, Globe, Music, Mic, ArrowRight, Download } from "lucide-react"

export default function Home() {
  const [isDark, setIsDark] = useState(true)
  const [activeSection, setActiveSection] = useState("")
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
      { threshold: 0.3, rootMargin: "0px 0px -20% 0px" },
    )

    sectionsRef.current.forEach((section) => {
      if (section) observer.observe(section)
    })

    return () => observer.disconnect()
  }, [])

  const toggleTheme = () => {
    setIsDark(!isDark)
  }

  return (
    <div className="min-h-screen bg-background text-foreground relative">
      <nav className="fixed left-8 top-1/2 -translate-y-1/2 z-10 hidden lg:block">
        <div className="flex flex-col gap-4">
          {["intro", "work", "achievements", "connect"].map((section) => (
            <button
              key={section}
              onClick={() => document.getElementById(section)?.scrollIntoView({ behavior: "smooth" })}
              className={`w-2 h-8 rounded-full transition-all duration-500 ${
                activeSection === section ? "bg-foreground" : "bg-muted-foreground/30 hover:bg-muted-foreground/60"
              }`}
              aria-label={`Navigate to ${section}`}
            />
          ))}
        </div>
      </nav>

      <main className="max-w-4xl mx-auto px-6 sm:px-8 lg:px-16">
        <header
          id="intro"
          ref={(el) => (sectionsRef.current[0] = el)}
          className="min-h-screen flex items-center opacity-0"
        >
          <div className="grid lg:grid-cols-5 gap-12 sm:gap-16 w-full">
            <div className="lg:col-span-3 space-y-6 sm:space-y-8">
              <div className="space-y-3 sm:space-y-2">
                <div className="text-sm text-muted-foreground font-mono tracking-wider">PORTFOLIO / 2025</div>
                <h1 className="text-5xl sm:text-6xl lg:text-7xl font-light tracking-tight">
                  Devang
                  <br />
                  <span className="text-muted-foreground">Gandhi</span>
                </h1>
              </div>

              <div className="space-y-6 max-w-md">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Blockchain developer building decentralized solutions at the intersection of
                  <span className="text-foreground"> smart contracts</span>,
                  <span className="text-foreground"> DeFi protocols</span>, and
                  <span className="text-foreground"> Web3 innovation</span>. Also crafting robust
                  <span className="text-foreground"> backend systems</span> and
                  <span className="text-foreground"> RESTful APIs</span> that power modern applications.
                </p>

                <div className="flex flex-col sm:flex-row sm:items-center gap-3 sm:gap-4 text-sm text-muted-foreground">
                  <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    Available for work
                  </div>
                  <div>Pune, India</div>
                </div>
              </div>
            </div>

            <div className="lg:col-span-2 flex flex-col justify-end space-y-6 sm:space-y-8 mt-8 lg:mt-0">
              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">CURRENTLY</div>
                <div className="space-y-2">
                  <div className="text-foreground">Fullstack Blockchain Developer & Researcher</div>
                  <div className="text-muted-foreground">@ Independent / ACM Student Chapter</div>
                  <div className="text-xs text-muted-foreground">2023 — Present</div>
                </div>
              </div>

              <div className="space-y-4">
                <div className="text-sm text-muted-foreground font-mono">FOCUS</div>
                <div className="flex flex-wrap gap-2">
                  {["Solidity", "React.js", "TypeScript", "DeFi", "Smart Contracts", "Node.js", "Foundry/Hardhat"].map(
                    (skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 text-xs border border-border rounded-full hover:border-muted-foreground/50 transition-colors duration-300"
                      >
                        {skill}
                      </span>
                    ),
                  )}
                </div>
              </div>
            </div>
          </div>
        </header>

        <section
          id="work"
          ref={(el) => (sectionsRef.current[1] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4">
              <h2 className="text-3xl sm:text-4xl font-light">Selected Work</h2>
              <div className="text-sm text-muted-foreground font-mono">2024 — 2025</div>
            </div>

            <div className="space-y-8 sm:space-y-12">
              {[
                {
                  year: "2025",
                  role: "BugChan - Decentralized Bug Bounty Platform",
                  achievement: "ETHGlobal Blockscout Prize Winner",
                  description:
                    "Developed Solidity smart contracts for bounty creation, staking, escrow, and automated reward distribution. Built a transparent, censorship-resistant Web3 bug bounty system with encrypted IPFS submissions and on-chain settlement using Hardhat.",
                  tech: ["Solidity", "Hardhat", "IPFS", "React", "Blockscout"],
                  link: "https://bugchan.xyz",
                },
                {
                  year: "2025",
                  role: "Sui Loyalty DApp",
                  achievement: "Winner - Hash Hunt: Code Deploy Dominate",
                  description:
                    "Built a full-stack NFT loyalty card DApp with wallet integration on Sui blockchain. Designed seamless UX focusing on scalability and decentralization, enabling businesses to issue and manage blockchain-based loyalty rewards.",
                  tech: ["React", "Vite", "Sui DApp Kit", "TypeScript"],
                  link: "https://sui-workshop.vercel.app/",
                },
                {
                  year: "2025",
                  role: "DAO Governance Platform",
                  achievement: "Ethereum-based Decentralized Governance",
                  description:
                    "Built a complete DAO system enabling proposal creation, voting, and on-chain execution. Developed smart contracts in Solidity using Foundry with React frontend for real-time tracking and treasury management.",
                  tech: ["Solidity", "Foundry", "React", "Ethers.js"],
                  link: "https://dev4057.github.io/DAO-dApp/",
                },
                {
                  year: "2024",
                  role: "Coal Carbon Zero (CCZ)",
                  achievement: "2nd Place - Smart India Hackathon (Inter-College)",
                  description:
                    "Designed a data-driven carbon emissions management platform for coal mines, delivering actionable insights on carbon neutrality. Streamlined real-time emissions tracking and sustainability reporting.",
                  tech: ["React.js", "Flask", "Firebase", "Python"],
                  link: "https://github.com/Dev4057/Carbon-Trace",
                },
              ].map((project, index) => (
                <Link
                  key={index}
                  href={project.link}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group grid lg:grid-cols-12 gap-4 sm:gap-8 py-6 sm:py-8 border-b border-border/50 hover:border-border transition-colors duration-500 cursor-pointer"
                >
                  <div className="lg:col-span-2">
                    <div className="text-xl sm:text-2xl font-light text-muted-foreground group-hover:text-foreground transition-colors duration-500">
                      {project.year}
                    </div>
                  </div>

                  <div className="lg:col-span-6 space-y-3">
                    <div>
                      <h3 className="text-lg sm:text-xl font-medium">{project.role}</h3>
                      <div className="text-muted-foreground text-sm">{project.achievement}</div>
                    </div>
                    <p className="text-muted-foreground leading-relaxed max-w-lg">{project.description}</p>
                  </div>

                  <div className="lg:col-span-4 flex flex-wrap gap-2 lg:justify-end mt-2 lg:mt-0">
                    {project.tech.map((tech) => (
                      <span
                        key={tech}
                        className="px-2 py-1 text-xs text-muted-foreground rounded group-hover:border-muted-foreground/50 transition-colors duration-500"
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

        <section
          id="achievements"
          ref={(el) => (sectionsRef.current[2] = el)}
          className="min-h-screen py-20 sm:py-32 opacity-0"
        >
          <div className="space-y-12 sm:space-y-16">
            <div className="space-y-2">
              <h2 className="text-3xl sm:text-4xl font-light">Achievements & Leadership</h2>
              <p className="text-sm text-muted-foreground font-mono tracking-wider">RECOGNITION & COMMUNITY IMPACT</p>
            </div>

            <div className="grid lg:grid-cols-2 gap-8 sm:gap-12">
              {/* LEFT COLUMN: Awards & Recognition */}
              <div className="space-y-6">
                {/* ETHGlobal Card */}
                <Link
                  href="https://drive.google.com/file/d/1OpSQ7xkoPT7gPNceUBDg89STHHIYeE3g/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg hover:scale-[1.01] cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Trophy className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                      <span className="text-xs px-2 py-1 border border-border rounded-full text-muted-foreground">
                        Blockchain
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                        ETHGlobal - Blockscout Partner Prize
                      </h3>
                      <div className="text-sm text-muted-foreground">ETHGlobal</div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Winner for developing BugChan, a decentralized bug bounty platform integrating Blockscout for
                      on-chain data visibility and analytics.
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-mono">October 2024</span>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <span>View Certificate</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>

                {/* ACM Summer School Card */}
                <Link
                  href="https://drive.google.com/file/d/1PlFbldy9hLge9sySE8hOY-xPi_33Hmhp/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg hover:scale-[1.01] cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <GraduationCap className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                      <span className="text-xs px-2 py-1 border border-border rounded-full text-muted-foreground">
                        IoT & Networks
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                        ACM Summer School on IoT & Next-Gen Networks
                      </h3>
                      <div className="text-sm text-muted-foreground">Association for Computing Machinery</div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Intensive training program covering 5G technologies, IoT protocols (Zigbee, LoRa),
                      Software-Defined Networking (SDN/NFV), and Large Language Models with hands-on implementation
                      projects.
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-mono">June 2024</span>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <span>View Certificate</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>
                  </div>
                </Link>
              </div>

              {/* RIGHT COLUMN: Leadership & Community Impact */}
              <div className="space-y-6">
                {/* ACM Secretary Card */}
                <Link
                  href="https://drive.google.com/file/d/1uJeKn4W92W4p9mJy4LKbvUnzysM8xW2O/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg hover:scale-[1.01] cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Briefcase className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                      <span className="text-xs px-2 py-1 border border-border rounded-full text-muted-foreground">
                        Leadership
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                        Secretary
                      </h3>
                      <div className="text-sm text-muted-foreground">IOIT ACM Student Chapter</div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Leading technical initiatives, organizing blockchain and development workshops, and managing
                      chapter operations for the student community.
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-mono">2024 — 2025</span>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <span>View Certificate</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
                        200+ Members
                      </span>
                    </div>
                  </div>
                </Link>

                {/* ACM Treasurer Card */}
                <Link
                  href="https://drive.google.com/file/d/1m8e1B2hEf8A9Nj3jdZRCSxUq0r03XN9v/view?usp=drive_link"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg hover:scale-[1.01] cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Wallet className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                      <span className="text-xs px-2 py-1 border border-border rounded-full text-muted-foreground">
                        Leadership
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                        Treasurer
                      </h3>
                      <div className="text-sm text-muted-foreground">IOIT ACM Student Chapter</div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Managed annual budget, financial planning for technical events, hackathons, and coordinated
                      sponsorships for chapter activities.
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-mono">2023 — 2024</span>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground group-hover:text-foreground transition-colors duration-300">
                        <span>View Certificate</span>
                        <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform duration-300" />
                      </div>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
                        ₹5L+ Budget
                      </span>
                    </div>
                  </div>
                </Link>

                {/* MUN Finance Head Card */}
                <Link
                  href="#"
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg hover:scale-[1.01] cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Globe className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                      <span className="text-xs px-2 py-1 border border-border rounded-full text-muted-foreground">
                        Leadership
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                        Finance Head
                      </h3>
                      <div className="text-sm text-muted-foreground">Model United Nations</div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Managed complete financial operations and sponsorship coordination for two large-scale Model
                      United Nations conferences.
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-mono">2023 — 2024</span>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
                        500+ Participants
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Piano Mentor Card */}
                <Link
                  href="#"
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg hover:scale-[1.01] cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Music className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                      <span className="text-xs px-2 py-1 border border-border rounded-full text-muted-foreground">
                        Mentorship
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                        Piano Instructor & Mentor
                      </h3>
                      <div className="text-sm text-muted-foreground">Community Teaching</div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Conducting piano and music theory classes, providing individual mentorship, and fostering musical
                      talent in students of all age groups.
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-mono">2022 — 2026</span>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
                        300+ Students
                      </span>
                    </div>
                  </div>
                </Link>

                {/* Public Speaker Card */}
                <Link
                  href="#"
                  className="group p-6 sm:p-8 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-500 hover:shadow-lg hover:scale-[1.01] cursor-pointer"
                >
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <Mic className="w-5 h-5 text-muted-foreground group-hover:text-foreground transition-colors duration-300" />
                      <span className="text-xs px-2 py-1 border border-border rounded-full text-muted-foreground">
                        Speaking
                      </span>
                    </div>

                    <div className="space-y-1">
                      <h3 className="text-lg sm:text-xl font-medium group-hover:text-muted-foreground transition-colors duration-300">
                        Technical Speaker & Workshop Facilitator
                      </h3>
                      <div className="text-sm text-muted-foreground">College Events & Tech Conferences</div>
                    </div>

                    <p className="text-muted-foreground leading-relaxed text-sm">
                      Delivered technical talks on blockchain technology, Web3 development, and full-stack engineering
                      at college fests and community workshops.
                    </p>

                    <div className="flex items-center justify-between">
                      <span className="text-xs text-muted-foreground font-mono">2022 — Present</span>
                    </div>

                    <div className="pt-2">
                      <span className="text-xs px-3 py-1 bg-secondary text-secondary-foreground rounded-full">
                        10+ Events
                      </span>
                    </div>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        </section>

        <section id="connect" ref={(el) => (sectionsRef.current[3] = el)} className="py-20 sm:py-32 opacity-0">
          <div className="grid lg:grid-cols-2 gap-12 sm:gap-16">
            <div className="space-y-6 sm:space-y-8">
              <h2 className="text-3xl sm:text-4xl font-light">Let's Connect</h2>

              <div className="space-y-6">
                <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed">
                  Always interested in blockchain collaborations, smart contract development opportunities, and
                  conversations about DeFi, Web3, and decentralized systems.
                </p>

                <div className="space-y-4">
                  <Link
                    href="mailto:devanggandhi04@gmail.com"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">devanggandhi04@gmail.com</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>

                  <Link
                    href="tel:+917385234057"
                    className="group flex items-center gap-3 text-foreground hover:text-muted-foreground transition-colors duration-300"
                  >
                    <span className="text-base sm:text-lg">+91 7385234057</span>
                    <svg
                      className="w-5 h-5 transform group-hover:translate-x-1 transition-transform duration-300"
                      fill="none"
                      stroke="currentColor"
                      viewBox="0 0 24 24"
                    >
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                    </svg>
                  </Link>
                </div>
              </div>
            </div>

            <div className="space-y-6 sm:space-y-8">
              <div className="text-sm text-muted-foreground font-mono">ELSEWHERE</div>

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
                    className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm"
                  >
                    <div className="space-y-2">
                      <div className="text-foreground group-hover:text-muted-foreground transition-colors duration-300">
                        {social.name}
                      </div>
                      <div className="text-sm text-muted-foreground">{social.handle}</div>
                    </div>
                  </Link>
                ))}

                <a
                  href="/Devang-Gandhi-Resume.txt"
                  download="Devang-Gandhi-Resume.txt"
                  className="group p-4 border border-border rounded-lg hover:border-muted-foreground/50 transition-all duration-300 hover:shadow-sm cursor-pointer"
                >
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-foreground group-hover:text-muted-foreground transition-colors duration-300">
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

        <footer className="py-12 sm:py-16 border-t border-border">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-center gap-6 sm:gap-8">
            <div className="space-y-2">
              <div className="text-sm text-muted-foreground">© 2025 Devang Gandhi. All rights reserved.</div>
              <div className="text-xs text-muted-foreground">Built with Next.js & Tailwind CSS</div>
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

      <div className="fixed bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background via-background/80 to-transparent pointer-events-none"></div>
    </div>
  )
}
