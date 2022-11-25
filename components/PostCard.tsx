import React from "react";
import { urlFor } from "../sanity";
import { Post } from "../typings";
interface Props {
  post: Post;
}
export const PostCard: React.FC<Props> = ({post}) => {

  return (
    <div className="max-w-4xl">
      <div className="flex items-center space-x-3">
        <img
          className="w-7 rounded aspect-square"
          src={urlFor(post.author.image).url()}
          alt=""
        />
        <h2 className="font-normal">{post.author.name}</h2>
      </div>
      <div className="flex justify-between">
        <div className="">
          <div className="my-3 max-w-sm">
            <h1 className="text-lg font-bold">{post.title}</h1>
            <p className="text-slate-500">{post.description}</p>
          </div>
          <ul className="flex gap-3 text-xs items-center text-gray-500 ">
            <li className="">{post._createdAt.slice(0, 10)}</li>
            <li>10 min read</li>
            <li className="bg-gray-200  rounded-full px-2 py-1">Physics</li>
          </ul>
        </div>
        <div className="">
          <img
            className="hidden md:inline-block h-full my-3"
            src={urlFor(post.mainImage).url()}
            alt=""
          />
        </div>
      </div>
    </div>
  );
}

export default PostCard;
