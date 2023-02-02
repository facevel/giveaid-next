import React, { useEffect, useState } from "react";
import { SettingOutlined } from "@ant-design/icons";
import { Menu } from "antd";
import type { MenuProps, MenuTheme } from "antd/es/menu";

import { RiHomeFill, RiTruckFill } from "react-icons/ri";
import { GoTasklist } from "react-icons/go";
import { FaBox } from "react-icons/fa";
import { HiOutlinePresentationChartLine } from "react-icons/hi";
import Link from "next/link";
import { useRouter } from "next/router";

type MenuItem = Required<MenuProps>["items"][number];

function getItem(
  label: React.ReactNode,
  key?: React.Key | null,
  icon?: React.ReactNode,
  children?: MenuItem[]
): MenuItem {
  return {
    key,
    icon,
    children,
    label,
  } as MenuItem;
}

const items: MenuItem[] = [
  getItem(<Link href={'/ngo/dashboard'}>Overview</Link>, "/ngo/dashboard", <RiHomeFill />),
  getItem('Requests', "requests", <GoTasklist />, [

    getItem(<Link href={'/ngo/dashboard/requests/create'}>Create Request</Link>, "/ngo/dashboard/requests/create"),
    getItem(<Link href={'/ngo/dashboard/requests/manage'}>Manage Requests</Link>, "/ngo/dashboard/requests/manage"),

  ]),
  getItem("Donations", "donations", <FaBox />, [

    getItem(<Link href={"/ngo/dashboard/donations/track"}>Tracking</Link>, "/ngo/dashboard/donations/track"),
    getItem(<Link href={'/ngo/dashboard/donations/donors'}>Donors</Link>, "/ngo/dashboard/donations/donors"),
    getItem(<Link href={'/ngo/dashboard/donations/inventory'}>Donation Inventory</Link>, "/ngo/dashboard/donations/inventory"),

  ]),
  getItem(<Link href={"/ngo/dashboard/deliveries"}>Deliveries</Link>, "deliveries", <RiTruckFill />),
  getItem(<Link href={"/ngo/dashboard/reports"}>Reports</Link>, "reports", <HiOutlinePresentationChartLine />),
  getItem("Settings", "setting", <SettingOutlined />, [

    getItem(<Link href={'/ngo/dashboard/settings/general'}>General Settings</Link>, "/ngo/dashboard/settings/general"),
    getItem(<Link href={'/ngo/dashboard/settings/users'}>User Management</Link>, "/ngo/dashboard/settings/users"),
    getItem(<Link href={'/ngo/dashboard/settings/notifications'}>Notification System</Link>, "/ngo/dashboard/settings/notifications"),

  ]),
];

const MenuAntDesign: React.FC = () => {

  const router = useRouter();

  const [selectedKeys, setSelectedKeys] = useState<string[] | null>(null);

  const [selectedGroup, setSelectedGroup] = useState<string[] | undefined>(undefined);


  useEffect(() => {
    console.log('router.pathname: ', router.pathname)
    setSelectedKeys([router.pathname]);

    //get the word after /ngo/dashboard/
    const group = router.pathname.split("/")[3];
    console.log('group: ', group)
    setSelectedGroup([group]);

  }, [router.pathname]);

  const [mode, setMode] = useState<"vertical" | "inline">("inline");
  const [theme, setTheme] = useState<MenuTheme>("light");

  const changeMode = (value: boolean) => {
    setMode(value ? "vertical" : "inline");
  };

  const changeTheme = (value: boolean) => {
    setTheme(value ? "dark" : "light");
  };

  return (
    <>
      {
        selectedKeys != null && (
        <Menu
          style={{ width: "100%", height: "100%" }}

          defaultSelectedKeys={ selectedKeys }
          defaultOpenKeys={ selectedGroup }
          mode={mode}
          theme={theme}
          items={items}
        />
        )
      }
    </>
  );
};

export default MenuAntDesign;
