"use client";

import Image from "next/image";
import Link from "next/link";
import { useSidebar } from "../Sidebar/SidebarContext";
import logo from "../../../assets/logo_tt.jpg";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars } from "@fortawesome/free-solid-svg-icons";

export const Header = () => {
  const { toggle } = useSidebar();
  return (
    <header className="w-full h-16 bg-rose-600 flex items-center">
      <div className="flex items-center justify-between pl-4 pr-4 w-full text-white">
        <div className="flex items-center gap-2">
          <Link href="/dashboard">
            <Image
              src={logo}
              alt="Tusem Logo"
              className="h-8 w-auto"
              priority
            />
          </Link>
          <h1>Tusem App</h1>
        </div>
        <button
          onClick={toggle}
          className="md:hidden"
          aria-label="Toggle sidebar"
        >
          <FontAwesomeIcon icon={faBars} />
        </button>
      </div>
    </header>
  );
};
