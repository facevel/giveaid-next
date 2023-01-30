// @flow
import * as React from "react";
import Link from "next/link";


type Props = {
  children: React.ReactNode;
};

export function NgoPageLayout(props: Props) {
  return (
    <div>
      <nav className={'sticky top-0 w-full h-20 bg-green-600 flex flex-row items-center justify-between text-xl'}>
        <div className={'container flex flex-row items-center justify-between w-full mx-auto'}>
          <img src={'/giveaid-logo.svg'} alt={'Give Aid Logo'}/>
          <div className={'flex flex-row items-center gap-10'}>

              <Link href={'#'}>
                <span className={'text-white font-bold'}>My Account</span>
              </Link>

              <Link href={'#'}>
                <span className={'text-white font-bold'}>Logout</span>
              </Link>

          </div>
        </div>
      </nav>
    </div>
  );
};