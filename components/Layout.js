import Head from "next/head";
import Header from "./Header";

const Layout = ({ title, keywords, description, children }) => {
  return (
    <div>
      <Head>
        <title>{title}</title>
        <meta nmae='keywords' content={keywords} />
        <meta nmae='description' content={description} />
        <link rel='icon' href='/favicon.ico' />
      </Head>
      <Header />
      <main className='container mx-auto my-7'>{children}</main>
    </div>
  );
};

export default Layout;

Layout.defaultProps = {
  title: "Welcome to Devspace",
  keywords: "development, coding, programming",
  description: "the best info and news in development",
};
