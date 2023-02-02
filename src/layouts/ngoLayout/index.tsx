// @flow
import * as React from "react";
import Link from "next/link";
import NgoDropdown from "./components/ngoDropdown";

type Props = {
  children: React.ReactNode;
};

export default function NgoPageLayout(props: Props) {
  return (
    <div>
      <nav
        className={
          "sticky top-0 flex h-20 w-full flex-row items-center justify-between bg-green-600 text-xl z-20 drop-shadow-xl border-b-2 border-green-700 px-5"
        }
      >
        <div
          className={
            "container mx-auto flex w-full flex-row items-center justify-between"
          }
        >
          <img src={"/giveaid-logo.svg"} alt={"Give Aid Logo"} />
          <div className={"flex flex-row items-center gap-10"}>
              <span
                className={
                  "rounded-lg flex flex-col"
                }
              >
              <NgoDropdown/>
              </span>
          </div>
        </div>
      </nav>
      <div className={'container mx-auto py-5'}>
        {props.children}
      </div>
    </div>
  );
}
