import React, { useEffect, useState } from "react";
import { auth, db } from "./index";
import { doc, getDoc } from "firebase/firestore";
import { onAuthStateChanged } from "firebase/auth";
import { useUserContext } from "./authContext";
import { useRouter } from "next/router";

import { Loading } from "components";

type Props = {
  children: React.ReactNode;
};

export function AuthStateChanged({ children }: Props) {
  const { setUser, user, isAuthLoading, setIsAuthLoading } = useUserContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
        setIsAuthLoading(false);
      } else {
        setUser(null);
        setIsAuthLoading(false);
        setLoading(false);
      }
    });
  }, []);

  return children;
}

export function AuthStateChangedProtected({children}: Props) {
  const { setUser, user } = useUserContext();

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    onAuthStateChanged(auth, async (user) => {
      if (user) {
        setUser(user);
        setLoading(false);
      } else {
        setUser(null);
        setLoading(false);
      }
    });
  }, []);
  if (loading) {
    return (
      <>
        <Loading/>
      </>
  );
  }
  return children;
}
