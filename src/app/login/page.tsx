"use client";
import useProfileStore from "@/store/profile-store";
import { Common, Card } from "@/utils/models";
import { OrbitControls, Preload, View } from "@react-three/drei";
import { Canvas } from "@react-three/fiber";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import warningIcon from "@public/icons/warning.svg";

const LoginPage: React.FC = () => {
  const { logIn } = useProfileStore();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isFormValid, setIsFormValid] = useState(false);
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [isPasswordValid, setPasswordIsValid] = useState(false);
  const [errors, setErrors] = useState<string>();
  const [element, setElement] = useState<HTMLElement>();
  const router = useRouter();

  /**
   * Set the root element
   */
  useEffect(() => {
    const root = document.getElementById("login-root");
    if (root) {
      setElement(root);
    }
  }, []);

  const login = async () => {
    if (!isFormValid) return;
    // TODO: remove this when session is implemented
    router.push("/");
    // ---------------
    await logIn(email, password)
      .then(() => {
        setErrors("");
        router.push("/");
      })
      .catch(() => {
        setErrors(
          "Alas, the gates remain closed. Check your credentials and try again."
        );
      });
  };

  const checkValidity = () => {
    const res = isEmailValid && isPasswordValid;
    setIsFormValid(res);
  };

  useEffect(() => {
    checkEmailValidity();
    checkPasswordValidity();
    checkValidity();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [email, password]);

  const checkEmailValidity = () => {
    const email = document.getElementById("email") as HTMLInputElement;
    if (!email) return false;
    const emailValue = email.value;
    const res = email.validity.valid && emailValue.length > 0;
    setIsEmailValid(res);
  };

  const checkPasswordValidity = () => {
    const password = document.getElementById("password") as HTMLInputElement;
    if (!password) return false;
    const passwordValue = password.value;
    const res = password.validity.valid && passwordValue.length > 6;
    setPasswordIsValid(res);
  };

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
              <p className="drop-shadow-2xl">Welcome back,</p>
            </div>
            <div className="flex w-9/10 lg:w-7/10 text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl">
              <p className="drop-shadow-2xl">Planeswalker</p>
            </div>
          </div>
          <div className="flex w-9/10 lg:w-7/10">
            <input
              className="w-full h-12 bg-white rounded-lg px-4 placeholder:italic placeholder:text-gray-500 shadow-2xl focus:outline-0 focus:invalid:outline-2 focus:invalid:outline-pink-500"
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
              className="w-full h-12 bg-white rounded-lg px-4 placeholder:italic placeholder:text-gray-500 shadow-2xl focus:outline-0 focus:invalid:outline-2 focus:invalid:outline-pink-500"
              type="password"
              id="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <div className="flex w-9/10 lg:w-7/10">
            <button
              onClick={login}
              disabled={!isFormValid}
              id="submit"
              className="bg-gray-800 text-white rounded-2xl px-4 py-2 w-full h-16 font-semibold hover:bg-gray-900 cursor-pointer shadow-2xl disabled:bg-gray-600 disabled:cursor-not-allowed"
            >
              Log In
            </button>
          </div>
          <div className="mt-2 flex w-9/10 lg:w-7/10">
            <Link href={"/register"} className="w-full">
              <p className="font-medium text-lg text-white">
                New to the arcane arts? Inscribe your name in the archives{" "}
                <span className="underline font-semibold">here</span>.
              </p>
            </Link>
          </div>
          {errors && (
            <div className="flex flex-row justify-start items-center gap-x-4 w-9/10 lg:w-7/10">
              <Image
                src={warningIcon}
                alt={"Warning Icon"}
                className="fill-pink-200 size-8"
                style={{
                  filter:
                    "invert(30%) sepia(100%) saturate(200%) hue-rotate(300deg)",
                }}
              />
              <div className="text-pink-200 font-semibold">{errors}</div>
            </div>
          )}
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
