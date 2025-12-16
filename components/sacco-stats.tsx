"use client"

import { Card } from "@/components/ui/card"
import { saccoData } from "@/lib/sacco-data"
import { useEffect, useState } from "react"

export function SaccoStats() {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  const totalSACCOs = saccoData.reduce((sum, region) => sum + region.saccos, 0)
  const totalMembers = saccoData.reduce((sum, region) => {
    const membersNum = Number.parseFloat(region.members.replace(/[~,]/g, ""))
    return sum + membersNum
  }, 0)

  const totalCapital = saccoData.reduce((sum, region) => {
    const capitalNum = Number.parseFloat(region.capital.replace(/[~,ETB]/g, ""))
    return sum + capitalNum
  }, 0)

  return (
    <div
      className={`absolute top-8 left-8 z-10 space-y-4 transition-all duration-1000 ${mounted ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-4"}`}
    >
      <div className="space-y-2">
        <h1 className="text-4xl font-bold text-foreground text-balance">Ethiopia SACCO Distribution</h1>
        <p className="text-muted-foreground text-base max-w-md leading-relaxed">
          Interactive 3D visualization of cooperative organizations across all regions
        </p>
      </div>

      <div className="flex gap-3">
        <Card className="bg-card/90 backdrop-blur-sm border-primary/30 px-6 py-4">
          <div className="text-3xl font-bold text-primary tabular-nums">{totalSACCOs.toLocaleString()}</div>
          <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">Total SACCOs</div>
        </Card>

        <Card className="bg-card/90 backdrop-blur-sm border-foreground/20 px-6 py-4">
          <div className="text-3xl font-bold text-foreground tabular-nums">{(totalMembers / 1000000).toFixed(1)}M</div>
          <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">Total Members</div>
        </Card>

        <Card className="bg-card/90 backdrop-blur-sm border-accent/30 px-6 py-4">
          <div className="text-3xl font-bold text-accent tabular-nums">{(totalCapital / 1000000000).toFixed(1)}B</div>
          <div className="text-xs text-muted-foreground mt-1 uppercase tracking-wide">Total Capital (ETB)</div>
        </Card>
      </div>

      <Card className="bg-card/90 backdrop-blur-sm border-border px-4 py-3 max-w-md">
        <p className="text-sm text-muted-foreground leading-relaxed">
          <span className="text-primary font-semibold">Hover</span> over dots for details.
          <span className="text-foreground font-semibold"> Drag</span> to rotate,
          <span className="text-accent font-semibold"> scroll</span> to zoom.
        </p>
      </Card>
    </div>
  )
}
