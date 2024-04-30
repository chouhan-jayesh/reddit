import React from "react";
import redditIcon from "@/pages/assets/redditLogo.svg";
import Image from "next/image";
import redditIconOutline from "@/pages/assets/reddit-logo-white.svg";
import {
  BellIcon,
  ChatIcon,
  GlobeIcon,
  PlusIcon,
  SparklesIcon,
  VideoCameraIcon,
  SpeakerphoneIcon,
  LogoutIcon,
} from "@heroicons/react/outline";
import {
  ChevronDownIcon,
  HomeIcon,
  SearchIcon,
  MenuIcon,
} from "@heroicons/react/solid";
import { signIn, signOut, useSession } from "next-auth/react";
import defaultimage from "@/pages/assets/reddit-logo-white.svg"

function Header() {
    const { data: session } = useSession();
    const avatarUrl = `https://api.dicebear.com/8.x/bottts/svg?seed=${session?.user?.name}`;

  return (
    <div
      id="header"
      className=" sticky top-0 z-10 flex px-3 py-2 shadow-md shadow-zinc-950 "
    >
      <div className="flex cursor-pointer">
        <div className=" relative h-10 w-10 flex-shrink-0">
          <Image objectFit="contain" src={redditIcon} alt="img" layout="fill" />
        </div>

        <div className="flex items-center mx-1">
          <h6 className="text-2xl text">Reddit</h6>
        </div>
      </div>

      <div className="flex items-center mx-7 xl:min-w-[300px]">
        <HomeIcon className="h-5 w-5" />
        <p className="ml-2 hidden flex-1 lg:inline">Home</p>
        <ChevronDownIcon className="h-5 w-5" />
      </div>

      {/* Search bar div */}
      <form className="flex flex-1 items-center space-x-2 px-2 border border-zinc-700 rounded-sm ">
        <SearchIcon className="h-6 w-6 text-gray-400" />
        <input
          className="flex-1 rounded-sm bg-transparent placeholder-zinc-400 outline-none"
          type="text"
          placeholder="Search "
        />
        {/* hidden makes the button hidden, hence you have to press enter to initiate the request */}
        <button type="submit" hidden></button>
      </form>

      {/* Navgatoinal buttons */}

      <div className="hidden text-zinc-200 space-x-2 items-center mx-2 lg:inline-flex ">
        <SparklesIcon className="iconstyle" />
        <GlobeIcon className="iconstyle" />
        <VideoCameraIcon className="iconstyle" />
        <hr className="h-10 border border-gray-400 border-opacity-30" />
        <ChatIcon className="iconstyle" />
        <BellIcon className="iconstyle" />
        <PlusIcon className="iconstyle" />
        <SpeakerphoneIcon className="iconstyle" />
      </div>
      <div className="ml-5 flex items-center lg:hidden">
        <MenuIcon className="iconstyle" />
      </div>
      {/* Sign in and Sign out */}
      {session ? (
        <div className="hidden bg-black lg:flex items-center space-x-2 border border-zinc-700 rounded-sm shadow-sm shadow-zinc-900 cursor-pointer hover:bg-zinc-950">
          <div className="flex mr-2 items-center">
            <div className="relative h-10 w-10 flex-shrink-0  ">
            <Image className="p-1" layout="fill" src={session ? avatarUrl : defaultimage} alt="" />
            </div>
            <div className="flex-1 text-xs">
              {/* truncate ads ... for long strings */}
              <p className="truncate ">{session?.user?.name}</p>
              <p className="text-zinc-400 text-md">wassup</p>
            </div>
            <div
              onClick={() => {
                signOut();
              }}
              className="p-1 relative z-10 ml-2 rounded-sm hover:bg-zinc-700"
            >
              <LogoutIcon className=" h-5 flex-shrink-0 " />
            </div>
          </div>
        </div>
      ) : (
        <div
          onClick={() => {
            signIn();
          }}
          className="hidden bg-zinc-950 lg:flex items-center space-x-2 border border-zinc-700 rounded-sm shadow-sm shadow-zinc-900 cursor-pointer hover:bg-zinc-900"
        >
          <div className="flex mr-2 ">
            <div className="relative h-5 w-10 flex-shrink-0 ">
              <Image
                objectFit="contain"
                src={redditIconOutline}
                alt="img"
                layout="fill"
              />
            </div>
            <p className="text-zinc-200 text-md">Sign In</p>
          </div>
        </div>
      )}
    </div>
  );
}

export default Header;
