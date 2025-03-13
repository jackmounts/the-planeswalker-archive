import { Environment, PerspectiveCamera, useGLTF } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";

export function Common({ color }: { color?: string }) {
  return (
    <>
      {color && <color attach="background" args={[color]} />}
      <ambientLight intensity={0.5} />
      <pointLight position={[-20, 30, 10]} intensity={5} />
      <pointLight position={[-10, -10, -10]} color="white" intensity={3} />
      <Environment preset="studio" />
      <PerspectiveCamera makeDefault fov={35} position={[0, 1, 6]} />
    </>
  );
}

/* eslint-disable @typescript-eslint/no-explicit-any */
export function Card(props: any) {
  const { scene } = useGLTF(
    "/models/d382c62a8f56431beea90aad46a74c2c1d6b17c1.glb"
  );
  useFrame((state, delta) => {
    scene.rotation.y += delta * 0.5;
    scene.rotation.z = 0.1;
  });
  return <primitive object={scene} {...props} />;
}
