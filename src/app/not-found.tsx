"use client";
import { useEffect } from "react";
import { useRouter } from "next/navigation";
import Image from "next/image";
import TeleportImage from "../../public/images/teleport.png";

export default function NotFound() {
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      router.push("/");
    }, 3000);

    return () => clearTimeout(timer);
  }, [router]);

  return (
    <div className="flex flex-col size-full items-center justify-center gap-y-8">
      <div className="text-5xl font-bold">Error 404, Spell Not Found</div>
      <div className="flex flex-row justify-center items-center gap-x-2">
        <div className="text-4xl">
          <div>Erm... You appear to be lost!</div>
          <div>Let me teleport back to your home.</div>
        </div>
        <Image
          src={TeleportImage}
          alt={"Mage teleporting you back to home page"}
          className="size-64"
        />
      </div>
    </div>
  );
}
