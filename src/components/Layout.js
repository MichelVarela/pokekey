import React from 'react';
import { Outlet } from "react-router-dom";

// components
import Header from './Header';
import Footer from './Footer';

const Layout = ({children}) => {
  return (
    <>
    <Header />

    <Outlet />
    {children}

    <Footer />
    </>
  );
};

export default Layout;
