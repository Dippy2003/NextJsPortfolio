'use client';

import { useEffect, useRef } from 'react';
import { Canvas, useFrame, useThree } from '@react-three/fiber';
import { RoundedBox } from '@react-three/drei';
import { DoubleSide, MathUtils } from 'three';
import { skills } from '../data/portfolio';
import useKeyLogoTexture from './useKeyLogoTexture';

function Keycap({ skill, index, columns, rows, active, onSelect, motionEnabled }) {
  const ref = useRef(null);
  const texture = useKeyLogoTexture(skill.id);
  const selected = active === skill.id;
  const x = ((index % columns) - (columns - 1) / 2) * 1.07;
  const z = (Math.floor(index / columns) - (rows - 1) / 2) * 1.07;

  useFrame((_, delta) => {
    if (!ref.current) return;
    const target = selected ? 0.12 : 0.29;
    ref.current.position.y = motionEnabled
      ? MathUtils.damp(ref.current.position.y, target, 14, delta)
      : target;
  });

  return (
    <group ref={ref} position={[x, 0.29, z]}>
      <RoundedBox
        args={[0.94, 0.5, 0.94]}
        radius={0.13}
        smoothness={4}
        castShadow
        receiveShadow
        onClick={(event) => {
          event.stopPropagation();
          onSelect(skill.id);
        }}
        onPointerOver={(event) => {
          event.stopPropagation();
          onSelect(skill.id);
          document.body.style.cursor = 'pointer';
        }}
        onPointerOut={() => {
          document.body.style.cursor = '';
        }}
      >
        <meshStandardMaterial
          color={selected ? '#dfc391' : '#e6e4dc'}
          roughness={0.48}
          metalness={0.05}
          emissive={selected ? '#b18442' : '#000000'}
          emissiveIntensity={selected ? 0.06 : 0}
        />
      </RoundedBox>
      {texture && (
        <mesh position={[0, 0.28, -0.015]} rotation={[-Math.PI / 2, 0, 0]} raycast={() => null}>
          <planeGeometry args={[0.6, 0.6]} />
          <meshBasicMaterial
            map={texture}
            transparent
            alphaTest={0.03}
            side={DoubleSide}
            toneMapped={false}
            depthWrite={false}
            polygonOffset
            polygonOffsetFactor={-2}
            opacity={1}
          />
        </mesh>
      )}
    </group>
  );
}

function CameraFraming({ width, depth, motionEnabled }) {
  const { camera, invalidate } = useThree();
  const target = useRef(null);
  useEffect(() => {
    const scale = Math.hypot(width, depth) / Math.hypot(5.68, 4.58);
    const firstFrame = !target.current;
    target.current = [5.7 * scale, 7.2 * scale, 8.4 * scale];
    if (firstFrame || !motionEnabled) camera.position.set(...target.current);
    camera.lookAt(0, 0, 0);
    camera.updateProjectionMatrix();
    invalidate();
  }, [camera, invalidate, width, depth, motionEnabled]);
  useFrame(({ camera: frameCamera }, delta) => {
    if (!motionEnabled || !target.current) return;
    frameCamera.position.set(
      MathUtils.damp(frameCamera.position.x, target.current[0], 6, delta),
      MathUtils.damp(frameCamera.position.y, target.current[1], 6, delta),
      MathUtils.damp(frameCamera.position.z, target.current[2], 6, delta),
    );
    frameCamera.lookAt(0, 0, 0);
  });
  return null;
}

function Keyboard({
  active,
  onSelect,
  visibleSkills,
  columns,
  rows,
  width,
  depth,
  motionEnabled,
  interacting,
}) {
  const keyboard = useRef(null);
  const elapsed = useRef(0);
  useFrame((_, delta) => {
    if (!keyboard.current || !motionEnabled || interacting.current) return;
    const step = Math.min(delta, 0.05);
    elapsed.current += step;
    keyboard.current.rotation.y += step * 0.12;
    keyboard.current.position.y = Math.sin(elapsed.current * 0.8) * 0.09;
  });

  useEffect(
    () => () => {
      document.body.style.cursor = '';
    },
    [],
  );

  return (
    <group ref={keyboard} rotation={[0, -0.26, 0]}>
      <RoundedBox
        args={[width, 0.35, depth]}
        radius={0.22}
        position={[0, -0.16, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#242622" roughness={0.4} metalness={0.65} />
      </RoundedBox>
      <RoundedBox
        args={[width - 0.18, 0.08, depth - 0.18]}
        radius={0.18}
        position={[0, 0.035, 0]}
        receiveShadow
      >
        <meshStandardMaterial color="#151713" roughness={0.65} />
      </RoundedBox>
      {visibleSkills.map((skill, index) => (
        <Keycap
          key={skill.id}
          skill={skill}
          index={index}
          columns={columns}
          rows={rows}
          active={active}
          onSelect={onSelect}
          motionEnabled={motionEnabled}
        />
      ))}
      <mesh position={[0, -0.06, depth / 2 + 0.008]}>
        <boxGeometry args={[width * 0.65, 0.025, 0.01]} />
        <meshBasicMaterial color="#dca65f" />
      </mesh>
      {[-1, 1].flatMap((x) =>
        [-1, 1].map((z) => (
          <mesh
            key={`${x}-${z}`}
            position={[x * (width / 2 - 0.14), 0.065, z * (depth / 2 - 0.14)]}
          >
            <cylinderGeometry args={[0.04, 0.04, 0.02, 12]} />
            <meshStandardMaterial color="#777b6c" metalness={0.8} roughness={0.3} />
          </mesh>
        )),
      )}
    </group>
  );
}

export default function KeyboardScene({ active, onSelect, group, motionEnabled, inView }) {
  const interacting = useRef(false);
  const visibleSkills =
    group === 'All keys' ? skills : skills.filter((skill) => skill.group === group);
  const columns =
    group === 'All keys' ? 8 : Math.min(6, Math.ceil(Math.sqrt(visibleSkills.length * 1.3)));
  const rows = Math.ceil(visibleSkills.length / columns);
  const width = columns * 1.07 + 0.33;
  const depth = rows * 1.07 + 0.3;
  return (
    <div
      style={{ width: '100%', height: '100%' }}
      onPointerEnter={(event) => {
        if (event.pointerType !== 'touch') interacting.current = true;
      }}
      onPointerLeave={() => {
        interacting.current = false;
      }}
      onPointerDown={() => {
        interacting.current = true;
      }}
      onPointerUp={(event) => {
        if (event.pointerType === 'touch') interacting.current = false;
      }}
      onPointerCancel={() => {
        interacting.current = false;
      }}
    >
      <Canvas
        shadows
        dpr={[1, 1.5]}
        camera={{ position: [5.7, 7.2, 8.4], fov: 37 }}
        frameloop={inView ? (motionEnabled ? 'always' : 'demand') : 'never'}
        gl={{ antialias: true, alpha: true, powerPreference: 'low-power' }}
        fallback={
          <p className="scene-fallback">Explore the keyboard using the skill buttons below.</p>
        }
        onCreated={({ camera, gl }) => {
          camera.lookAt(0, 0, 0);
          gl.setClearColor('#000000', 0);
        }}
      >
        <CameraFraming width={width} depth={depth} motionEnabled={motionEnabled} />
        <ambientLight intensity={0.9} />
        <directionalLight
          position={[-3, 8, 3]}
          intensity={2.2}
          castShadow
          shadow-mapSize={[1024, 1024]}
          shadow-normalBias={0.05}
        />
        <directionalLight position={[5, 3, -2]} intensity={1.3} color="#e9b175" />
        <Keyboard
          active={active}
          onSelect={onSelect}
          visibleSkills={visibleSkills}
          columns={columns}
          rows={rows}
          width={width}
          depth={depth}
          motionEnabled={motionEnabled}
          interacting={interacting}
        />
        <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.37, 0]} receiveShadow>
          <planeGeometry args={[40, 40]} />
          <shadowMaterial transparent opacity={0.25} />
        </mesh>
      </Canvas>
    </div>
  );
}
