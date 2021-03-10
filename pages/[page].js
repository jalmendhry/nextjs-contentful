import { useEffect, useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';

import { getEntries, getPageEntryBySlug } from '../components/client';
import Layout from '../components/Layout';

const Page = ({ pageData, preview }) => {
  const { pageTitle } = pageData;
  const [redirect, setRedirect] = useState(null);
  useEffect(() => {
    setRedirect(window.location.pathname);
  }, []);
  return (
    <>
      {preview && (
        <div
          style={{
            background: 'black',
            color: 'white',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            padding: '0 1rem',
          }}>
          <p>Preview mode enabled</p>
          <a href={`api/end-preview?url=${redirect}`}>Exit preview</a>
        </div>
      )}
      <Layout pageTitle={pageTitle || 'Some page title'}>
        <h1>{pageTitle}</h1>
        {/* {carousel && carousel.length > 0 && (
          <Carousel>
            {carousel.map((image, index) => {
              // console.log(carousel);
              return (
                <div key={index}>
                  <img src={image} alt=""></img>
                  <p className="legend">some image</p>
                </div>
              );
            })}
          </Carousel>
        )}

        {content && (
          <div className="content-wrapper">
            <ReactMarkdown>{content}</ReactMarkdown>
          </div>
        )}

        // {contentRow &&
        //   contentRow.map((row, index) => {
        //     const { content, image } = row;
        //     console.log(image);
        //     return (
        //       <div className="content-row" key={index}>
        //         <img src={image} alt="" />
        //         <div className="content-wrapper">
        //           <ReactMarkdown>{content}</ReactMarkdown>
        //         </div>
        //       </div>
        //     );
          })} */}
      </Layout>
    </>
  );
};

export const getStaticPaths = async () => {
  const result = await getEntries('page');
  const paths = result.map((page) => ({
    params: { page: page.fields.slug },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { page }, preview }) => {
  const result = await getPageEntryBySlug(page, preview);
  const entries = result.map(({ fields }) => fields);

  return {
    props: {
      pageData: entries[0],
      preview: preview || null,
    },
  };
};

export default Page;
