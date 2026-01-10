import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

const Layout = ({ children }) => {
    return (
        <div className="min-h-screen flex flex-col bg-zinc-50/50">
            <Navbar />
            <main className="flex-grow pt-20 animate-fade-in">
                {children}
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
