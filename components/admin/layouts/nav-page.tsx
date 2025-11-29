"use client"

import { BadgeCheck, LogOut, Settings } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { useAuth } from "@/hooks/useAuth"
import { getFallbackColor, getInitials } from "@/config/uitl1"
import { Skeleton } from "@/components/ui/skeleton"

interface NavUserProps {
  user: {
    name: string | null
    email: string | null
    avatar: string | null
  } | null
}

export function NavUser({ user }: NavUserProps) {
  const { signOut } = useAuth()
  const initials = getInitials(user?.name ?? "")
  const fallbackColor = getFallbackColor(initials)

  return (
    <div className="flex select-none">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          {user?.name ?
            <Button
              size="icon"
              variant="outline"
              className="rounded-lg p-0 data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"
            >
              <Avatar className="h-9 w-9 rounded-lg">
                <AvatarImage src={user?.avatar ?? ""} alt={user?.name ?? ""} />
                <AvatarFallback
                  className={cn("rounded-lg text-black", fallbackColor)}
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
            </Button> : <Skeleton className="w-9 h-9 rounded-lg bg-sidebar" />
          }
        </DropdownMenuTrigger>
        <DropdownMenuContent
          className="min-w-56 rounded-lg"
          align="end"
          sideOffset={4}
        >
          <DropdownMenuLabel className="p-0 font-normal">
            <div className="flex items-center gap-2 px-1 py-1.5 text-sm">
              <Avatar className="h-9 w-9 rounded-lg">
                <AvatarImage src={user?.avatar ?? ""} alt={user?.name ?? ""} />
                <AvatarFallback
                  className={cn("rounded-lg text-black", fallbackColor)}
                >
                  {initials}
                </AvatarFallback>
              </Avatar>
              <div className="grid flex-1 text-left leading-tight">
                <span className="truncate font-medium">{user?.name}</span>
                <span className="truncate text-xs text-muted-foreground">
                  {user?.email}
                </span>
              </div>
            </div>
          </DropdownMenuLabel>

          <DropdownMenuSeparator />

          <DropdownMenuItem onClick={async () => signOut()}>
            <LogOut className="mr-2 h-4 w-4" />
            Terminar sessão
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  )
}
