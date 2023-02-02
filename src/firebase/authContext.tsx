import { createContext, useContext, useState } from "react";

import {
  GoogleAuthProvider,
  signInAnonymously,
  signInWithPopup,
  signOut,
} from "firebase/auth";
import { auth } from ".";
import firebase from "firebase/compat";

interface UserContext {
  user: firebase.User | object | undefined | null;
  error: string;
  loggingIn: boolean;
  isAuthLoading: boolean;
  loginWithGoogle: () => Promise<void>;
  logout: () => Promise<void>;
  setError: (error: string) => void;
  setUser: (user: firebase.User | object | undefined | null | unknown) => void;
  setIsAuthLoading: (isAuthLoading: boolean) => void;
  getAuthToken: () => Promise<string | null>;
}

//what is type for object of type UserContext

export const UserContext = createContext<UserContext | null>(null);

export const useUserContext = () => useContext<any>(UserContext);

export const UserContextProvider = (props: any) => {
  const [user, setUser] = useState<UserContext["user"]>(null);
  const [error, setError] = useState<UserContext["error"]>("");

  //loggingIn is for user initiated login
  //loggingIn is a global state which is true whenever user tries to log in use to show the spinner of logging in
  const [loggingIn, setLoggingIn] = useState(false);

  //isAuthLoading is for the AuthState Wrapper component which check userAuth on every page load
  //isAuthLoading is used in the navBar to show the loading of user Auth State
  const [isAuthLoading, setIsAuthLoading] = useState(true);

  const AuthService = {
    signUpAnonymously: async () => {
      try {
        setLoggingIn(true);
        console.log("Reached here");
        const userCred = await signInAnonymously(auth);
        console.log("Auth sign-in successful");
        return {
          user: userCred.user,
        };
      } catch (error: any | unknown) {
        console.log({ error });
        return { error: error.message };
      } finally {
        setLoggingIn(false);
      }
    },

    loginWithGoogle: async () => {
      return new Promise(async (resolve, reject) => {
        let provider = new GoogleAuthProvider();
        try {
          setLoggingIn(true);
          const userCred = await signInWithPopup(auth, provider);

          // TODO: Fix this\
          // @ts-ignore
          userCred.user.photoURL = userCred.user.photoURL.replace(
            "s96-c",
            "s400-c"
          );

          resolve(userCred.user);
        } catch (error: any | unknown) {
          console.log({ error });
          console.log("Error logging into google account", error);
          reject(error.message ? error.message.match(/\(([^)]+)\)/)[1] : error);
        } finally {
          setLoggingIn(false);
        }
      });
    },
    logout: async () => {
      await signOut(auth);
    },
  };

  const getAuthToken = async () => {
    const user = auth.currentUser;
    if (user) {
      return user.getIdToken();
    }
    return null;
  };

  const signUpAnonymously = async () => {
    return new Promise(async (resolve, reject) => {
      const { user, error } = await AuthService.signUpAnonymously();
      if (user) {
        setUser(user);
        resolve(user);
      } else {
        setError(error);
        reject(error);
      }
    });
  };

  const loginWithGoogle = async () => {
    try {
      const user = await AuthService.loginWithGoogle();

      // @ts-ignore
      setUser(user);
    } catch (e: any | unknown) {
      console.log({ catcher: e });
      setError(e || "Something went wrong!");
    }
  };

  const logout = async () => {
    await AuthService.logout();
    setError("");
    setUser(null);
  };

  const contextValue = {
    loginWithGoogle,
    logout,
    user,
    error,
    setError,
    setUser,
    loggingIn,
    getAuthToken,
    isAuthLoading,
    setIsAuthLoading,
    signUpAnonymously,
  };

  return (
    // @ts-ignore
    <UserContext.Provider value={contextValue}>
      {" "}
      {props.children}{" "}
    </UserContext.Provider>
  );
};
