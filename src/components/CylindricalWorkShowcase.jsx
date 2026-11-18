"use client";

/**
 * CylindricalWorkShowcase — Curved Snake Card Carousel (Jesper Landberg & Nathan Riley Style)
 *
 * SPECIFICATION MATCHING REFERENCE SCREENSHOT (Casa Di Solare):
 *   - Serpentine "snake" track in 3D:
 *       • The center card is closest to the viewer and bows concavely (signature dip).
 *       • The side cards recede deeply into 3D perspective along a serpentine ribbon.
 *       • Continuous, silky-smooth auto-scrolling with gentle pause on card hover.
 *   - Subtle, Refined Liquid Water Ripple Effect on Card Hover:
 *       • Gentle, low-intensity concentric water ripples radiate from cursor.
 *       • Soft chromatic refraction (delicate RGB dispersion) and subtle specular sheen.
 *   - Normal, Uninterrupted Page Scrolling:
 *       • No scroll hijacking; wheel events pass through naturally to standard page scroll.
 *   - 48×16 subdivided mesh for continuous, silky-smooth parabolic curvature.
 *   - Right-side up imagery and typography with SDF antialiased rounded corners.
 *   - Wide, elegant card spacing: adjacent cards never collide or overlap.
 *   - 3D perspective wireframe grid floor receding toward the horizon.
 *   - Offscreen high-res canvas textures for razor-sharp typography, badges, and action buttons.
 *   - Fluid dragging with inertia coasting and smooth magnetic slot snapping.
 *   - Click center card to open project; click side cards to snap into focus.
 *   - Bottom-left toggle between FEATURED (curved cylinder) and FULL (archive grid).
 */

import { useEffect, useRef, useState, useMemo, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import {
  ChevronLeft,
  ChevronRight,
  ArrowRight,
  ExternalLink,
} from "lucide-react";

/* ─── Project Data ─────────────────────────────────────────── */
export const SHOWCASE_PROJECTS = [
  {
    id: 1,
    title: "OrionKids",
    category: "Children's Mind Game Platform",
    tag: "EdTech & Gaming",
    year: "2025",
    color: "#1a73e8",
    image: "/OrionKids Workspace Product Showcase.png",
    link: "https://orionkids-frontend.vercel.app/",
    description:
      "Interactive educational gaming platform designed to develop problem solving, logic, and cognitive skills for young learners.",
  },
  {
    id: 2,
    title: "JP Interio",
    category: "Modern Furniture & Interior Store",
    tag: "E-Commerce & Interior",
    year: "2025",
    color: "#a8956e",
    image: "/JP Interio Warm Interior Showcase.png",
    link: "https://jp-interio.vercel.app/",
    description:
      "Bespoke interior design and architectural furniture showcase with real-time room styling and spatial consultations.",
  },
  {
    id: 3,
    title: "Sweet & Sour",
    category: "Gourmet Pickle E-Commerce",
    tag: "Brand & Storefront",
    year: "2024",
    color: "#d97706",
    image: "/sweet&sour.png",
    link: "https://www.sweetnsour.in/",
    description:
      "Artisanal e-commerce storefront delivering authentic handcrafted pickles with modern brand identity and seamless checkout.",
  },
  {
    id: 4,
    title: "Velvet Investment",
    category: "Fintech Portfolio Management",
    tag: "Fintech & Mobile App",
    year: "2024",
    color: "#059669",
    image: "/velvet.png",
    link: "https://apps.apple.com/in/app/velvet-investing/id6763569044",
    description:
      "Fintech investment app simplifying wealth management with curated portfolio insights, asset allocation, and goal-based investing.",
  },
  {
    id: 5,
    title: "Spotify Vision Pro",
    category: "Spatial Audio AR/VR UI",
    tag: "visionOS & Spatial Audio",
    year: "2024",
    color: "#ea580c",
    image: "/spotify-vision-pro.png",
    link: "https://www.behance.net/gallery/197518471/Spotify-design-on-Apple-Vision-Pro",
    description:
      "Conceptual visionOS spatial audio experience leveraging depth layering, ambient lighting, and gestural music interaction.",
  },
  {
    id: 6,
    title: "Fito Fitness",
    category: "Health & Nutrition Tracker",
    tag: "Health & Mobile App",
    year: "2024",
    color: "#854d0e",
    image: "/fito.png",
    link: "https://www.behance.net/gallery/248371425/Fito",
    description:
      "All-in-one calorie tracking and workout companion featuring micro-habit coaching and biometric data visualization.",
  },
];

/* ─── GLSL Shaders ─────────────────────────────────────────── */
const CARD_VS = `
attribute vec2 aPosition; // UV (0..1)

uniform float uCardOffset;     // continuous offset from center (-N/2..N/2)
uniform float uWidth;          // 3D width span of card
uniform float uHeight;         // 3D height of card
uniform float uTrackSpacing;   // horizontal distance between cards
uniform float uDepthRecede;    // how much side cards recede into depth
uniform float uCurvature;      // concave bend depth of each card
uniform mat4 uProjection;
uniform mat4 uView;

varying vec2 vUV;
varying float vDepthFactor;

void main() {
    // WebGL V coordinate starts from bottom, 2D HTML canvas row 0 is top.
    vUV = vec2(aPosition.x, 1.0 - aPosition.y);

    float localU = aPosition.x - 0.5;
    float trackX = uCardOffset * uTrackSpacing + localU * uWidth;

    // 1. Serpentine Snake Depth:
    // Side cards recede smoothly into depth as they move away from the center
    float recedeZ = -uDepthRecede * (trackX * trackX) * 0.0000015;

    // 2. Parabolic Concave Bend:
    // Center of each card dips backward into 3D space, edges stay forward (Nathan Riley bow)
    float bendZ = -uCurvature * (1.0 - 4.0 * localU * localU);

    // 3. Combined Z depth
    float z = -960.0 + recedeZ + bendZ;

    float x = trackX;
    float y = (aPosition.y - 0.5) * uHeight;

    vec4 worldPos = vec4(x, y, z, 1.0);
    gl_Position = uProjection * uView * worldPos;

    // Depth lighting factor for side cards
    vDepthFactor = clamp((z + 1850.0) / 900.0, 0.35, 1.0);
}
`;

const CARD_FS = `
precision mediump float;

uniform sampler2D uTexture;
uniform float uHover;
uniform float uActive;
uniform float uTime;
uniform vec2 uHoverPos;

varying vec2 vUV;
varying float vDepthFactor;

// Signed Distance Field (SDF) for antialiased rounded corners
float roundedBoxSDF(vec2 p, vec2 b, float r) {
    vec2 d = abs(p) - b + vec2(r);
    return min(max(d.x, d.y), 0.0) + length(max(d, 0.0)) - r;
}

void main() {
    // Cut clean rounded corners using untouched geometry UVs
    vec2 pBox = vUV - vec2(0.5);
    vec2 bBox = vec2(0.5);
    float cornerRadius = 0.038;
    float distBox = roundedBoxSDF(pBox, bBox, cornerRadius);

    if (distBox > 0.0) {
        discard;
    }

    // ── Low-Intensity, Refined Liquid Water Ripple Effect on Hover ──
    vec2 uv = vUV;
    vec2 totalDistortion = vec2(0.0);
    float caustic = 0.0;

    if (uHover > 0.001) {
        // Relative coordinates from ripple origin (aspect-ratio corrected)
        vec2 p = vUV - uHoverPos;
        p.x *= 1.6;
        float d = length(p);

        // Gentle, soft water ripple waves
        float wave = sin(d * 24.0 - uTime * 4.2);
        float rippleFalloff = exp(-d * 4.2);

        // Very subtle micro-shimmer
        float microWave = sin((vUV.x * 16.0 + vUV.y * 14.0) + uTime * 2.0) * 0.0012;

        // Low-intensity displacement (subtle, delicate liquid feel)
        vec2 waveDir = (p / (d + 0.001)) * wave * 0.0075 * rippleFalloff;
        totalDistortion = (waveDir + vec2(microWave, -microWave)) * uHover;

        // Faint specular highlight glint
        caustic = clamp(wave * rippleFalloff * 1.5, 0.0, 1.0) * 0.06 * uHover;

        uv = clamp(vUV + totalDistortion, 0.001, 0.999);
    }

    // Delicate chromatic dispersion (gentle RGB refraction)
    float r = texture2D(uTexture, clamp(uv + totalDistortion * 0.22, 0.001, 0.999)).r;
    float g = texture2D(uTexture, uv).g;
    float b = texture2D(uTexture, clamp(uv - totalDistortion * 0.22, 0.001, 0.999)).b;
    float a = texture2D(uTexture, uv).a;

    vec3 finalRgb = vec3(r, g, b);

    // Subtle caustic glimmer on ripple peaks
    finalRgb += vec3(caustic * 0.7, caustic * 0.85, caustic * 1.0);

    // Antialiased border edge
    float alpha = 1.0 - smoothstep(-0.003, 0.0, distBox);

    // Natural 3D depth shading along the snake path
    float depthLight = vDepthFactor;

    // Center card subtle pop
    float boost = 1.0 + uHover * 0.08 + uActive * 0.04;

    // Subtle edge highlight border matching Nathan Riley reference
    float border = smoothstep(-0.005, -0.001, distBox);
    vec3 edgeTint = vec3(0.5, 0.55, 0.65);

    finalRgb = mix(finalRgb * depthLight * boost, edgeTint, border * 0.35);

    gl_FragColor = vec4(finalRgb, a * alpha);
}
`;

const FLOOR_VS = `
attribute vec2 aPosition; // quad (-1..1)

uniform mat4 uProjection;
uniform mat4 uView;
uniform float uFloorY;

varying vec3 vWorldPos;

void main() {
    // Floor plane spanning beneath the cards
    float x = aPosition.x * 4500.0;
    float z = aPosition.y * 2400.0 - 1500.0;
    float y = uFloorY;

    vWorldPos = vec3(x, y, z);
    gl_Position = uProjection * uView * vec4(vWorldPos, 1.0);
}
`;

const FLOOR_FS = `
precision mediump float;

varying vec3 vWorldPos;

void main() {
    float gridSize = 75.0;
    vec2 coord = vWorldPos.xz / gridSize;
    vec2 grid = abs(fract(coord - 0.5) - 0.5);
    
    // Wireframe grid lines
    float lineX = smoothstep(0.040, 0.0, grid.x);
    float lineZ = smoothstep(0.040, 0.0, grid.y);
    float line = max(lineX, lineZ);

    // Distance fog / horizon falloff toward vanishing point
    float dist = length(vWorldPos.xz + vec2(0.0, 450.0));
    float fade = clamp(1.0 - dist / 3200.0, 0.0, 1.0);
    fade = pow(fade, 2.0);

    // Slate wireframe color matching reference screenshot
    vec3 lineColor = vec3(0.28, 0.34, 0.44);
    float alpha = line * fade * 0.40;

    if (alpha <= 0.005) {
        discard;
    }

    gl_FragColor = vec4(lineColor, alpha);
}
`;

/* ─── Helpers: Matrix Math ─────────────────────────────────── */
function createPerspectiveMatrix(fovRad, aspect, near, far) {
  const f = 1.0 / Math.tan(fovRad / 2);
  const nf = 1.0 / (near - far);
  return new Float32Array([
    f / aspect, 0, 0, 0,
    0, f, 0, 0,
    0, 0, (far + near) * nf, -1,
    0, 0, (2 * far * near) * nf, 0,
  ]);
}

function createLookAtMatrix(eyeX, eyeY, eyeZ, targetX, targetY, targetZ) {
  const zx = eyeX - targetX;
  const zy = eyeY - targetY;
  const zz = eyeZ - targetZ;
  const lenZ = Math.hypot(zx, zy, zz) || 1;
  const nzx = zx / lenZ, nzy = zy / lenZ, nzz = zz / lenZ;

  // Up vector (0, 1, 0)
  const upX = 0, upY = 1, upZ = 0;
  let xx = upY * nzz - upZ * nzy;
  let xy = upZ * nzx - upX * nzz;
  let xz = upX * nzy - upY * nzx;
  const lenX = Math.hypot(xx, xy, xz) || 1;
  xx /= lenX; xy /= lenX; xz /= lenX;

  const yx = nzy * xz - nzz * xy;
  const yy = nzz * xx - nzx * xz;
  const yz = nzx * xy - nzy * xx;

  return new Float32Array([
    xx, yx, nzx, 0,
    xy, yy, nzy, 0,
    xz, yz, nzz, 0,
    -(xx * eyeX + xy * eyeY + xz * eyeZ),
    -(yx * eyeX + yy * eyeY + yz * eyeZ),
    -(nzx * eyeX + nzy * eyeY + nzz * eyeZ),
    1,
  ]);
}

/* ─────────────────────────────────────────────────────────────
   Main Component
   ───────────────────────────────────────────────────────────── */
export default function CylindricalWorkShowcase({
  projects = SHOWCASE_PROJECTS,
  sectionLabel,
  sectionTitle,
  viewMode: initialViewMode = "carousel",
  showToggle = true,
}) {
  const label = sectionLabel || sectionTitle || "SELECTED WORKS";
  const numProjects = projects.length;

  const [activeTab, setActiveTab] = useState(() => {
    if (typeof window !== "undefined") {
      try {
        const p = new URLSearchParams(window.location.search);
        if (p.get("view") === "full" || p.get("tab") === "full") return "full";
      } catch {
        // ignore
      }
    }
    return initialViewMode === "grid" ? "full" : "featured";
  });

  const [activeCategory, setActiveCategory] = useState("ALL");
  const [activeIdx, setActiveIdx] = useState(0);

  const canvasRef = useRef(null);
  const animFrameRef = useRef(null);

  // Interaction physics refs: scrollPos is in slot units (0 to numProjects)
  const scrollPosRef = useRef(0);
  const targetPosRef = useRef(0);
  const isNavigatingRef = useRef(false);
  const velocityRef = useRef(0);
  const dragRef = useRef(null);
  const hoverIdxRef = useRef(-1);
  const mouseUVRef = useRef({ x: 0.5, y: 0.5 });
  const hoverFactorRef = useRef(new Array(projects.length).fill(0));
  const lastTimeRef = useRef(null);

  /* ── Texture Pre-rendering onto 2D Offscreen Canvases ── */
  const texturesRef = useRef([]);

  const buildProjectTexture = useCallback((gl, project) => {
    const canvas = document.createElement("canvas");
    canvas.width = 1200;
    canvas.height = 750;
    const ctx = canvas.getContext("2d");

    // Create GL texture object
    const tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);

    const redraw = (img) => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      if (img) {
        // Draw image aspect-cover
        const imgAspect = img.width / img.height;
        const canAspect = canvas.width / canvas.height;
        let dw, dh, dx, dy;
        if (imgAspect > canAspect) {
          dh = canvas.height;
          dw = dh * imgAspect;
          dx = (canvas.width - dw) / 2;
          dy = 0;
        } else {
          dw = canvas.width;
          dh = dw / imgAspect;
          dx = 0;
          dy = (canvas.height - dh) / 2;
        }
        ctx.drawImage(img, dx, dy, dw, dh);
      } else {
        ctx.fillStyle = project.color || "#131822";
        ctx.fillRect(0, 0, canvas.width, canvas.height);
      }

      // Bottom Vignette Gradient (for high-contrast typography legibility)
      const grad = ctx.createLinearGradient(0, 0, 0, canvas.height);
      grad.addColorStop(0, "rgba(0,0,0,0.22)");
      grad.addColorStop(0.38, "rgba(0,0,0,0.0)");
      grad.addColorStop(0.65, "rgba(0,0,0,0.52)");
      grad.addColorStop(1, "rgba(0,0,0,0.92)");
      ctx.fillStyle = grad;
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      // Top Glass Highlight Rim
      const rim = ctx.createLinearGradient(0, 0, canvas.width, 0);
      rim.addColorStop(0, "rgba(255,255,255,0)");
      rim.addColorStop(0.5, "rgba(255,255,255,0.32)");
      rim.addColorStop(1, "rgba(255,255,255,0)");
      ctx.fillStyle = rim;
      ctx.fillRect(0, 0, canvas.width, 3);

      // Top-Left Year Badge
      ctx.fillStyle = "rgba(255, 255, 255, 0.70)";
      ctx.font = "600 16px 'Space Mono', monospace";
      ctx.letterSpacing = "2px";
      ctx.fillText(`${project.year || "2025"} — SELECTED WORK`, 56, 56);

      // Category / Tag at Bottom-Left
      ctx.fillStyle = "rgba(255, 255, 255, 0.65)";
      ctx.font = "700 17px monospace";
      ctx.letterSpacing = "3px";
      const catText = (project.tag || project.category || "PROJECT").toUpperCase();
      ctx.fillText(catText, 56, canvas.height - 116);

      // Title (Bold, modern typography matching screenshot)
      ctx.fillStyle = "#ffffff";
      ctx.font = "800 48px Inter, -apple-system, sans-serif";
      ctx.letterSpacing = "-0.5px";
      ctx.fillText(project.title, 56, canvas.height - 58);

      // Bottom-Right Circular Button with Arrow (↗)
      const btnX = canvas.width - 70;
      const btnY = canvas.height - 70;
      const btnR = 30;

      ctx.beginPath();
      ctx.arc(btnX, btnY, btnR, 0, Math.PI * 2);
      ctx.fillStyle = "rgba(0, 0, 0, 0.70)";
      ctx.fill();
      ctx.lineWidth = 1.8;
      ctx.strokeStyle = "rgba(255, 255, 255, 0.4)";
      ctx.stroke();

      // Up-Right arrow inside circle
      ctx.save();
      ctx.beginPath();
      ctx.translate(btnX, btnY);
      ctx.moveTo(-6, 6);
      ctx.lineTo(6, -6);
      ctx.moveTo(-1, -6);
      ctx.lineTo(6, -6);
      ctx.lineTo(6, 1);
      ctx.strokeStyle = "#ffffff";
      ctx.lineWidth = 2.4;
      ctx.lineCap = "round";
      ctx.lineJoin = "round";
      ctx.stroke();
      ctx.restore();

      // Upload canvas texture into WebGL
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.pixelStorei(gl.UNPACK_FLIP_Y_WEBGL, false);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, canvas);
    };

    // Draw initial fallback immediately so cards are visible right away
    redraw(null);

    // Asynchronously load the project image
    if (project.image) {
      const img = new window.Image();
      if (project.image.startsWith("http://") || project.image.startsWith("https://")) {
        img.crossOrigin = "anonymous";
      }
      img.src = encodeURI(project.image);
      img.onload = () => redraw(img);
    }

    return tex;
  }, []);

  /* ── WebGL Initialization & Render Loop ── */
  useEffect(() => {
    if (activeTab !== "featured") return;
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl =
      canvas.getContext("webgl", { antialias: true, alpha: false }) ||
      canvas.getContext("experimental-webgl");
    if (!gl) return;

    gl.enable(gl.DEPTH_TEST);
    gl.depthFunc(gl.LEQUAL);
    gl.enable(gl.BLEND);
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    gl.clearColor(0.0, 0.0, 0.0, 1.0);

    // Compile Shader helper
    const compileShader = (src, type) => {
      const shader = gl.createShader(type);
      gl.shaderSource(shader, src);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    };

    // Card Shader Program
    const cardVs = compileShader(CARD_VS, gl.VERTEX_SHADER);
    const cardFs = compileShader(CARD_FS, gl.FRAGMENT_SHADER);
    const cardProg = gl.createProgram();
    gl.attachShader(cardProg, cardVs);
    gl.attachShader(cardProg, cardFs);
    gl.linkProgram(cardProg);

    const cardAttribs = {
      position: gl.getAttribLocation(cardProg, "aPosition"),
    };
    const cardUniforms = {
      uCardOffset: gl.getUniformLocation(cardProg, "uCardOffset"),
      uWidth: gl.getUniformLocation(cardProg, "uWidth"),
      uHeight: gl.getUniformLocation(cardProg, "uHeight"),
      uTrackSpacing: gl.getUniformLocation(cardProg, "uTrackSpacing"),
      uDepthRecede: gl.getUniformLocation(cardProg, "uDepthRecede"),
      uCurvature: gl.getUniformLocation(cardProg, "uCurvature"),
      uProjection: gl.getUniformLocation(cardProg, "uProjection"),
      uView: gl.getUniformLocation(cardProg, "uView"),
      uTexture: gl.getUniformLocation(cardProg, "uTexture"),
      uHover: gl.getUniformLocation(cardProg, "uHover"),
      uActive: gl.getUniformLocation(cardProg, "uActive"),
      uTime: gl.getUniformLocation(cardProg, "uTime"),
      uHoverPos: gl.getUniformLocation(cardProg, "uHoverPos"),
    };

    // Floor Shader Program
    const floorVs = compileShader(FLOOR_VS, gl.VERTEX_SHADER);
    const floorFs = compileShader(FLOOR_FS, gl.FRAGMENT_SHADER);
    const floorProg = gl.createProgram();
    gl.attachShader(floorProg, floorVs);
    gl.attachShader(floorProg, floorFs);
    gl.linkProgram(floorProg);

    const floorAttribs = {
      position: gl.getAttribLocation(floorProg, "aPosition"),
    };
    const floorUniforms = {
      uProjection: gl.getUniformLocation(floorProg, "uProjection"),
      uView: gl.getUniformLocation(floorProg, "uView"),
      uFloorY: gl.getUniformLocation(floorProg, "uFloorY"),
    };

    // Build Subdivided Card Mesh: 48 horizontal × 16 vertical quads for smooth continuous curve
    const NX = 48;
    const NY = 16;
    const cardVerts = [];
    for (let j = 0; j <= NY; j++) {
      const v = j / NY;
      for (let i = 0; i <= NX; i++) {
        const u = i / NX;
        cardVerts.push(u, v);
      }
    }
    const cardIndices = [];
    for (let j = 0; j < NY; j++) {
      for (let i = 0; i < NX; i++) {
        const row1 = j * (NX + 1);
        const row2 = (j + 1) * (NX + 1);
        cardIndices.push(row1 + i, row2 + i, row1 + i + 1);
        cardIndices.push(row1 + i + 1, row2 + i, row2 + i + 1);
      }
    }

    const cardVbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, cardVbo);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(cardVerts), gl.STATIC_DRAW);

    const cardIbo = gl.createBuffer();
    gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cardIbo);
    gl.bufferData(
      gl.ELEMENT_ARRAY_BUFFER,
      new Uint16Array(cardIndices),
      gl.STATIC_DRAW
    );
    const cardNumIndices = cardIndices.length;

    // Floor Mesh: quad
    const floorVerts = new Float32Array([
      -1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1,
    ]);
    const floorVbo = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, floorVbo);
    gl.bufferData(gl.ARRAY_BUFFER, floorVerts, gl.STATIC_DRAW);

    // Build textures for all projects
    texturesRef.current = projects.map((p) => buildProjectTexture(gl, p));

    // Render loop
    let isRunning = true;
    const render = (now) => {
      if (!isRunning) return;

      const dt = lastTimeRef.current
        ? Math.min((now - lastTimeRef.current) / 1000, 0.08)
        : 0.016;
      lastTimeRef.current = now;

      const timeSec = now * 0.001;

      // Handle canvas sizing with threshold to prevent subpixel jitter
      const rect = canvas.getBoundingClientRect();
      const clientW = Math.max(300, rect.width || window.innerWidth || 1200);
      const clientH = Math.max(300, rect.height || Math.floor(window.innerHeight * 0.85) || 700);
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      const targetW = Math.floor(clientW * dpr);
      const targetH = Math.floor(clientH * dpr);

      if (Math.abs(canvas.width - targetW) > 2 || Math.abs(canvas.height - targetH) > 2) {
        canvas.width = targetW;
        canvas.height = targetH;
        gl.viewport(0, 0, targetW, targetH);
      }

      // Physics: smooth interpolation on snap, drag momentum, and continuous auto-scroll
      if (isNavigatingRef.current) {
        const diff = targetPosRef.current - scrollPosRef.current;
        scrollPosRef.current += diff * 0.12;
        if (Math.abs(diff) < 0.001) {
          scrollPosRef.current = targetPosRef.current;
          isNavigatingRef.current = false;
        }
      } else if (dragRef.current) {
        // Dragging actively by user
      } else {
        if (Math.abs(velocityRef.current) > 0.0004) {
          velocityRef.current *= 0.92;
          scrollPosRef.current += velocityRef.current;
        } else {
          // Smooth continuous auto-scroll
          // Pauses when user hovers on a card so they can easily view and click
          const isHovered = hoverIdxRef.current >= 0;
          if (!isHovered) {
            scrollPosRef.current += 0.125 * dt; // ~1 card every 8 seconds
          }
        }
      }

      // Compute active center card
      const centerIndex =
        ((Math.round(scrollPosRef.current) % numProjects) + numProjects) % numProjects;
      setActiveIdx((prev) => (prev !== centerIndex ? centerIndex : prev));

      // ── Snake Dimensions & 3D Parameters ──
      const isMobile = clientW < 640;
      const isTablet = clientW < 1024;

      const cardWidth = isMobile ? 380 : isTablet ? 560 : 720;
      const cardHeight = isMobile ? 260 : isTablet ? 360 : 450;
      const trackSpacing = isMobile ? 460 : isTablet ? 680 : 860;
      const depthRecede = isMobile ? 340 : isTablet ? 400 : 460;
      const curvature = isMobile ? 55.0 : isTablet ? 78.0 : 96.0;

      const fovRad = (46 * Math.PI) / 180;
      const aspect = canvas.width / canvas.height;
      const projMat = createPerspectiveMatrix(fovRad, aspect, 10, 6000);
      // Elevated camera looking slightly downward for 3D floor perspective
      const viewMat = createLookAtMatrix(0, 75, 0, 0, -25, -1100);

      // Clear frame
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);

      // ── 1. Render 3D Perspective Grid Floor ──
      gl.useProgram(floorProg);
      gl.uniformMatrix4fv(floorUniforms.uProjection, false, projMat);
      gl.uniformMatrix4fv(floorUniforms.uView, false, viewMat);
      gl.uniform1f(floorUniforms.uFloorY, -cardHeight * 0.58);

      gl.bindBuffer(gl.ARRAY_BUFFER, floorVbo);
      gl.enableVertexAttribArray(floorAttribs.position);
      gl.vertexAttribPointer(floorAttribs.position, 2, gl.FLOAT, false, 0, 0);
      gl.drawArrays(gl.TRIANGLES, 0, 6);

      // ── 2. Render Serpentine Snake Cards ──
      gl.useProgram(cardProg);
      gl.uniformMatrix4fv(cardUniforms.uProjection, false, projMat);
      gl.uniformMatrix4fv(cardUniforms.uView, false, viewMat);
      gl.uniform1f(cardUniforms.uWidth, cardWidth);
      gl.uniform1f(cardUniforms.uHeight, cardHeight);
      gl.uniform1f(cardUniforms.uTrackSpacing, trackSpacing);
      gl.uniform1f(cardUniforms.uDepthRecede, depthRecede);
      gl.uniform1f(cardUniforms.uCurvature, curvature);
      gl.uniform1f(cardUniforms.uTime, timeSec);
      gl.uniform2f(
        cardUniforms.uHoverPos,
        mouseUVRef.current.x,
        mouseUVRef.current.y
      );

      gl.bindBuffer(gl.ARRAY_BUFFER, cardVbo);
      gl.enableVertexAttribArray(cardAttribs.position);
      gl.vertexAttribPointer(cardAttribs.position, 2, gl.FLOAT, false, 0, 0);
      gl.bindBuffer(gl.ELEMENT_ARRAY_BUFFER, cardIbo);

      // Render visible cards along the infinite serpentine track
      for (let i = 0; i < numProjects; i++) {
        // Compute circular offset from scroll position
        let offset = ((i - scrollPosRef.current) % numProjects);
        while (offset < -numProjects / 2) offset += numProjects;
        while (offset > numProjects / 2) offset -= numProjects;

        // Skip cards outside visible frustum
        if (Math.abs(offset) > 1.85) continue;

        // Smooth fluid interpolation for water ripple hover
        const targetHover =
          hoverIdxRef.current === i && !dragRef.current?.moved ? 1.0 : 0.0;
        hoverFactorRef.current[i] +=
          (targetHover - hoverFactorRef.current[i]) * 0.10;

        gl.uniform1f(cardUniforms.uCardOffset, offset);
        gl.uniform1f(cardUniforms.uHover, hoverFactorRef.current[i]);
        gl.uniform1f(
          cardUniforms.uActive,
          centerIndex === i ? 1.0 : 0.0
        );

        const tex = texturesRef.current[i];
        if (tex) {
          gl.activeTexture(gl.TEXTURE0);
          gl.bindTexture(gl.TEXTURE_2D, tex);
          gl.uniform1i(cardUniforms.uTexture, 0);
        }

        gl.drawElements(gl.TRIANGLES, cardNumIndices, gl.UNSIGNED_SHORT, 0);
      }

      animFrameRef.current = requestAnimationFrame(render);
    };

    animFrameRef.current = requestAnimationFrame(render);

    return () => {
      isRunning = false;
      if (animFrameRef.current) cancelAnimationFrame(animFrameRef.current);
    };
  }, [activeTab, numProjects, projects, buildProjectTexture]);

  /* ── Interaction: Drag & Hover & Click Handlers ── */
  const onPointerDown = (e) => {
    isNavigatingRef.current = false;
    dragRef.current = {
      startX: e.clientX,
      startScroll: scrollPosRef.current,
      moved: false,
    };
    velocityRef.current = 0;
  };

  const onPointerMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const mouseXNorm = (e.clientX - rect.left) / rect.width;
    const mouseYNorm = (e.clientY - rect.top) / rect.height;

    // Detect hovered card & compute local normalized coordinates for water ripples
    if (mouseXNorm >= 0.24 && mouseXNorm <= 0.76 && mouseYNorm >= 0.15 && mouseYNorm <= 0.85) {
      // Center card is hovered
      const centerIndex =
        ((Math.round(scrollPosRef.current) % numProjects) + numProjects) % numProjects;
      hoverIdxRef.current = centerIndex;
      mouseUVRef.current = {
        x: (mouseXNorm - 0.24) / 0.52,
        y: (mouseYNorm - 0.15) / 0.70,
      };
    } else if (mouseXNorm < 0.24 && mouseYNorm >= 0.15 && mouseYNorm <= 0.85) {
      // Left card is hovered
      const leftIndex =
        ((Math.round(scrollPosRef.current) - 1) % numProjects + numProjects) % numProjects;
      hoverIdxRef.current = leftIndex;
      mouseUVRef.current = {
        x: mouseXNorm / 0.24,
        y: (mouseYNorm - 0.15) / 0.70,
      };
    } else if (mouseXNorm > 0.76 && mouseYNorm >= 0.15 && mouseYNorm <= 0.85) {
      // Right card is hovered
      const rightIndex =
        ((Math.round(scrollPosRef.current) + 1) % numProjects + numProjects) % numProjects;
      hoverIdxRef.current = rightIndex;
      mouseUVRef.current = {
        x: (mouseXNorm - 0.76) / 0.24,
        y: (mouseYNorm - 0.15) / 0.70,
      };
    } else {
      hoverIdxRef.current = -1;
    }

    // Drag handling
    if (dragRef.current) {
      const dx = e.clientX - dragRef.current.startX;
      if (Math.abs(dx) > 5) {
        dragRef.current.moved = true;
      }
      const clientW = rect.width || window.innerWidth;
      const slotSens = 1.0 / (clientW * 0.65);
      scrollPosRef.current = dragRef.current.startScroll - dx * slotSens;
      velocityRef.current = -e.movementX * slotSens * 0.45;
    }
  };

  const onPointerUp = (e) => {
    const drag = dragRef.current;
    dragRef.current = null;

    if (!drag || !drag.moved) {
      const rect = e.currentTarget.getBoundingClientRect();
      const clickXNorm = (e.clientX - rect.left) / rect.width;

      if (clickXNorm < 0.28) {
        // Left side clicked: snap previous
        goPrev();
      } else if (clickXNorm > 0.72) {
        // Right side clicked: snap next
        goNext();
      } else {
        // Center card clicked: open project website
        const currentActiveProject = projects[activeIdx];
        if (currentActiveProject?.link) {
          window.open(currentActiveProject.link, "_blank", "noopener,noreferrer");
        }
      }
    }
  };

  const onPointerLeave = () => {
    dragRef.current = null;
    hoverIdxRef.current = -1;
  };

  /* Navigation snaps */
  const goNext = useCallback(() => {
    targetPosRef.current = Math.round(scrollPosRef.current) + 1;
    isNavigatingRef.current = true;
  }, []);

  const goPrev = useCallback(() => {
    targetPosRef.current = Math.round(scrollPosRef.current) - 1;
    isNavigatingRef.current = true;
  }, []);

  // Keyboard navigation
  useEffect(() => {
    if (activeTab !== "featured") return;
    const handleKeyDown = (e) => {
      if (e.key === "ArrowLeft") goPrev();
      if (e.key === "ArrowRight") goNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [activeTab, goPrev, goNext]);

  /* Filter categories for Full View */
  const categories = useMemo(() => {
    const set = new Set(["ALL"]);
    projects.forEach((p) => {
      if (p.tag) set.add(p.tag.split("&")[0].trim());
      else if (p.category) set.add(p.category.split(" ")[0]);
    });
    return Array.from(set);
  }, [projects]);

  const filteredProjects = useMemo(() => {
    if (activeCategory === "ALL") return projects;
    return projects.filter(
      (p) =>
        p.tag?.toLowerCase().includes(activeCategory.toLowerCase()) ||
        p.category?.toLowerCase().includes(activeCategory.toLowerCase())
    );
  }, [projects, activeCategory]);

  /* ─────────────────────────────────────────────────────────────
     RENDER
     ───────────────────────────────────────────────────────────── */
  return (
    <div
      className="relative w-full bg-black text-white flex flex-col justify-between overflow-hidden select-none"
      style={{
        minHeight: activeTab === "featured" ? "92vh" : "100vh",
        background: "#000000",
      }}
    >
      {/* ── Top Bar (Jesper Landberg style) ── */}
      <header className="relative z-30 pt-6 md:pt-8 px-6 md:px-14 flex items-center justify-between pointer-events-auto">
        <div className="flex items-center gap-2">
          <span className="text-[11px] md:text-xs font-mono tracking-[0.25em] text-white/90 uppercase font-bold">
            {label}
          </span>
        </div>

        {/* Counter or Profile link */}
        <div className="flex items-center gap-4 text-[11px] md:text-xs font-mono tracking-[0.25em] text-white/60 uppercase">
          <span className="text-white/40">0{activeIdx + 1} / 0{numProjects}</span>
          <Link
            href="/#about"
            className="text-white/70 hover:text-white transition-colors font-bold"
          >
            PROFILE
          </Link>
        </div>
      </header>

      {/* ── MAIN CONTENT ── */}
      {activeTab === "featured" ? (
        <div
          className="relative flex-1 w-full flex items-center justify-center overflow-hidden my-auto"
          onPointerDown={onPointerDown}
          onPointerMove={onPointerMove}
          onPointerUp={onPointerUp}
          onPointerLeave={onPointerLeave}
          style={{ touchAction: "pan-y", cursor: "grab" }}
        >
          {/* True WebGL Curved Canvas */}
          <canvas
            ref={canvasRef}
            className="w-full h-[78vh] md:h-[86vh] block pointer-events-auto"
            style={{ display: "block" }}
          />

          {/* Left / Right Navigation Chevrons */}
          <div className="absolute inset-y-1/2 left-4 right-4 md:left-8 md:right-8 -translate-y-1/2 flex items-center justify-between pointer-events-none z-30">
            <button
              type="button"
              aria-label="Previous project"
              onClick={goPrev}
              className="w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 hover:border-white/40 text-white/80 hover:text-white flex items-center justify-center pointer-events-auto transition-all backdrop-blur-md active:scale-95 cursor-pointer shadow-2xl"
            >
              <ChevronLeft size={22} />
            </button>
            <button
              type="button"
              aria-label="Next project"
              onClick={goNext}
              className="w-11 h-11 rounded-full bg-black/40 hover:bg-black/70 border border-white/20 hover:border-white/40 text-white/80 hover:text-white flex items-center justify-center pointer-events-auto transition-all backdrop-blur-md active:scale-95 cursor-pointer shadow-2xl"
            >
              <ChevronRight size={22} />
            </button>
          </div>
        </div>
      ) : (
        /* ── FULL GRID VIEW ── */
        <div className="relative z-20 w-full max-w-7xl mx-auto px-5 md:px-10 py-12 md:py-16">
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12 border-b border-white/10 pb-8">
            <div>
              <span className="text-[#cc0000] text-xs font-mono font-bold tracking-widest uppercase mb-1 block">
                Archive & Selected Works
              </span>
              <h2 className="text-3xl md:text-5xl font-black text-white tracking-tight">
                Curated Design Showcase
              </h2>
            </div>

            {/* Filter Pills */}
            <div className="flex flex-wrap items-center gap-2">
              {categories.map((cat) => (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-full text-xs font-mono tracking-wider transition-colors uppercase cursor-pointer ${
                    activeCategory === cat
                      ? "bg-[#cc0000] text-white font-bold"
                      : "bg-white/5 hover:bg-white/10 text-white/60 hover:text-white border border-white/10"
                  }`}
                >
                  {cat}
                </button>
              ))}
            </div>
          </div>

          {/* Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 md:gap-10">
            {filteredProjects.map((p) => (
              <a
                key={p.id}
                href={p.link}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative flex flex-col bg-gradient-to-b from-white/[0.07] to-white/[0.02] border border-white/10 hover:border-white/25 rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1.5 hover:shadow-[0_20px_50px_rgba(0,0,0,0.6)] cursor-pointer"
              >
                <div
                  className="relative aspect-[16/10] w-full overflow-hidden"
                  style={{ backgroundColor: p.color || "#111" }}
                >
                  <Image
                    src={p.image}
                    alt={p.title}
                    fill
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                    unoptimized
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

                  <span className="absolute top-4 left-4 px-2.5 py-1 rounded-md bg-black/60 backdrop-blur-md text-[10px] font-mono tracking-widest text-white/90 border border-white/10">
                    {p.year || "2024"}
                  </span>

                  <div className="absolute top-4 right-4 w-8 h-8 rounded-full bg-black/60 backdrop-blur-md border border-white/15 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                    <ExternalLink size={14} className="text-white" />
                  </div>
                </div>

                <div className="p-6 flex flex-col flex-1 justify-between">
                  <div>
                    <span className="text-[#cc0000] text-[10px] font-mono font-bold tracking-[0.2em] uppercase mb-1.5 block">
                      {p.tag || p.category}
                    </span>
                    <h3 className="text-xl font-bold text-white mb-2 leading-snug group-hover:text-white">
                      {p.title}
                    </h3>
                    <p className="text-white/60 text-xs leading-relaxed line-clamp-3">
                      {p.description}
                    </p>
                  </div>

                  <div className="mt-5 pt-4 border-t border-white/5 flex items-center justify-between text-xs font-bold text-white/80 group-hover:text-white">
                    <span>Explore project</span>
                    <ArrowRight
                      size={15}
                      className="text-[#cc0000] transition-transform duration-300 group-hover:translate-x-1"
                    />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      )}

      {/* ── Bottom Bar (Jesper Landberg exact layout) ── */}
      <footer className="relative z-30 pb-6 md:pb-8 px-6 md:px-14 flex items-center justify-between pointer-events-auto">
        {showToggle ? (
          <div className="flex items-center gap-3 text-[10px] md:text-[11px] font-mono tracking-[0.25em] uppercase">
            <button
              type="button"
              onClick={() => setActiveTab("featured")}
              className={`transition-colors cursor-pointer ${
                activeTab === "featured"
                  ? "text-white font-black"
                  : "text-white/40 hover:text-white"
              }`}
            >
              FEATURED
            </button>
            <span className="text-white/20">/</span>
            <button
              type="button"
              onClick={() => setActiveTab("full")}
              className={`transition-colors cursor-pointer ${
                activeTab === "full"
                  ? "text-white font-black"
                  : "text-white/40 hover:text-white"
              }`}
            >
              FULL
            </button>
          </div>
        ) : (
          <div />
        )}

        <span className="hidden sm:block text-[10px] font-mono text-white/30 tracking-widest">
          DRAG TO EXPLORE
        </span>

        <Link
          href="/#contact"
          className="text-[10px] md:text-[11px] font-mono tracking-[0.25em] text-white/60 hover:text-white transition-colors uppercase font-bold"
        >
          NEWSLETTER
        </Link>
      </footer>
    </div>
  );
}
