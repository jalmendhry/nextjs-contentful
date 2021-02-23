import Layout from '../components/Layout';

const Home = ({ pageTitle }) => {
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
