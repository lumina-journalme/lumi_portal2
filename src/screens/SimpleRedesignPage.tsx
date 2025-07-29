import React, { useState } from "react";
import { Button } from "../components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../components/ui/dialog";
import { Input } from "../components/ui/input";
import { Label } from "../components/ui/label";
import { Link } from "react-router-dom";
import { Navbar } from '../components/Navbar';
import { TypeAnimation } from "react-type-animation";
import { CloudBackground } from "../components/CloudBackground";

// WaitlistForm component
interface WaitlistFormProps {
  formData: { name: string; email: string; phone: string };
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleSubmit: (e: React.FormEvent) => void;
}

const WaitlistForm: React.FC<WaitlistFormProps> = ({ formData, handleInputChange, handleSubmit }) => (
  <DialogContent className="sm:max-w-[425px]">
    <DialogHeader>
      <DialogTitle className="text-xl mb-4">Join Our Waitlist</DialogTitle>
    </DialogHeader>
    <form onSubmit={handleSubmit} className="space-y-4">
      <div className="space-y-2">
        <Label htmlFor="name">Name *</Label>
        <Input
          id="name"
          value={formData.name}
          onChange={handleInputChange}
          required
          autoComplete="name"
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="email">Email *</Label>
        <Input
          id="email"
          type="email"
          value={formData.email}
          onChange={handleInputChange}
          required
          autoComplete="email"
          className="w-full"
        />
      </div>
      <div className="space-y-2">
        <Label htmlFor="phone">Phone *</Label>
        <Input
          id="phone"
          type="tel"
          value={formData.phone}
          onChange={handleInputChange}
          required
          autoComplete="tel"
          className="w-full"
        />
      </div>
      <Button type="submit" className="w-full">Submit</Button>
    </form>
  </DialogContent>
);

export const SimpleRedesignPage = (): JSX.Element => {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      const response = await fetch(
        `https://api.github.com/repos/${import.meta.env.VITE_DISPATCH_OWNER}/${import.meta.env.VITE_DISPATCH_REPO}/dispatches`,
        {
          method: 'POST',
          headers: {
            'Authorization': `token ${import.meta.env.VITE_GITHUB_TOKEN}`,
            'Accept': 'application/vnd.github.v3+json',
          },
          body: JSON.stringify({
            event_type: 'waitlist_submission',
            client_payload: {
              data: formData
            }
          })
        }
      );

      if (response.status === 204) {
        setFormData({ name: '', email: '', phone: '' });
        setIsDialogOpen(false);
        return;
      }

      if (!response.ok) {
        throw new Error('提交失败');
      }

      setFormData({ name: '', email: '', phone: '' });
      setIsDialogOpen(false);
    } catch (error) {
      console.error('Error:', error);
      // 处理错误
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { id, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [id]: value
    }));
  };

  return (
    <>
      <Navbar onJoinWaitlistClick={() => setIsDialogOpen(true)} />
      <div className="flex flex-col items-start relative bg-[#0854e4] overflow-x-hidden w-full">
        <div className="h-[72px] w-full"></div>

        <section
          id="hero"
          className="flex flex-col md:flex-row items-center justify-center h-screen w-full px-8 lg:px-0 lg:pl-hero-pl-lg lg:pr-hero-pr-lg lg:pt-hero-pt-lg lg:pb-hero-pb-lg lg:gap-hero-gap-lg"
        >
          <div className="flex-1 w-full flex flex-col items-start gap-4">
            <TypeAnimation
              sequence={[
                'Be Heard.',
                500,
                'Be Heard.\nBe Understood.',
                500,
                'Be Heard.\nBe Understood.\nBe Reminded.',
                1500,
              ]}
              wrapper="h1"
              speed={50}
              className="w-full font-bold text-white text-3xl sm:text-5xl md:text-7xl leading-[112%] tracking-[-1.44px] break-words"
              style={{ whiteSpace: 'pre-line', minHeight: '250px' }}
              cursor={false}
            />
            <p className="w-full mt-2 text-white text-base sm:text-lg md:text-xl leading-[150%]">
              Your gentle AI companion for journaling. Reflect on your thoughts and uncover insights over time.
            </p>
            <div className="w-full sm:w-[230px] mt-4">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-full h-12 sm:h-14 bg-white rounded-full text-[#0854e4] text-base sm:text-xl">
                    Join Waitlist
                  </Button>
                </DialogTrigger>
                <WaitlistForm 
                  formData={formData} 
                  handleInputChange={handleInputChange} 
                  handleSubmit={handleSubmit} 
                />
              </Dialog>
            </div>
          </div>
          <div className="flex-1 w-full flex justify-center mt-6 md:mt-0">
            <video 
              className="w-full h-auto object-contain rounded-lg"
              autoPlay 
              loop 
              muted 
              playsInline
            >
              <source src="https://assets.lumime.ai/s1.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </section>

        {/* New section with cloud background */}
        <section className="relative flex flex-col items-center justify-center h-screen w-full bg-[#6EC7FF] overflow-hidden">
            <CloudBackground />
            <div className="z-10 text-center px-4">
                <h2 className="font-bold text-white text-2xl sm:text-4xl md:text-5xl leading-tight">
                    Welcome home, to your thoughts.
                </h2>
                <p className="text-white text-base sm:text-lg md:text-xl leading-[150%]"> In this quiet, digital sanctuary, you can finally exhale. Like a gentle companion, Lumi listens without judgment, helping you understand and embrace every part of your inner world. </p>
            </div>
        </section>

        {/* New blank page/section */}
        <section 
            className="flex flex-col items-center justify-center h-screen w-full"
            style={{ backgroundColor: '#FAF7F2' }}
        >
            <div className="text-center">
                <h2 className="text-4xl font-bold text-gray-800">New Section</h2>
                <p className="text-gray-600 mt-2">Content for the new page goes here.</p>
            </div>
        </section>

        <footer className="flex flex-col items-center md:items-start gap-8 px-4 md:px-[200px] py-[72px] w-full bg-[#0854e4]">
          <div className="flex flex-col md:flex-row items-center md:items-start justify-center md:justify-between w-full gap-4 md:gap-0">
            <img
              className="w-[120px] h-[40px] object-contain mb-4 md:mb-0"
              alt="Lumi"
              src="https://assets.lumime.ai/primary_icon_1.png"
            />
            <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
              <DialogTrigger asChild>
                <Button className="w-[230px] h-14 px-9 py-2.5 bg-white rounded-[99px]">
                  <span className="text-[#0854e4] font-medium text-xl tracking-[-0.40px]">
                    Join Waitlist
                  </span>
                </Button>
              </DialogTrigger>
              <WaitlistForm 
                formData={formData} 
                handleInputChange={handleInputChange} 
                handleSubmit={handleSubmit} 
              />
            </Dialog>
          </div>
          <div className="flex flex-col items-center md:flex-row md:items-center md:justify-between w-full gap-2 md:gap-0 mt-6">
            <p className="text-white text-base text-center md:text-left">
              © 2025 Lumi. All rights reserved.
            </p>
            <div className="flex flex-col md:flex-row items-center gap-2 md:gap-8 mt-2 md:mt-0">
              <Link 
                to="/privacy-policy"
                className="text-white text-base whitespace-nowrap hover:underline"
              >
                Privacy Policy
              </Link>
              <Link 
                to="/terms-of-service"
                className="text-white text-base whitespace-nowrap hover:underline"
              >
                Terms of Service
              </Link>
              <a 
                href="https://chat.whatsapp.com/E3rlNtn0hZT1Mch5Sw8v7J"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white text-base whitespace-nowrap hover:underline"
              >
                Contact Us On WhatsApp
              </a>
            </div>
          </div>
        </footer>
      </div>
    </>
  );
}; 