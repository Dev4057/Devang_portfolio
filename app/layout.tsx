import type React from "react"
import type { Metadata } from "next"
import { Geist } from "next/font/google"
import "./globals.css"

const geist = Geist({
  subsets: ["latin"],
  display: "swap",
  variable: "--font-geist",
})

export const metadata: Metadata = {
  title: "Devang Gandhi — SDE · Web3 Builder · Researcher",
  description:
    "SDE at Tulapi.ai. Full-stack & blockchain builder, ZK-curious, technical writer at Blok Capital, two-time published researcher, and pianist. Winner of ETHGlobal Blockscout Prize.",
  keywords: [
    "Devang Gandhi",
    "SDE",
    "Tulapi.ai",
    "Blockchain Developer",
    "Zero Knowledge Proofs",
    "Blok Capital",
    "Snowflake",
    "Web3",
    "Pramaan",
  ],
  openGraph: {
    title: "Devang Gandhi — SDE · Web3 Builder · Researcher",
    description:
      "SDE at Tulapi.ai. ZK, decentralized systems, published research, and a pianist at heart.",
    type: "website",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body className="font-sans antialiased">{children}</body>
    </html>
  )
}
