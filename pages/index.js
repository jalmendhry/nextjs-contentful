import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import React, { useEffect } from 'react';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Layout from '../components/Layout';

const Home = ({ pageData: { title, carousel } }) => {
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
      <Layout pageTitle={title || 'Homepage'}>
        <h1>Homepage</h1>

        {carousel && carousel.length > 0 && (
          <Carousel>
            {carousel.map((image, index) => {
              return (
                <div key={index}>
                  <img src={image} alt=""></img>
                  <p className="legend">some image</p>
                </div>
              );
            })}
          </Carousel>
        )}
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
