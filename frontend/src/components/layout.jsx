import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar />
      <div>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;

