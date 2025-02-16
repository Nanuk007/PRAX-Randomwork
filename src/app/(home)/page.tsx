import { Suspense } from "react";
import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { authOptions } from "../api/auth/[...nextauth]/authOptions";
import HomeLoader from "@/components/Loader";
import HomePage from "@/views/NonAuthHomeView";
export const metadata = { title: "Domov | ZoškaSnap" };

export default async function Home() {
  const session = await getServerSession(authOptions);
  session ? redirect("/prispevok") : null;

  return (
    <Suspense fallback={<HomeLoader />}>
      <HomePage />
    </Suspense>
  );
}