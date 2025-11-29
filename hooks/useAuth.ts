"use client";

import { useRouter } from "next/navigation";
import { useSession, signIn, signOut as nextAuthSignOut } from "next-auth/react";
import { useState, useCallback } from "react";
import { useQuery } from "@tanstack/react-query";
import { getUserByID } from "@/services/auth/getUsers";

export function useAuth() {
  const { data: session, status } = useSession();
  const [isSigningOut, setIsSigningOut] = useState(false);
  const router = useRouter();

  // 🔹 Buscar permissões quando autenticado
  const { data: userData, isLoading: isLoadingUser } = useQuery({
    queryKey: ["user", session?.user?.id],
    queryFn: () => getUserByID(session!.user!.id),
    enabled: status === "authenticated" && !!session?.user?.id,
  });

  const signOut = useCallback(async () => {
    setIsSigningOut(true);
    await nextAuthSignOut({ redirect: false });
    setIsSigningOut(false);
    router.push("/signin");
  }, [router]);

  const requireAuth = useCallback(() => {
    if (status === "unauthenticated") {
      router.push("/signin");
    }
  }, [status, router]);

  return {
    user: session?.user || userData
      ? { ...session?.user, ...userData }
      : null,
    // permissions: userData?.permission ?? null,
    isLoadingUser,
    status,
    signIn,
    signOut,
    isSigningOut,
    isAuthenticated: status === "authenticated",
    requireAuth,
  };
}
