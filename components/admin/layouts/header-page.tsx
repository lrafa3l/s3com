"use client";

import { useState } from "react";
import { MessageCircleMoreIcon } from "lucide-react";
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
import { useRouter } from "@bprogress/next/app";
import { Skeleton } from "@/components/ui/skeleton";
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
  session?: string;
  menuNav?: MenuItem[];
  popoverDefault?: PopoverItem | null;
}

export default function HeaderPage({
  className, menuNav
}: HeaderPageProps) {
  const { user } = useAuth();
  const router = useRouter();
  const isMobile = useIsMobile();
  const [loaded, setLoaded] = useState(false);

  return (
    <header className={cn("bg-card m-0 p-4 h-[70px]", className)}>
      <div className="flex justify-between items-center m-auto max-w-5xl">
        <div className="flex items-center gap-6">
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
          {menuNav && menuNav.length > 0 && (
            <Breadcrumb>
              <BreadcrumbList>
                {menuNav.map((item, index) => (
                  <React.Fragment key={index}>
                    <BreadcrumbItem>
                      {item.href ? (
                        <BreadcrumbLink
                          className="cursor-pointer"
                          onClick={() => router.push(item.href!)}
                        >
                          {item.label}
                        </BreadcrumbLink>
                      ) : (
                        <BreadcrumbPage>{item.label}</BreadcrumbPage>
                      )}
                    </BreadcrumbItem>
                    {index < menuNav.length - 1 && <BreadcrumbSeparator />}
                  </React.Fragment>
                ))}
              </BreadcrumbList>
            </Breadcrumb>
          )}
        </div>

        <div className="flex items-center gap-2">
          <Button variant="outline" size="icon" onClick={() => { router.push('/chat') }}>
            <MessageCircleMoreIcon />
          </Button>
          <ModeToggle />
          {user ? (
            <NavUser
              user={{
                name: user.name as string,
                avatar: user.image as string,
                email: user.email as string,
              }}
            />
          ) : (
            <Skeleton className="w-9 h-9 rounded-lg bg-sidebar" />
          )}
        </div>
      </div>
    </header>
  );
}
