
import React from 'react';
import { QrCode } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-gradient-dark text-white py-12">
      <div className="max-w-6xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="space-y-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-white/20 rounded-lg backdrop-blur-sm">
                <QrCode className="h-6 w-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold">QR Generator</h3>
                <p className="text-white/80 text-sm">Create & Customize</p>
              </div>
            </div>
            <p className="text-white/70 leading-relaxed">
              Generate beautiful, customizable QR codes with ease. Privacy-focused and completely free to use.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">Features</h4>
            <ul className="space-y-2 text-white/70">
              <li>Custom Colors & Sizes</li>
              <li>High-Quality Downloads</li>
              <li>Social Media Sharing</li>
              <li>Mobile Responsive</li>
              <li>Instant Generation</li>
            </ul>
          </div>

          <div className="space-y-4">
            <h4 className="text-lg font-semibold">About</h4>
            <p className="text-white/70 leading-relaxed">
              Built with modern web technologies to provide the best QR code generation experience. 
              Your privacy is our priority - everything happens in your browser.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
