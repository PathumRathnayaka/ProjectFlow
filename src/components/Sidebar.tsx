"use client";
import React, { useState } from "react";
import { Sidebar, SidebarBody, SidebarLink } from "./ui/sidebar";
import {
  IconBrandTabler,
  IconSettings,
  IconUsers,
  IconFolder,
  IconChecklist,
  IconCalendar,
  IconChartBar,
} from "@tabler/icons-react";
import { motion } from "framer-motion";
import { cn } from "../lib/utils";

interface ProjectSidebarProps {
  onNavigate: (section: string) => void;
  currentSection: string;
}

export function ProjectSidebar({ onNavigate, currentSection }: ProjectSidebarProps) {
  const links = [
    {
      label: "Dashboard",
      href: "#",
      icon: (
        <IconBrandTabler className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      section: "dashboard",
    },
    {
      label: "Projects",
      href: "#",
      icon: (
        <IconFolder className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      section: "projects",
    },
    {
      label: "Tasks",
      href: "#",
      icon: (
        <IconChecklist className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      section: "tasks",
    },
    {
      label: "Teams",
      href: "#",
      icon: (
        <IconUsers className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      section: "teams",
    },
    {
      label: "Calendar",
      href: "#",
      icon: (
        <IconCalendar className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      section: "calendar",
    },
    {
      label: "Reports",
      href: "#",
      icon: (
        <IconChartBar className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      section: "reports",
    },
    {
      label: "Settings",
      href: "#",
      icon: (
        <IconSettings className="h-5 w-5 shrink-0 text-neutral-700 dark:text-neutral-200" />
      ),
      section: "settings",
    },
  ];
  
  const [open, setOpen] = useState(true);
  
  return (
    <Sidebar open={open} setOpen={setOpen}>
      <SidebarBody className="justify-between gap-10">
        <div className="flex flex-1 flex-col overflow-x-hidden overflow-y-auto">
          {open ? <Logo /> : <LogoIcon />}
          <div className="mt-8 flex flex-col gap-2">
            {links.map((link, idx) => (
              <SidebarLink 
                key={idx} 
                link={link} 
                onClick={() => onNavigate(link.section)}
                className={currentSection === link.section ? 'bg-blue-100 dark:bg-blue-900/20 text-blue-700 dark:text-blue-300' : ''}
              />
            ))}
          </div>
        </div>
        <div>
          <SidebarLink
            link={{
              label: "John Doe",
              href: "#",
              icon: (
                <img
                  src="https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?w=50&h=50&fit=crop&crop=face"
                  className="h-7 w-7 shrink-0 rounded-full"
                  width={50}
                  height={50}
                  alt="Avatar"
                />
              ),
            }}
          />
        </div>
      </SidebarBody>
    </Sidebar>
  );
}

export const Logo = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-gradient-to-r from-blue-500 to-purple-600" />
      <motion.span
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="font-medium whitespace-pre text-black dark:text-white"
      >
        ProjectFlow
      </motion.span>
    </a>
  );
};

export const LogoIcon = () => {
  return (
    <a
      href="#"
      className="relative z-20 flex items-center space-x-2 py-1 text-sm font-normal text-black"
    >
      <div className="h-5 w-6 shrink-0 rounded-tl-lg rounded-tr-sm rounded-br-lg rounded-bl-sm bg-gradient-to-r from-blue-500 to-purple-600" />
    </a>
  );
};