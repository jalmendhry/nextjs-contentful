import React, { useEffect } from 'react';
import Router from 'next/router';
import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import marked from 'marked';

// import { Carousel } from 'react-responsive-carousel';
// import 'react-responsive-carousel/lib/styles/carousel.min.css'; // requires a loader

// import { documentToReactComponents } from '@contentful/rich-text-react-renderer';

import Layout from '../components/Layout';
// import { client } from '../utils/client';

const Page = ({ htmlString, data }) => {
  console.log(htmlString, 'the string');
  console.log(data, 'the string');
  // useEffect(() => {
  //   if (pageData == null) {
  //     Router.push('404');
  //   }
  // }, [pageData]);

  // if (pageData === null) {
  //   return false;
  // }

  // const { pageTitle, mainContent, carousel, contentRow } = pageData;
  return (
    <>
      <Layout pageTitle={data.title}>
        <p>Hi</p>
        <div dangerouslySetInnerHTML={{ __html: htmlString }} />
      </Layout>
      {/* <Layout pageTitle={pageTitle}>
        {carousel && carousel.length > 0 && (
          <Carousel>
            {carousel.map(({ fields }, index) => {
              const { file, description } = fields;
              return (
                <div key={index}>
                  <img src={`https:${file.url}`} alt=""></img>
                  <p className="legend">{description}</p>
                </div>
              );
            })}
          </Carousel>
        )}
        <div className="content-wrapper">
          {documentToReactComponents(mainContent)}
        </div>

        {contentRow &&
          contentRow.map(({ fields }, index) => {
            const { content, image } = fields;

            return (
              <div className="content-row" key={index}>
                <img src={`https://${image.fields.file.url}`} alt="" />
                <div className="content-wrapper">
                  {documentToReactComponents(content)}
                </div>
              </div>
            );
          })}
      </Layout>*/}
    </>
  );
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

export const getStaticPaths = async () => {
  const files = fs.readdirSync('cms-pages');
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
  const markdownWithMetadata = fs
    .readFileSync(path.join('cms-pages', page + '.md'))
    .toString();

  const parsedMarkdown = matter(markdownWithMetadata);

  const htmlString = marked(parsedMarkdown.content);

  return {
    props: {
      htmlString,
      data: parsedMarkdown.data,
    },
  };
};

export default Page;
