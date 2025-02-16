// src/app/(private)/layout.tsx

import SessionValidator from "@/components/SessionValidator";

export default function PrivateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionValidator>{children}</SessionValidator>;
}