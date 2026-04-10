import { ReactNode } from "react";
import { redirect } from "next/navigation";
import { auth } from "@/auth";

export default async function AddLayout({ children }: { children: ReactNode }) {
  const session = await auth();

  if (!session?.user) {
    redirect("/profile?next=/add");
  }

  return <>{children}</>;
}
