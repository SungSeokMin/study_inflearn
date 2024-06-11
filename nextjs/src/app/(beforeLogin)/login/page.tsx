"use client";

import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";

import Main from "@/app/(beforeLogin)/_component/Main";

const Page = () => {
  const router = useRouter();

  const { data: session } = useSession();

  if (session?.user) {
    router.replace("/home");
    return null;
  }

  router.replace("/i/flow/login");

  return <Main />;
};

export default Page;
