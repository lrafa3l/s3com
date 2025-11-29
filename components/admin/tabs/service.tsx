'use client'

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useEffect } from "react";
import { cn } from "@/lib/utils";
import ServiceView from "./subtabs/service.view";
import ServiceForm from "@/components/services-dialogs/ServiceForm";

export default function Service({ className }: { className?: string }) {
    const router = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();

    const handleTabChange = (value: string) => {
        const params = new URLSearchParams(searchParams.toString());
        params.set("tab", value);
        router.replace(`${pathname}?${params.toString()}`, { scroll: false });
    };

    useEffect(() => {
        handleTabChange("service")
    }, [])

    return (
        <div className="">
            <div className="m-auto max-w-5xl py-4">
                <h1 className="text-5xl">Serviços</h1>
            </div>
            <Tabs
                defaultValue="serivice"
                className={cn("w-full gap-0", className)}
            >
                {/* Cabeçalho fixo */}
                <div className="sticky top-0 z-10 flex justify-between  h-[50px] border-b px-4 sm:px-8 max-w-full overflow-y-hidden overflow-x-auto no-scrollbar">
                    <TabsList className="flex bg-transparent border-b-0 items-center h-[50px] gap-1 m-auto max-w-5xl w-full justify-start select-none">
                        <div>

                        </div>
                        <div className="flex flex-wrap gap-1 h-[50px]">
                            <TabsTrigger value="serivice" className="tabStyle data-[state=active]:border-none">
                                Serviços
                            </TabsTrigger>

                            <TabsTrigger value="add" className="tabStyle data-[state=active]:border-none">
                                Compositor
                            </TabsTrigger>
                        </div>
                    </TabsList>
                </div>

                {/* Abas adicionais — placeholders */}
                <TabsContent value="serivice">
                   <ServiceView />
                </TabsContent>

                <TabsContent value="add" className="max-h-80">
                    <ServiceForm />
                </TabsContent>
            </Tabs>
        </div>
    )
}
