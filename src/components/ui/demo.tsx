'use client'

import { SplineScene } from '@/components/ui/splite'
import { Card } from '@/components/ui/card'
import { Spotlight } from '@/components/ui/spotlight'

export function SplineSceneBasic() {
  return (
    <Card className="w-full h-[500px] relative overflow-hidden" style={{
      background: 'radial-gradient(circle at top right, rgba(102, 190, 122, 0.15), transparent 40%), linear-gradient(135deg, rgba(8, 44, 28, 0.8), rgba(13, 61, 39, 0.75))',
      border: '1px solid rgba(188, 234, 205, 0.18)'
    }}>
      <Spotlight className="-top-40 left-0 md:left-60 md:-top-20" fill="rgba(142, 227, 169, 0.2)" />

      <div className="w-full h-full relative">
        <SplineScene
          scene="https://prod.spline.design/kZDDjO5HuC9GJUM2/scene.splinecode"
          className="w-full h-full"
        />
      </div>
    </Card>
  )
}
