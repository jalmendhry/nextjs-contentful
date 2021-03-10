import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

import ReactMarkdown from 'react-markdown';
import { Carousel } from 'react-responsive-carousel';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import Image from 'next/image';

import Layout from '../components/Layout';

const Page = ({ pageData: { title, carousel, contentRow, content } }) => {
  return (
    <>
      <Layout pageTitle={title || 'Some page title'}>
        {carousel && carousel.length > 0 && (
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

        {contentRow &&
          contentRow.map((row, index) => {
            const { content, image } = row;
            console.log(image);
            return (
              <div className="content-row" key={index}>
                <img src={image} alt="" />
                <div className="content-wrapper">
                  <ReactMarkdown>{content}</ReactMarkdown>
                </div>
              </div>
            );
          })}
      </Layout>
    </>
  );
};

export const getStaticPaths = async () => {
  console.log(process.env.CONTENTFUL_SPACE_ENV);
  const files = fs.readdirSync('cms/pages/');
  const paths = files.map((filename) => ({
    params: {
      page: filename.replace('.md', ''),
    },
  }));

  return {
    paths,
    fallback: false,
  };
};

export const getStaticProps = async ({ params: { page } }) => {
  console.log(process.env.CONTENTFUL_SPACE_ENV);
  const markdownWithMetadata = fs
    .readFileSync(path.join('cms/pages', page + '.md'))
    .toString();

  const { data } = matter(markdownWithMetadata);

  return {
    props: {
      pageData: data,
    },
  };
};

// export const getServerSideProps = async ({ params }) => {
//   const { page } = params;

//   const result = await client.getEntries({
//     content_type: 'page',
//     'fields.slug[in]': page,
//   });

//   if (result.items.length && result.items) {
//     const { fields } = result.items[0];
//     return {
//       props: {
//         pageData: fields,
//       },
//     };
//   }

//   return {
//     props: {
//       pageData: null,
//     },
//   };
// };

// export const getStaticPaths = async () => {
//   const result = await client.getEntries({
//     content_type: 'page',
//   });

//   const paths = result.items.map((page) => ({
//     params: { page: page.fields.slug },
//   }));

//   return {
//     paths,
//     fallback: false, //indicates the type of fallback
//   };
// };

export default Page;
