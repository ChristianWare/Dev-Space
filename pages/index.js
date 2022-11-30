import Link from "next/link";
import fs from "fs";
import path from "path";
import matter from "gray-matter";
import Layout from "../components/Layout";
import Post from "../components/Post";
import { sortByDate } from "../utils/index.js";

export default function Home({ posts }) {
  return (
    <Layout>
      <h1 className='text-5xl border-b-4 p-5 font-bold'>6 Recent Posts</h1>

      <h2>Python</h2>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {posts
          .filter((post) => post.frontmatter.category.includes("Python"))
          .map((filteredCategory) => (
            <Post post={filteredCategory} />
          ))}
      </div>
      <h2>JavaScript</h2>
      <div className='grid md:grid-cols-2 lg:grid-cols-3 gap-5'>
        {posts
          .filter((post) => post.frontmatter.category.includes("JavaScript"))
          .slice(0,1).map((filteredCategory) => (
            <Post post={filteredCategory} />
          ))}
      </div>
      <Link href='/blog'>
        <a className='block text-center border border-gray-500 text-gray-800 rounded-md py-4 my-5 transition duration-500 ease select-none hover:text-white hover:bg-gray-900 focus:outline-none focus:shadow-outline w-full'>
          All Posts
        </a>
      </Link>
    </Layout>
  );
}

export async function getStaticProps() {
  // use the fs module to get the files from the directory:
  const files = fs.readdirSync(path.join("posts"));

  const posts = files.map((filename) => {
    // create a slug:
    const slug = filename.replace(".md", "");

    //parese the front matter with the npm package gray matter
    const markdownWithMeta = fs.readFileSync(
      path.join("posts", filename),
      "utf-8"
    );

    const { data: frontmatter } = matter(markdownWithMeta);
    const category = frontmatter.category;

    return {
      slug,
      frontmatter,
      category,
    };
  });

  return {
    props: {
      posts: posts.sort(sortByDate).slice(0, 6),
    },
  };
}
