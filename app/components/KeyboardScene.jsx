'use client';

import { Suspense, useEffect, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { RoundedBox, useTexture } from '@react-three/drei';
import { MathUtils } from 'three';
import { skills } from '../data/portfolio';

function Keycap({ skill, index, active, onSelect, group, motionEnabled }) {
  const ref = useRef(null);
  const texture = useTexture(`/tech/${skill.id}.svg`);
  const selected = active === skill.id;
  const dim = group !== 'All keys' && skill.group !== group;
  const x = ((index % 5) - 2) * 1.07;
  const z = (Math.floor(index / 5) - 1.5) * 1.07;

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
          color={dim ? '#46433b' : skill.color}
          roughness={0.36}
          metalness={0.12}
          emissive={selected ? skill.color : '#000000'}
          emissiveIntensity={selected ? 0.16 : 0}
        />
      </RoundedBox>
      <mesh position={[0, 0.255, -0.04]} rotation={[-Math.PI / 2, 0, 0]} raycast={() => null}>
        <planeGeometry args={[0.44, 0.44]} />
        <meshBasicMaterial map={texture} transparent toneMapped={false} opacity={dim ? 0.25 : 1} />
      </mesh>
    </group>
  );
}

function Keyboard({ active, onSelect, group, motionEnabled }) {
  const keyboard = useRef(null);
  useFrame((state, delta) => {
    if (!keyboard.current) return;
    const target = motionEnabled ? state.pointer.x * 0.06 : 0;
    keyboard.current.rotation.y = MathUtils.damp(
      keyboard.current.rotation.y,
      -0.26 + target,
      3,
      delta,
    );
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
        args={[5.68, 0.35, 4.58]}
        radius={0.22}
        position={[0, -0.16, 0]}
        castShadow
        receiveShadow
      >
        <meshStandardMaterial color="#242622" roughness={0.4} metalness={0.65} />
      </RoundedBox>
      <RoundedBox args={[5.5, 0.08, 4.4]} radius={0.18} position={[0, 0.035, 0]} receiveShadow>
        <meshStandardMaterial color="#151713" roughness={0.65} />
      </RoundedBox>
      {skills.map((skill, index) => (
        <Keycap
          key={skill.id}
          skill={skill}
          index={index}
          active={active}
          onSelect={onSelect}
          group={group}
          motionEnabled={motionEnabled}
        />
      ))}
      <mesh position={[0, -0.06, 2.298]}>
        <boxGeometry args={[3.5, 0.025, 0.01]} />
        <meshBasicMaterial color="#dca65f" />
      </mesh>
    </group>
  );
}

export default function KeyboardScene({ active, onSelect, group, motionEnabled, inView }) {
  return (
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
      <ambientLight intensity={1.3} />
      <directionalLight
        position={[-3, 8, 3]}
        intensity={3}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-normalBias={0.05}
      />
      <directionalLight position={[5, 3, -2]} intensity={2} color="#e9b175" />
      <Suspense fallback={null}>
        <Keyboard active={active} onSelect={onSelect} group={group} motionEnabled={motionEnabled} />
      </Suspense>
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.37, 0]} receiveShadow>
        <planeGeometry args={[40, 40]} />
        <shadowMaterial transparent opacity={0.25} />
      </mesh>
    </Canvas>
  );
}
