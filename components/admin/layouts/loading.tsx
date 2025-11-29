import { cn } from "@/lib/utils";
import Image from "next/image";

export default function Loading({ className }: { className?: string }) {
    return (
        <div className={cn(`absolute left-0 top-0 w-full h-[calc(100vh-71px)] flex justify-center items-center flex-col`, className)}>
            <Image
                src={"/logo.png"}
                id="bigLogo"
                width={40}
                height={40}
                alt="logo"
                className="animate-spin"
            />
            <span>Carregando...</span>
        </div>
    )
}