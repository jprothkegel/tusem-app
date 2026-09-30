"use client";

import { useSidebar } from "./SidebarContext";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";

const links = [{ href: "/cal-diff", label: "CalDiff", icon: faCalendarDays }];

export const Sidebar = () => {
  const { isOpen, close } = useSidebar();
  return (
    <>
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={close}
        ></div>
      )}

      <aside
        className={`
      fixed md:static top-0 left-0 h-full bg-white border-r border-gray-200 z-50
      transform transition-transform duration-200
      ${isOpen ? "translate-x-0" : "-translate-x-full"}
      md:translate-x-0
      `}
      >
        <nav className="p-4 text-gray-800">
          <ul>
            {links.map((link) => (
              <li key={link.href} className="flex items-center gap-2">
                <FontAwesomeIcon icon={link.icon} />
                <Link href={link.href}>{link.label}</Link>
              </li>
            ))}
          </ul>
        </nav>
      </aside>
    </>
  );
};
