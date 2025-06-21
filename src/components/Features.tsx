import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Palette, Download, Share2, Smartphone, Zap, Shield } from 'lucide-react';

const Features = () => {
  const features = [
    {
      icon: Palette,
      title: 'Custom Colors',
      description: 'Choose any color combination for your QR codes to match your brand or style.',
      gradient: 'bg-gradient-secondary'
    },
    {
      icon: Download,
      title: 'High-Quality Downloads',
      description: 'Download your QR codes in PNG format with crisp, high-resolution quality.',
      gradient: 'bg-gradient-success'
    },
    {
      icon: Share2,
      title: 'Social Sharing',
      description: 'Share your QR codes directly to Twitter, Facebook, and LinkedIn with one click.',
      gradient: 'bg-gradient-warning'
    },
    {
      icon: Smartphone,
      title: 'Mobile Responsive',
      description: 'Create QR codes on any device - desktop, tablet, or mobile phone.',
      gradient: 'bg-gradient-dark'
    },
    {
      icon: Zap,
      title: 'Instant Generation',
      description: 'Generate QR codes instantly as you type. No waiting, no delays.',
      gradient: 'bg-gradient-primary'
    },
    {
      icon: Shield,
      title: 'Privacy First',
      description: 'All QR codes are generated locally in your browser. Your data never leaves your device.',
      gradient: 'bg-gradient-secondary'
    }
  ];

  return (
    <section id="features" className="py-16 bg-gradient-to-br from-gray-50 to-gray-100">
      <div className="max-w-6xl mx-auto px-6">
        <div className="text-center mb-12">
          <h2 className="text-3xl md:text-4xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
            Powerful Tools
          </h2>
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Everything you need to create professional QR codes with style and ease
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {features.map((feature, index) => (
            <Card 
              key={index} 
              className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-2 border-0 bg-white/70 backdrop-blur-sm"
            >
              <CardHeader>
                <div className={`w-12 h-12 ${feature.gradient} rounded-xl flex items-center justify-center mb-4 group-hover:scale-110 transition-transform duration-300`}>
                  <feature.icon className="h-6 w-6 text-white" />
                </div>
                <CardTitle className="text-xl font-bold text-gray-800">
                  {feature.title}
                </CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground leading-relaxed">
                  {feature.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Features;
