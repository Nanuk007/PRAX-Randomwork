// src/components/SessionValidator.tsx
"use client";

import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import Loader from "./Loader";

export const SessionValidator = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const { data: session, status } = useSession();
  const router = useRouter();

  status === "loading" ? <Loader /> : null;

  if (status === "loading") {
    return <Loader />;
  }

  status === "unauthenticated" ? router.push("/auth/prihlasenie") : null;

  //   status === "authenticated" && session && children;

  if (status === "authenticated" && session) {
    return children;
  }

  return null;
};

export default SessionValidator;
