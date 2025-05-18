import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Link } from "react-router-dom";

const whyLumiFeatures = [
  {
    title: "Clarity for Your Thoughts",
    description:
      "Lumi automatically identifies and organizes your emotions, thoughts, and patterns, so that you can understand triggers, moods, and growth areas you might otherwise overlook.",
  },
  {
    title: "Say it, don't suppress it",
    description:
      "Talk or type your thoughts instantly - without hesitation or self-censorship - whenever your mind feels crowded. Lumi listens without interruption, without judgment —just you.",
  },
  {
    title: "Remember What Matters & Grow through Reflection",
    description:
      "Lumi remembers what you say and gently reminds you of your growth from the past thoughts you've shared, helping you find find meaning and clarity from past reflections and help you appreciate how far you've come.",
  },
];

const tryLumiFeatures = [
  {
    title: "Speak Or Type",
    description: "Easily input your thoughts.",
    icon: "https://assets.lumime.ai/icon_audio_text.png"
  },
  {
    title: "Automatic Organization",
    description: "Lumi categorizes your thoughts into meaningful themes.",
    icon: "https://assets.lumime.ai/icon_bell.png"
  },
  {
    title: "Smart Recall",
    description: "Access insights exactly when you need them.",
    icon: "https://assets.lumime.ai/icon_search.png"
  },
];

const trustCards = [
  {
    title: "Your Safe Space, Anytime, Anywhere",
    description:
      "Lumi is here whenever you need it— Lumi is your safe space to vent, reflect, and gain personalized emotional insights—anytime, anywhere.\nNo appointment, no waiting, just comfort, clarity, and understanding at your fingertips.",
    bgColor: "bg-[#0854e4]",
    textColor: "text-white",
    borderClass: "border-0 border-none",
  },
  {
    title: "Private, Personal, Protected",
    description:
      "Your thoughts are deeply personal. Lumi is built with privacy at its core, and we truly prioritize your privacy: Your thoughts and data remain secure and private, so everything you share remains yours and yours alone.",
    bgColor: "bg-white",
    textColor: "text-[#000000cc]",
    descriptionColor: "text-[#00000099]",
    borderClass: "border border-solid border-[#acabc2]",
  },
];

// Define WaitlistForm outside the Frame component
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

export const Frame = (): JSX.Element => {
  const [checked, setChecked] = React.useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tryLumiCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trustCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollVideoRef = useRef<HTMLVideoElement>(null);
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

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target === scrollVideoRef.current) {
              const video = entry.target as HTMLVideoElement;
              video.currentTime = 0;
              video.play();
            } else if (entry.target.classList.contains('video-scroll')) {
              const video = entry.target as HTMLVideoElement;
              video.currentTime = 0;
              video.play();
            } else {
              entry.target.classList.add('animate-fade-in-up');
              observer.unobserve(entry.target);
            }
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: '0px',
      }
    );

    cardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    tryLumiCardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    trustCardRefs.current.forEach((card) => {
      if (card) observer.observe(card);
    });

    if (videoRef.current) observer.observe(videoRef.current);
    if (scrollVideoRef.current) observer.observe(scrollVideoRef.current);

    return () => observer.disconnect();
  }, []);

  return (
    <div className="flex flex-col items-start relative bg-[#0854e4]">
      <header className="flex h-[60px] items-center justify-between px-9 py-[9px] fixed top-0 left-0 right-0 w-full bg-[#0854e4] z-50">
        <img
          className="relative w-[120px] h-[40px] object-contain"
          alt="Lumi"
          src="https://assets.lumime.ai/primary_icon_1.png"
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-9 px-4 py-2.5 bg-[#0854e4] rounded-lg">
              <span className="[font-family:'Raleway',Helvetica] font-semibold text-white text-base tracking-[-0.32px]">
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
      </header>

      <div className="h-[60px] w-full"></div>

      <section className="flex flex-wrap items-center justify-center gap-12 pt-20 pb-28 px-4 max-w-screen-xl mx-auto w-full bg-[#0854e4]">
        <div className="flex-1 min-w-[300px] max-w-xl flex flex-col items-start gap-4">
          <h1 className="w-full mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-white text-7xl tracking-[-1.44px] leading-[80px] break-words">
            Be Heard. Be Understood. Be Reminded.
          </h1>

          <div className="flex flex-col items-start gap-12 w-full">
            <p className="w-full mt-[-1.00px] [font-family:'Raleway',Helvetica] font-medium text-white text-xl tracking-[0] leading-[normal] break-words">
              Your gentle AI companion for journaling. Reflect on your thoughts and uncover insights over time. 
            </p>

            <div className="flex flex-col items-start gap-4 w-full">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-[230px] h-14 px-9 py-2.5 bg-white rounded-[99px]">
                    <span className="text-[#0854e4] [font-family:'Inter',Helvetica] font-medium text-xl tracking-[-0.40px]">
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
          </div>
        </div>

        <div className="flex-1 flex justify-center min-w-[300px] max-w-xl">
          <video 
            className="w-full max-w-md h-auto object-contain rounded-lg"
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

      <section className="flex flex-col items-center gap-8 py-20 max-w-screen-xl mx-auto w-full px-4">
        <div className="flex flex-col items-center gap-[11px] w-full">
          <h2 className="w-fit mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-white text-5xl tracking-[0.96px] leading-[64px] opacity-0 animate-fade-up text-center">
            Feeling overwhelmed, anxious, <br />
            or emotionally scattered?
          </h2>
        </div>
        <div className="flex flex-col items-center gap-2.5 w-full">
          <div className="relative w-full pt-[56.25%]">
            <video 
              ref={videoRef}
              className="absolute top-0 left-0 w-full h-full object-cover video-scroll"
              muted 
              playsInline
            >
              <source src="https://assets.lumime.ai/s2.mp4" type="video/mp4" />
              Your browser does not support the video tag.
            </video>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center gap-8 py-20 max-w-screen-xl mx-auto w-full px-4 bg-[#0854e4]">
        <div className="flex flex-col items-center gap-[11px] w-full">
          <h2 className="self-stretch mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-white text-5xl tracking-[0.96px] leading-[64px] text-center">
            You&#39;re not alone<br />
            and you don&#39;t need to face it alone either.
          </h2>
        </div>
        <div className="flex flex-col items-center h-[673px] justify-center gap-2.5 w-full">
          <video 
            ref={scrollVideoRef}
            className="relative min-w-60 max-w-[740px] w-full max-h-[672.96px] h-[672.96px] object-cover"
            muted 
            playsInline
          >
            <source src="https://assets.lumime.ai/s3.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
        </div>
      </section>

      <section className="flex flex-col items-center gap-8 py-20 max-w-screen-xl mx-auto w-full px-4 bg-[#0854e4]">
        <div className="flex flex-col items-center gap-3 w-full">
          <h2 className="self-stretch mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-white text-5xl tracking-[0.96px] leading-[64px] text-center">
            Why Lumi？ <br />
            Because your thoughts matter.
          </h2>
        </div>
        <div className="flex flex-col items-center gap-8 w-full">
          <div className="relative w-full max-w-4xl">
            <div className="flex flex-col md:flex-row gap-9 w-full">
              {whyLumiFeatures.slice(0, 2).map((feature, index) => (
                <Card
                  key={index}
                  ref={el => cardRefs.current[index] = el}
                  className={`w-full md:w-[48%] h-[266px] p-8 bg-white rounded-[20px] opacity-0`}
                >
                  <CardContent className="flex flex-col items-start gap-5 p-0 h-full">
                    <div className="flex items-center justify-between w-full">
                      <h3 className="w-fit mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-[#0854e4] text-[28px] tracking-[0] leading-7 whitespace-nowrap">
                        {feature.title}
                      </h3>
                      <div className="w-[62px] h-7 mr-[-2.00px]">
                        <div className="font-semibold text-transparent text-2xl whitespace-nowrap [font-family:'Raleway',Helvetica] tracking-[0] leading-7">
                          Try
                        </div>
                      </div>
                    </div>
                    <p className="self-stretch font-medium text-[#00000099] text-xl [font-family:'Raleway',Helvetica] tracking-[0] leading-7">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>
            <Card 
              ref={el => cardRefs.current[2] = el}
              className="w-full p-8 mt-8 bg-white rounded-[20px] opacity-0"
            >
              <CardContent className="flex-col h-[151px] gap-5 p-0 flex items-start">
                <div className="flex items-center justify-between w-full">
                  <h3 className="w-fit mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-[#0854e4] text-[28px] tracking-[0] leading-7 whitespace-nowrap">
                    {whyLumiFeatures[2].title}
                  </h3>
                  <div className="w-[62px] h-7 mr-[-2.00px]">
                    <div className="font-semibold text-transparent text-2xl whitespace-nowrap [font-family:'Raleway',Helvetica] tracking-[0] leading-7">
                      Try
                    </div>
                  </div>
                </div>
                <p className="self-stretch font-medium text-[#00000099] text-xl [font-family:'Raleway',Helvetica] tracking-[0] leading-7">
                  {whyLumiFeatures[2].description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center gap-9 py-20 max-w-screen-xl mx-auto w-full px-4 bg-[#0854e4]">
        <h2 className="self-stretch h-16 mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-white text-5xl text-center tracking-[0.96px] leading-[64px] whitespace-nowrap">
          Try Lumi free!
        </h2>
        <div className="flex flex-wrap items-start justify-center gap-8 w-full">
          {tryLumiFeatures.map((feature, index) => (
            <Card
              key={index}
              ref={el => tryLumiCardRefs.current[index] = el}
              className="flex w-80 h-[229px] items-start gap-2.5 p-8 bg-[#f4f6fd] rounded-3xl border-0 border-none opacity-0"
            >
              <CardContent className="flex flex-col items-start gap-6 p-0 flex-1 grow">
                <img
                  className="w-14 h-14"
                  alt={feature.title}
                  src={feature.icon}
                />
                <div className="flex flex-col items-start gap-2 w-full">
                  <h3 className="w-fit mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-[#000000cc] text-xl tracking-[0] leading-[normal] whitespace-nowrap">
                    {feature.title}
                  </h3>
                  <p className="self-stretch [font-family:'Raleway',Helvetica] font-normal text-black text-base tracking-[0.32px] leading-5">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-center gap-8 py-20 max-w-screen-xl mx-auto w-full px-4 bg-[#0854e4]">
        <div className="flex flex-col items-center gap-[11px] w-full">
          <h2 className="self-stretch mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-white text-5xl tracking-[0.96px] leading-[64px] text-center">
            Trust & Security
          </h2>
        </div>
        <div className="flex flex-col items-center gap-8 w-full">
          {trustCards.map((card, index) => (
            <Card
              key={index}
              ref={el => trustCardRefs.current[index] = el}
              className={`w-full max-w-2xl p-8 bg-white rounded-[20px] opacity-0`}
            >
              <CardContent className="flex flex-col items-start gap-4 p-0">
                <h3 className={`self-stretch mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-[#0854e4] text-[28px] tracking-[0] leading-[normal]`}>
                  {card.title}
                </h3>
                <p className={`self-stretch [font-family:'Raleway',Helvetica] font-medium text-[#00000099] text-xl tracking-[0] leading-[normal]`}>
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="flex flex-col items-start gap-[72px] px-[200px] py-[72px] relative self-stretch w-full flex-[0_0_auto] bg-[#0854e4]">
        <div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
          <img
            className="relative w-[120px] h-[40px] object-contain"
            alt="Lumi"
            src="https://assets.lumime.ai/primary_icon_1.png"
          />

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-[230px] h-14 px-9 py-2.5 bg-white rounded-[99px]">
                <span className="text-[#0854e4] [font-family:'Inter',Helvetica] font-medium text-xl tracking-[-0.40px]">
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

        <div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
          <p className="relative flex-1 mt-[-1.00px] [font-family:'Raleway',Helvetica] font-normal text-white text-base tracking-[0] leading-[normal]">
            © 2025 Lumi. All rights reserved.
          </p>
          <div className="flex items-start gap-8 relative flex-[0_0_auto]">
            <Link 
              to="/privacy-policy"
              className="relative w-fit mt-[-1.00px] [font-family:'Raleway',Helvetica] font-normal text-white text-base tracking-[0] leading-[normal] whitespace-nowrap hover:underline"
            >
              Privacy Policy
            </Link>
            <Link 
              to="/terms-of-service"
              className="relative w-fit mt-[-1.00px] [font-family:'Raleway',Helvetica] font-normal text-white text-base tracking-[0] leading-[normal] whitespace-nowrap hover:underline"
            >
              Terms of Service
            </Link>
            <a 
              href="https://chat.whatsapp.com/E3rlNtn0hZT1Mch5Sw8v7J"
              target="_blank"
              rel="noopener noreferrer"
              className="relative w-fit mt-[-1.00px] [font-family:'Raleway',Helvetica] font-normal text-white text-base tracking-[0] leading-[normal] whitespace-nowrap hover:underline"
            >
              Contact Us On WhatsApp
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
};