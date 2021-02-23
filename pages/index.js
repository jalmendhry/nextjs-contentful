import React, { useEffect } from 'react';
import Layout from '../components/Layout';

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

export const getStaticProps = () => {
  return {
    props: {
      pageTitle: 'Homepage',
      timeStamp: Date.now(),
    },
  };
};

export default Home;
