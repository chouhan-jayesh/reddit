import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Session } from "inspector";
import Avatar from "./Avatar";
import { LinkIcon, PhotographIcon } from "@heroicons/react/outline";
import { useForm } from "react-hook-form";

type FormData = {
  postTitle: string;
  postBody: string;
  postImage: string;
  subreddit: string;
};

function PostBox() {
  const [imageBoxOpen, setImageBoxOpen] = useState<Boolean>(false);
  const {
    register,
    setValue,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<FormData>();
  const { data: session } = useSession();
  const onSubmit = handleSubmit(async(formData) => {
    console.log(formData)
  })
  return (
    <form onSubmit={onSubmit} className="sticky top-20 z-50 rounded-sm border  border-zinc-900 p-2 sm:mx-32 shadow-md shadow-zinc-950 ">
      <div className="flex justify-center items-center space-x-2 px-0.5 ">
        <Avatar />
        <input
          {...register("postTitle", { required: true })}
          disabled={!session}
          type="text"
          className="bg-black rounded-sm flex-1 outline-none p-2  text-white placeholder-zinc-400"
          placeholder={
            session ? "Create a post by entering a title." : "Sign in to enter"
          }
        ></input>
        <PhotographIcon
          onClick={() => {
            setImageBoxOpen(!imageBoxOpen);
          }}
          className={`h-10 w-10 p-1.5 text-zinc-300 hover:cursor-pointer hover:bg-zinc-900 hover:rounded-sm ${
            imageBoxOpen && "text-blue-600"
          }`}
        />
        <LinkIcon className=" h-10 w-10 p-1.5 text-zinc-300 hover:cursor-pointer hover:bg-zinc-900 hover:rounded-sm" />
      </div>

      {/* watch monitors the postTitle input and on any change event it renders the below */}

      {!!watch("postTitle") && (
        <div className="flex flex-col py-2">
          {/* Body */}
          <div className="flex items-center px-1">
            <p className="min-w-[90px] ">Body : </p>
            <input
              className="m-2 flex-1 bg-zinc-950 border border-zinc-800 p-2 outline-none"
              {...register("postBody")}
              type="text"
              placeholder="Text (optional)"
            />
          </div>
          <div className="flex items-center px-1">
            <p className="min-w-[90px] ">Sub-reddit : </p>
            <input
              className="m-2 flex-1 bg-zinc-950 border border-zinc-800 p-2 outline-none"
              {...register("subreddit", {required: true})}
              type="text"
              placeholder="i.e. Next.js"
            />
          </div>

          {imageBoxOpen && (
            <div className="flex items-center px-1">
              <p className="min-w-[90px] ">Image URl : </p>
              <input
                className="m-2 flex-1 bg-zinc-950 border border-zinc-800 p-2 outline-none"
                {...register("postImage", { required: true })}
                type="text"
                placeholder="Optional..."
              />
            </div>
          )}
          {/* Errors */}
          {Object.keys(errors).length > 0 && (
            <div className="space-y-2  p-2 text-red-500">
              {errors.postTitle?.type === "required" && (
                <p>A Post Title is required</p>
              )}
              {errors.subreddit?.type === "required" && (
                <p>A Subreddit is required</p>
              )}
            </div>
          )}
          <div className="flex justify-center items-center">
            {!!watch("postTitle") && (
              <button
              type="submit" className="border border-zinc-800 bg-sky-800 rounded-full p-2 mt-3 w-[250px] hover:bg-sky-700 hover:shadow-sm hover:shadow-zinc-900r">
                Create Post
              </button>
            )}
          </div>
        </div>
      )}
    </form>
  );
}

export default PostBox;
