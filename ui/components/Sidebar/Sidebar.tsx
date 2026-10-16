"use client";

import { useSidebar } from "./SidebarContext";
import Link from "next/link";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCalendarDays } from "@fortawesome/free-regular-svg-icons";
import { usePathname } from "next/navigation";

const links = [
  { href: "/calendar-diff", label: "Calendar Diff", icon: faCalendarDays },
];

export const Sidebar = () => {
  const { isOpen, close } = useSidebar();
  const pathname = usePathname();

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
        <nav className="text-gray-800 flex flex-col">
          {links.map((link) => {
            const isActive =
              pathname === link.href || pathname.startsWith(`${link.href}/`);

            return (
              <Link
                key={link.href}
                href={link.href}
                onClick={close}
                aria-current={isActive ? "page" : undefined}
                className={`flex items-center gap-2 border-l-4 border-transparent p-4 hover:bg-gray-200 focus-visible:bg-gray-200 ${
                  isActive ? "border-gray-800 bg-gray-100 font-semibold" : ""
                }`}
              >
                <FontAwesomeIcon icon={link.icon} />
                <span>{link.label}</span>
              </Link>
            );
          })}
        </nav>
      </aside>
    </>
  );
};
