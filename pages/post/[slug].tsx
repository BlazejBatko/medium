import { GetStaticProps } from "next";
import React from "react";
import Header from "../../components/Header";
import PostBody from "../../components/PostBody";
import { sanityClient, urlFor } from "../../sanity";
import { Post } from "../../typings";
import { useForm, SubmitHandler} from "react-hook-form";

interface IFormInput {
  _id: string;
  name: string;
  email: string;
  comment: string;
}

interface Props {
  post: Post;
}

function Post({ post }: Props) {

  const {
    register,
    handleSubmit,
    formState: { errors },

  } = useForm<IFormInput>();

  return (

    <main>
      <Header bgCol="bg-white" />

      <img
        className="w-full h-40 object-cover"
        src={urlFor(post.mainImage).url()!}
        alt=""
      />

      <PostBody post={post} />

      <hr className="max-w-lg my-5 mx-auto border border-yellow-500" />

      <form className="flex flex-col p-5 my-10 max-w-2xl mx-auto mb-10 gap-2">
        <h3 className="text-2xl text-yellow-500 font-light">Enjoy the read?</h3>
        <h4 className="text-3xl font-bold ml-5 ">
          Share your ideas with millions of readers!
        </h4>
        <hr className="max-w-7xl  border-gray-800 border-2 my-3" />

        <input {...register("_id")} type="hidden" name="_id" value={post._id} />
        <label className="label" htmlFor="name">
          <span>Name</span>
          <input
            {...register("name", { required: true })}
            id="name"
            className="input shadow-md border border-gray-300 ring-yellow-500 outline-none focus:ring"
            placeholder="John Kennedy"
            type="text"
          />
        </label>
        <label className="label" htmlFor="email">
          <span>Email</span>
          <input
            {...register("email", { required: true })}
            id="email"
            className="input shadow-md border border-gray-300 ring-yellow-500 outline-none focus:ring"
            placeholder="john.kennedy@gmail.com"
            type="text"
          />
        </label>
        <label className="label " htmlFor="comment">
          <span>Comment</span>
          <textarea
            {...register("comment", { required: true })}
            id="comment"
            className="input  shadow-md border border-gray-300 ring-yellow-500 outline-none focus:ring"
            placeholder="Amazing read! Shed new light on this matter. thank you 🖤"
            rows={6}
          />
        </label>

        {/* errors will return when field validation fails */}
        <div className="flex flex-col gap-y-2">
          { <span  className="text-red-800 font-semibold ">Name field is required <span className="font-normal">(╯‵□′)╯︵┻━┻</span></span>}

          { <span className="text-red-800 font-semibold ">Email field is required <span className="font-normal">(╯‵□′)╯︵┻━┻</span></span>}

          {<span className="text-red-800 font-semibold ">Comment field is required <span className="font-normal">(╯‵□′)╯︵┻━┻</span></span>}
        </div>

        <button className=" shadow-md rounded-md px-3 py-2  bg-gray-800 text-yellow-500 uppercase font-light text-lg tracking-widest"> Submit comment</button>
      </form>
    </main>
  );
}

export default Post;

export const getStaticPaths = async () => {
  // Get all the posts
  const query = `
    *[_type == "post"] {
        _id,
        slug {
            current
        }
    }

    `;
  const posts = await sanityClient.fetch(query);

  // Get the paths we want to pre-render based on posts
  const paths = posts.map((post: Post) => ({
    params: {
      slug: post.slug.current,
    },
  }));
  return {
    paths,
    fallback: "blocking",
  };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const query = `
        *[_type == "post" && slug.current == $slug][0]{
            _id,
            _createdAt,
            title,
            author-> {
                name,
                image
            },
            description,
            mainImage,
            body,
            slug
        }

    `;
  const post = await sanityClient.fetch(query, { slug: params?.slug });

  // if there is no post, return 404 page (because of fallback: 'blocking' in getStaticPaths)
  if (!post) {
    return {
      notFound: true,
    };
  }
  // if there is a post, return the post
  return {
    props: {
      post,
    },
    revalidate: 60, // after 60 seconds, it will try to generate a new version of the page in the background (if there are new requests)
  };
};
