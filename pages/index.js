import React, { useEffect } from 'react';
import Layout from '../components/Layout';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const Home = ({ pageTitle }) => {
  useEffect(() => {
    if (window.netlifyIdentity) {
      window.netlifyIdentity.on('init', (user) => {
        if (!user) {
          window.netlifyIdentity.on('login', () => {
            document.location.href = '/admin/';
          });
        }
      });
    }
  }, []);

  return (
    <>
      <Layout pageTitle={pageTitle}>
        <h1>Homepage</h1>
      </Layout>
    </>
  );
};

export const getStaticProps = async () => {
  const markdownWithMetadata = fs
    .readFileSync(path.join('cms/homepage/data.md'))
    .toString();

  const { data } = matter(markdownWithMetadata);

  return {
    props: {
      pageData: data,
      pageTitle: 'Testing',
    },
  };
};

// export const getStaticProps = () => {
//   return {
//     props: {
//       pageTitle: 'Homepage',
//       timeStamp: Date.now(),
//     },
//   };
// };

export default Home;
