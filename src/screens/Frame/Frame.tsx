import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";
import { Link } from "react-router-dom";
import { Navbar } from '../../components/Navbar';

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

  // Section refs for fancy scroll animation
  const heroRef = useRef<HTMLDivElement>(null);
  const feelingRef = useRef<HTMLDivElement>(null);
  const notAloneRef = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    // 新增 section 动画 observer
    const sectionRefs = [heroRef, feelingRef, notAloneRef];
    const sectionObserver = new window.IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fadeInUp', 'opacity-100');
          } else {
            entry.target.classList.remove('animate-fadeInUp', 'opacity-100');
          }
        });
      },
      { threshold: 0.6 }
    );
    sectionRefs.forEach(ref => {
      if (ref.current) sectionObserver.observe(ref.current);
    });
    // PPT翻页式滚轮切换
    let currentSection = 0;
    let isScrolling = false;
    const onWheel = (e: WheelEvent) => {
      // 只在PC端生效，且只在主section区域生效
      if (window.innerWidth < 768) return;
      if (isScrolling) return;
      const direction = e.deltaY > 0 ? 1 : e.deltaY < 0 ? -1 : 0;
      if (direction === 0) return;
      const nextSection = currentSection + direction;
      if (nextSection < 0 || nextSection >= sectionRefs.length) return;
      isScrolling = true;
      currentSection = nextSection;
      sectionRefs[currentSection].current?.scrollIntoView({ behavior: 'smooth' });
      setTimeout(() => { isScrolling = false; }, 900);
      e.preventDefault();
    };
    window.addEventListener('wheel', onWheel, { passive: false });
    return () => {
      sectionObserver.disconnect();
      window.removeEventListener('wheel', onWheel);
    };
  }, []);

  return (
    <>
      <Navbar />
      <div className="flex flex-col items-start relative bg-[#0854e4] overflow-x-hidden w-full pt-16" style={{ scrollSnapType: 'y mandatory' }}>
        <div className="h-[60px] w-full"></div>

        <section
          id="hero"
          ref={heroRef}
          className="flex flex-col md:flex-row items-center justify-center gap-8 h-screen w-full md:max-w-screen-xl md:mx-auto px-2 sm:px-4 bg-[#0854e4] scroll-snap-align-start opacity-0"
        >
          <div className="flex-1 w-full max-w-full md:max-w-xl flex flex-col items-start gap-4">
            <h1 className="w-full font-bold text-white text-3xl sm:text-5xl md:text-7xl leading-tight break-words">
              Be Heard. Be Understood. Be Reminded.
            </h1>
            <p className="w-full mt-2 text-white text-base sm:text-lg md:text-xl leading-normal">
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
          <div className="flex-1 w-full max-w-full md:max-w-md flex justify-center mt-6 md:mt-0">
            <video 
              className="w-full max-w-full sm:max-w-md h-auto object-contain rounded-lg"
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

        <section
          id="feeling"
          ref={feelingRef}
          className="flex flex-col items-center justify-center gap-2 h-screen w-full md:max-w-screen-xl md:mx-auto px-2 sm:px-4 bg-[#0854e4] scroll-snap-align-start opacity-0"
        >
          <div className="flex flex-col items-center gap-2 w-full">
            <h2 className="font-bold text-white text-2xl sm:text-4xl md:text-5xl leading-tight text-center">
              Feeling overwhelmed, anxious, <br />
              or emotionally scattered?
            </h2>
          </div>
          <div className="flex flex-col items-center gap-0 w-full">
            <div className="relative w-full flex justify-center">
              <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl">
                <video 
                  ref={videoRef}
                  className="w-full h-auto object-contain rounded-lg video-scroll"
                  muted 
                  playsInline
                >
                  <source src="https://assets.lumime.ai/s2.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </section>

        <section
          id="not-alone"
          ref={notAloneRef}
          className="flex flex-col items-center justify-center gap-2 h-screen w-full md:max-w-screen-xl md:mx-auto px-2 sm:px-4 bg-[#0854e4] scroll-snap-align-start opacity-0"
        >
          <div className="flex flex-col items-center gap-2 w-full">
            <h2 className="font-bold text-white text-2xl sm:text-4xl md:text-5xl leading-tight text-center">
              You're not alone<br />
              and you don't need to face it alone either.
            </h2>
          </div>
          <div className="flex flex-col items-center gap-0 w-full">
            <div className="relative w-full flex justify-center">
              <div className="w-full max-w-xs sm:max-w-md md:max-w-2xl lg:max-w-3xl">
                <video
                  ref={scrollVideoRef}
                  className="w-full h-auto object-contain rounded-lg"
                  muted
                  playsInline
                >
                  <source src="https://assets.lumime.ai/s3.mp4" type="video/mp4" />
                  Your browser does not support the video tag.
                </video>
              </div>
            </div>
          </div>
        </section>

        <section className="flex flex-col items-center gap-8 py-20 w-full md:max-w-screen-xl md:mx-auto px-4 bg-[#0854e4]">
          <div className="flex flex-col items-center gap-3 w-full">
            <h2 className="font-bold text-white text-2xl sm:text-4xl md:text-5xl leading-tight text-center">
              Why Lumi？ <br />
              Because your thoughts matter.
            </h2>
          </div>
          <div className="flex flex-col items-center gap-8 w-full">
            <div className="relative w-full max-w-full md:max-w-4xl">
              <div className="flex flex-col md:flex-row gap-9 w-full">
                {whyLumiFeatures.slice(0, 2).map((feature, index) => (
                  <Card
                    key={index}
                    ref={el => cardRefs.current[index] = el}
                    className={`w-full md:w-[48%] p-8 bg-white rounded-[20px] opacity-0 max-w-full`}
                  >
                    <CardContent className="flex flex-col items-start gap-5 p-0">
                      <div className="flex items-center justify-between w-full">
                        <h3 className="font-bold text-[#0854e4] text-2xl sm:text-4xl md:text-3xl leading-tight whitespace-nowrap">
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
                className="w-full p-8 mt-8 bg-white rounded-[20px] opacity-0 max-w-full"
              >
                <CardContent className="flex-col gap-5 p-0 flex items-start">
                  <div className="flex items-center justify-between w-full">
                    <h3 className="font-bold text-[#0854e4] text-2xl sm:text-4xl md:text-3xl leading-tight whitespace-nowrap">
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

        <section className="flex flex-col items-center justify-center gap-9 py-20 w-full md:max-w-screen-xl md:mx-auto px-4 bg-[#0854e4]">
          <h2 className="font-bold text-white text-2xl sm:text-4xl md:text-5xl leading-tight text-center whitespace-nowrap">
            Try Lumi free!
          </h2>
          <div className="flex flex-wrap items-start justify-center gap-8 w-full">
            {tryLumiFeatures.map((feature, index) => (
              <Card
                key={index}
                ref={el => tryLumiCardRefs.current[index] = el}
                className="flex w-full sm:w-80 h-[229px] items-start gap-2.5 p-8 bg-[#f4f6fd] rounded-3xl border-0 border-none opacity-0 max-w-full"
              >
                <CardContent className="flex flex-col items-start gap-6 p-0 flex-1 grow">
                  <img
                    className="w-14 h-14"
                    alt={feature.title}
                    src={feature.icon}
                  />
                  <div className="flex flex-col items-start gap-2 w-full">
                    <h3 className="font-bold text-[#000000cc] text-2xl sm:text-4xl md:text-2xl leading-tight whitespace-nowrap">
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

        <section className="flex flex-col items-center gap-8 py-20 w-full md:max-w-screen-xl md:mx-auto px-4 bg-[#0854e4]">
          <div className="flex flex-col items-center gap-[11px] w-full">
            <h2 className="font-bold text-white text-2xl sm:text-4xl md:text-5xl leading-tight text-center">
              Trust & Security
            </h2>
          </div>
          <div className="flex flex-col items-center gap-8 w-full">
            {trustCards.map((card, index) => (
              <Card
                key={index}
                ref={el => trustCardRefs.current[index] = el}
                className={`w-full max-w-full md:max-w-2xl p-8 bg-white rounded-[20px] opacity-0`}
              >
                <CardContent className="flex flex-col items-start gap-4 p-0">
                  <h3 className="font-bold text-[#0854e4] text-2xl sm:text-4xl md:text-3xl leading-tight">
                    {card.title}
                  </h3>
                  <p className="font-medium text-[#00000099] text-xl tracking-[0] leading-[normal]">
                    {card.description}
                  </p>
                </CardContent>
              </Card>
            ))}
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
      {/* 动画样式，可移到全局 CSS */}
      <style>{`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px) scale(0.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.7s cubic-bezier(0.23, 1, 0.32, 1) both;
        }
      `}</style>
    </>
  );
};