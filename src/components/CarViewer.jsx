import { Suspense, useEffect, useMemo, useRef, Component } from 'react'
import { Canvas } from '@react-three/fiber'
import { OrbitControls, Environment, useGLTF, ContactShadows, Float } from '@react-three/drei'
import { gsap } from 'gsap'
import * as THREE from 'three'

const MODEL = '/car-model/car.glb'

// Material parameters per film finish — this is what makes a matte film actually
// look matte and a chrome film actually look chrome on the 3D car.
const FINISH = {
  gloss: { metalness: 0.45, roughness: 0.12, clearcoat: 1.0, clearcoatRoughness: 0.06, envMapIntensity: 1.5, iridescence: 0 },
  matte: { metalness: 0.0, roughness: 0.88, clearcoat: 0.0, clearcoatRoughness: 0.6, envMapIntensity: 0.45, iridescence: 0 },
  satin: { metalness: 0.2, roughness: 0.42, clearcoat: 0.45, clearcoatRoughness: 0.32, envMapIntensity: 0.9, iridescence: 0 },
  chrome: { metalness: 1.0, roughness: 0.045, clearcoat: 1.0, clearcoatRoughness: 0.03, envMapIntensity: 2.2, iridescence: 0 },
  colorshift: { metalness: 0.75, roughness: 0.16, clearcoat: 1.0, clearcoatRoughness: 0.08, envMapIntensity: 1.7, iridescence: 1 },
}

function CarModel({ selectedFilm }) {
  const { scene } = useGLTF(MODEL)
  const paintMatsRef = useRef([])

  // Clone, recolor-prep and auto-fit the model once per loaded scene.
  const { model, groundY, radius } = useMemo(() => {
    const root = scene.clone(true)
    const paints = []

    root.traverse((o) => {
      if (o.isMesh) {
        o.castShadow = false
        o.receiveShadow = false
        // Swap the car's body-paint material for a fully controllable one.
        if (o.material && /paint/i.test(o.material.name || '')) {
          const pm = new THREE.MeshPhysicalMaterial({
            color: new THREE.Color(selectedFilm?.hex || '#0a0a0a'),
            metalness: FINISH.gloss.metalness,
            roughness: FINISH.gloss.roughness,
            clearcoat: FINISH.gloss.clearcoat,
            clearcoatRoughness: FINISH.gloss.clearcoatRoughness,
            envMapIntensity: FINISH.gloss.envMapIntensity,
          })
          pm.name = 'GuardPaint'
          o.material = pm
          paints.push(pm)
        }
      }
    })

    // Fit to a ~4.4-unit box centered at the origin.
    const box = new THREE.Box3().setFromObject(root)
    const size = box.getSize(new THREE.Vector3())
    const center = box.getCenter(new THREE.Vector3())
    const maxDim = Math.max(size.x, size.y, size.z) || 1
    const scale = 4.4 / maxDim
    root.scale.setScalar(scale)
    root.position.set(-center.x * scale, -center.y * scale, -center.z * scale)

    paintMatsRef.current = paints
    return {
      model: root,
      groundY: -(size.y * scale) / 2,
      radius: (Math.max(size.x, size.z) * scale) / 2,
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [scene])

  // Animate paint color + finish whenever the selected film changes.
  useEffect(() => {
    if (!selectedFilm) return
    const target = FINISH[selectedFilm.finish] || FINISH.gloss
    const color = new THREE.Color(selectedFilm.hex)

    paintMatsRef.current.forEach((m) => {
      // Iridescence toggles a shader feature — set it directly (with recompile)
      // rather than animating across the 0 boundary.
      const wantIrid = target.iridescence ? 0.7 : 0
      if ((m.iridescence > 0) !== (wantIrid > 0)) {
        m.iridescence = wantIrid
        if (wantIrid) {
          m.iridescenceIOR = 1.8
          m.iridescenceThicknessRange = [120, 480]
        }
        m.needsUpdate = true
      } else {
        m.iridescence = wantIrid
      }

      gsap.to(m.color, { r: color.r, g: color.g, b: color.b, duration: 0.7, ease: 'power2.out' })
      gsap.to(m, {
        metalness: target.metalness,
        roughness: target.roughness,
        clearcoat: target.clearcoat,
        clearcoatRoughness: target.clearcoatRoughness,
        envMapIntensity: target.envMapIntensity,
        duration: 0.7,
        ease: 'power2.out',
      })
    })
  }, [selectedFilm])

  return (
    <>
      <Float speed={1} rotationIntensity={0.12} floatIntensity={0.25}>
        <primitive object={model} />
      </Float>
      <ContactShadows position={[0, groundY, 0]} opacity={0.5} scale={Math.max(8, radius * 4)} blur={2.6} far={4} resolution={1024} color="#000000" />
    </>
  )
}

// Keep a model load failure from hanging the Suspense fallback forever.
class CanvasErrorBoundary extends Component {
  constructor(props) {
    super(props)
    this.state = { failed: false }
  }
  static getDerivedStateFromError() {
    return { failed: true }
  }
  render() {
    if (this.state.failed) return this.props.fallback
    return this.props.children
  }
}

export default function CarViewer({ selectedFilm }) {
  const fallback = (
    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', height: '100%', minHeight: '420px', textAlign: 'center', padding: '24px' }}>
      <div>
        <div style={{ fontFamily: 'Bebas Neue', fontSize: '28px', color: '#1DB954' }}>3D viewer unavailable</div>
        <div style={{ fontFamily: 'Inter', fontSize: '13px', color: 'rgba(255,255,255,0.4)', marginTop: '8px' }}>
          Could not load the car model. Pick a finish from the swatches →
        </div>
      </div>
    </div>
  )

  return (
    // data-lenis-prevent: stop Lenis from hijacking wheel events over the canvas,
    // so scroll-to-zoom on the car no longer scrolls the page.
    <div data-lenis-prevent style={{ width: '100%', height: '100%', position: 'relative' }}>
      <CanvasErrorBoundary fallback={fallback}>
        <Canvas camera={{ position: [4.6, 1.6, 6.2], fov: 38 }} gl={{ antialias: true, alpha: true }} style={{ background: 'transparent' }} dpr={[1, 2]}>
          <Suspense fallback={null}>
            <ambientLight intensity={0.45} />
            <directionalLight position={[5, 8, 3]} intensity={1.4} />
            <directionalLight position={[-5, 2, -3]} intensity={0.5} color="#1DB954" />
            <pointLight position={[0, 4, 0]} intensity={0.4} />

            <CarModel selectedFilm={selectedFilm} />

            <Environment preset="city" />

            <OrbitControls
              enablePan={false}
              minDistance={3.5}
              maxDistance={12}
              minPolarAngle={Math.PI / 6}
              maxPolarAngle={Math.PI / 2.05}
              autoRotate
              autoRotateSpeed={0.5}
              target={[0, 0, 0]}
            />
          </Suspense>
        </Canvas>
      </CanvasErrorBoundary>

      {/* Instructions overlay */}
      <div
        style={{
          position: 'absolute', bottom: '16px', left: '50%', transform: 'translateX(-50%)',
          fontFamily: 'Inter', fontSize: '11px', color: 'rgba(255,255,255,0.3)',
          letterSpacing: '0.1em', whiteSpace: 'nowrap', pointerEvents: 'none',
        }}
      >
        DRAG TO ROTATE · SCROLL TO ZOOM
      </div>
    </div>
  )
}

useGLTF.preload(MODEL)
