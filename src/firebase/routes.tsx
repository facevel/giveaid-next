import React, { ReactElement, useEffect, useState } from "react";
import { useUserContext } from "./authContext";
import { Loading } from "../components";
import { useRouter } from "next/router";

import { AuthStateChangedProtected } from "./authState";

export const withPublic = (Component: ReactElement) => {
  return function WithPublic(props: any) {
    const useauth = useUserContext();
    // @ts-ignore
    return <Component useauth={useauth} {...props} />;
  };
};

export function withProtected(Component: ReactElement) {
  const WithProtected = (props: any) => {
    const useauth = useUserContext();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (!(useauth.user != null && !useauth.user?.isAnonymous)) {
        router.push("/login");
        console.log(useauth);
      } else {
        setLoading(false);
      }
    }, [useauth.user]);

    // @ts-ignore
    return loading ? <Loading /> : <Component useauth={useauth} {...props} />;
  };
  return function Component() {
    return (
      // @ts-ignore
      <AuthStateChangedProtected>
        <WithProtected />
      </AuthStateChangedProtected>
    );
  };
}
