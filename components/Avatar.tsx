import { useSession } from "next-auth/react";
import Image from "next/image";
import React from "react";
import defaultimage from "@/pages/assets/reddit-logo-white.svg";

function Avatar() {
  const { data: session } = useSession();
  const avatarUrl = `https://api.dicebear.com/8.x/bottts/svg?seed=${session?.user?.name}`;
  return (
    <div className="relative h-10 w-10 rounded-full border border-gray-600 ">
      <Image layout="fill" src={session ? avatarUrl : defaultimage} alt="" />
    </div>
  );
}

export default Avatar;
