"use client";
import React, { useState } from "react";
import { motion } from "framer-motion";
import { cn } from "../../lib/utils";

export interface SidebarLink {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
}

interface SidebarProps {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}

interface SidebarBodyProps {
  className?: string;
  children: React.ReactNode;
}

interface SidebarLinkProps {
  link: SidebarLink;
  className?: string;
  onClick?: () => void;
}

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate = true,
}: SidebarProps) => {
  return (
    <>
      <DesktopSidebar open={open} setOpen={setOpen} animate={animate}>
        {children}
      </DesktopSidebar>
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  open,
  setOpen,
  animate,
}: {
  className?: string;
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <>
      <motion.div
        className={cn(
          "h-full px-4 py-4 hidden md:flex md:flex-col bg-neutral-100 dark:bg-gray-800 w-[300px] flex-shrink-0",
          className 
        )}
        animate={{
          width: animate ? (open ? "300px" : "60px") : "300px",
        }}
        onMouseEnter={() => setOpen?.(true)}
        onMouseLeave={() => setOpen?.(false)}
      >
        {children}
      </motion.div>
    </>
  );
};

export const SidebarBody = (props: SidebarBodyProps) => {
  return (
    <div
      className={cn(
        "flex flex-col flex-1 overflow-y-auto overflow-x-hidden",
        props.className
      )}
    >
      {props.children}
    </div>
  );
};

export const SidebarLink = ({ link, className, ...props }: SidebarLinkProps) => {
  return (
    <a
      href={link.href}
      className={cn(
        "flex items-center justify-start gap-2 group/sidebar py-2 px-2 rounded-md text-neutral-700 dark:text-neutral-200 hover:bg-neutral-200 dark:hover:bg-neutral-700 transition duration-150 cursor-pointer",
        className
      )}
      {...props}
    >
      {link.icon}
      <motion.span
        animate={{
          display: "inline-block",
          opacity: 1,
        }}
        className="text-neutral-700 dark:text-neutral-200 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre inline-block !p-0 !m-0"
      >
        {link.label}
      </motion.span>
    </a>
  );
};