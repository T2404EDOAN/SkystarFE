import React from 'react';
import Header from '../Components/Header/Header';
import './MainLayout.css';
import Footer from '../Components/Footer/Footer';

const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <div className="layout">
      <Header />
      <main className="main-content">
        {children}
      </main>
      {/* <Footer /> */}
    </div>
  );
};

export default MainLayout;
