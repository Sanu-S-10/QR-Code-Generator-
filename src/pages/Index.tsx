
import React from 'react';
import Header from '@/components/Header';
import QRGenerator from '@/components/QRGenerator';
import Footer from '@/components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-purple-50">
      <Header />
      <main className="py-8">
        <QRGenerator />
      </main>
      <Footer />
    </div>
  );
};

export default Index;
