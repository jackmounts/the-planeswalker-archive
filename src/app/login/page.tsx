"use client";
import React, { useState } from "react";

const LoginPage: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  return (
    <div className="flex flex-row items-center justify-center size-full bg-[url('/images/login_bg.svg')] bg-cover bg-center">
      <div className="hidden lg:flex w-3/5"></div>
      <div className="flex flex-col w-full lg:w-2/5 items-center justify-start gap-y-4">
        <div className="flex flex-col items-center justify-center w-full text-white font-semibold mb-10">
          <div className="flex w-9/10 lg:w-7/10 text-6xl">
            <p>Welcome back,</p>
          </div>
          <div className="flex w-9/10 lg:w-7/10 text-8xl">
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
          <button className="bg-gray-800 text-white rounded-2xl px-4 py-2 w-full h-18 font-semibold hover:bg-gray-900">
            Log In
          </button>
        </div>
        <div className="flex w-9/10 lg:w-7/10">
          <button className="bg-gray-200 text-gray-900 rounded-2xl px-4 py-2 w-full h-18 font-semibold hover:bg-gray-900 hover:text-white">
            Register
          </button>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
