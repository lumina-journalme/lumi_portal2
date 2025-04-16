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
    title: "Your Thoughts Deserve Clarity",
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
    bgColor: "bg-[#2b43ff]",
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
  const [hasPlayedOnce, setHasPlayedOnce] = useState(false);
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
        `https://api.github.com/repos/${import.meta.env.VITE_GITHUB_OWNER}/${import.meta.env.VITE_GITHUB_REPO}/dispatches`,
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
            if (entry.target === scrollVideoRef.current && !hasPlayedOnce) {
              const video = entry.target as HTMLVideoElement;
              video.play();
              setHasPlayedOnce(true);
            } else if (entry.target.classList.contains('video-scroll')) {
              const video = entry.target as HTMLVideoElement;
              video.play();
            } else {
              entry.target.classList.add('animate-fade-in-up');
            }
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.1,
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
  }, [hasPlayedOnce]);

  return (
    <div className="flex flex-col items-start relative bg-[#055FFD]">
      <header className="flex h-[60px] items-center justify-between px-9 py-[9px] fixed top-0 left-0 right-0 w-full bg-[#2256DE] z-50">
        <img
          className="relative w-[120px] h-[40px] object-contain"
          alt="Lumi"
          src="https://assets.lumime.ai/primary_icon_1.png"
        />

        <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
          <DialogTrigger asChild>
            <Button className="h-9 px-4 py-2.5 bg-[#055FFD] rounded-lg">
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

      <section className="flex items-center gap-12 pt-[72px] pb-[118px] px-[200px] relative self-stretch w-full flex-[0_0_auto] bg-[#2256DE]">
        <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
          <h1 className="relative w-fit mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-white text-7xl tracking-[-1.44px] leading-[80px]">
            Be Heard. Be Understood. Be Reminded.
          </h1>

          <div className="inline-flex flex-col items-start gap-12 relative flex-[0_0_auto]">
            <p className="relative w-[541px] mt-[-1.00px] [font-family:'Raleway',Helvetica] font-medium text-white text-xl tracking-[0] leading-[normal]">
              Your gentle AI companion for journaling. Reflect on your thoughts and uncover insights over time. 
            </p>

            <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
              <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
                <DialogTrigger asChild>
                  <Button className="w-[230px] h-14 px-9 py-2.5 bg-white rounded-[99px]">
                    <span className="text-[#055FFD] [font-family:'Inter',Helvetica] font-medium text-xl tracking-[-0.40px]">
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

        <div className="relative w-[488px] h-[324.72px] mr-[-37.00px]">
          <video 
            className="absolute w-[1092px] h-[489.6px] top-[-40px] left-0 object-cover rounded-lg"
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

      <section className="flex flex-col items-start px-0 py-[72px] relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-[11px] px-[200px] py-0 relative self-stretch w-full flex-[0_0_auto]">
          <h2 className="relative w-fit mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-white text-5xl tracking-[0.96px] leading-[64px] opacity-0 animate-fade-up">
            Feeling overwhelmed, anxious, <br />
            or emotionally scattered?
          </h2>
        </div>

        <div className="flex flex-col items-center gap-2.5 px-[200px] py-0 relative self-stretch w-full flex-[0_0_auto]">
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

      <section className="flex flex-col items-start gap-8 px-0 py-[72px] relative self-stretch w-full flex-[0_0_auto] bg-[#2256DE]">
        <div className="flex flex-col items-start gap-[11px] px-[200px] py-0 relative self-stretch w-full flex-[0_0_auto]">
          <h2 className="relative self-stretch mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-white text-5xl tracking-[0.96px] leading-[64px]">
            You&#39;re not alone
            <br />
            and you don&#39;t need to face it alone either.
          </h2>
        </div>

        <div className="flex flex-col h-[673px] items-center justify-center gap-2.5 relative self-stretch w-full">
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

      <section className="flex flex-col h-[812px] items-start gap-[60px] px-0 py-[72px] relative self-stretch w-full flex-[0_0_auto] bg-white">
        <div className="flex flex-col items-start gap-3 px-[200px] py-0 relative self-stretch w-full flex-[0_0_auto]">
          <h2 className="relative self-stretch mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-[#055FFD] text-5xl tracking-[0.96px] leading-[64px]">
            Why Lumi？ <br />
            Because your thoughts matter.
          </h2>
        </div>

        <div className="flex flex-col items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
          <div className="relative w-[1040px] h-[622px]">
            <div className="flex gap-9 w-full">
              {whyLumiFeatures.slice(0, 2).map((feature, index) => (
                <Card
                  key={index}
                  ref={el => cardRefs.current[index] = el}
                  className={`w-[501px] h-[266px] p-8 ${index === 0 ? "absolute top-0 left-0" : "absolute top-0 left-[539px]"} bg-[#f7f7f7] rounded-[20px] opacity-0`}
                >
                  <CardContent className="flex flex-col items-start gap-5 p-0 h-full">
                    <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                      <h3 className="relative w-fit mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-black text-[28px] tracking-[0] leading-7 whitespace-nowrap">
                        {feature.title}
                      </h3>

                      <div className="relative w-[62px] h-7 mr-[-2.00px]">
                        <div className="absolute top-0 left-0 font-semibold text-transparent text-2xl whitespace-nowrap [font-family:'Raleway',Helvetica] tracking-[0] leading-7">
                          Try
                        </div>
                      </div>
                    </div>

                    <p className="relative self-stretch font-medium text-[#00000099] text-xl [font-family:'Raleway',Helvetica] tracking-[0] leading-7">
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              ))}
            </div>

            <Card 
              ref={el => cardRefs.current[2] = el}
              className="w-[1040px] p-8 absolute top-[302px] left-0 bg-[#f7f7f7] rounded-[20px] opacity-0"
            >
              <CardContent className="flex-col h-[151px] gap-5 p-0 flex items-start">
                <div className="flex items-center justify-between relative self-stretch w-full flex-[0_0_auto]">
                  <h3 className="relative w-fit mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-black text-[28px] tracking-[0] leading-7 whitespace-nowrap">
                    {whyLumiFeatures[2].title}
                  </h3>

                  <div className="relative w-[62px] h-7 mr-[-2.00px]">
                    <div className="absolute top-0 left-0 font-semibold text-transparent text-2xl whitespace-nowrap [font-family:'Raleway',Helvetica] tracking-[0] leading-7">
                      Try
                    </div>
                  </div>
                </div>

                <p className="relative self-stretch font-medium text-[#00000099] text-xl [font-family:'Raleway',Helvetica] tracking-[0] leading-7">
                  {whyLumiFeatures[2].description}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      <section className="flex flex-col items-center justify-center gap-9 px-0 py-[72px] relative self-stretch w-full flex-[0_0_auto] bg-[#055FFD]">
        <h2 className="relative self-stretch h-16 mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-white text-5xl text-center tracking-[0.96px] leading-[64px] whitespace-nowrap">
          Try Lumi free!
        </h2>

        <div className="flex flex-wrap h-[285px] items-start justify-center gap-[32px_32px] relative self-stretch w-full">
          {tryLumiFeatures.map((feature, index) => (
            <Card
              key={index}
              ref={el => tryLumiCardRefs.current[index] = el}
              className="flex w-80 h-[229px] items-start gap-2.5 p-8 bg-[#f4f6fd] rounded-3xl border-0 border-none opacity-0"
            >
              <CardContent className="flex flex-col items-start gap-6 p-0 flex-1 grow">
                <img
                  className="relative w-14 h-14"
                  alt={feature.title}
                  src={feature.icon}
                />

                <div className="flex flex-col items-start gap-2 relative self-stretch w-full flex-[0_0_auto]">
                  <h3 className="relative w-fit mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-[#000000cc] text-xl tracking-[0] leading-[normal] whitespace-nowrap">
                    {feature.title}
                  </h3>

                  <p className="relative self-stretch [font-family:'Raleway',Helvetica] font-normal text-black text-base tracking-[0.32px] leading-5">
                    {feature.description}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <section className="flex flex-col items-start gap-8 px-[200px] py-[72px] relative self-stretch w-full flex-[0_0_auto] bg-white">
        <div className="flex flex-col items-start gap-[11px] relative self-stretch w-full flex-[0_0_auto]">
          <h2 className="relative self-stretch mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-[#055FFD] text-5xl tracking-[0.96px] leading-[64px]">
            Trust & Security
          </h2>
        </div>

        <div className="flex flex-col items-start gap-8 relative self-stretch w-full flex-[0_0_auto]">
          {trustCards.map((card, index) => (
            <Card
              key={index}
              ref={el => trustCardRefs.current[index] = el}
              className={`w-full p-8 ${card.bgColor} ${card.borderClass} rounded-[20px] opacity-0`}
            >
              <CardContent className="flex flex-col items-start gap-4 p-0">
                <h3 className={`relative self-stretch mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold ${card.textColor} text-[28px] tracking-[0] leading-[normal]`}>
                  {card.title}
                </h3>
                <p className={`relative self-stretch [font-family:'Raleway',Helvetica] font-medium ${card.descriptionColor || card.textColor} text-xl tracking-[0] leading-[normal]`}>
                  {card.description}
                </p>
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      <footer className="flex flex-col items-start gap-[72px] px-[200px] py-[72px] relative self-stretch w-full flex-[0_0_auto] bg-[#055FFD]">
        <div className="flex items-start justify-between relative self-stretch w-full flex-[0_0_auto]">
          <img
            className="relative w-[120px] h-[40px] object-contain"
            alt="Lumi"
            src="https://assets.lumime.ai/primary_icon_1.png"
          />

          <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
            <DialogTrigger asChild>
              <Button className="w-[230px] h-14 px-9 py-2.5 bg-white rounded-[99px]">
                <span className="text-[#055FFD] [font-family:'Inter',Helvetica] font-medium text-xl tracking-[-0.40px]">
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
            © 2024 Lumi. All rights reserved.
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