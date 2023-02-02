import React, { useEffect, useState } from "react";
import NgoDropdown from "./components/ngoDropdown";
import MenuAntDesign from "./components/menuAntDesign";
import { useUserContext } from "@/firebase/authContext";
import { GoogleButton, Modal, Loading } from "components";
import { useRouter } from "next/router";

type Props = {
  children: React.ReactNode;
};

export default function NgoPageLayout(props: Props) {
  const { user, logout, loggingIn } = useUserContext();

  const [getStartedModal, setGetStartedModal] = useState(false);

  const router = useRouter();

  const [loading, setLoading] = useState(true);

  useEffect(()=>{
    if(user){
      setGetStartedModal(false)
      //after login the user will be sent to dashboard
      router.push('/ngo/dashboard')
    }
  },[loggingIn])

  useEffect(()=>{
    //if router.pathname is /ngo/dashboard or anything after that then check if user is logged in or not
    if(router.pathname.includes('/ngo/dashboard')){
      if(!user){
        router.push('/ngo').then(() => setLoading(false))
        return
      }
    }
    setLoading(false)
  },[user, router.pathname])

  return (
    <div className={"min-h-screen"}>
      {
        loading && <Loading />
      }
      <nav
        className={
          "sticky top-0 z-20 flex h-20 w-full flex-row items-center justify-between border-b-2 border-green-700 bg-green-600 px-5 text-xl drop-shadow-xl"
        }
      >
        <div
          className={
            "container mx-auto flex w-full flex-row items-center justify-between"
          }
        >
          <img src={"/giveaid-logo.svg"} alt={"Give Aid Logo"} />
          <div className={"flex flex-row items-center gap-10"}>
            <span className={"flex flex-col rounded-lg"}>
              {user ? (
                <>
                  <NgoDropdown />
                </>
              ) : (
                <>
                  <div className="flex flex-row gap-2">
                    <button onClick={() => setGetStartedModal(true)}
                            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center hover:text-green-600 rounded-lg hover:bg-white bg-green-600 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900 border-2 hover:border-transparent border-white text-white">
                      Login
                    </button>
                    <button onClick={() => setGetStartedModal(true)}
                            className="inline-flex justify-center items-center py-3 px-5 text-base font-medium text-center text-green-600 rounded-lg bg-white hover:bg-green-600 focus:ring-4 focus:ring-green-300 dark:focus:ring-green-900 border-2 border-transparent hover:border-white hover:text-white">
                      Get Started
                      <svg className="ml-2 -mr-1 w-5 h-5" fill="currentColor" viewBox="0 0 20 20"
                           xmlns="http://www.w3.org/2000/svg">
                        <path fillRule="evenodd"
                              d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z"
                              clipRule="evenodd"></path>
                      </svg>
                    </button>
                  </div>
                </>
              )}
            </span>
          </div>
        </div>
      </nav>
      <Modal
        title={"Let's Start Donating"}
        setModalState={setGetStartedModal}
        modalState={getStartedModal}
      >
        <div className="flex flex-col items-center justify-center gap-5 py-3">
          <p className="text-md max-w-full text-center">
            Keep our site spam-free by logging in
          </p>
          <GoogleButton />
          <p className="max-w-sm text-center text-sm">
            By creating an account, you agree to Giveaid&apos;s{" "}
            <a
              href="/terms-of-service"
              className="font-semibold text-blue-500 hover:underline"
            >
              Terms of Service
            </a>
            ,{" "}
            <a
              href="/privacy-policy"
              className="font-semibold text-blue-500 hover:underline"
            >
              Privacy Policy
            </a>{" "}
            and{" "}
            <a
              href="/acceptable-use"
              className="font-semibold text-blue-500 hover:underline"
            >
              Acceptable Use Policy
            </a>
            .
          </p>
        </div>
      </Modal>

      <div className="grid grid-cols-12 gap-2 h-[calc(100vh-5rem)]">
        <div className="col-span-4 lg:col-span-2  h-[calc(100vh-5rem)] scrollbar">
            <MenuAntDesign/>
        </div>
        <div className="col-span-8 lg:col-span-10 py-10 scrollbar">{props.children}</div>
      </div>
    </div>
  );
}
