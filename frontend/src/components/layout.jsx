import React from 'react';
import Header from './Header';
import Sidebar from './Sidebar';
import Footer from './Footer';

const Layout = ({ children }) => {
  return (
    <>
      <Header />
      <Sidebar />
      <div style={{ marginLeft: '0px', paddingTop: '100px', paddingBottom: '20px' }}>
        {children}
      </div>
      <Footer />
    </>
  );
};

export default Layout;

