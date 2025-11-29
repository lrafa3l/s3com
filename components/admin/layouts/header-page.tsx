"use client";

import { useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { BaggageClaim, Bell, ChevronsUpDown, MessageCircleMoreIcon, Network, Plus, Search, Terminal } from "lucide-react";
import Image from "next/image";
import React from "react";

import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
  BreadcrumbPage,
  BreadcrumbSeparator,
} from "@/components/ui/breadcrumb";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command";


import { useTheme } from "next-themes";
import { useRouter } from "@bprogress/next/app";
import { Skeleton } from "@/components/ui/skeleton";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { useIsMobile } from "@/hooks/use-mobile";
import { useAuth } from "@/hooks/useAuth";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { NavUser } from "./nav-page";
import { ModeToggle } from "@/components/setting/toggleTheme";

interface MenuItem {
  label: string;
  href?: string;
}

interface PopoverItem {
  id: string;
  label: string;
  value: string;
  dbType?: string | null;
}

interface HeaderPageProps {
  className?: string;
  menuNav?: MenuItem[];
  popoverDefault?: PopoverItem | null;
}


function getServiceIcon(type: string, dbType?: string | null) {
  if (type === "database") {
    return dbType === "postgres" ? (
      <i className="bx bxl-postgresql text-xl mr-2" />
    ) : (
      <i className="bx bxs-data text-xl mr-2" />
    );
  }
  if (type === "web-service") return <i className="bx bx-server text-xl mr-2" />;
  if (type === "computer") return <i className="bx bx-desktop text-xl mr-2" />;
  if (type === "container") return <i className="bx bxl-docker text-xl mr-2" />;
  return <i className="bx bx-cube text-xl mr-2" />;
}

export default function HeaderPage({
  className,
  menuNav,
  popoverDefault,
}: HeaderPageProps) {
  const [open, setOpen] = useState(false);
  const { user } = useAuth();
  const router = useRouter();
  const isMobile = useIsMobile();
  const { theme } = useTheme();
  const [loaded, setLoaded] = useState(false);

  return (
    <header className={cn("bg-card m-0 p-4 h-[70px]", className)}>
      <div className="flex justify-between items-center m-auto max-w-5xl">
        {/* LOGO + NAVEGAÇÃO */}
        <div className="flex items-center gap-6">
          {/* LOGO */}
          <div
            className="flex items-center gap-3 pr-5 cursor-pointer"
            onClick={() => router.push("/")}
          >
            <Image
              src={"/logo.png"}
              id="bigLogo"
              width={40}
              height={40}
              alt="logo"
              onLoadingComplete={() => setLoaded(true)}
              className={`object-contain  transition-opacity duration-300 ${loaded ? "opacity-100" : "opacity-0 animate-pulse"}`}
            />
            {!isMobile && <h1 className="font-semibold">Sara3com</h1>}
          </div>

        </div>

        {/* AÇÕES DO HEADER */}
        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => { router.push('/chat') }}>
            <MessageCircleMoreIcon />
          </Button>
          <ModeToggle />
          <Button variant="outline" size="icon" onClick={() => { router.push('/stock/products/new') }}>
            <Plus />
          </Button>
          {user ? (
            <NavUser
              user={{
                name: user.name as string,
                avatar: user.image as string,
                email: user.email as string,
              }}
            />
          ):(
            <Skeleton className="w-9 h-9 rounded-lg bg-sidebar" />
          )}
        </div>
      </div>
    </header>
  );
}
