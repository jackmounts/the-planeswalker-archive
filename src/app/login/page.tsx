"use client";
import { Common, Card } from "@/utils/models";
import { OrbitControls, Preload, View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Link from "next/link";
import React, { useEffect, useState } from "react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [element, setElement] = useState<HTMLElement>();

  /**
   * Set the root element
   */
  useEffect(() => {
    const root = document.getElementById("login-root");
    if (root) {
      setElement(root);
    }
  }, []);

  return (
    <>
      <div
        className="flex flex-row items-center justify-center size-full bg-[url('/images/login_bg.svg')] bg-cover bg-center"
        id="login-root"
      >
        <div className="hidden lg:flex w-3/5">
          {/* https://sketchfab.com/3d-models/trading-card-blank-low-poly-798f5a9b46bb439ca413c40e7938a6ed */}
          <View className="view">
            <Common />
            <Card position={[0, -1, 0]} scale={15} />
            <OrbitControls makeDefault enableZoom={false} enablePan={false} />
          </View>
        </div>
        <div className="flex flex-col w-full lg:w-2/5 items-center justify-start gap-y-4">
          <div className="flex flex-col items-center justify-center w-full text-white font-semibold mb-10">
            <div className="flex w-9/10 lg:w-7/10 text-3xl lg:text-4xl">
              <p>Welcome back,</p>
            </div>
            <div className="flex w-9/10 lg:w-7/10 text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
              <p>Planeswalker</p>
            </div>
          </div>
          <div className="flex w-9/10 lg:w-7/10">
            <input
              className="w-full h-12 bg-white rounded-lg px-4 placeholder:italic placeholder:text-gray-500"
              type="email"
              id="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="flex w-9/10 lg:w-7/10">
            <input
              className="w-full h-12 bg-white rounded-lg px-4 placeholder:italic placeholder:text-gray-500"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex w-9/10 lg:w-7/10">
            <Link href={"/"} className="w-full">
              <button className="bg-gray-800 text-white rounded-2xl px-4 py-2 w-full h-16 font-semibold hover:bg-gray-900">
                Log In
              </button>
            </Link>
          </div>
          <div className="flex w-9/10 lg:w-7/10">
            <button className="bg-gray-200 text-gray-900 rounded-2xl px-4 py-2 w-full h-16 font-semibold hover:bg-gray-900 hover:text-white">
              Register
            </button>
          </div>
        </div>
      </div>
      <Canvas className="canvas" eventSource={element}>
        <View.Port />
        <Preload all />
      </Canvas>
    </>
  );
};

export default LoginPage;
