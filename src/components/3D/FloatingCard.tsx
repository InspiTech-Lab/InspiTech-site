import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RoundedBox, Text } from '@react-three/drei';
import { useAppSelector } from '../../hooks/redux';
import * as THREE from 'three';

interface FloatingCardProps {
  position: [number, number, number];
  title: string;
  onClick?: () => void;
}

export function FloatingCard({ position, title, onClick }: FloatingCardProps) {
  const meshRef = useRef<THREE.Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const isDarkMode = useAppSelector((state) => state.theme.isDarkMode);

  useFrame((state) => {
    if (meshRef.current) {
      meshRef.current.rotation.y = Math.sin(state.clock.elapsedTime + position[0]) * 0.1;
      meshRef.current.position.y = position[1] + Math.sin(state.clock.elapsedTime + position[0]) * 0.2;
      
      if (hovered) {
        meshRef.current.scale.setScalar(1.1);
      } else {
        meshRef.current.scale.setScalar(1);
      }
    }
  });

  return (
    <group position={position}>
      <RoundedBox
        ref={meshRef}
        args={[2, 1.2, 0.1]}
        radius={0.1}
        smoothness={4}
        onPointerOver={() => setHovered(true)}
        onPointerOut={() => setHovered(false)}
        onClick={onClick}
      >
        <meshStandardMaterial
          color={isDarkMode ? '#1e293b' : '#f8fafc'}
          emissive={hovered ? (isDarkMode ? '#0f172a' : '#e2e8f0') : '#000000'}
          emissiveIntensity={hovered ? 0.2 : 0}
          roughness={0.3}
          metalness={0.1}
        />
      </RoundedBox>
      
      <Text
        position={[0, 0, 0.06]}
        fontSize={0.15}
        color={isDarkMode ? '#06b6d4' : '#8b5cf6'}
        anchorX="center"
        anchorY="middle"
        maxWidth={1.8}
      >
        {title}
      </Text>
    </group>
  );
}