import React, { JSXElementConstructor, ReactElement, useEffect, useState } from "react";
import { useUserContext } from "./authContext";
import { Loading } from "../components";
import { useRouter } from "next/router";

import { AuthStateChangedProtected } from "./authState";

export const withPublic = (Component: () => JSX.Element) => {
  return function WithPublic(props: any) {
    const useauth = useUserContext();
    // @ts-ignore
    return (
      // @ts-ignore
      <Component.pageLayout>
        <Component useauth={useauth} {...props} />
        {/*@ts-ignore*/}
      </Component.pageLayout>
    );
  };
};

export function withProtected(Component: ()=>JSX.Element) {
  const WithProtected = (props: any) => {
    const useauth = useUserContext();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (!(useauth.user != null)) {
        router.push("/login");
        console.log(useauth);
      } else {
        setLoading(false);
      }
    }, [useauth.user]);

    // @ts-ignore
    return loading ?
      <Loading />
      :
      // @ts-ignore
      <Component.pageLayout>
        <Component useauth={useauth} {...props} />
        {/*@ts-ignore*/}
      </Component.pageLayout>
  };
  return function Component() {
    return (
      <AuthStateChangedProtected>
        <WithProtected />
      </AuthStateChangedProtected>
    );
  };
}

export function withProtectedForNGO(Component: () => JSX.Element) {
  const WithProtected = (props: any) => {
    const useauth = useUserContext();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    useEffect(() => {
      if (!(useauth.user != null)) {
        router.push("/ngo");
        console.log(useauth);
      } else {
        setLoading(false);
      }
    }, [useauth.user]);

    return loading ?
      <Loading />
      :
      // @ts-ignore
      <Component.pageLayout>
        <Component useauth={useauth} {...props} />
      {/*@ts-ignore*/}
      </Component.pageLayout>
  };
  return function Component({...props}) {
    useEffect(() => {
    }, [])
    return (
      // @ts-ignore
      <AuthStateChangedProtected>
        <WithProtected {...props}/>
      </AuthStateChangedProtected>
    );
  };
}