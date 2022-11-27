import React from "react";
import { Post } from "../typings";
import { urlFor } from "../sanity";
import PortableText from "react-portable-text";

interface Props {
  post: Post;
}

function PostBody({ post }: Props) {
  return (
    <article className="max-w-3xl mx-auto p-5">
      <h1 className="text-3xl mt-10 mb-3 ">{post.title}</h1>
      <h2 className="text-xl font-light text-gray-500 mb-2">
        {post.description}
      </h2>

      <div className="flex items-center gap-5 mt-5 space-x-0">
        <img
          className="h-10 w-10 rounded-full"
          src={urlFor(post.author.image).url()!}
          alt="photography that represents an author of the post"
        />
        <p suppressHydrationWarning className="font-extralight text-sm ">
          Blog post by{" "}
          <span className="text-gray-900 font-semibold">
            {post.author.name}
          </span>{" "}
          - Published at {new Date(post._createdAt).toLocaleString()}
        </p>
      </div>

      <div>
        <PortableText
          className=""
          dataset={process.env.NEXT_PUBLIC_SANITY_DATASET}
          projectId={process.env.NEXT_PUBLIC_SANITY_PROJECT_ID}
          content={post.body}
          // serializers points how to render certain types of content
          serializers={{
            h1: (props: any) => (
              <h1 className="text-7xl font-bold my-5" {...props} />
            ),
            h2: (props: any) => (
              <h2 className="text-2xl font-bold my-5" {...props} />
            ),
            li: ({ children }: any) => (
              <li className="ml-4 list-disc">{children}</li>
            ),
            link: ({ href, children }: any) => (
              <a href={href} className="text-blue-500 hover:underline">
                {children}
              </a>
            ),
            image: (props: any) => {
              return (
                <img
                  className="w-full my-5"
                  src={urlFor(props).url()!}
                  alt=""
                />
              );
            },
            normal: (props: any) => <p className="text-lg my-5" {...props} />,
          }}
        />
      </div>
    </article>
  );
}

export default PostBody;
