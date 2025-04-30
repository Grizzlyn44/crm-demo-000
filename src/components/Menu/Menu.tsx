"use client";

import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import StoreRoundedIcon from "@mui/icons-material/StoreRounded";
import ReceiptRoundedIcon from "@mui/icons-material/ReceiptRounded";
import ChatRoundedIcon from "@mui/icons-material/ChatRounded";
import FolderSpecialRoundedIcon from "@mui/icons-material/FolderSpecialRounded";
import ArticleRoundedIcon from "@mui/icons-material/ArticleRounded";
import SettingsRoundedIcon from "@mui/icons-material/SettingsRounded";
import LogoutRoundedIcon from "@mui/icons-material/LogoutRounded";
import { ReactElement } from "react";
import Link from "next/link";
import cn from "classnames";
import { usePathname } from "next/navigation";
import PeopleRoundedIcon from "@mui/icons-material/PeopleRounded";

interface NavItem {
  id: string;
  name: string;
  icon: ReactElement;
  href: string;
  isActionMenu?: boolean;
}

export const navItems: Array<NavItem> = [
  {
    id: "dashboard",
    name: "Dashboard",
    icon: <HomeRoundedIcon />,
    href: "/dashboard",
  },
  {
    id: "users",
    name: "Users",
    icon: <PeopleRoundedIcon />,
    href: "/users",
  },
  {
    id: "products",
    name: "Products",
    icon: <StoreRoundedIcon />,
    href: "/products",
  },
  {
    id: "orders",
    name: "Orders",
    icon: <ReceiptRoundedIcon />,
    href: "/orders",
  },
  {
    id: "chat",
    name: "Chat",
    icon: <ChatRoundedIcon />,
    href: "/chat",
  },
  {
    id: "special-pages",
    name: "Special Pages",
    icon: <FolderSpecialRoundedIcon />,
    href: "/special-pages",
  },
  {
    id: "documentation",
    name: "Documentation",
    icon: <ArticleRoundedIcon />,
    href: "/documentation",
  },
  {
    id: "settings",
    name: "Settings",
    icon: <SettingsRoundedIcon />,
    href: "/settings",
    isActionMenu: true,
  },
  {
    id: "logout",
    name: "Logout",
    icon: <LogoutRoundedIcon />,
    href: "/logout",
    isActionMenu: true,
  },
];

const Menu = () => {
  const pathname = usePathname();

  const renderMenuItems = () => {
    return navItems.map((navItem, index) => {
      const { id, name, icon, href, isActionMenu } = navItem;

      const firstActionMenuItem = navItems.find((item) => item.isActionMenu); //@TODO: ugly but OK atm
      const isActive = pathname === href;
      const linkClassName = cn(
        "flex items-center gap-[1.5rem] py-[1.15rem] pl-[1.25rem] pr-[2rem] text-[#929292] hover:bg-[#CCE9EB] border-r-[5px] border-r-[transparent] [transition:all_.05s_ease-in-out] hover:[transition:all_.0s_ease-in-out] text-[1rem]", //hover:border-r-[#3FC1C0]
        {
          "text-[#434969]! font-[500] border-r-[5px] border-r-[#3FC1C0]!":
            isActive,
        }
      );

      return (
        <li
          key={id}
          className={cn("menu-item", {
            "mt-[auto]": firstActionMenuItem?.id === id,
          })}
        >
          <Link href={href} className={linkClassName}>
            {icon}
            <span>{name}</span>
          </Link>
        </li>
      );
    });
  };

  return (
    <aside className="bg-[#fff] flex-[0_1_auto] py-[2rem]">
      <div className="menu flex flex-col h-full">
        <div className="flex gap-[1.5rem] px-[1.25rem] mb-[2rem] items-center">
          <div className="w-[2rem] h-[2rem] rounded-[100%] bg-[#434969]" />
          <div className="text-[#020202] font-[600] text-[1rem]">CRM</div>
        </div>
        <ul className="flex flex-col h-full">{renderMenuItems()}</ul>
      </div>
    </aside>
  );
};

export default Menu;
