import React, { useState, useRef, useEffect } from 'react';
import QRCode from 'qrcode';
import html2canvas from 'html2canvas';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Slider } from '@/components/ui/slider';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Download, Share2, Copy, Check, Instagram } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

const QRGenerator = () => {
  const [text, setText] = useState('https://example.com');
  const [size, setSize] = useState([200]);
  const [foregroundColor, setForegroundColor] = useState('#000000');
  const [backgroundColor, setBackgroundColor] = useState('#ffffff');
  const [qrCodeUrl, setQrCodeUrl] = useState('');
  const [isGenerating, setIsGenerating] = useState(false);
  const [copied, setCopied] = useState(false);
  const qrRef = useRef<HTMLDivElement>(null);
  const { toast } = useToast();

  const generateQRCode = async () => {
    if (!text.trim()) return;
    
    setIsGenerating(true);
    try {
      const url = await QRCode.toDataURL(text, {
        width: size[0],
        color: {
          dark: foregroundColor,
          light: backgroundColor,
        },
        margin: 2,
      });
      setQrCodeUrl(url);
    } catch (error) {
      console.error('Error generating QR code:', error);
      toast({
        title: "Error",
        description: "Failed to generate QR code. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
    }
  };

  const downloadQRCode = async () => {
    if (!qrRef.current || !qrCodeUrl) return;

    try {
      const canvas = await html2canvas(qrRef.current, {
        backgroundColor: null,
        scale: 2,
      });
      
      const link = document.createElement('a');
      link.download = 'qr-code.png';
      link.href = canvas.toDataURL();
      link.click();
      
      toast({
        title: "Success",
        description: "QR code downloaded successfully!",
      });
    } catch (error) {
      console.error('Error downloading QR code:', error);
      toast({
        title: "Error",
        description: "Failed to download QR code. Please try again.",
        variant: "destructive",
      });
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
      toast({
        title: "Copied",
        description: "Text copied to clipboard!",
      });
    } catch (error) {
      console.error('Error copying to clipboard:', error);
    }
  };

  const shareOnSocial = (platform: string) => {
    const shareText = `Check out this QR code I generated: ${text}`;
    const urls = {
      twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`,
      facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(text)}`,
      linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(text)}`,
      instagram: `https://www.instagram.com/create/story/?media=${encodeURIComponent(text)}`,
    };
    
    window.open(urls[platform as keyof typeof urls], '_blank');
  };

  useEffect(() => {
    generateQRCode();
  }, [text, size, foregroundColor, backgroundColor]);

  return (
    <div className="max-w-6xl mx-auto p-6 space-y-8">
      <div className="text-center space-y-4">
        <h1 className="text-4xl md:text-6xl font-bold bg-gradient-primary bg-clip-text text-transparent animate-fade-in">
          QR Code Generator
        </h1>
        <p className="text-lg text-muted-foreground max-w-2xl mx-auto animate-fade-in">
          Create beautiful, customizable QR codes with adjustable colors and sizes. Download and share instantly!
        </p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Controls */}
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-primary rounded-full"></div>
              Customize Your QR Code
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="text">Text or URL</Label>
              <div className="flex gap-2">
                <Input
                  id="text"
                  value={text}
                  onChange={(e) => setText(e.target.value)}
                  placeholder="Enter text or URL"
                  className="flex-1"
                />
                <Button
                  variant="outline"
                  size="icon"
                  onClick={copyToClipboard}
                  className="shrink-0"
                >
                  {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
                </Button>
              </div>
            </div>

            <div className="space-y-2">
              <Label>Size: {size[0]}px</Label>
              <Slider
                value={size}
                onValueChange={setSize}
                max={400}
                min={100}
                step={10}
                className="w-full"
              />
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-2">
                <Label htmlFor="fg-color">Foreground Color</Label>
                <div className="flex gap-2 items-center">
                  <input
                    id="fg-color"
                    type="color"
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    className="w-12 h-10 rounded border cursor-pointer"
                  />
                  <Input
                    value={foregroundColor}
                    onChange={(e) => setForegroundColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="bg-color">Background Color</Label>
                <div className="flex gap-2 items-center">
                  <input
                    id="bg-color"
                    type="color"
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="w-12 h-10 rounded border cursor-pointer"
                  />
                  <Input
                    value={backgroundColor}
                    onChange={(e) => setBackgroundColor(e.target.value)}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>

            <div className="flex flex-wrap gap-2">
              <Button
                onClick={downloadQRCode}
                disabled={!qrCodeUrl}
                className="flex items-center gap-2 bg-gradient-primary hover:opacity-90"
              >
                <Download className="h-4 w-4" />
                Download PNG
              </Button>
              
              <Button
                variant="outline"
                onClick={() => shareOnSocial('twitter')}
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Twitter
              </Button>
              
              <Button
                variant="outline"
                onClick={() => shareOnSocial('facebook')}
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                Facebook
              </Button>
              
              <Button
                variant="outline"
                onClick={() => shareOnSocial('linkedin')}
                className="flex items-center gap-2"
              >
                <Share2 className="h-4 w-4" />
                LinkedIn
              </Button>

              <Button
                variant="outline"
                onClick={() => shareOnSocial('instagram')}
                className="flex items-center gap-2"
              >
                <Instagram className="h-4 w-4" />
                Instagram
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* QR Code Preview */}
        <Card className="animate-scale-in">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <div className="w-4 h-4 bg-gradient-secondary rounded-full"></div>
              Preview
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="flex items-center justify-center p-8">
              {isGenerating ? (
                <div className="flex items-center justify-center w-48 h-48">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
                </div>
              ) : qrCodeUrl ? (
                <div
                  ref={qrRef}
                  className="p-4 bg-white rounded-lg shadow-lg transition-transform hover:scale-105"
                >
                  <img
                    src={qrCodeUrl}
                    alt="Generated QR Code"
                    className="max-w-full h-auto"
                    style={{ 
                      width: size[0], 
                      height: size[0],
                      imageRendering: 'pixelated'
                    }}
                  />
                </div>
              ) : (
                <div className="flex items-center justify-center w-48 h-48 border-2 border-dashed border-muted-foreground/25 rounded-lg">
                  <p className="text-muted-foreground">QR Code will appear here</p>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default QRGenerator;
