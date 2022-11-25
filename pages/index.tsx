import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import Link from "next/link";
import Header from "../components/Header";
import Hero from "../components/Hero";
import PostCard from "../components/PostCard";
import { sanityClient, urlFor } from "../sanity";
import { Post } from "../typings";

interface Props {
  posts: Post[];
}

const Home: NextPage<Props> = ({ posts }: Props) => {
  
  return (
    <div className="">
      <Head>
        <title>Medium Blog</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <Header />

      <Hero />

      <div className="p-5 flex gap-5 flex-wrap justify-between max-w-7xl mx-auto">
        {posts.map((post) => (
          <Link key={post._id} href={`/post/${post.slug.current}`}>
            <PostCard post={post}/>
          </Link>
        ))}
      </div>
    </div> 
  );
};

export default Home;

export const getServerSideProps = async () => {
  const query = `
  *[_type == "post"] {
    _id,
    _createdAt,
    title,
    slug,
    description,
    mainImage,
   
    author -> {
    name,
    image
  }
  }
`;

  const posts = await sanityClient.fetch(query);

  return {
    props: {
      posts,
    },
  };
};
