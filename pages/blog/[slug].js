import fs from "fs";
import path from "path";
import matter from "gray-matter";

const PostsPage = ({
  frontmatter: { title, category, data, cover_image, author, author_image },
  content,
  slug,
}) => {
  return (
    <>
      <h1>{title}</h1>
    </>
  );
};
export default PostsPage;

// This is only responsible for generating the slug paths:
export async function getStaticPaths() {
  const files = fs.readdirSync(path.join("posts"));

  const paths = files.map((filename) => ({
    params: {
      slug: filename.replace(".md", ""),
    },
  }));

  return {
    paths,
    fallback: false,
  };
}

// this will be responsible for actually getting the posts so we can use them in the page/component:
export async function getStaticProps({ params: { slug } }) {
  const markdownWithMeta = fs.readFileSync(
    path.join("posts", slug + ".md"),
    "utf-8"
  );

  const { data: frontmatter, content } = matter(markdownWithMeta);

  return {
    props: {
      frontmatter,
      content,
      slug,
    },
  };
}
