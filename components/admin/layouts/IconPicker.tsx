"use client"

import * as React from "react"
import { ChevronsUpDown, Check } from "lucide-react"
import * as LucideIcons from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover"
import {
  Command,
  CommandInput,
  CommandGroup,
  CommandItem,
  CommandList,
  CommandEmpty,
} from "@/components/ui/command"

type IconName = keyof typeof LucideIcons

const icons: IconName[] = [
  "Activity",
  "AlarmClock",
  "AlertCircle",
  "Archive",
  "BadgeCheck",
  "BarChart",
  "BatteryCharging",
  "Bell",
  "Bluetooth",
  "Book",
  "Box",
  "Bug",
  "Calculator",
  "Calendar",
  "Camera",
  "CheckCircle",
  "ClipboardList",
  "Cloud",
  "CloudCog",
  "Code",
  "Cog",
  "Cpu",
  "Database",
  "Download",
  "Edit",
  "ExternalLink",
  "Eye",
  "FileCog",
  "FileCode",
  "FolderCog",
  "Gauge",
  "Globe",
  "HardDrive",
  "Headphones",
  "Heart",
  "HelpCircle",
  "Home",
  "Info",
  "Key",
  "Layers",
  "LayoutDashboard",
  "Lightbulb",
  "Link",
  "ListChecks",
  "Lock",
  "LogIn",
  "LogOut",
  "Mail",
  "Map",
  "Menu",
  "Monitor",
  "Network",
  "Package",
  "Paperclip",
  "Phone",
  "Plug",
  "Power",
  "QrCode",
  "Radio",
  "RefreshCw",
  "Router",
  "Scan",
  "Search",
  "Server",
  "Settings",
  "Shield",
  "Signal",
  "Smartphone",
  "Terminal",
  "Tv",
  "Upload",
  "Usb",
  "User",
  "UserCog",
  "Wifi",
]

interface IconPickerProps {
  value: IconName | null
  onChange: (icon: IconName | null) => void
}

export function IconPicker({ value, onChange }: IconPickerProps) {
  const [open, setOpen] = React.useState(false)

  const SelectedIcon = value
    ? (LucideIcons[value] as React.ComponentType<{ size?: number }>)
    : null

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          aria-expanded={open}
          className="w-[220px] justify-between"
        >
          <div className="flex items-center gap-2">
            {SelectedIcon && <SelectedIcon size={18} />}
            {value ?? "Selecionar ícone..."}
          </div>
          <ChevronsUpDown className="opacity-50" />
        </Button>
      </PopoverTrigger>

      <PopoverContent className="w-[220px] p-0">
        <Command>
          <CommandInput placeholder="Buscar ícone..." />
          <CommandList>
            <CommandEmpty>Nenhum ícone encontrado.</CommandEmpty>
            <CommandGroup heading="Ícones">
              {icons.map((iconName) => {
                const Icon = LucideIcons[iconName] as React.ComponentType<{ size?: number }>
                return (
                  <CommandItem
                    key={iconName}
                    value={iconName}
                    onSelect={() => {
                      onChange(iconName)
                      setOpen(false)
                    }}
                  >
                    <div className="flex items-center gap-2">
                      <Icon size={18} />
                      {iconName}
                    </div>
                    <Check
                      className={cn(
                        "ml-auto",
                        iconName === value ? "opacity-100" : "opacity-0"
                      )}
                    />
                  </CommandItem>
                )
              })}
            </CommandGroup>
          </CommandList>
        </Command>
      </PopoverContent>
    </Popover>
  )
}
