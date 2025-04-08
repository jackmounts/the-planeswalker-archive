"use client";
import useProfileStore from "@/store/profile-store";
import { useRouter } from "next/navigation";
import React, { useEffect } from "react";

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function ProtectedRoute(props: any) {
    const router = useRouter();
    const { session } = useProfileStore();

    useEffect(() => {
      // TODO: Uncomment this when session is implemented
      // if (!session) {
      //   router.push("/login");
      // }
    }, [session, router]);

    return session ? <Component {...props} /> : null;
  };
};

export default withAuth;
