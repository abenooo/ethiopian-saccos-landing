"use client"

import { EthiopiaMap } from "@/components/ethiopia-map"
import { SaccoStats } from "@/components/sacco-stats"

export default function Page() {
  return (
    <div className="min-h-screen bg-background">
      <div className="relative h-screen w-full">
        <EthiopiaMap />
        <SaccoStats />
      </div>
    </div>
  )
}
