"use client";

import { useEffect, useRef } from "react";
import * as THREE from "three";
import { OrbitControls } from "three/addons/controls/OrbitControls.js";
import { RoundedBoxGeometry } from "three/addons/geometries/RoundedBoxGeometry.js";
import { RoomEnvironment } from "three/addons/environments/RoomEnvironment.js";
import { createStudioMaterialMaps } from "./studio-materials";
import NpcDialogue from "./npc-dialogue";

type RoomSceneProps = {
  locale?: "zh" | "en";
  night: boolean;
  paused: boolean;
  selected: string | null;
  focusTarget: string | null;
  onSelect: (id: string) => void;
  onBlankClick?: () => void;
  onHover: (id: string | null) => void;
  onReady: () => void;
  onError: () => void;
  onAsk?: () => void;
  onHome?: () => void;
  onToggleNight?: () => void;
  assistantOpen?: boolean;
};

const destinations = [
  { id: "about", name: "关于我", en: "About me", number: "01" },
  { id: "projects", name: "我的项目", en: "Projects", number: "02" },
  { id: "education", name: "教育经历", en: "Education", number: "03" },
  { id: "research", name: "科研探索", en: "Research", number: "04" },
  { id: "experience", name: "工作经历", en: "Experience", number: "05" },
  { id: "life", name: "生活片刻", en: "Little moments", number: "06" },
  { id: "contact", name: "联系我", en: "Say hello", number: "07" },
  { id: "assistant", name: "和 AI 聊聊", en: "Chat with my AI", number: "08" },
  { id: "home", name: "返回经典首页", en: "Classic home", number: "" },
  { id: "light", name: "切换日夜", en: "Change the light", number: "" }
] as const;

export default function RoomScene(props: RoomSceneProps) {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const clockTimeRef = useRef<HTMLTimeElement>(null);
  const npcAnchorRef = useRef<HTMLDivElement>(null);
  const buttonsRef = useRef<Record<string, HTMLButtonElement | HTMLAnchorElement | null>>({});
  const propsRef = useRef(props);
  propsRef.current = props;
  const hoverRef = useRef<string | null>(null);
  const wakeRef = useRef<() => void>(() => undefined);
  const keyboardFocusRef = useRef<string | null>(null);

  useEffect(() => { wakeRef.current(); }, [props.night, props.paused, props.selected, props.focusTarget, props.locale, props.assistantOpen]);

  useEffect(() => {
    const container = containerRef.current;
    const canvas = canvasRef.current;
    if (!container || !canvas) return;

    let renderer: THREE.WebGLRenderer;
    try {
      renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true, powerPreference: "low-power" });
    } catch {
      propsRef.current.onError();
      return;
    }
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, window.innerWidth < 768 ? 1.5 : 2));
    renderer.shadowMap.enabled = true;
    renderer.shadowMap.type = THREE.PCFSoftShadowMap;
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.95;
    renderer.setClearColor(0x000000, 0);

    const scene = new THREE.Scene();
    const environment = new RoomEnvironment();
    const pmrem = new THREE.PMREMGenerator(renderer);
    const environmentTarget = pmrem.fromScene(environment, 0.04);
    scene.environment = environmentTarget.texture;
    scene.environmentIntensity = 0.35;
    environment.dispose(); pmrem.dispose();
    const camera = new THREE.PerspectiveCamera(49, 1.5, 0.1, 90);
    const homePosition = new THREE.Vector3(4.15, 4.1, 8.2);
    const homeTarget = new THREE.Vector3(-0.15, 2.05, -1.15);
    camera.position.copy(homePosition);
    camera.lookAt(homeTarget);
    const controls = new OrbitControls(camera, canvas);
    controls.target.copy(homeTarget);
    controls.enablePan = false;
    controls.enableZoom = false;
    controls.enableDamping = true;
    controls.dampingFactor = 0.065;
    controls.minAzimuthAngle = -0.24;
    controls.maxAzimuthAngle = 0.72;
    controls.minPolarAngle = 1.22;
    controls.maxPolarAngle = 1.49;
    controls.rotateSpeed = 0.35;
    controls.mouseButtons = { LEFT: THREE.MOUSE.ROTATE, MIDDLE: THREE.MOUSE.DOLLY, RIGHT: THREE.MOUSE.ROTATE };
    controls.touches = { ONE: THREE.TOUCH.ROTATE, TWO: THREE.TOUCH.DOLLY_ROTATE };

    const textures = new Set<THREE.Texture>();
    const allMaterials = new Set<THREE.Material>();
    const pickables: THREE.Object3D[] = [];
    const objects: Record<string, THREE.Group> = {};
    const anchors: Record<string, THREE.Vector3> = {};
    const focusPoints: Record<string, THREE.Vector3> = {};
    const highlights: Record<string, THREE.Mesh[]> = {};
    const rings: Record<string, THREE.Mesh> = {};
    const animatedPlants: THREE.Group[] = [];
    let randomState = 4811;
    const random = () => {
      randomState = (randomState * 16807) % 2147483647;
      return (randomState - 1) / 2147483646;
    };

    const material = (color: THREE.ColorRepresentation, roughness = 0.72, metalness = 0) => {
      const result = new THREE.MeshStandardMaterial({ color, roughness, metalness });
      allMaterials.add(result);
      return result;
    };
    const mat = {
      wall: material("#b8b1a3", 0.95), sage: material("#687062", 0.96), trim: material("#d3cbbb", 0.68),
      wood: material("#85664c", 0.55), woodLight: material("#a1815e", 0.48), walnut: material("#624833", 0.5),
      cream: material("#e3ded0", 0.42), dark: material("#252b2b", 0.4, 0.3), black: material("#1c2222", 0.32, 0.2),
      green: material("#425744", 0.65), mint: material("#728262", 0.75), orange: material("#524e3b", 0.32),
      brass: material("#ad9670", 0.3, 0.8), terracotta: material("#96765e", 0.83),
      skin: material("#cfad91", 0.8), hair: material("#211f1c", 0.8), shirt: material("#454d45", 0.92),
      trousers: material("#363b3b", 0.9), paper: material("#e9e3d7", 0.93), glass: material("#91a7a1", 0.2)
    };
    const maps = createStudioMaterialMaps();
    Object.values(maps).forEach(map => textures.add(map));
    for (const surface of [mat.wood, mat.woodLight, mat.walnut]) {
      surface.map = maps.wood; surface.bumpMap = maps.wood; surface.bumpScale = 0.009;
    }
    for (const surface of [mat.wall, mat.sage, mat.terracotta]) {
      surface.bumpMap = maps.plaster; surface.bumpScale = 0.004;
    }
    for (const surface of [mat.shirt, mat.trousers]) {
      surface.bumpMap = maps.fabric; surface.bumpScale = 0.007; surface.roughnessMap = maps.fabric;
    }
    const upholstery = material("#454d43", 0.9);
    upholstery.map = maps.fabric; upholstery.bumpMap = maps.fabric; upholstery.bumpScale = 0.008;
    const texture = (width: number, height: number, paint: (ctx: CanvasRenderingContext2D) => void) => {
      const image = document.createElement("canvas");
      image.width = width;
      image.height = height;
      const context = image.getContext("2d");
      if (context) paint(context);
      const result = new THREE.CanvasTexture(image);
      result.colorSpace = THREE.SRGBColorSpace;
      result.anisotropy = Math.min(4, renderer.capabilities.getMaxAnisotropy());
      textures.add(result);
      return result;
    };
    const mappedMaterial = (map: THREE.Texture, unlit = false) => {
      const result = unlit
        ? new THREE.MeshBasicMaterial({ map, toneMapped: false })
        : new THREE.MeshStandardMaterial({ map, roughness: 0.86 });
      allMaterials.add(result);
      return result;
    };
    const box = (parent: THREE.Object3D, size: [number, number, number], pos: [number, number, number], surface: THREE.Material, radius = 0.03) => {
      const geometry = radius > 0 ? new RoundedBoxGeometry(...size, 3, Math.min(radius, ...size.map(v => v / 2))) : new THREE.BoxGeometry(...size);
      const mesh = new THREE.Mesh(geometry, surface);
      mesh.position.set(...pos);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      parent.add(mesh);
      return mesh;
    };
    const sphere = (parent: THREE.Object3D, pos: [number, number, number], scale: [number, number, number], surface: THREE.Material) => {
      const mesh = new THREE.Mesh(new THREE.SphereGeometry(1, 20, 14), surface);
      mesh.position.set(...pos);
      mesh.scale.set(...scale);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      parent.add(mesh);
      return mesh;
    };
    const cylinder = (parent: THREE.Object3D, top: number, bottom: number, height: number, pos: [number, number, number], surface: THREE.Material, segments = 24) => {
      const mesh = new THREE.Mesh(new THREE.CylinderGeometry(top, bottom, height, segments), surface);
      mesh.position.set(...pos);
      mesh.castShadow = true;
      mesh.receiveShadow = true;
      parent.add(mesh);
      return mesh;
    };
    const line = (parent: THREE.Object3D, from: [number, number, number], to: [number, number, number], radius: number, surface: THREE.Material) => {
      const a = new THREE.Vector3(...from);
      const b = new THREE.Vector3(...to);
      const mesh = cylinder(parent, radius, radius, a.distanceTo(b), [0, 0, 0], surface, 10);
      mesh.position.copy(a.clone().add(b).multiplyScalar(0.5));
      mesh.quaternion.setFromUnitVectors(new THREE.Vector3(0, 1, 0), b.sub(a).normalize());
      return mesh;
    };
    const surface = (parent: THREE.Object3D, width: number, height: number, pos: [number, number, number], map: THREE.Texture, unlit = false) => {
      const mesh = new THREE.Mesh(new THREE.PlaneGeometry(width, height), mappedMaterial(map, unlit));
      mesh.position.set(...pos);
      parent.add(mesh);
      return mesh;
    };
    const destination = (id: string, anchor: [number, number, number], focus: [number, number, number]) => {
      const group = new THREE.Group();
      group.userData.destination = id;
      scene.add(group);
      objects[id] = group;
      anchors[id] = new THREE.Vector3(...anchor);
      focusPoints[id] = new THREE.Vector3(...focus);
      highlights[id] = [];
      return group;
    };

    // Continuous room surfaces extend beyond the camera, making the room itself
    // the page rather than a miniature placed on an unrelated background.
    const hemi = new THREE.HemisphereLight(0xf8f4e7, 0x8a8e78, 2.7);
    scene.add(hemi);
    const sun = new THREE.DirectionalLight(0xffedcf, 4.1);
    sun.position.set(-3, 9, 7);
    sun.castShadow = true;
    sun.shadow.mapSize.set(2048, 2048);
    sun.shadow.camera.left = -7;
    sun.shadow.camera.right = 7;
    sun.shadow.camera.top = 7;
    sun.shadow.camera.bottom = -7;
    sun.shadow.normalBias = 0.012;
    sun.shadow.bias = -0.0003;
    sun.shadow.radius = 4;
    scene.add(sun);
    const fill = new THREE.DirectionalLight(0xd7e8f7, 1.1);
    fill.position.set(6, 5, -3);
    scene.add(fill);
    const floorMap = texture(1024, 1024, ctx => {
      ctx.fillStyle = "#9d8265";
      ctx.fillRect(0, 0, 1024, 1024);
      const colors = ["#8b7258", "#947c60", "#836b53", "#947e65", "#8f765a", "#9a8369"];
      for (let row = 0; row < 9; row++) {
        const y = row * 128;
        for (let col = -1; col < 4; col++) {
          const x = col * 342 + (row % 2) * 171;
          ctx.fillStyle = colors[Math.floor(random() * colors.length)];
          ctx.fillRect(x, y, 341, 127);
          ctx.strokeStyle = "rgba(95,60,30,.08)";
          ctx.lineWidth = 1;
          for (let grain = 0; grain < 90; grain++) {
            const gy = y + random() * 126;
            ctx.beginPath();
            ctx.moveTo(x + 8, gy);
            ctx.bezierCurveTo(x + 90, gy + 2, x + 245, gy - 3, x + 333, gy);
            ctx.stroke();
          }
        }
      }
    });
    floorMap.wrapS = floorMap.wrapT = THREE.RepeatWrapping;
    floorMap.repeat.set(4, 4);
    // Retain the warm evening timber; daylight keeps a natural, lighter oak grain.
    // Bake once instead of applying a screen-wide filter to text and interactions.
    const daylightFloorMap = texture(1024, 1024, ctx => {
      ctx.filter = "saturate(78%)";
      ctx.drawImage(floorMap.image, 0, 0);
    });
    daylightFloorMap.wrapS = daylightFloorMap.wrapT = THREE.RepeatWrapping;
    daylightFloorMap.repeat.copy(floorMap.repeat);
    const floor = surface(scene, 36, 28, [8, -0.009, 6], floorMap);
    const floorMaterial = floor.material as THREE.MeshStandardMaterial;
    floorMaterial.roughness = 0.58; floorMaterial.bumpMap = floorMap; floorMaterial.bumpScale = 0.012;
    floor.rotation.x = -Math.PI / 2;
    floor.receiveShadow = true;
    const leftWall = box(scene, [0.18, 12, 30], [-4.6, 5.98, 11.5], mat.wall, 0);
    box(scene, [34, 12, 0.18], [8, 5.98, -3.42], mat.sage, 0);
    const leftSkirting = box(scene, [0.08, 0.19, 30], [-4.47, 0.1, 11.5], mat.trim, 0.01);
    box(scene, [34, 0.19, 0.07], [8, 0.1, -3.3], mat.trim, 0.01);

    const welcomeMap = texture(2048, 560, ctx => {
      ctx.clearRect(0, 0, 2048, 560);
      ctx.fillStyle = "#ded6bf";
      ctx.font = '500 123px "PingFang SC", "Noto Sans SC", sans-serif';
      ctx.fillText("欢迎走进我的数字世界", 22, 180);
      ctx.fillStyle = "#c6c5ac";
      ctx.font = '500 35px "Avenir Next", sans-serif';
      ctx.letterSpacing = "9px";
      ctx.fillText("GUOHUA  /  MAKE SOMETHING HUMAN", 30, 300);
      ctx.strokeStyle = "#adaf94"; ctx.lineWidth = 2;
      ctx.beginPath(); ctx.moveTo(30, 352); ctx.lineTo(270, 352); ctx.stroke();
    });
    const welcomeMaterial = new THREE.MeshStandardMaterial({ map: welcomeMap, transparent: true, roughness: 1, depthWrite: false }); allMaterials.add(welcomeMaterial);
    const welcome = new THREE.Mesh(new THREE.PlaneGeometry(6.4, 1.75), welcomeMaterial); welcome.position.set(0.15, 5.32, -3.314); scene.add(welcome);

    const home = destination("home", [-4.34, 5.45, 1.45], [-4.1, 5.35, 1.45]);
    const exitSign = new THREE.Group(); exitSign.position.set(-4.44, 5.45, 1.45); exitSign.rotation.y = Math.PI / 2; home.add(exitSign);
    box(exitSign, [1.12, 0.53, 0.045], [0, 0, 0], mat.green, 0.025);
    const exitMap = texture(768, 336, ctx => {
      ctx.fillStyle = "#3f634e"; ctx.fillRect(0, 0, 768, 336);
      ctx.strokeStyle = "#b9c9a9"; ctx.lineWidth = 3; ctx.strokeRect(13, 13, 742, 310);
      ctx.strokeStyle = "#f2efdf"; ctx.lineWidth = 13; ctx.lineJoin = "round"; ctx.lineCap = "round";
      ctx.beginPath(); ctx.moveTo(169, 166); ctx.lineTo(62, 166); ctx.lineTo(100, 128); ctx.moveTo(62, 166); ctx.lineTo(100, 204); ctx.stroke();
      ctx.fillStyle = "#f2efdf"; ctx.font = '600 84px "PingFang SC", sans-serif'; ctx.fillText("返回经典首页", 216, 199);
    });
    surface(exitSign, 1.06, 0.47, [0, 0, 0.027], exitMap);

    const rugMap = texture(512, 512, ctx => {
      ctx.fillStyle = "#b4a992"; ctx.fillRect(0, 0, 512, 512);
      for (let i = 0; i < 20000; i++) {
        ctx.fillStyle = random() > 0.5 ? "rgba(255,255,255,.16)" : "rgba(105,93,72,.08)";
        ctx.fillRect(random() * 512, random() * 512, 1, 3);
      }
    });
    const rug = cylinder(scene, 2.56, 2.56, 0.036, [0.1, 0.017, 0.5], mappedMaterial(rugMap), 96);
    rug.scale.z = 0.83;
    const rugMaterial = rug.material as THREE.MeshStandardMaterial;
    rugMaterial.bumpMap = maps.fabric; rugMaterial.bumpScale = 0.008; rugMaterial.roughness = 1;
    // Broad, soft contact occlusion anchors furniture without extra shadow lights.
    const contactMap = texture(128, 128, ctx => {
      const gradient = ctx.createRadialGradient(64, 64, 4, 64, 64, 64);
      gradient.addColorStop(0, "rgba(15,12,9,.44)"); gradient.addColorStop(.4, "rgba(15,12,9,.21)"); gradient.addColorStop(1, "rgba(15,12,9,0)");
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, 128, 128);
    });
    const contactMaterial = new THREE.MeshBasicMaterial({ map: contactMap, transparent: true, depthWrite: false, toneMapped: false }); allMaterials.add(contactMaterial);
    const contactShadow = (x: number, z: number, width: number, depth: number, y = 0.041) => {
      const shadow = new THREE.Mesh(new THREE.PlaneGeometry(width, depth), contactMaterial);
      shadow.rotation.x = -Math.PI / 2; shadow.position.set(x, y, z); scene.add(shadow); return shadow;
    };
    contactShadow(0.08, 0.85, 1.75, 1.45);
    contactShadow(0.05, -0.45, 4.1, 2.1);
    const shelfShadow = contactShadow(-3.13, -2.6, 2.6, 1.3, 0.002);
    const rugBorder = new THREE.Mesh(new THREE.RingGeometry(2.35, 2.39, 96), material("#918772"));
    rugBorder.rotation.x = -Math.PI / 2;
    rugBorder.scale.y = 0.83;
    rugBorder.position.set(0.1, 0.038, 0.5);
    scene.add(rugBorder);

    // The desk is both furniture and the main portfolio destination.
    const projects = destination("projects", [-0.28, 2.98, -0.86], [-0.28, 1.9, -0.4]);
    box(projects, [3.78, 0.105, 1.62], [0.05, 1.642, -0.48], mat.woodLight, 0.025);
    box(projects, [3.5, 0.10, 1.38], [0.05, 1.535, -0.48], mat.wood, 0.015);
    for (const x of [-1.53, 1.62]) for (const z of [-1.05, 0.08]) {
      const leg = box(projects, [0.095, 1.53, 0.12], [x, 0.775, z], mat.walnut, 0.018);
      leg.rotation.z = x < 0 ? -0.035 : 0.035;
    }
    box(projects, [0.92, 0.35, 0.9], [1.1, 1.29, -0.55], mat.wood, 0.035);
    box(projects, [0.31, 0.035, 0.04], [1.1, 1.3, -0.07], mat.brass, 0.012);
    const deskMat = box(projects, [2.2, 0.02, 0.7], [-0.25, 1.707, -0.15], mat.green, 0.05);
    deskMat.receiveShadow = true;
    box(projects, [0.65, 0.035, 0.4], [-0.32, 1.729, -0.77], mat.dark, 0.06);
    box(projects, [0.12, 0.4, 0.1], [-0.32, 1.91, -0.87], mat.dark);
    box(projects, [1.73, 1.04, 0.065], [-0.32, 2.31, -0.85], mat.black, 0.022);
    const screenMap = texture(768, 448, ctx => {
      ctx.fillStyle = "#142824"; ctx.fillRect(0, 0, 768, 448);
      ctx.fillStyle = "#203b33"; ctx.fillRect(0, 0, 768, 42);
      ["#d18d70", "#e4c08a", "#9dbd95"].forEach((color, i) => { ctx.fillStyle = color; ctx.beginPath(); ctx.arc(24 + 24 * i, 21, 6, 0, Math.PI * 2); ctx.fill(); });
      ctx.fillStyle = "#8daaa0"; ctx.font = "15px monospace"; ctx.fillText("guohua / ideas-to-reality.ts", 128, 26);
      ctx.fillStyle = "#1b312b"; ctx.fillRect(0, 42, 40, 406);
      const code = [
        ["#8bab9c", "// a little curiosity, a lot of building"],
        ["#a0b5df", "const create = async (idea) => {"],
        ["#d9c28e", "  const context = await understand(idea);"],
        ["#a7caab", "  const prototype = build(context);"],
        ["#8bab9c", ""],
        ["#c7acd5", "  return iterate({"],
        ["#d9c28e", "    human: true,"],
        ["#a7caab", "    curiosity: Infinity,"],
        ["#c7acd5", "    possibilities: 'open'"],
        ["#a0b5df", "  });"],
        ["#a0b5df", "};"]
      ];
      ctx.font = "20px monospace";
      code.forEach(([color, text], i) => {
        ctx.fillStyle = "#56776a"; ctx.fillText(String(i + 1).padStart(2, "0"), 7, 78 + i * 28);
        ctx.fillStyle = color; ctx.fillText(text, 57, 78 + i * 28);
      });
      ctx.fillStyle = "#83b796"; ctx.fillRect(0, 421, 768, 27);
      ctx.fillStyle = "#16372a"; ctx.font = "14px monospace"; ctx.fillText("  ● main     ✓ All systems curious                                    UTF-8", 10, 440);
    });
    surface(projects, 1.6, 0.925, [-0.32, 2.33, -0.813], screenMap, true);
    sphere(projects, [-0.32, 1.827, -0.81], [0.014, 0.014, 0.01], mat.mint);
    const screenLight = new THREE.PointLight(0x9cddc0, 0.32, 2.5, 2);
    screenLight.position.set(-0.3, 2.3, -0.6); scene.add(screenLight);

    // One textured keyboard avoids dozens of unnecessary draw calls.
    const keyboardMap = texture(512, 192, ctx => {
      ctx.fillStyle = "#d8d8c9"; ctx.fillRect(0, 0, 512, 192);
      for (let row = 0; row < 5; row++) for (let col = 0; col < 14; col++) {
        ctx.fillStyle = row === 0 && col === 0 ? "#bc8062" : "#f8f0dc";
        ctx.fillRect(8 + col * 35, 7 + row * 36, 29, 28);
        ctx.fillStyle = "#a8a899"; ctx.fillRect(12 + col * 35, 11 + row * 36, 4, 4);
      }
      ctx.fillStyle = "#f8f0dc"; ctx.fillRect(115, 152, 210, 28);
    });
    box(projects, [1.05, 0.045, 0.4], [-0.35, 1.753, -0.08], mat.cream, 0.025);
    const keys = surface(projects, 1.01, 0.365, [-0.35, 1.779, -0.08], keyboardMap);
    keys.rotation.x = -Math.PI / 2;
    sphere(projects, [0.41, 1.778, -0.06], [0.09, 0.044, 0.135], mat.cream);
    line(projects, [0.41, 1.82, -0.08], [0.41, 1.82, -0.13], 0.006, mat.dark);

    // Coffee, a sketchbook and pens make the studio feel lived in.
    cylinder(projects, 0.115, 0.105, 0.21, [-1.28, 1.82, 0.04], mat.cream);
    cylinder(projects, 0.101, 0.101, 0.006, [-1.28, 1.927, 0.04], mat.walnut);
    const handle = new THREE.Mesh(new THREE.TorusGeometry(0.07, 0.018, 8, 18), mat.cream);
    handle.position.set(-1.15, 1.82, 0.04); projects.add(handle);
    const notebook = box(projects, [0.46, 0.038, 0.6], [1.25, 1.72, 0.04], mat.paper, 0.015);
    notebook.rotation.y = 0.15;
    const pen = line(projects, [1.13, 1.75, -0.11], [1.26, 1.75, 0.27], 0.012, mat.dark);
    pen.castShadow = true;
    cylinder(projects, 0.11, 0.09, 0.23, [-1.44, 1.82, -0.85], mat.terracotta);
    for (let i = 0; i < 4; i++) line(projects, [-1.48 + i * 0.025, 1.87, -0.86], [-1.5 + i * 0.04, 2.13 + i * 0.025, -0.83], 0.012, i % 2 ? mat.dark : mat.woodLight);

    // A seated figure with a smaller head, tailored clothes and a slender office chair.
    const person = new THREE.Group(); person.position.set(0.05, 0, 0.72); scene.add(person);
    cylinder(person, 0.08, 0.09, 0.62, [0, 0.44, 0], mat.dark);
    for (let i = 0; i < 5; i++) {
      const angle = i * Math.PI * 2 / 5;
      line(person, [0, 0.19, 0], [Math.sin(angle) * 0.52, 0.15, Math.cos(angle) * 0.52], 0.04, mat.dark);
      sphere(person, [Math.sin(angle) * 0.52, 0.1, Math.cos(angle) * 0.52], [0.07, 0.08, 0.07], mat.black);
    }
    box(person, [0.87, 0.12, 0.77], [0, 0.94, 0], upholstery, 0.05);
    box(person, [0.79, 0.92, 0.105], [0, 1.42, 0.34], mat.dark, 0.055);
    box(person, [0.48, 0.15, 0.095], [0, 1.95, 0.34], upholstery, 0.035);
    box(person, [0.68, 0.75, 0.018], [0, 1.46, 0.401], upholstery, 0.025);
    line(person, [0, 0.98, 0.39], [0, 1.62, 0.415], 0.028, mat.dark);
    for (const side of [-1, 1]) {
      line(person, [side * 0.49, 1, 0.15], [side * 0.49, 1.3, 0.15], 0.032, mat.dark);
      box(person, [0.13, 0.08, 0.5], [side * 0.49, 1.31, 0.01], mat.dark, 0.035);
      const thigh = box(person, [0.25, 0.24, 0.6], [side * 0.19, 1.12, -0.31], mat.trousers, 0.1);
      thigh.rotation.x = -0.03;
      line(person, [side * 0.19, 1.1, -0.55], [side * 0.21, 0.36, -0.66], 0.115, mat.trousers);
      box(person, [0.28, 0.18, 0.46], [side * 0.21, 0.2, -0.8], mat.cream, 0.085);
      box(person, [0.29, 0.045, 0.47], [side * 0.21, 0.122, -0.8], mat.dark, 0.025);
    }
    const torso = new THREE.Group(); torso.position.set(0, 1.1, -0.08); person.add(torso);
    box(torso, [0.65, 0.83, 0.34], [0, 0.41, 0], mat.shirt, 0.09);
    cylinder(torso, 0.105, 0.115, 0.18, [0, 0.86, -0.02], mat.skin);
    const head = new THREE.Group(); head.position.set(0, 1.12, -0.07); head.scale.set(0.76, 0.85, 0.8); torso.add(head);
    sphere(head, [0, 0, 0], [0.29, 0.34, 0.27], mat.skin);
    sphere(head, [0, 0.14, 0.045], [0.305, 0.25, 0.28], mat.hair);
    sphere(head, [0, 0.035, 0.19], [0.27, 0.255, 0.12], mat.hair);
    sphere(head, [-0.17, 0.21, -0.16], [0.17, 0.1, 0.13], mat.hair);
    sphere(head, [0.11, 0.22, -0.17], [0.16, 0.09, 0.1], mat.hair);
    for (const side of [-1, 1]) {
      sphere(head, [side * 0.278, -0.035, -0.01], [0.05, 0.075, 0.055], mat.skin);
      sphere(head, [side * 0.104, 0, -0.25], [0.018, 0.026, 0.013], mat.dark);
    }
    sphere(head, [0, -0.055, -0.273], [0.044, 0.05, 0.035], mat.skin);
    const hairStrandMaterial = material("#353029", 0.83);
    for (let i = 0; i < 22; i++) {
      const angle = -1.15 + i * 0.105;
      const points = Array.from({ length: 8 }, (_, j) => {
        const t = j / 7; return new THREE.Vector3(Math.sin(angle) * .26 * (1 - t * .2), .1 + Math.sin(t * Math.PI) * .26, .17 - t * .31);
      });
      const strand = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(points), 10, .003, 3, false), hairStrandMaterial); head.add(strand);
    }
    const hands: THREE.Mesh[] = [];
    for (const side of [-1, 1]) {
      line(torso, [side * 0.33, 0.68, 0], [side * 0.44, 0.38, -0.14], 0.115, mat.shirt);
      line(torso, [side * 0.44, 0.38, -0.14], [side * 0.28, 0.59, -0.58], 0.085, mat.skin);
      hands.push(sphere(torso, [side * 0.28, 0.59, -0.64], [0.09, 0.055, 0.13], mat.skin));
    }

    // Books and research artifacts are separated into two real shelves.
    const shelf = new THREE.Group(); shelf.position.set(-3.13, 0, -2.76); scene.add(shelf);
    box(shelf, [2.12, 3.66, 0.14], [0, 1.88, -0.38], mat.walnut, 0.02);
    for (const x of [-1.05, 1.05]) box(shelf, [0.13, 3.72, 0.78], [x, 1.89, 0], mat.wood, 0.025);
    for (const y of [0.16, 1.06, 1.99, 2.88, 3.7]) box(shelf, [2.2, 0.1, 0.82], [0, y, 0], mat.woodLight, 0.02);
    box(shelf, [1.98, 0.64, 0.71], [0, 0.55, 0], mat.wood, 0.02);
    box(shelf, [0.94, 0.6, 0.03], [-0.49, 0.55, 0.375], mat.woodLight, 0.012);
    box(shelf, [0.94, 0.6, 0.03], [0.49, 0.55, 0.375], mat.woodLight, 0.012);
    for (const x of [-0.12, 0.12]) sphere(shelf, [x, 0.6, 0.41], [0.028, 0.028, 0.025], mat.brass);
    const shelfLights: THREE.PointLight[] = [];
    const stripMaterial = new THREE.MeshStandardMaterial({ color: "#d9b57c", emissive: "#ffc78b", emissiveIntensity: 0.8 }); allMaterials.add(stripMaterial);
    for (const y of [1.96, 2.85, 3.66]) {
      box(shelf, [1.9, .012, .035], [0, y, .17], stripMaterial, .004);
      const glow = new THREE.PointLight(0xffc186, .25, 1.7, 2); glow.position.set(0, y - .12, .1); shelf.add(glow); shelfLights.push(glow);
    }
    const education = destination("education", [-3.37, 3.62, -2.48], [-3.05, 2.5, -2.68]);
    const research = destination("research", [-2.82, 1.91, -2.12], [-3.0, 1.3, -2.64]);
    const bookColors = ["#bfb6a3", "#5c6657", "#79614c", "#9e8868", "#354944", "#7a8383", "#a1a08c"];
    const bookMaterials = bookColors.map(color => material(color));
    function book(parent: THREE.Object3D, x: number, y: number, z: number, width: number, height: number, color: THREE.Material, tilt = 0) {
      const group = new THREE.Group(); group.position.set(x, y, z); group.rotation.z = tilt; parent.add(group);
      box(group, [width, height, 0.38], [0, height / 2, 0], color, 0.012);
      box(group, [width * 0.7, 0.013, 0.015], [0, height * 0.8, 0.199], mat.cream, 0.002);
      box(group, [width * 0.7, 0.01, 0.015], [0, height * 0.17, 0.199], mat.cream, 0.002);
    }
    for (let i = 0; i < 8; i++) book(education, -3.98 + i * 0.19, 2.94, -2.69, 0.14 + random() * 0.04, 0.43 + random() * 0.19, bookMaterials[i % 7], i === 7 ? -0.13 : 0);
    for (let i = 0; i < 5; i++) book(education, -3.94 + i * 0.18, 2.05, -2.69, 0.135, 0.57 + random() * 0.12, bookMaterials[(i + 3) % 7]);
    const diplomaMap = texture(320, 256, ctx => {
      ctx.fillStyle = "#f7efda"; ctx.fillRect(0, 0, 320, 256);
      ctx.strokeStyle = "#bba16d"; ctx.lineWidth = 3; ctx.strokeRect(14, 14, 292, 228);
      ctx.fillStyle = "#34554a"; ctx.textAlign = "center"; ctx.font = "24px Georgia"; ctx.fillText("Keep learning.", 160, 90);
      ctx.font = "12px monospace"; ctx.fillText("CURIOSITY IS THE WAY", 160, 120);
      ctx.fillStyle = "#a67e48"; ctx.beginPath(); ctx.arc(160, 179, 23, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#efdfb9"; ctx.font = "25px serif"; ctx.fillText("✦", 160, 188);
    });
    box(education, [0.75, 0.64, 0.06], [-2.5, 2.4, -2.54], mat.brass, 0.015);
    surface(education, 0.68, 0.56, [-2.5, 2.4, -2.505], diplomaMap);
    for (let i = 0; i < 3; i++) {
      const stack = box(research, [0.62, 0.12, 0.45], [-3.7, 1.18 + i * 0.12, -2.68], bookMaterials[i + 2], 0.018);
      stack.rotation.y = i * 0.05;
      box(research, [0.49, 0.055, 0.012], [-3.7, 1.18 + i * 0.12, -2.45], mat.paper, 0.002);
    }
    // A small atom sculpture is intentionally more distinctive than another book.
    const atom = new THREE.Group(); atom.position.set(-2.66, 1.57, -2.68); research.add(atom);
    sphere(atom, [0, 0, 0], [0.095, 0.095, 0.095], mat.orange);
    for (let i = 0; i < 3; i++) {
      const orbit = new THREE.Mesh(new THREE.TorusGeometry(0.26, 0.012, 8, 40), mat.brass);
      orbit.rotation.set(i * 0.8, i * 0.9, i * 0.5); atom.add(orbit);
    }
    cylinder(research, 0.19, 0.22, 0.055, [-2.66, 1.145, -2.68], mat.dark);
    line(research, [-2.66, 1.17, -2.68], [-2.66, 1.4, -2.68], 0.028, mat.brass);

    // Decorative print on the left wall; it has no navigation or hover behavior.
    destination("about", [0.42, 2.18, 0.73], [0.05, 2.02, 0.61]);
    const portrait = new THREE.Group(); portrait.position.set(-4.46, 2.69, 0.39); portrait.rotation.y = Math.PI / 2; scene.add(portrait);
    box(portrait, [1.56, 1.92, 0.08], [0, 0, 0], mat.walnut, 0.025);
    const portraitMap = texture(512, 640, ctx => {
      ctx.fillStyle = "#ded6c5"; ctx.fillRect(0, 0, 512, 640);
      ctx.save(); ctx.beginPath(); ctx.rect(48, 48, 416, 492); ctx.clip();
      ctx.strokeStyle = "#6f7965"; ctx.lineWidth = 1.5;
      for (let i = 0; i < 35; i++) {
        ctx.beginPath();
        for (let x = 0; x <= 512; x += 4) {
          const y = 170 + i * 11 + Math.sin(x * .012 + i * .03) * 55 + Math.sin(x * .025) * 15;
          if (x === 0) ctx.moveTo(x, y); else ctx.lineTo(x, y);
        }
        ctx.stroke();
      }
      ctx.restore();
      ctx.fillStyle = "#9d845f"; ctx.beginPath(); ctx.arc(354, 145, 39, 0, Math.PI * 2); ctx.fill();
      ctx.fillStyle = "#626953"; ctx.font = "16px Georgia"; ctx.textAlign = "center"; ctx.fillText("Contours of a quiet moment", 256, 590);
    });
    surface(portrait, 1.43, 1.8, [0, 0, 0.044], portraitMap);

    const experience = destination("experience", [-0.43, 4.09, -3.05], [-0.5, 3.2, -3.15]);
    box(experience, [2.08, 1.18, 0.085], [-0.56, 3.42, -3.27], mat.walnut, 0.04);
    const boardMap = texture(1280, 720, ctx => {
      ctx.fillStyle = "#eee8d6"; ctx.fillRect(0, 0, 1280, 720);
      ctx.fillStyle = "#355343"; ctx.font = '600 46px "PingFang SC", sans-serif'; ctx.fillText("工作 · 从问题到产品", 58, 81);
      ctx.fillStyle = "#7a8971"; ctx.font = "22px monospace"; ctx.fillText("AI PRODUCT  /  DISCOVER → PROTOTYPE → DELIVER", 61, 122);
      const arrow = (x1: number, y1: number, x2: number, y2: number, color = "#62806a") => {
        ctx.strokeStyle = color; ctx.fillStyle = color; ctx.lineWidth = 6; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(x1, y1); ctx.lineTo(x2, y2); ctx.stroke();
        const angle = Math.atan2(y2 - y1, x2 - x1);
        ctx.beginPath(); ctx.moveTo(x2, y2); ctx.lineTo(x2 - Math.cos(angle - 0.5) * 18, y2 - Math.sin(angle - 0.5) * 18); ctx.lineTo(x2 - Math.cos(angle + 0.5) * 18, y2 - Math.sin(angle + 0.5) * 18); ctx.closePath(); ctx.fill();
      };
      const lanes = [
        { x: 58, title: "需求洞察", accent: "#5e7e66", task: "问题定义", detail: "场景 · 约束 · 优先级" },
        { x: 469, title: "原型实验", accent: "#ae8056", task: "方案验证", detail: "模型 · 交互 · 评估" },
        { x: 880, title: "产品交付", accent: "#6d8888", task: "持续迭代", detail: "协作 · 反馈 · 改进" }
      ];
      lanes.forEach(({ x, title, accent, task, detail }) => {
        ctx.fillStyle = accent; ctx.beginPath(); ctx.roundRect(x, 177, 340, 78, 8); ctx.fill();
        ctx.fillStyle = "#fff8e5"; ctx.font = '600 42px "PingFang SC", sans-serif'; ctx.fillText(title, x + 37, 231);
        ctx.fillStyle = "#fbf7ea"; ctx.strokeStyle = "#c3c5ae"; ctx.lineWidth = 3;
        ctx.beginPath(); ctx.roundRect(x, 273, 340, 174, 8); ctx.fill(); ctx.stroke();
        ctx.fillStyle = accent; ctx.fillRect(x + 25, 302, 8, 97);
        ctx.fillStyle = "#385142"; ctx.font = '500 36px "PingFang SC", sans-serif'; ctx.fillText(task, x + 52, 336);
        ctx.fillStyle = "#7a846f"; ctx.font = '24px "PingFang SC", sans-serif'; ctx.fillText(detail, x + 51, 382);
        ctx.strokeStyle = "#c3cab4"; ctx.lineWidth = 3; ctx.beginPath(); ctx.moveTo(x + 52, 410); ctx.lineTo(x + 275, 410); ctx.stroke();
      });
      arrow(410, 214, 455, 214); arrow(821, 214, 866, 214);
      // This is a workflow diagram, with no invented performance figures.
      ctx.strokeStyle = "#82977c"; ctx.lineWidth = 5;
      ctx.beginPath(); ctx.moveTo(1050, 468); ctx.lineTo(1050, 551); ctx.quadraticCurveTo(1050, 573, 1028, 573); ctx.lineTo(262, 573); ctx.quadraticCurveTo(228, 573, 228, 546); ctx.lineTo(228, 501); ctx.stroke();
      arrow(228, 508, 228, 468, "#82977c");
      ctx.fillStyle = "#eee8d6"; ctx.fillRect(457, 547, 367, 55);
      ctx.fillStyle = "#526c57"; ctx.font = '500 31px "PingFang SC", sans-serif'; ctx.fillText("反馈 → 下一轮实验", 481, 584);
      ctx.strokeStyle = "#c5c8b3"; ctx.lineWidth = 2; ctx.beginPath(); ctx.moveTo(59, 641); ctx.lineTo(1220, 641); ctx.stroke();
      ctx.fillStyle = "#859078"; ctx.font = "20px monospace"; ctx.fillText("ASK CLEARLY. BUILD THOUGHTFULLY. KEEP LEARNING.", 61, 680);
    });
    surface(experience, 1.96, 1.07, [-0.56, 3.42, -3.222], boardMap);

    // The window remains a real object at the same location. Only its view changes.
    const life = destination("life", [2.48, 4.06, -3.02], [2.45, 2.8, -2.9]);
    const windowGroup = new THREE.Group(); windowGroup.position.set(2.43, 2.96, -3.25); life.add(windowGroup);
    box(windowGroup, [2.45, 2.34, 0.1], [0, 0, 0], mat.walnut, 0.018);
    const makeScenery = (night: boolean) => texture(1024, 1024, ctx => {
      const sky = ctx.createLinearGradient(0, 0, 0, 1024);
      sky.addColorStop(0, night ? "#111e30" : "#8eabb7"); sky.addColorStop(1, night ? "#344351" : "#c6cec5");
      ctx.fillStyle = sky; ctx.fillRect(0, 0, 1024, 1024);
    });
    const dayScenery = makeScenery(false), nightScenery = makeScenery(true);
    const skyMaterial = new THREE.MeshBasicMaterial({ map: propsRef.current.night ? nightScenery : dayScenery, color: "#d9dfd9", toneMapped: false }); allMaterials.add(skyMaterial);
    box(windowGroup, [2.22, 2.1, 0.07], [0, 0, 0.075], skyMaterial, 0.01);
    const sceneryImages: HTMLImageElement[] = [];
    const loadScenery = (url: string, map: THREE.CanvasTexture, night: boolean) => {
      const image = new window.Image(); sceneryImages.push(image);
      image.onload = () => {
        if (disposed) return;
        const ctx = (map.image as HTMLCanvasElement).getContext("2d");
        // Frame ordinary greenery by day; keep only the star field from the night photo.
        const side = night ? image.naturalWidth * 0.79 : Math.min(image.naturalWidth, image.naturalHeight);
        const x = night ? image.naturalWidth * 0.1 : (image.naturalWidth - side) / 2;
        const y = night ? image.naturalHeight * 0.05 : (image.naturalHeight - side) / 2;
        ctx?.drawImage(image, x, y, side, side, 0, 0, 1024, 1024);
        map.needsUpdate = true; wakeRef.current();
      };
      image.src = url;
    };
    loadScenery("/images/studio-day-countryside.jpg", dayScenery, false);
    loadScenery("/images/contact-sky.jpg", nightScenery, true);
    const reflectionMap = texture(256, 256, ctx => {
      const gradient = ctx.createLinearGradient(0, 0, 256, 256);
      gradient.addColorStop(0, "rgba(255,250,225,.02)"); gradient.addColorStop(.45, "rgba(255,250,225,.12)"); gradient.addColorStop(.5, "rgba(255,250,225,.03)"); gradient.addColorStop(1, "rgba(255,250,225,0)");
      ctx.fillStyle = gradient; ctx.fillRect(0, 0, 256, 256);
    });
    const reflectionMaterial = new THREE.MeshBasicMaterial({ map: reflectionMap, transparent: true, depthWrite: false, toneMapped: false }); allMaterials.add(reflectionMaterial);
    const reflection = new THREE.Mesh(new THREE.PlaneGeometry(2.22, 2.1), reflectionMaterial); reflection.position.z = .19; windowGroup.add(reflection);
    for (const x of [-1.17, 1.17]) box(windowGroup, [0.095, 2.28, 0.16], [x, 0, 0.2], mat.walnut, 0.01);
    box(windowGroup, [0.065, 2.12, 0.1], [0, 0, 0.23], mat.trim, 0.01);
    box(windowGroup, [2.33, 0.065, 0.1], [0, -0.12, 0.23], mat.trim, 0.01);
    box(windowGroup, [2.66, 0.12, 0.43], [0, -1.17, 0.2], mat.woodLight, 0.025);
    line(windowGroup, [-1.46, 1.3, 0.21], [1.44, 1.3, 0.21], 0.025, mat.brass);
    const linen = material("#cdc4b0", 0.98); linen.bumpMap = maps.fabric; linen.bumpScale = 0.017;
    for (const x of [-1.3, 1.3]) {
      const curtain = box(windowGroup, [0.25, 2.23, 0.09], [x, 0.05, 0.2], linen, 0.022);
      curtain.rotation.z = x > 0 ? 0.02 : -0.02;
      for (let i = 0; i < 3; i++) cylinder(windowGroup, 0.03, 0.025, 2.2, [x - 0.085 + i * 0.085, 0.05, 0.27], linen, 16);
    }

    // A retro telephone acts as a physical invitation to get in touch.
    const contact = destination("contact", [1.46, 2.12, 0.06], [1.39, 1.8, -0.55]);
    const phone = new THREE.Group(); phone.position.set(1.35, 1.72, -0.67); phone.rotation.y = -0.16; contact.add(phone);
    box(phone, [0.57, 0.12, 0.39], [0, 0.07, 0], mat.orange, 0.065);
    box(phone, [0.43, 0.1, 0.14], [0, 0.19, -0.12], mat.orange, 0.055);
    box(phone, [0.56, 0.1, 0.125], [0, 0.27, -0.11], mat.dark, 0.05);
    for (const x of [-0.215, 0.215]) box(phone, [0.14, 0.14, 0.16], [x, 0.235, -0.105], mat.dark, 0.045);
    const dial = cylinder(phone, 0.102, 0.102, 0.018, [0, 0.14, 0.065], mat.cream);
    for (let i = 0; i < 9; i++) { const a = i * Math.PI * 2 / 10; cylinder(phone, 0.013, 0.013, 0.019, [Math.sin(a) * 0.068, 0.155, 0.065 + Math.cos(a) * 0.068], mat.dark, 10); }
    dial.castShadow = false;
    const cordPoints = Array.from({ length: 85 }, (_, i) => new THREE.Vector3(-0.285 - Math.sin(i * 1.1) * 0.023, 0.205 - i * 0.0016, -0.1 + i * 0.0035));
    const cord = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3(cordPoints), 84, 0.009, 5, false), mat.dark); phone.add(cord);

    const leafMaterial = material("#3d583a", 0.58); leafMaterial.side = THREE.DoubleSide;
    const leafLightMaterial = material("#697b4d", 0.65); leafLightMaterial.side = THREE.DoubleSide;
    const leafGeometry = new THREE.PlaneGeometry(0.3, 0.63, 6, 12);
    const leafPositions = leafGeometry.attributes.position;
    for (let i = 0; i < leafPositions.count; i++) {
      const t = (leafPositions.getY(i) + .315) / .63;
      const x = leafPositions.getX(i) * Math.pow(Math.sin(t * Math.PI), .7);
      leafPositions.setXYZ(i, x, t * .63, Math.sin(t * Math.PI) * .055 - Math.abs(x) * .28);
    }
    leafGeometry.computeVertexNormals();
    function plant(parent: THREE.Object3D, x: number, y: number, z: number, scale: number) {
      const group = new THREE.Group(); group.position.set(x, y, z); group.scale.setScalar(scale); parent.add(group);
      cylinder(group, .245, .19, .43, [0, .215, 0], mat.terracotta, 40);
      cylinder(group, .25, .25, .035, [0, .42, 0], mat.terracotta, 40);
      cylinder(group, .225, .225, .012, [0, .44, 0], mat.walnut, 32);
      const foliage = new THREE.Group(); foliage.position.y = .43; group.add(foliage); animatedPlants.push(foliage);
      for (let i = 0; i < 11; i++) {
        const angle = i * 2.4, height = .28 + random() * .65;
        const x1 = Math.sin(angle) * .3, z1 = Math.cos(angle) * .3;
        line(foliage, [0, 0, 0], [x1, height, z1], .006, mat.green);
        const leaf = new THREE.Group(); leaf.position.set(x1, height, z1); leaf.rotation.set(.4, angle, x1 > 0 ? -.65 : .65); foliage.add(leaf);
        const blade = new THREE.Mesh(leafGeometry, i % 3 ? leafMaterial : leafLightMaterial); blade.castShadow = true; blade.receiveShadow = true; leaf.add(blade);
        const vein = new THREE.Mesh(new THREE.TubeGeometry(new THREE.CatmullRomCurve3([new THREE.Vector3(0, 0, .003), new THREE.Vector3(0, .315, .058), new THREE.Vector3(0, .6, .014)]), 8, .002, 3, false), leafLightMaterial); leaf.add(vein);
      }
      return group;
    }
    const windowPlant = plant(scene, 4.35, 0, -2.5, 0.98);
    plant(education, -2.56, 3.76, -2.76, 0.42);
    plant(projects, 0.94, 1.7, -1.04, 0.34);
    const sideTable = new THREE.Group(); sideTable.position.set(-3.3, 0, 1.34); scene.add(sideTable);
    cylinder(sideTable, 0.55, 0.55, 0.09, [0, 0.62, 0], mat.woodLight);
    for (let i = 0; i < 3; i++) { const a = i * Math.PI * 2 / 3; line(sideTable, [Math.sin(a) * 0.32, 0.6, Math.cos(a) * 0.32], [Math.sin(a) * 0.42, 0.06, Math.cos(a) * 0.42], 0.055, mat.walnut); }
    box(sideTable, [0.44, 0.065, 0.34], [0.06, 0.7, 0.08], mat.green, 0.018);
    plant(sideTable, -0.14, 0.68, -0.1, 0.43);

    const light = destination("light", [3.62, 2.83, -0.38], [3.62, 2.3, -0.52]);
    const lamp = new THREE.Group(); lamp.position.set(3.62, 0, -0.52); light.add(lamp);
    cylinder(lamp, 0.32, 0.35, 0.085, [0, 0.05, 0], mat.brass);
    cylinder(lamp, 0.028, 0.028, 2.76, [0, 1.42, 0], mat.brass);
    const shadeMaterial = new THREE.MeshStandardMaterial({ color: "#d9c9aa", roughness: 0.95, bumpMap: maps.fabric, bumpScale: 0.014, side: THREE.DoubleSide, emissive: "#ffbd67", emissiveIntensity: 0.12 }); allMaterials.add(shadeMaterial);
    const shade = new THREE.Mesh(new THREE.CylinderGeometry(0.28, 0.54, 0.6, 40, 1, true), shadeMaterial);
    shade.position.y = 2.77; lamp.add(shade);
    const lampLight = new THREE.PointLight(0xffcd87, 2.2, 5, 2); lampLight.position.set(3.62, 2.56, -0.52); scene.add(lampLight);
    const bulbMaterial = new THREE.MeshBasicMaterial({ color: "#ffe4a5", toneMapped: false }); allMaterials.add(bulbMaterial);
    sphere(lamp, [0, 2.68, 0], [0.1, 0.15, 0.1], bulbMaterial);
    // The back sits just in front of the wall (-3.33), with a shallow case.
    const clockDepth = -3.306;
    const wallClock = new THREE.Group(); wallClock.position.set(4.34, 4.97, clockDepth); scene.add(wallClock);
    const clockCase = cylinder(wallClock, 0.38, 0.38, 0.04, [0, 0, 0], mat.wood, 64); clockCase.rotation.x = Math.PI / 2;
    // Draw all hands around one shared center on the face: no perspective offset
    // between separate hand meshes, and no tiny self-shadow artifacts.
    const paintClock = (ctx: CanvasRenderingContext2D, now: Date) => {
      ctx.fillStyle = "#eee8d6"; ctx.fillRect(0, 0, 512, 512);
      ctx.strokeStyle = "#5b725f"; ctx.lineWidth = 5;
      for (let i = 0; i < 12; i++) { const a = i * Math.PI / 6; ctx.beginPath(); ctx.moveTo(256 + Math.sin(a) * 188, 256 + Math.cos(a) * 188); ctx.lineTo(256 + Math.sin(a) * 207, 256 + Math.cos(a) * 207); ctx.stroke(); }
      const seconds = now.getSeconds(), minutes = now.getMinutes() + seconds / 60;
      const hand = (angle: number, length: number, width: number, color: string) => {
        ctx.save(); ctx.translate(256, 256); ctx.rotate(angle);
        ctx.strokeStyle = color; ctx.lineWidth = width; ctx.lineCap = "round";
        ctx.beginPath(); ctx.moveTo(0, 0); ctx.lineTo(0, -length); ctx.stroke(); ctx.restore();
      };
      hand(((now.getHours() % 12) + minutes / 60) * Math.PI / 6, 128, 12, "#476451");
      hand(minutes * Math.PI / 30, 184, 8, "#476451");
      hand(seconds * Math.PI / 30, 199, 3, "#b86c4e");
      ctx.fillStyle = "#a97451"; ctx.beginPath(); ctx.arc(256, 256, 9, 0, Math.PI * 2); ctx.fill();
    };
    const clockMap = texture(512, 512, ctx => paintClock(ctx, new Date()));
    const clockContext = (clockMap.image as HTMLCanvasElement).getContext("2d");
    const face = new THREE.Mesh(new THREE.CircleGeometry(0.34, 64), mappedMaterial(clockMap)); face.position.z = 0.021; wallClock.add(face);
    const syncWallClock = () => {
      const now = new Date();
      if (clockContext) { paintClock(clockContext, now); clockMap.needsUpdate = true; }
      if (clockTimeRef.current) {
        clockTimeRef.current.dateTime = now.toISOString();
        clockTimeRef.current.textContent = now.toLocaleTimeString(propsRef.current.locale === "en" ? "en-GB" : "zh-CN", { hour12: false });
      }
    };

    // The existing AgentSprite becomes a small pearl-white studio companion:
    // one soft egg-shaped body, dark horizontal visor, cyan eyes and orbiting bead.
    const assistant = destination("assistant", [-1.78, 0.95, 2.28], [-1.78, 0.8, 2.28]);
    const robot = new THREE.Group(); robot.position.set(-1.78, -0.045, 2.28); robot.rotation.y = 0.7; robot.userData.layoutOffset = 0; assistant.add(robot);
    const pearl = new THREE.MeshPhysicalMaterial({ color: "#edf1e6", roughness: 0.29, metalness: 0.12, clearcoat: 0.65, clearcoatRoughness: 0.3 }); allMaterials.add(pearl);
    const robotSage = new THREE.MeshPhysicalMaterial({ color: "#b8c9b5", roughness: 0.34, metalness: 0.13, clearcoat: 0.4 }); allMaterials.add(robotSage);
    const visor = material("#243c3f", 0.2, 0.22);
    const eyeMaterial = new THREE.MeshBasicMaterial({ color: "#b1ffff", toneMapped: false }); allMaterials.add(eyeMaterial);
    sphere(robot, [0, 0.63, 0], [0.41, 0.45, 0.335], pearl);
    const robotLeftArm = sphere(robot, [-0.425, 0.61, 0.005], [0.105, 0.17, 0.13], robotSage); robotLeftArm.rotation.z = -0.16;
    const robotRightArm = sphere(robot, [0.425, 0.61, 0.005], [0.105, 0.17, 0.13], robotSage); robotRightArm.rotation.z = 0.16;
    const robotFeet: THREE.Mesh[] = [];
    for (const side of [-1, 1]) robotFeet.push(sphere(robot, [side * 0.155, 0.17, 0.075], [0.115, 0.12, 0.16], robotSage));
    box(robot, [0.61, 0.32, 0.1], [0, 0.64, 0.3], robotSage, 0.115);
    box(robot, [0.558, 0.277, 0.09], [0, 0.645, 0.342], visor, 0.108);
    const robotEyes: THREE.Mesh[] = [];
    for (const side of [-1, 1]) robotEyes.push(box(robot, [0.039, 0.106, 0.012], [side * 0.112, 0.643, 0.392], eyeMaterial, 0.018));
    const visorShineMaterial = new THREE.MeshBasicMaterial({ color: "#c7e7de", transparent: true, opacity: 0.11, depthWrite: false }); allMaterials.add(visorShineMaterial);
    const visorShine = sphere(robot, [-0.085, 0.733, 0.391], [0.123, 0.024, 0.003], visorShineMaterial); visorShine.rotation.z = 0.07;
    const beadMaterial = new THREE.MeshPhysicalMaterial({ color: "#b9e5d5", roughness: 0.18, metalness: 0.2, emissive: "#8acfc5", emissiveIntensity: 0.35, clearcoat: 1 }); allMaterials.add(beadMaterial);
    const robotBead = sphere(robot, [0.34, 1.09, 0.03], [0.056, 0.056, 0.056], beadMaterial);
    const robotGlow = new THREE.PointLight(0xa9e8d9, 0.2, 1.6, 2); robotGlow.position.set(0, 0.58, 0.53); robot.add(robotGlow);
    const robotPad = new THREE.Mesh(new THREE.RingGeometry(0.47, 0.49, 48), material("#a1b79a")); robotPad.rotation.x = -Math.PI / 2; robotPad.position.set(-1.78, 0.024, 2.28); scene.add(robotPad);
    const aiMark = texture(128, 64, ctx => { ctx.clearRect(0, 0, 128, 64); ctx.fillStyle = "#779284"; ctx.font = "500 40px monospace"; ctx.textAlign = "center"; ctx.fillText("AI", 64, 48); });
    const aiMarkMaterial = new THREE.MeshStandardMaterial({ map: aiMark, transparent: true, roughness: 0.8 }); allMaterials.add(aiMarkMaterial);
    const robotMark = new THREE.Mesh(new THREE.PlaneGeometry(0.14, 0.07), aiMarkMaterial); robotMark.position.set(0, 0.39, 0.284); robot.add(robotMark);

    // Interaction ownership is inherited from groups, so every part is clickable.
    Object.entries(objects).forEach(([id, group]) => {
      group.traverse(child => {
        if (child instanceof THREE.Mesh) {
          child.userData.destination = id;
          pickables.push(child);
          if (child.material instanceof THREE.MeshStandardMaterial) {
            const cloned = child.material.clone();
            child.material = cloned; allMaterials.add(cloned); highlights[id].push(child);
          }
        }
      });
      const ringMaterial = new THREE.MeshBasicMaterial({ color: "#c4e6b9", transparent: true, opacity: 0, depthWrite: false, side: THREE.DoubleSide }); allMaterials.add(ringMaterial);
      const ring = new THREE.Mesh(new THREE.RingGeometry(0.28, 0.3, 48), ringMaterial);
      ring.position.copy(focusPoints[id]); ring.position.z += 0.23;
      rings[id] = ring; scene.add(ring);
    });

    // Only the seated person opens About. The wall print is purely decorative.
    person.userData.destination = "about";
    person.traverse(child => {
      if (!(child instanceof THREE.Mesh)) return;
      child.userData.destination = "about";
      pickables.push(child);
      if (child.material instanceof THREE.MeshStandardMaterial) {
        const cloned = child.material.clone();
        child.material = cloned; allMaterials.add(cloned); highlights.about.push(child);
      }
    });
    const updatePersonDestination = () => {
      head.updateWorldMatrix(true, false);
      anchors.about.set(0.37, -0.02, 0.16).applyMatrix4(head.matrixWorld);
      focusPoints.about.set(0, -0.18, 0.04).applyMatrix4(head.matrixWorld);
      rings.about.position.copy(focusPoints.about); rings.about.position.z += 0.23;
    };
    updatePersonDestination();

    // Capture both palettes after interaction materials have been cloned.
    // Always copy a saved color, so repeated day/night switches cannot drift.
    const daylightPalette: Record<string, string> = {
      e8e5d6: "#ece5d9", a2b4a2: "#9ab5a6", f5eddb: "#eee9df",
      ba8651: "#b78960", d6a56d: "#d3ae84", "6c4b36": "#70513e",
      f4eddc: "#f2ecdf", "567964": "#507663", b6d0b5: "#b3cbb6",
      cf784e: "#c78c70", b8975f: "#b5986e", b86c4e: "#bc816b",
      e5b28e: "#e3b99a", "657b65": "#69846c", faf5e8: "#f3efe5",
      "91ada0": "#98b8af", "70917c": "#739985", aec093: "#b0c59d",
      f5e4b8: "#e9dfc9", edf1e6: "#e9eee6", b8c9b5: "#b1c8b8"
    };
    const themedSurfaces = Array.from(allMaterials).flatMap(surface => {
      if (!(surface instanceof THREE.MeshStandardMaterial)) return [];
      const nightColor = surface.color.clone();
      const daylightColor = nightColor.clone();
      const specified = daylightPalette[nightColor.getHexString()];
      if (specified) daylightColor.set(specified);
      return [{ surface, nightColor, daylightColor }];
    });

    // Keep world objects and their projected controls in the same responsive layout.
    const anchorOrigins = Object.fromEntries(Object.entries(anchors).map(([id, point]) => [id, point.clone()]));
    const focusOrigins = Object.fromEntries(Object.entries(focusPoints).map(([id, point]) => [id, point.clone()]));
    const moveDestination = (id: string, x: number, y = 0, z = 0) => {
      const offset = new THREE.Vector3(x, y, z);
      objects[id].position.copy(offset);
      anchors[id].copy(anchorOrigins[id]).add(offset);
      focusPoints[id].copy(focusOrigins[id]).add(offset);
      rings[id].position.copy(focusPoints[id]); rings[id].position.z += 0.23;
    };

    let width = 1, height = 1, disposed = false, frame = 0, ready = false, renderedFrames = 0;
    let wideLayout = 0;
    let lastTime = performance.now(), elapsed = 0, robotTime = 0, lastNight = propsRef.current.night;
    let lastFocus: string | null = null, moving = false, dragging = false;
    let pointerStart = { x: 0, y: 0 };
    const raycaster = new THREE.Raycaster();
    const pointer = new THREE.Vector2();
    const projection = new THREE.Vector3();
    const robotHeadPosition = new THREE.Vector3();
    const robotRoute = [new THREE.Vector2(-1.78, 2.28), new THREE.Vector2(-0.88, 2.65), new THREE.Vector2(-1.2, 1.75), new THREE.Vector2(-2.12, 1.88)];
    const desiredPosition = homePosition.clone(), desiredTarget = homeTarget.clone();
    let renderUntil = performance.now() + 1000;
    const requestFrame = () => {
      if (disposed || document.hidden || frame) return;
      frame = requestAnimationFrame(render);
    };
    const wake = () => { renderUntil = performance.now() + 650; requestFrame(); };
    wakeRef.current = wake;

    const updateHover = (id: string | null) => {
      if (hoverRef.current === id) return;
      hoverRef.current = id;
      propsRef.current.onHover(id);
      canvas.style.cursor = id ? "pointer" : dragging ? "grabbing" : "grab";
      wake();
    };
    const hitTest = (event: PointerEvent) => {
      const rect = canvas.getBoundingClientRect();
      pointer.set((event.clientX - rect.left) / rect.width * 2 - 1, -((event.clientY - rect.top) / rect.height) * 2 + 1);
      raycaster.setFromCamera(pointer, camera);
      const hit = raycaster.intersectObjects(pickables, false)[0];
      return hit?.object.userData.destination as string | undefined;
    };
    const onPointerMove = (event: PointerEvent) => {
      if (event.buttons > 0 && Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) > 5) dragging = true;
      if (!dragging) updateHover(hitTest(event) ?? null);
      wake();
    };
    const onPointerDown = (event: PointerEvent) => { pointerStart = { x: event.clientX, y: event.clientY }; dragging = false; wake(); };
    const onPointerUp = (event: PointerEvent) => {
      if (!dragging && Math.hypot(event.clientX - pointerStart.x, event.clientY - pointerStart.y) < 7) {
        const id = hitTest(event);
        if (id === "assistant") propsRef.current.onAsk?.();
        else if (id === "home") propsRef.current.onHome?.();
        else if (id === "light") propsRef.current.onToggleNight?.();
        else if (id) propsRef.current.onSelect(id);
        else if (event.button === 0 && propsRef.current.selected) propsRef.current.onBlankClick?.();
      }
      dragging = false; wake();
    };
    const onPointerLeave = () => { dragging = false; updateHover(null); };
    const onContextLost = (event: Event) => { event.preventDefault(); propsRef.current.onError(); };
    // Real time is independent of the decorative animation clock. One frame per
    // second keeps it current even with reduced motion or the AI panel open.
    let clockTimer: ReturnType<typeof setTimeout> | undefined;
    const tickClock = () => {
      clearTimeout(clockTimer);
      if (disposed || document.hidden) return;
      syncWallClock(); requestFrame();
      clockTimer = setTimeout(tickClock, 1000 - Date.now() % 1000);
    };
    const onVisibilityChange = () => {
      clearTimeout(clockTimer);
      if (document.hidden) {
        if (frame) { cancelAnimationFrame(frame); frame = 0; }
      } else { tickClock(); lastTime = performance.now(); wake(); }
    };
    const resize = () => {
      width = Math.max(1, container.clientWidth); height = Math.max(1, container.clientHeight);
      renderer.setSize(width, height, false);
      const mobile = width < 700;
      camera.aspect = width / height;
      wideLayout = mobile ? 0 : THREE.MathUtils.smoothstep(camera.aspect, 1.35, 1.9);
      camera.fov = mobile ? 66 : THREE.MathUtils.lerp(49, 44, wideLayout);
      homePosition.set(...(mobile ? [0.9, 3.2, 7.8] : [4.15 - 0.65 * wideLayout, 4.1 - 0.05 * wideLayout, 8.2 - 0.1 * wideLayout]) as [number, number, number]);
      homeTarget.set(...(mobile ? [-1, 1.85, 0.4] : [-0.15, 2.05 + 0.05 * wideLayout, -1.15]) as [number, number, number]);
      leftWall.position.x = -4.6 - wideLayout;
      leftSkirting.position.x = -4.47 - wideLayout;
      shelf.position.x = -3.13 - 0.9 * wideLayout;
      shelfShadow.position.x = shelf.position.x;
      moveDestination("education", -0.9 * wideLayout);
      moveDestination("research", -0.9 * wideLayout);
      portrait.position.x = -4.46 - wideLayout;
      updatePersonDestination();
      moveDestination("home", -wideLayout);
      moveDestination("life", 1.1 * wideLayout);
      moveDestination("light", wideLayout);
      wallClock.position.set(4.34 + 0.8 * wideLayout, 4.97 - 0.1 * wideLayout, clockDepth);
      windowPlant.position.x = 4.35 + 0.9 * wideLayout;
      lampLight.position.x = 3.62 + wideLayout;
      welcome.position.y = 5.32 - 0.1 * wideLayout;
      sideTable.position.x = -3.3 - 0.7 * wideLayout;
      sideTable.position.z = 1.34 - 0.35 * wideLayout;
      // Give the guide its own foreground space without shifting the central desk.
      const guideOffset = mobile ? 0 : 0.2 + wideLayout;
      robot.position.x -= guideOffset - robot.userData.layoutOffset;
      robot.userData.layoutOffset = guideOffset;
      camera.position.copy(homePosition); controls.target.copy(homeTarget); camera.lookAt(homeTarget);
      desiredPosition.copy(homePosition); desiredTarget.copy(homeTarget); lastFocus = null; moving = false;
      controls.enablePan = mobile;
      controls.mouseButtons.LEFT = mobile ? THREE.MOUSE.PAN : THREE.MOUSE.ROTATE;
      controls.touches.ONE = mobile ? THREE.TOUCH.PAN : THREE.TOUCH.ROTATE;
      camera.updateProjectionMatrix(); wake();
    };
    function render(now: number) {
      frame = 0;
      if (disposed || document.hidden) return;
      const current = propsRef.current;
      // A frame timestamp can precede effect setup; never step the patrol backwards.
      const dt = Math.max(0, Math.min((now - lastTime) / 1000, 0.05)); lastTime = now;
      if (!current.paused) elapsed += dt;
      if (current.night !== lastNight || !ready) {
        lastNight = current.night;
        // Warm-white key and cool sky fill, inspired by Rowobin's room lighting.
        // The daylight key comes from the window side, keeping the left wall open.
        hemi.intensity = current.night ? 0.48 : 0.72;
        scene.environmentIntensity = current.night ? 0.12 : 0.22;
        shelfLights.forEach(light => { light.intensity = current.night ? 1.8 : 0.25; });
        stripMaterial.emissiveIntensity = current.night ? 2 : 0.3;
        hemi.color.set(current.night ? "#a8c1db" : "#dce9ff");
        hemi.groundColor.set(current.night ? "#8a8e78" : "#9a9688");
        sun.intensity = current.night ? 0.4 : 2.5;
        sun.color.set(current.night ? "#b8cce7" : "#fff2da");
        sun.position.set(4, 8, 5);
        sun.shadow.radius = current.night ? 4 : 5;
        fill.intensity = current.night ? 0.22 : 0.65;
        fill.color.set(current.night ? "#d7e8f7" : "#ddefff");
        fill.position.set(...(current.night ? [6, 5, -3] : [-5, 4, 4]) as [number, number, number]);
        lampLight.intensity = current.night ? 12 : 0.35;
        shadeMaterial.emissiveIntensity = current.night ? 0.8 : 0.02;
        screenLight.intensity = current.night ? 1.3 : 0.32;
        skyMaterial.map = current.night ? nightScenery : dayScenery;
        skyMaterial.color.set(current.night ? "#829cb5" : "#d6dfdb");
        themedSurfaces.forEach(({ surface, nightColor, daylightColor }) => {
          surface.color.copy(current.night ? nightColor : daylightColor);
        });
        (floor.material as THREE.MeshStandardMaterial).map = current.night ? floorMap : daylightFloorMap;
        renderer.toneMappingExposure = 0.95;
      }
      const requestedFocus = keyboardFocusRef.current ?? current.focusTarget;
      if (requestedFocus !== lastFocus) {
        lastFocus = requestedFocus;
        const focus = lastFocus ? focusPoints[lastFocus] : null;
        if (focus) {
          desiredTarget.copy(homeTarget).lerp(focus, keyboardFocusRef.current || width < 700 ? 0.86 : 0.14);
          desiredPosition.copy(homePosition).add(desiredTarget.clone().sub(homeTarget));
        } else { desiredTarget.copy(homeTarget); desiredPosition.copy(homePosition); }
        moving = true;
      }
      if (moving) {
        const speed = current.paused ? 1 : 1 - Math.exp(-dt * 5);
        camera.position.lerp(desiredPosition, speed);
        controls.target.lerp(desiredTarget, speed);
        camera.lookAt(controls.target);
        const wantedZoom = requestedFocus ? 1.035 : 1;
        camera.zoom = THREE.MathUtils.lerp(camera.zoom, wantedZoom, speed);
        camera.updateProjectionMatrix();
        if (camera.position.distanceTo(desiredPosition) < 0.002 && Math.abs(camera.zoom - wantedZoom) < 0.002) moving = false;
      }
      if (!current.paused) {
        controls.update();
        if (width < 700) {
          const boundedTarget = controls.target.clone().clamp(new THREE.Vector3(-3.9, 0.8, -2.5), new THREE.Vector3(4.5, 4.7, 2.5));
          camera.position.add(boundedTarget.clone().sub(controls.target));
          controls.target.copy(boundedTarget);
        }
        torso.rotation.x = Math.sin(elapsed * 1.5) * 0.012;
        head.rotation.y = Math.sin(elapsed * 0.4) * 0.025;
        hands.forEach((hand, i) => { hand.position.y = 0.59 + Math.max(0, Math.sin(elapsed * 7 + i * 2.6)) * 0.014; });
        animatedPlants.forEach((plant, i) => { plant.rotation.z = Math.sin(elapsed * 0.7 + i * 1.3) * 0.017; });
        atom.rotation.y = elapsed * 0.13;
        const attentive = hoverRef.current === "assistant" || keyboardFocusRef.current === "assistant" || current.assistantOpen;
        if (!attentive) robotTime += dt;
        const routeIndex = Math.floor(robotTime / 8) % robotRoute.length;
        const routePhase = robotTime % 8;
        const from = robotRoute[routeIndex], to = robotRoute[(routeIndex + 1) % robotRoute.length];
        const progress = THREE.MathUtils.clamp((routePhase - 2.2) / 5.8, 0, 1);
        const easedProgress = progress * progress * (3 - 2 * progress);
        const walking = !attentive && progress > 0 && progress < 1;
        if (!attentive) {
          robot.position.x = THREE.MathUtils.lerp(from.x, to.x, easedProgress) - robot.userData.layoutOffset;
          robot.position.z = THREE.MathUtils.lerp(from.y, to.y, easedProgress);
        }
        const hop = !attentive && routePhase > 0.5 && routePhase < 1.18 ? Math.sin((routePhase - 0.5) / 0.68 * Math.PI) * 0.18 : 0;
        const step = Math.sin(robotTime * 9);
        const targetY = -0.045 + hop + (walking ? Math.abs(step) * 0.016 : 0);
        robot.position.y = THREE.MathUtils.lerp(robot.position.y, targetY, 1 - Math.exp(-dt * 18));
        robot.rotation.z = THREE.MathUtils.lerp(robot.rotation.z, walking ? step * 0.05 : Math.sin(elapsed * 1.5) * 0.01, 1 - Math.exp(-dt * 8));
        const visitorAngle = Math.atan2(camera.position.x - robot.position.x, camera.position.z - robot.position.z);
        const heading = walking ? Math.atan2(to.x - from.x, to.y - from.y) : visitorAngle;
        const turn = Math.atan2(Math.sin(heading - robot.rotation.y), Math.cos(heading - robot.rotation.y));
        robot.rotation.y += turn * (1 - Math.exp(-dt * (attentive ? 6 : 3)));
        robotFeet.forEach((foot, i) => {
          const stride = Math.sin(robotTime * 9 + i * Math.PI);
          foot.position.y = THREE.MathUtils.lerp(foot.position.y, 0.17 + (walking ? Math.max(0, stride) * 0.055 : 0), 1 - Math.exp(-dt * 16));
          foot.position.z = THREE.MathUtils.lerp(foot.position.z, 0.075 + (walking ? stride * 0.075 : 0), 1 - Math.exp(-dt * 16));
          foot.rotation.x = walking ? stride * 0.13 : 0;
        });
        robotLeftArm.rotation.x = walking ? step * 0.28 : Math.sin(elapsed * 1.4) * 0.035;
        robotRightArm.rotation.x = walking ? -step * 0.28 : 0;
        robotLeftArm.rotation.z = -0.16 - hop * 0.9;
        robotRightArm.rotation.z = 0.16 + hop * 0.9 + (attentive ? Math.sin(elapsed * 4) * 0.1 : 0);
        robotBead.position.y = 1.09 + Math.sin(elapsed * 2.2) * 0.055;
        robotBead.position.x = 0.34 + Math.sin(elapsed * 1.3) * 0.018;
        const blinkPhase = elapsed % 4.2;
        const eyeScale = blinkPhase > 3.86 && blinkPhase < 4.08 ? 0.12 + 0.88 * Math.abs(blinkPhase - 3.97) / 0.11 : 1;
        robotEyes.forEach(eye => { eye.scale.y = eyeScale; });
      }
      updatePersonDestination();
      // All interactive markers track the live body, including while its patrol
      // is held by hover, keyboard focus, an open conversation or reduced motion.
      robot.updateWorldMatrix(true, false);
      anchors.assistant.set(0, 0.7, 0.36).applyMatrix4(robot.matrixWorld);
      focusPoints.assistant.copy(robot.position).y += 0.7;
      rings.assistant.position.copy(focusPoints.assistant);
      robotPad.position.set(robot.position.x, 0.024, robot.position.z);
      robotPad.scale.setScalar(1 - Math.max(0, robot.position.y + 0.045) * 0.4);
      const active = hoverRef.current || current.selected;
      Object.entries(highlights).forEach(([id, meshes]) => {
        meshes.forEach(mesh => {
          const surface = mesh.material as THREE.MeshStandardMaterial;
          surface.emissive.set("#aed399"); surface.emissiveIntensity = active === id ? 0.055 : 0;
        });
        const ring = rings[id];
        (ring.material as THREE.MeshBasicMaterial).opacity = active === id ? 0.42 : 0;
        ring.quaternion.copy(camera.quaternion);
        ring.scale.setScalar(1 + (current.paused ? 0 : Math.sin(elapsed * 2) * 0.05));
      });
      renderer.render(scene, camera);
      const npcAnchor = npcAnchorRef.current;
      if (npcAnchor) {
        robotHeadPosition.set(0, 1.28, 0).applyMatrix4(robot.matrixWorld).project(camera);
        const headX = (robotHeadPosition.x * 0.5 + 0.5) * width;
        const headY = (-robotHeadPosition.y * 0.5 + 0.5) * height;
        const bubbleWidth = Math.min(226, width - 24);
        const bubbleX = THREE.MathUtils.clamp(headX, 12 + bubbleWidth / 2, width - 12 - bubbleWidth / 2);
        const bubbleY = THREE.MathUtils.clamp(headY - 12, 142, height - 85);
        npcAnchor.style.width = `${bubbleWidth}px`;
        npcAnchor.style.transform = `translate3d(${bubbleX}px, ${bubbleY}px, 0) translate(-50%, -100%)`;
        npcAnchor.style.setProperty("--npc-tail-x", `${THREE.MathUtils.clamp(headX - bubbleX + bubbleWidth / 2, 20, bubbleWidth - 20)}px`);
        const npcVisible = Math.abs(robotHeadPosition.x) < 1.18 && Math.abs(robotHeadPosition.y) < 1.12 && robotHeadPosition.z > -1 && robotHeadPosition.z < 1;
        npcAnchor.style.opacity = npcVisible ? "1" : "0";
        npcAnchor.style.visibility = npcVisible ? "visible" : "hidden";
      }
      renderedFrames++;
      if (canvas && (renderedFrames % 30 === 0 || current.paused || !ready)) canvas.dataset.frame = String(renderedFrames);
      destinations.forEach(({ id }) => {
        const button = buttonsRef.current[id]; if (!button) return;
        projection.copy(anchors[id]).project(camera);
        const rawX = (projection.x * 0.5 + 0.5) * width, rawY = (-projection.y * 0.5 + 0.5) * height;
        const offscreen = Math.abs(projection.x) > 0.94 || Math.abs(projection.y) > 0.9;
        const x = Math.max(24, Math.min(width - 24, rawX)), y = Math.max(46, Math.min(height - 70, rawY));
        const visible = projection.z > -1 && projection.z < 1;
        button.style.transform = `translate3d(${x}px, ${y}px, 0) translate(-50%, -50%)`;
        button.style.opacity = visible ? "1" : "0";
        button.style.pointerEvents = visible ? "auto" : "none";
        button.dataset.active = active === id ? "true" : "false";
        button.dataset.offscreen = offscreen ? "true" : "false";
        button.dataset.labelSide = x > width * 0.7 ? "left" : "right";
      });
      if (!ready) { ready = true; propsRef.current.onReady(); }
      if (!current.paused || moving || dragging || now < renderUntil) requestFrame();
    }

    canvas.addEventListener("pointermove", onPointerMove);
    canvas.addEventListener("pointerdown", onPointerDown);
    canvas.addEventListener("pointerup", onPointerUp);
    canvas.addEventListener("pointerleave", onPointerLeave);
    canvas.addEventListener("webglcontextlost", onContextLost);
    document.addEventListener("visibilitychange", onVisibilityChange);
    controls.addEventListener("change", wake);
    const observer = new ResizeObserver(resize); observer.observe(container); resize();
    canvas.style.cursor = "grab";
    tickClock();
    return () => {
      disposed = true; wakeRef.current = () => undefined;
      clearTimeout(clockTimer);
      if (frame) cancelAnimationFrame(frame);
      observer.disconnect(); controls.removeEventListener("change", wake); controls.dispose();
      canvas.removeEventListener("pointermove", onPointerMove);
      canvas.removeEventListener("pointerdown", onPointerDown);
      canvas.removeEventListener("pointerup", onPointerUp);
      canvas.removeEventListener("pointerleave", onPointerLeave);
      canvas.removeEventListener("webglcontextlost", onContextLost);
      document.removeEventListener("visibilitychange", onVisibilityChange);
      const geometries = new Set<THREE.BufferGeometry>();
      scene.traverse(object => { if (object instanceof THREE.Mesh) geometries.add(object.geometry); });
      geometries.forEach(geometry => geometry.dispose());
      allMaterials.forEach(surface => surface.dispose()); textures.forEach(map => map.dispose());
      sceneryImages.forEach(image => { image.onload = null; image.onerror = null; });
      environmentTarget.dispose();
      renderer.dispose();
    };
  }, []);

  const hover = (id: string | null) => { hoverRef.current = id; propsRef.current.onHover(id); wakeRef.current(); };
  return (
    <div ref={containerRef} className="room-scene" data-room-scene="true" data-night={props.night}>
      <time ref={clockTimeRef} className="sr-only" aria-label={props.locale === "en" ? "Local time" : "当地时间"} />
      <canvas ref={canvasRef} aria-label={props.locale === "en" ? "Interactive 3D studio. Drag to look around or explore the labeled objects." : "可以拖动视角的三维工作室，使用物品标签探索内容"} />
      <div
        ref={npcAnchorRef}
        className="npc-anchor"
        onMouseEnter={() => hover("assistant")}
        onMouseLeave={() => hover(null)}
        onFocus={() => hover("assistant")}
        onBlur={() => hover(null)}
      >
        <NpcDialogue locale={props.locale ?? "zh"} night={props.night} paused={props.paused} hidden={props.assistantOpen} onSpeak={() => propsRef.current.onAsk?.()} />
      </div>
      <div className="hotspots" aria-label={props.locale === "en" ? "Explore the studio" : "工作室中的内容入口"}>
        {destinations.map(({ id, name, en }) => id === "home" ? (
          // Native anchor preserves browser link actions for the physical EXIT.
          // eslint-disable-next-line @next/next/no-html-link-for-pages
          <a
            key={id}
            href="/"
            className="hotspot"
            ref={node => { buttonsRef.current[id] = node; }}
            data-room-hotspot={id}
            aria-label={props.locale === "en" ? "Return to the classic home" : "返回经典首页"}
            onMouseEnter={() => hover(id)} onMouseLeave={() => hover(null)}
            onFocus={event => { if (event.currentTarget.matches(":focus-visible")) keyboardFocusRef.current = id; hover(id); }}
            onBlur={() => { keyboardFocusRef.current = null; hover(null); }}
            onClick={event => { if (propsRef.current.onHome && !event.metaKey && !event.ctrlKey && !event.shiftKey && !event.altKey) { event.preventDefault(); propsRef.current.onHome(); } }}
          >
            <span className="hotspot-dot" aria-hidden="true" /><span className="hotspot-line" aria-hidden="true" />
            <span className="hotspot-name">{props.locale === "en" ? en : name}</span>
          </a>
        ) : (
          <button
            key={id}
            className="hotspot"
            ref={node => { buttonsRef.current[id] = node; }}
            type="button"
            data-room-hotspot={id}
            aria-label={props.locale === "en" ? `Explore ${en}` : `探索${name}`}
            aria-pressed={id === "light" ? props.night : props.selected === id}
            onMouseEnter={() => hover(id)}
            onMouseLeave={() => hover(null)}
            onFocus={event => { if (event.currentTarget.matches(":focus-visible")) keyboardFocusRef.current = id; hover(id); }}
            onBlur={() => { keyboardFocusRef.current = null; hover(null); }}
            onClick={() => { if (id === "assistant") propsRef.current.onAsk?.(); else if (id === "light") propsRef.current.onToggleNight?.(); else propsRef.current.onSelect(id); }}
          >
            <span className="hotspot-dot" aria-hidden="true" />
            <span className="hotspot-line" aria-hidden="true" />
            <span className="hotspot-name">{props.locale === "en" ? en : name}</span>
          </button>
        ))}
      </div>
      <style jsx>{`
        .room-scene { position: relative; width: 100%; height: 100%; isolation: isolate; }
        .npc-anchor { position: absolute; left: 0; top: 0; width: 226px; max-width: calc(100% - 24px); z-index: 3; opacity: 0; pointer-events: none; }
        canvas { display: block; width: 100%; height: 100%; touch-action: none; outline: none; }
        .hotspots { position: absolute; inset: 0; pointer-events: none; overflow: hidden; }
        .hotspot { position: absolute; left: 0; top: 0; width: 44px; height: 44px; padding: 0; color: #2c4635; background: transparent; border: 0; border-radius: 50%; cursor: pointer; opacity: 0; outline: none; }
        .hotspot-dot { position: absolute; left: 50%; top: 50%; width: 6px; height: 6px; border: 1px solid rgba(43,72,50,.55); border-radius: 50%; background: rgba(248,246,226,.88); transform: translate(-50%,-50%); box-shadow: 0 0 0 3px rgba(240,239,221,.12); transition: box-shadow .2s, background .2s; }
        .hotspot-line { position: absolute; left: calc(50% + 6px); top: 50%; width: 16px; height: 1px; background: currentColor; opacity: .32; transform-origin: left; transition: width .2s, opacity .2s; }
        .hotspot-name { position: absolute; left: calc(50% + 30px); top: 50%; transform: translateY(-50%); font-size: 12px; font-weight: 550; letter-spacing: .04em; white-space: nowrap; opacity: 0; pointer-events: none; text-shadow: 0 1px 5px #ece9d8, 0 0 10px #ece9d8; transition: opacity .18s; }
        .hotspot[data-label-side="left"] .hotspot-name { left: auto; right: calc(50% + 30px); }
        .hotspot[data-label-side="left"] .hotspot-line { left: auto; right: calc(50% + 6px); }
        .hotspot[data-offscreen="true"] .hotspot-dot { background: rgba(243,241,222,.7); width: 5px; height: 5px; }
        .hotspot[data-room-hotspot="home"][data-offscreen="true"] .hotspot-name { opacity: .78; font-size: 10px; }
        .hotspot[data-room-hotspot="assistant"] .hotspot-dot, .hotspot[data-room-hotspot="assistant"] .hotspot-line, .hotspot[data-room-hotspot="assistant"] .hotspot-name { opacity: 0; }
        .hotspot[data-room-hotspot="assistant"]:focus-visible .hotspot-dot { opacity: 1; }
        .hotspot[data-active="true"] .hotspot-name, .hotspot:focus-visible .hotspot-name { opacity: 1; }
        .hotspot[data-active="true"] .hotspot-line, .hotspot:focus-visible .hotspot-line { opacity: .8; width: 22px; }
        .hotspot[data-active="true"] .hotspot-dot, .hotspot:focus-visible .hotspot-dot { background: #c9e7b7; box-shadow: 0 0 0 5px rgba(240,239,221,.28); }
        .room-scene[data-night="true"] .hotspot { color: #f1efdc; }
        .room-scene[data-night="true"] .hotspot-name { text-shadow: 0 1px 5px #243a32, 0 0 10px #243a32; }
        @media (max-width: 640px) { .hotspot-name { font-size: 11px; } }
      `}</style>
    </div>
  );
}
