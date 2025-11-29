'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useEffect } from "react";

export default function Overview({ className }: { className?: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const handleTabChange = (value: string) => {
    const params = new URLSearchParams(searchParams.toString());
    params.set("tab", value);
    router.replace(`${pathname}?${params.toString()}`, { scroll: false });
  };

  useEffect(() => {
    handleTabChange("overview")
  }, [])

  return (
    <div className={`space-y-6 ${className}`}>
      <h1>Home</h1>
    </div>
  )
}
