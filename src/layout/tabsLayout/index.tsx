// @flow
import * as React from "react";
import { useEffect, useState } from "react";
import {
  RiHomeFill,
  RiNotification2Fill,
  RiTruckFill,
  RiUserFill
} from "react-icons/ri";
import { useRouter } from "next/router";
import Link from "next/link";

type Props = {
  children: React.ReactNode;
};

const TabsLayout = (props: Props) => {

  const router = useRouter();
  const [currentTab, setCurrentTab] = useState("");

  useEffect(() => {
    //check url and set the first link to current tab
    setCurrentTab(router.pathname);
  }, [router]);


  const tabs = [
    {
      icon: <RiHomeFill className={"user-select-none "} />,
      link: "/"
    },
    {
      icon: <RiTruckFill />,
      link: "/tracking"
    },
    {
      icon: <RiNotification2Fill />,
      link: "/notification"
    },
    {
      icon: <RiUserFill />,
      link: "/profile"
    }
  ];

  return (
    <div className={""}>
      <div className={"top-0 min-h-[calc(100vh)] w-full"}>
        {props.children}
      </div>
      <div
        className={
          "sticky bottom-0 flex h-20 w-full flex-row justify-evenly gap-4 rounded-t-2xl bg-gray-100 px-4 py-4 dark:bg-gray-900"
        }
      >
        {tabs.map((item, index) => {
          return (

            <div
              className={`flex h-full w-full flex-row items-center justify-center rounded-3xl text-3xl outline-none ${
                item.link == currentTab
                  ? "bg-green-200 text-green-500 dark:bg-green-700 dark:text-green-100"
                  : "text-gray-900 dark:text-gray-800"
              }`}
              key={index}
            >
              <Link href={item.link}>
                <span>
                  {item.icon}
                </span>
              </Link>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default TabsLayout;
