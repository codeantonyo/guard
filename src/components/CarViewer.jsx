import { Suspense, useEffect, useMemo, Component } from 'react'
import { Canvas, useThree } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, ContactShadows } from '@react-three/drei'
import { gsap } from 'gsap'
import * as THREE from 'three'
import { cars, defaultCar } from '../data/cars'

// Material parameters per film finish — makes matte look matte, chrome look chrome.
const FINISH = {
  gloss: { metalness: 0.45, roughness: 0.12, clearcoat: 1.0, clearcoatRoughness: 0.06, envMapIntensity: 1.5, iridescence: 0 },
  matte: { metalness: 0.0, roughness: 0.88, clearcoat: 0.0, clearcoatRoughness: 0.6, envMapIntensity: 0.45, iridescence: 0 },
  satin: { metalness: 0.2, roughness: 0.42, clearcoat: 0.45, clearcoatRoughness: 0.32, envMapIntensity: 0.9, iridescence: 0 },
  chrome: { metalness: 1.0, roughness: 0.045, clearcoat: 1.0, clearcoatRoughness: 0.03, envMapIntensity: 2.2, iridescence: 0 },
  metallic: { metalness: 0.9, roughness: 0.28, clearcoat: 0.85, clearcoatRoughness: 0.18, envMapIntensity: 1.6, iridescence: 0 },
  colorshift: { metalness: 0.75, roughness: 0.16, clearcoat: 1.0, clearcoatRoughness: 0.08, envMapIntensity: 1.7, iridescence: 1 },
}

// Prepare (clone + recolor-prep + auto-fit) each model once, then cache it so
// switching back to a model is instant.
const prepCache = new Map()
function getPrepared(scene, car) {
  if (prepCache.has(car.id)) return prepCache.get(car.id)

  const root = scene.clone(true)
  const re = new RegExp(car.paint.match, 'i')
  const paintMat = new THREE.MeshPhysicalMaterial({
    color: new THREE.Color('#0a0a0a'),
    metalness: FINISH.gloss.metalness,
    roughness: FINISH.gloss.roughness,
    clearcoat: FINISH.gloss.clearcoat,
    clearcoatRoughness: FINISH.gloss.clearcoatRoughness,
    envMapIntensity: FINISH.gloss.envMapIntensity,
  })
  paintMat.name = 'GuardPaint'

  root.traverse((o) => {
    if (!o.isMesh) return
    o.castShadow = false
    o.receiveShadow = false
    const hit = car.paint.by === 'mesh' ? re.test(o.name || '') : re.test(o.material?.name || '')
    if (hit) o.material = paintMat
  })

  // Fit to a ~4.4-unit box centered at the origin.
  const box = new THREE.Box3().setFromObject(root)
  const size = box.getSize(new THREE.Vector3())
  const center = box.getCenter(new THREE.Vector3())
  const maxDim = Math.max(size.x, size.y, size.z) || 1
  const scale = 4.4 / maxDim
  root.scale.setScalar(scale)
  root.position.set(-center.x * scale, -center.y * scale, -center.z * scale)

  const prepared = { root, paintMat, groundY: -(size.y * scale) / 2, radius: (Math.max(size.x, size.z) * scale) / 2 }
  prepCache.set(car.id, prepared)
  return prepared
}

function CarModel({ car, selectedFilm, onReady }) {
  const { scene } = useGLTF(car.file)
  const invalidate = useThree((s) => s.invalidate)
  const { root, paintMat, groundY, radius } = useMemo(() => getPrepared(scene, car), [scene, car])

  // Animate paint colour + finish whenever the selected film changes.
  useEffect(() => {
    if (!selectedFilm) return
    const target = FINISH[selectedFilm.finish] || FINISH.gloss
    const color = new THREE.Color(selectedFilm.hex)

    const wantIrid = target.iridescence ? 0.7 : 0
    if ((paintMat.iridescence > 0) !== (wantIrid > 0)) {
      paintMat.iridescence = wantIrid
      if (wantIrid) {
        paintMat.iridescenceIOR = 1.8
        paintMat.iridescenceThicknessRange = [120, 480]
      }
      paintMat.needsUpdate = true
    } else {
      paintMat.iridescence = wantIrid
    }

    const t1 = gsap.to(paintMat.color, { r: color.r, g: color.g, b: color.b, duration: 0.7, ease: 'power2.out', onUpdate: invalidate })
    const t2 = gsap.to(paintMat, {
      metalness: target.metalness,
      roughness: target.roughness,
      clearcoat: target.clearcoat,
      clearcoatRoughness: target.clearcoatRoughness,
      envMapIntensity: target.envMapIntensity,
      duration: 0.7,
      ease: 'power2.out',
      onUpdate: invalidate,
    })
    return () => { t1.kill(); t2.kill() }
  }, [selectedFilm, paintMat, invalidate])

  // Signal that this model is mounted (fires after Suspense resolves).
  useEffect(() => { onReady?.(car.id) }, [car.id, onReady])

  return (
    <>
      <primitive object={root} />
      <ContactShadows position={[0, groundY, 0]} opacity={0.5} scale={Math.max(8, radius * 4)} blur={2.6} far={4} resolution={1024} color="#000000" />
    </>
  )
}

// Render-on-demand controller: when the scene is idle (paused / off-screen) we
// stop the render loop and only draw when something actually changes.
function Rig({ active, paused, selectedFilm, carId }) {
  const invalidate = useThree((s) => s.invalidate)
  useEffect(() => { invalidate() }, [active, paused, selectedFilm, carId, invalidate])
  return null
}

class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    return this.state.failed ? this.props.fallback : this.props.children
  }
}

export default function CarViewer({ car = defaultCar, selectedFilm, paused = false, active = true, hint = 'DRAG TO ROTATE · SCROLL TO ZOOM', onReady }) {
  const live = active && !paused
  const fallback = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '420px', textAlign: 'center', padding: '24px' }}>
      <div>
        <div style={{ fontFamily: 'var(--font-display)', fontSize: '28px', color: '#1DB954' }}>3D viewer unavailable</div>
        <div style={{ fontFamily: 'var(--font-body)', fontSize: '13px', color: 'var(--c-text-3)', marginTop: '8px' }}>Pick a finish from the swatches →</div>
      </div>
    </div>
  )

  return (
    // data-lenis-prevent: stop Lenis hijacking wheel events so scroll-to-zoom
    // on the car doesn't scroll the page.
    <div data-lenis-prevent style={{ width: '100%', height: '100%', position: 'relative' }}>
      <CanvasErrorBoundary fallback={fallback}>
        <Canvas
          camera={{ position: [4.6, 1.6, 6.2], fov: 38 }}
          gl={{ antialias: true, alpha: true, powerPreference: 'high-performance' }}
          style={{ background: 'transparent' }}
          dpr={[1, 1.75]}
          frameloop={live ? 'always' : 'demand'}
        >
          <Suspense fallback={null}>
            <ambientLight intensity={0.45} />
            <directionalLight position={[5, 8, 3]} intensity={1.4} />
            <directionalLight position={[-5, 2, -3]} intensity={0.5} color="#1DB954" />
            <pointLight position={[0, 4, 0]} intensity={0.4} />

            <CarModel car={car} selectedFilm={selectedFilm} onReady={onReady} />

            <Environment preset="city" />

            <OrbitControls
              makeDefault
              enablePan={false}
              enableDamping
              minDistance={3.5}
              maxDistance={12}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2.05}
              autoRotate={live}
              autoRotateSpeed={0.5}
              target={[0, 0, 0]}
            />
            <Rig active={active} paused={paused} selectedFilm={selectedFilm} carId={car.id} />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>

      <div
        style={{
          position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'var(--font-body)', fontSize: '11px', color: 'var(--c-text-faint)',
          letterSpacing: '0.1em', whiteSpace: 'nowrap', pointerEvents: 'none',
        }}
      >
        {hint}
      </div>
    </div>
  )
}

// Preload the default car so it's ready by the time the showcase mounts.
useGLTF.preload(defaultCar.file)
// Hover-prefetch helper for the other models (download only, no parse).
export function prefetchCar(id) {
  const car = cars.find((c) => c.id === id)
  if (car) useGLTF.preload(car.file)
}
