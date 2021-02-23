import React from 'react';
import Head from 'next/head';

import Header from './Header';
import Navbar from './Navbar';
// import Footer from "./footer"

const Layout = ({ pageTitle, children }) => {
  return (
    <>
      <Head>
        <title>{pageTitle}</title>
      </Head>
      <div className="container">
        <Header />
        <Navbar />
        <div className="container__content">{children}</div>
        {/* <Footer /> */}
      </div>
    </>
  );
};

export default Layout;
