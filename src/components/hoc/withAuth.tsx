"use client";
import React from "react";

const withAuth = <P extends object>(Component: React.ComponentType<P>) => {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  return function ProtectedRoute(props: any) {
    // const router = useRouter();
    // const { session } = useProfileStore();

    // TODO: Uncomment this when the session is implemented
    // useEffect(() => {
    //   if (!session) {
    //     router.push("/login");
    //   }
    // }, [session, router]);

    // return session ? <Component {...props} /> : null;
    return <Component {...props} />;
  };
};

export default withAuth;
