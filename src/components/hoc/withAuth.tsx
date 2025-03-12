"use client";
import useProfileStore from "@/store/profile-store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  return function ProtectedRoute(props: any) {
    const router = useRouter();
    const { session } = useProfileStore();

    useEffect(() => {
      if (!session) {
        router.push("/login");
      }
    }, [session]);

    return session ? <Component {...props} /> : null;
  };
};

export default withAuth;
