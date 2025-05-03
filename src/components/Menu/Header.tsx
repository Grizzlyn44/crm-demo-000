"use client";

import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import NotificationsRoundedIcon from "@mui/icons-material/NotificationsRounded";
import { navItems } from "@/components/Menu/Menu";
import { usePathname } from "next/navigation";
import Image from "next/image";

const Header = () => {
  const pathname = usePathname();
  const pageTitle = navItems.find((item) => item.href === pathname)?.name;

  return (
    <header className="bg-[#fff] flex justify-between items-center px-[3rem] py-[2rem]">
      <div className="text-[#070707] text-[1.25rem] font-[500]">
        {pageTitle}
      </div>
      <div className="flex items-center gap-[1rem] ml-[2rem]">
        <SearchRoundedIcon />
        <NotificationsRoundedIcon />
        <div className="flex items-center gap-[.5rem]">
          <Image
            src="https://media.istockphoto.com/id/1471845315/photo/happy-portrait-or-business-woman-taking-a-selfie-in-office-building-for-a-social-media.jpg?s=612x612&w=0&k=20&c=AOylBL01joI0zphCAFr6YVrsOgp_jd2XtVUychLXYho="
            alt="User Avatar"
            className="w-[2rem] h-[2rem] rounded-full"
            width={32}
            height={32}
          />
          {/* <img
            src="https://media.istockphoto.com/id/1471845315/photo/happy-portrait-or-business-woman-taking-a-selfie-in-office-building-for-a-social-media.jpg?s=612x612&w=0&k=20&c=AOylBL01joI0zphCAFr6YVrsOgp_jd2XtVUychLXYho="
            alt="User Avatar"
            className="w-[2rem] h-[2rem] rounded-full"
            // width={1920}
            // height={1080}
          /> */}
          <span className="text-[.75rem] font-[500]">Demo User</span>
        </div>
      </div>
    </header>
  );
};

export default Header;
