'use client'

import ServiceView from "./subtabs/service.view";
import Link from "next/link";

export default function Service() {
    return (
        <div className="">
            <div className="border-b border-muted h-[90px]">
                <div className="m-auto max-w-5xl py-4 flex justify-between items-center">
                    <h1 className="text-5xl">Serviços</h1>
                    <div>
                        <Link href={"/service/new"} className="hover:underline">
                            Adicionar novo serviço
                        </Link>
                    </div>
                </div>
            </div>
            <div className="m-auto max-w-5xl py-4">
                <ServiceView />
            </div>
        </div>
    )
}
