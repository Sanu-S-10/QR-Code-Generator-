
import React from 'react';
import { QrCode } from 'lucide-react';

const Header = () => {
  return (
    <header className="w-full bg-gradient-primary py-4 shadow-lg">
      <div className="max-w-6xl mx-auto px-6">
        <div className="flex items-center justify-center">
          <div className="flex items-center gap-3">
            <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
              <QrCode className="h-6 w-6 text-white" />
            </div>
            <div>
              <h2 className="text-xl font-bold text-white">QR Generator</h2>
              <p className="text-white/80 text-sm">Create & Customize</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
