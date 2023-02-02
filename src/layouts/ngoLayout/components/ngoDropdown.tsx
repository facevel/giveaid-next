import React, { useEffect, useRef, useState } from "react";
import { useRouter } from "next/router";



const NgoDropdown = () => {

  const [isOpen, setIsOpen] = useState(false);

  const menuRef = useRef(null);

  useEffect(() => {
    // function handleClickOutside(event: { target: any }) {
    //   // @ts-ignore
    //   if (menuRef.current && !menuRef.current.contains<any>(event.target)) {
    //     setIsOpen(false);
    //   }
    // }
    //
    // document.addEventListener("mousedown", handleClickOutside);
    //
    // return () => {
    //   document.removeEventListener("mousedown", handleClickOutside);
    // };
  }, []);


  const router = useRouter();


  return (
    <div className="" ref={menuRef}>

      <div className="relative w-9 h-9 md:flex flex-col m-auto">
        <span
          className="relative z-10 flex items-center justify-center text-sm text-gray-600 bg-white border border-transparent  dark:text-white dark:bg-gray-800  w-fit outline outline-offset-1 outline-green-500 rounded-full"
          onClick={() => {
            setIsOpen(!isOpen);
          }}
        >
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            className="w-9 h-9 m-auto rounded-full object-cover overflow-clip"
            src={"https://api.dicebear.com/5.x/shapes/svg"}
          />
        </span>

        <div
          className={`absolute right-0 z-20 w-56 py-2 mt-14 -mr-2 overflow-hidden bg-white rounded-md shadow-xl dark:bg-gray-700 ${
            isOpen ? "block" : "hidden"
          }`}
        >
          <div
            className="flex items-center p-3 w-full-mt-2 text-sm text-gray-600 transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:bg-gray-600 dark:hover:text-white"
          >
            {/* eslint-disable-next-line @next/next/no-img-element */}
            <img
              className="flex-shrink-0 object-cover mx-1 rounded-full w-9 h-9"
              src={"https://api.dicebear.com/5.x/shapes/svg"}
            />
            <div className="mx-1">
              <h1 className="text-sm font-semibold text-gray-700 dark:text-gray-200">
                {"Sunshine NGO"}
              </h1>
              <p className="text-xs text-gray-500 dark:text-gray-400">
                contact@sunshine.org
              </p>
            </div>
          </div>

          <hr className="border-gray-200 dark:border-gray-700 " />

          <button
            onClick={() => {
              router.push("#");
              setIsOpen(false);
            }}
            className="flex items-center p-3 w-full text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
          >
            <svg
              className="w-5 h-5 mx-1"
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
          <hr className="border-gray-200 dark:border-gray-700 " />

          <button
            onClick={() => {
              setIsOpen(false);
            }}
            className="flex items-center p-3 w-full text-sm text-gray-600 capitalize transition-colors duration-300 transform dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-red-600 dark:hover:text-white"
          >
            <svg
              className="w-5 h-5 mx-1"
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
