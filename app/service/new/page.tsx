import HeaderPage from "@/components/admin/layouts/header-page";
import ServiceForm from "@/components/services-dialogs/ServiceForm";
import { authOptions } from "@/lib/auth";
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";
import { Suspense } from "react";

// Force dynamic rendering - getServerSession uses headers()
export const dynamic = "force-dynamic"

export default async function App() {
    const session = await getServerSession(authOptions)

    if (!session)
        redirect("/signin")

    // Require admin role
    if (session.user?.level !== "admin")
        redirect("/")

    return (
        <Suspense>
            <HeaderPage
                menuNav={[
                    { label: "Manager", href: "/", },
                    { label: "New Service" }
                ]}
            />
            <ServiceForm />
        </Suspense>
    )
}