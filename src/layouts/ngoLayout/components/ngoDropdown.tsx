import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";
import { useUserContext } from "@/firebase/authContext";
import Link from "next/link";
import { auth } from "@/firebase";

const NgoDropdown = () => {
  const { user, logout } = useUserContext();

  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event: { target: any }) {
      // @ts-ignore
      if (menuRef.current && !menuRef.current.contains<any>(event.target)) {
        setIsOpen(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const router = useRouter();

  return (
    <div className="" ref={menuRef}>
      <div className="relative m-auto h-9 w-9 flex-col md:flex">
        <span
          className="relative z-10 flex w-fit items-center justify-center rounded-full border border-transparent bg-white  text-sm text-gray-600  outline outline-offset-1 outline-green-500 dark:bg-gray-800 dark:text-white"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="m-auto h-9 w-9 overflow-clip rounded-full object-cover"
            src={auth.currentUser?.photoURL || ""}
          />
        </span>

        <div
          className={`absolute right-0 z-20 mt-14 -mr-2 w-56 overflow-hidden rounded-md bg-white py-2 shadow-xl dark:bg-gray-700 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div className="w-full-mt-2 flex transform items-center p-3 text-sm text-gray-600 transition-colors duration-300 hover:bg-gray-100 dark:bg-gray-600 dark:text-gray-300 dark:hover:text-white">
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="mx-1 h-9 w-9 flex-shrink-0 rounded-full object-cover"
              src={"https://api.dicebear.com/5.x/shapes/svg"}
            />
            <div className="mx-1">
              <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {user?.displayName}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                {user?.email}
              </p>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700 " />

          <Link href={"/ngo/dashboard"}>
            <button
              onClick={() => {
                setIsOpen(false);
              }}
              className="flex w-full transform items-center p-3 text-sm capitalize text-gray-600 transition-colors duration-300 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
            >
              <svg
                className="mx-1 h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M7 8C7 5.23858 9.23858 3 12 3C14.7614 3 17 5.23858 17 8C17 10.7614 14.7614 13 12 13C9.23858 13 7 10.7614 7 8ZM12 11C13.6569 11 15 9.65685 15 8C15 6.34315 13.6569 5 12 5C10.3431 5 9 6.34315 9 8C9 9.65685 10.3431 11 12 11Z"
                  fill="currentColor"
                ></path>
                <path
                  d="M6.34315 16.3431C4.84285 17.8434 4 19.8783 4 22H6C6 20.4087 6.63214 18.8826 7.75736 17.7574C8.88258 16.6321 10.4087 16 12 16C13.5913 16 15.1174 16.6321 16.2426 17.7574C17.3679 18.8826 18 20.4087 18 22H20C20 19.8783 19.1571 17.8434 17.6569 16.3431C16.1566 14.8429 14.1217 14 12 14C9.87827 14 7.84344 14.8429 6.34315 16.3431Z"
                  fill="currentColor"
                ></path>
              </svg>

              <span className="mx-1">Dashboard</span>
            </button>
          </Link>
          <hr className="border-gray-200 dark:border-gray-700 " />

          <button
            onClick={() => {
              logout();
              setIsOpen(false);
            }}
            className="flex w-full transform items-center p-3 text-sm capitalize text-gray-600 transition-colors duration-300 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-red-600 dark:hover:text-white"
          >
            <svg
              className="mx-1 h-5 w-5"
              viewBox="0 0 24 24"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                d="M19 21H10C8.89543 21 8 20.1046 8 19V15H10V19H19V5H10V9H8V5C8 3.89543 8.89543 3 10 3H19C20.1046 3 21 3.89543 21 5V19C21 20.1046 20.1046 21 19 21ZM12 16V13H3V11H12V8L17 12L12 16Z"
                fill="currentColor"
              ></path>
            </svg>

            <span className="mx-1">Sign Out</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default NgoDropdown;
