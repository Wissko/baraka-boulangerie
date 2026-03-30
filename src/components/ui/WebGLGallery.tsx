'use client'

import { useEffect, useRef } from 'react'

// GLSL shaders inline
const VERTEX = `
precision highp float;
attribute vec3 position;
attribute vec2 uv;
attribute vec3 normal;
uniform mat4 modelViewMatrix;
uniform mat4 projectionMatrix;
uniform mat3 normalMatrix;
uniform float uPosition;
uniform float uTime;
uniform float uSpeed;
uniform vec3 distortionAxis;
uniform vec3 rotationAxis;
uniform float uDistortion;
varying vec2 vUv;
varying vec3 vNormal;
float PI = 3.141592653589793238;
mat4 rotationMatrix(vec3 axis, float angle) {
  axis = normalize(axis);
  float s = sin(angle); float c = cos(angle); float oc = 1.0 - c;
  return mat4(
    oc*axis.x*axis.x+c,           oc*axis.x*axis.y-axis.z*s,  oc*axis.z*axis.x+axis.y*s,  0.0,
    oc*axis.x*axis.y+axis.z*s,  oc*axis.y*axis.y+c,           oc*axis.y*axis.z-axis.x*s,  0.0,
    oc*axis.z*axis.x-axis.y*s,  oc*axis.y*axis.z+axis.x*s,  oc*axis.z*axis.z+c,           0.0,
    0.0, 0.0, 0.0, 1.0
  );
}
vec3 rotate(vec3 v, vec3 axis, float angle) {
  mat4 m = rotationMatrix(axis, angle);
  return (m * vec4(v, 1.0)).xyz;
}
float qinticInOut(float t) {
  return t < 0.5 ? +16.0*pow(t,5.0) : -0.5*abs(pow(2.0*t-2.0,5.0))+1.0;
}
void main() {
  vUv = uv;
  vNormal = normalize(normalMatrix * normal);
  float norm = 0.5;
  vec3 newpos = position;
  float offset = (dot(distortionAxis, position) + norm/2.0) / norm;
  float localprogress = clamp((fract(uPosition*5.0*0.01) - 0.01*uDistortion*offset)/(1.0-0.01*uDistortion), 0.0, 2.0);
  localprogress = qinticInOut(localprogress) * PI;
  newpos = rotate(newpos, rotationAxis, localprogress);
  gl_Position = projectionMatrix * modelViewMatrix * vec4(newpos, 1.0);
}
`

const FRAGMENT = `
precision highp float;
uniform vec2 uImageSize;
uniform vec2 uPlaneSize;
uniform sampler2D tMap;
varying vec2 vUv;
void main() {
  vec2 ratio = vec2(
    min((uPlaneSize.x/uPlaneSize.y)/(uImageSize.x/uImageSize.y), 1.0),
    min((uPlaneSize.y/uPlaneSize.x)/(uImageSize.y/uImageSize.x), 1.0)
  );
  vec2 uv = vec2(
    vUv.x*ratio.x+(1.0-ratio.x)*0.5,
    vUv.y*ratio.y+(1.0-ratio.y)*0.5
  );
  gl_FragColor.rgb = texture2D(tMap, uv).rgb;
  gl_FragColor.a = 1.0;
}
`

interface Props {
  images: string[]
  height?: string
}

export default function WebGLGallery({ images, height = '100vh' }: Props) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const containerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!canvasRef.current || !containerRef.current) return
    const canvas = canvasRef.current
    const container = containerRef.current
    let rafId: number
    let isDown = false
    let startX = 0
    let cleanupFn: (() => void) | undefined

    const scroll = { ease: 0.05, current: 0, target: 0, last: 0 }
    let direction = 'down'
    let medias: any[] = []
    let renderer: any, camera: any, scene: any, planeGeometry: any
    let viewport = { width: 0, height: 0 }
    let screen = { width: container.clientWidth, height: container.clientHeight }

    function lerp(v0: number, v1: number, t: number) {
      return v0 * (1 - t) + v1 * t
    }
    function map(v: number, inMin: number, inMax: number, outMin: number, outMax: number) {
      return ((v - inMin) / (inMax - inMin)) * (outMax - outMin) + outMin
    }

    ;(async () => {
      const OGL = await import('ogl')
      const { Renderer, Camera, Transform, Plane, Mesh, Program, Texture } = OGL

      renderer = new Renderer({ canvas, alpha: true, antialias: true, dpr: Math.min(window.devicePixelRatio, 2) })
      const gl = renderer.gl
      gl.clearColor(0, 0, 0, 0)

      camera = new Camera(gl)
      camera.fov = 45
      camera.position.z = 20

      scene = new Transform()

      planeGeometry = new Plane(gl, { heightSegments: 1, widthSegments: 100 })

      function calcViewport() {
        const fov = camera.fov * (Math.PI / 180)
        const h = 2 * Math.tan(fov / 2) * camera.position.z
        const w = h * (gl.canvas.width / gl.canvas.height)
        return { width: w, height: h }
      }

      function onResize() {
        screen = { width: container.clientWidth, height: container.clientHeight }
        renderer.setSize(screen.width, screen.height)
        camera.perspective({ aspect: screen.width / screen.height })
        viewport = calcViewport()
        medias.forEach(m => m.onResize(screen, viewport))
      }

      class Media {
        plane: any; program: any; extra = 0
        height = 0; y = 0; heightTotal = 0; padding = 0
        constructor(private image: string, private index: number, private length: number, private gl: any) {
          const texture = new Texture(gl, { generateMipmaps: false })
          this.program = new Program(gl, {
            depthTest: false, depthWrite: false,
            fragment: FRAGMENT, vertex: VERTEX,
            uniforms: {
              tMap: { value: texture },
              uPosition: { value: 0 },
              uPlaneSize: { value: [0, 0] },
              uImageSize: { value: [0, 0] },
              uSpeed: { value: 0 },
              rotationAxis: { value: [1, 0, 0] },
              distortionAxis: { value: [0, 1, 0] },
              uDistortion: { value: 3 },
              uViewportSize: { value: [viewport.width, viewport.height] },
              uTime: { value: 0 },
            },
            cullFace: false,
          })
          const img = new Image()
          img.crossOrigin = 'anonymous'
          img.src = image
          img.onload = () => {
            texture.image = img
            this.program.uniforms.uImageSize.value = [img.naturalWidth, img.naturalHeight]
          }
          this.plane = new Mesh(gl, { geometry: planeGeometry, program: this.program })
          this.plane.setParent(scene)
          this.onResize(screen, viewport)
        }
        onResize(sc: any, vp: any) {
          const x = 320, y = 300
          this.plane.scale.x = (vp.width * x) / sc.width
          this.plane.scale.y = (vp.height * y) / sc.height
          this.program.uniforms.uPlaneSize.value = [this.plane.scale.x, this.plane.scale.y]
          this.program.uniforms.uViewportSize.value = [vp.width, vp.height]
          this.padding = 0.5
          this.height = this.plane.scale.x + this.padding
          this.heightTotal = this.height * this.length
          this.y = this.height * this.index
        }
        update(scroll: any, dir: string) {
          this.plane.position.x = -(this.y - scroll.current - this.extra)
          const pos = map(this.plane.position.x, -viewport.width, viewport.width, 5, 15)
          this.program.uniforms.uPosition.value = pos
          this.program.uniforms.uTime.value += 0.04
          this.program.uniforms.uSpeed.value = scroll.current
          const planeOff = this.plane.scale.x / 2
          const vpOff = viewport.width
          const isBefore = this.plane.position.x - planeOff > vpOff
          const isAfter = this.plane.position.x + planeOff < -vpOff
          if (isBefore) this.extra -= this.heightTotal
          if (isAfter) this.extra += this.heightTotal
        }
      }

      medias = images.map((img, i) => new Media(img, i, images.length, gl))
      onResize()

      function update() {
        scroll.target += 0.003  // auto-advance
        scroll.current = lerp(scroll.current, scroll.target, scroll.ease)
        direction = scroll.current > scroll.last ? 'right' : 'left'
        medias.forEach(m => m.update(scroll, direction))
        renderer.render({ scene, camera })
        scroll.last = scroll.current
        rafId = requestAnimationFrame(update)
      }
      update()

      // Events
      const onWheel = (e: WheelEvent) => { scroll.target += (e.deltaX || e.deltaY) * 0.005 }
      const onDown = (e: MouseEvent | TouchEvent) => {
        isDown = true
        startX = 'touches' in e ? e.touches[0].clientX : e.clientX
        ;(scroll as any).position = scroll.current
      }
      const onMove = (e: MouseEvent | TouchEvent) => {
        if (!isDown) return
        const x = 'touches' in e ? e.touches[0].clientX : e.clientX
        scroll.target = (scroll as any).position + (x - startX) * 0.1
      }
      const onUp = () => { isDown = false }

      window.addEventListener('resize', onResize)
      container.addEventListener('wheel', onWheel, { passive: true })
      container.addEventListener('mousedown', onDown)
      container.addEventListener('mousemove', onMove)
      container.addEventListener('mouseup', onUp)
      container.addEventListener('touchstart', onDown, { passive: true })
      container.addEventListener('touchmove', onMove, { passive: true })
      container.addEventListener('touchend', onUp)

      cleanupFn = () => {
        cancelAnimationFrame(rafId)
        window.removeEventListener('resize', onResize)
        container.removeEventListener('wheel', onWheel)
        container.removeEventListener('mousedown', onDown)
        container.removeEventListener('mousemove', onMove)
        container.removeEventListener('mouseup', onUp)
        container.removeEventListener('touchstart', onDown)
        container.removeEventListener('touchmove', onMove)
        container.removeEventListener('touchend', onUp)
        renderer.gl.getExtension('WEBGL_lose_context')?.loseContext()
      }
    })()

    return () => {
      cancelAnimationFrame(rafId)
      cleanupFn?.()
    }
  }, [images])

  return (
    <div
      ref={containerRef}
      style={{ position: 'relative', width: '100%', height, overflow: 'hidden', cursor: 'ew-resize' }}
    >
      <canvas ref={canvasRef} style={{ width: '100%', height: '100%', display: 'block' }} />
    </div>
  )
}
