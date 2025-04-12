import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";

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
    icon: "https://assets.lumime.ai/icon_audio_Text.png"
  },
  {
    title: "Automatic Organization",
    description: "Lumi categorizes your thoughts into meaningful themes.",
    icon: "https://assets.lumime.ai/icon_auto_organize.png"
  },
  {
    title: "Smart Recall",
    description: "Access insights exactly when you need them.",
    icon: "https://assets.lumime.ai/icon_smart_recall.png"
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

const socialLinks = [
  { icon: "/facebook.svg", alt: "Facebook" },
  { icon: "/twitter.svg", alt: "Twitter" },
  { icon: "/instagram.svg", alt: "Instagram" },
  { icon: "/linkedin.svg", alt: "Linked in" },
  { icon: "/youtube.svg", alt: "You tube" },
];

const TypewriterText = ({ text, onComplete, delay = 0 }: { text: string; onComplete?: () => void; delay?: number }) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(-1);
  const [started, setStarted] = useState(false);

  useEffect(() => {
    const startTimeout = setTimeout(() => {
      setStarted(true);
      setCurrentIndex(0);
    }, delay);

    return () => clearTimeout(startTimeout);
  }, [delay]);

  useEffect(() => {
    if (!started) return;

    if (currentIndex < text.length) {
      const timeout = setTimeout(() => {
        setDisplayText(prev => prev + text[currentIndex]);
        setCurrentIndex(prev => prev + 1);
      }, 50);

      return () => clearTimeout(timeout);
    } else if (onComplete) {
      onComplete();
    }
  }, [currentIndex, text, started, onComplete]);

  return (
    <span className="inline-block">
      {displayText}
      {currentIndex >= 0 && currentIndex < text.length && (
        <span className="animate-blink">|</span>
      )}
    </span>
  );
};

const SequentialTypewriter = () => {
  const [currentLine, setCurrentLine] = useState(0);
  const lines = ["Be Heard.", "Be Understood.", "Be Reminded."];

  const handleLineComplete = () => {
    if (currentLine < lines.length - 1) {
      setCurrentLine(prev => prev + 1);
    }
  };

  return (
    <>
      {lines.map((line, index) => (
        <React.Fragment key={index}>
          {index <= currentLine && (
            <>
              <TypewriterText 
                text={line} 
                onComplete={handleLineComplete}
                delay={index * 500}
              />
              <br />
            </>
          )}
        </React.Fragment>
      ))}
    </>
  );
};

export const Frame = (): JSX.Element => {
  const [checked, setChecked] = React.useState(false);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const tryLumiCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const trustCardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const waitlist = JSON.parse(localStorage.getItem('waitlist') || '[]');
    waitlist.push({
      ...formData,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('waitlist', JSON.stringify(waitlist));
    
    setFormData({ name: '', email: '', phone: '' });
    
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            if (entry.target.classList.contains('video-scroll')) {
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
      if (card) {
        observer.observe(card);
      }
    });

    tryLumiCardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    trustCardRefs.current.forEach((card) => {
      if (card) {
        observer.observe(card);
      }
    });

    if (videoRef.current) {
      observer.observe(videoRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const WaitlistForm = () => (
    <DialogContent>
      <DialogHeader>
        <DialogTitle className="text-xl mb-4">Join Our Waitlist</DialogTitle>
      </DialogHeader>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="space-y-2">
          <Label htmlFor="name">Name *</Label>
          <Input
            id="name"
            value={formData.name}
            onChange={(e) => setFormData(prev => ({ ...prev, name: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="email">Email *</Label>
          <Input
            id="email"
            type="email"
            value={formData.email}
            onChange={(e) => setFormData(prev => ({ ...prev, email: e.target.value }))}
            required
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="phone">Phone *</Label>
          <Input
            id="phone"
            type="tel"
            value={formData.phone}
            onChange={(e) => setFormData(prev => ({ ...prev, phone: e.target.value }))}
            required
          />
        </div>
        <Button type="submit" className="w-full">Submit</Button>
      </form>
    </DialogContent>
  );

  return (
    <div className="flex flex-col items-start relative bg-[#055FFD]">
      <header className="flex h-[60px] items-center justify-between px-9 py-[9px] fixed top-0 left-0 right-0 w-full bg-white z-50">
        <img
          className="relative w-[100px] h-[17px]"
          alt="Lumi"
          src="/lumi.svg"
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-9 px-4 py-2.5 bg-[#055FFD] rounded-lg">
              <span className="[font-family:'Raleway',Helvetica] font-semibold text-white text-base tracking-[-0.32px]">
                Join Waitlist
              </span>
            </Button>
          </DialogTrigger>
          <WaitlistForm />
        </Dialog>
      </header>

      <div className="h-[60px] w-full"></div>

      <section className="flex items-center gap-12 pt-[72px] pb-[118px] px-[200px] relative self-stretch w-full flex-[0_0_auto] bg-[#055FFD]">
        <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
          <h1 className="relative w-fit mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-white text-7xl tracking-[-1.44px] leading-[80px]">
            <SequentialTypewriter />
          </h1>

          <div className="inline-flex flex-col items-start gap-12 relative flex-[0_0_auto]">
            <p className="relative w-[541px] mt-[-1.00px] [font-family:'Raleway',Helvetica] font-medium text-white text-xl tracking-[0] leading-[normal]">
              Lorem ipsum dolor sit amet, ut adipisci incorrupte vis. Accumsan
              albucius similique ea nec,
            </p>

            <div className="inline-flex flex-col items-start gap-4 relative flex-[0_0_auto]">
              <Dialog>
                <DialogTrigger asChild>
                  <Button className="w-[230px] h-14 px-9 py-2.5 bg-white rounded-[99px]">
                    <span className="text-[#055FFD] [font-family:'Inter',Helvetica] font-medium text-xl tracking-[-0.40px]">
                      Join Waitlist
                    </span>
                  </Button>
                </DialogTrigger>
                <WaitlistForm />
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

      <section className="flex flex-col items-start gap-8 px-0 py-[72px] relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-[11px] px-[200px] py-0 relative self-stretch w-full flex-[0_0_auto]">
          <h2 className="relative self-stretch mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-white text-5xl tracking-[0.96px] leading-[64px]">
            You&#39;re not alone
            <br />
            and you don&#39;t need to face it alone either.
          </h2>
        </div>

        <div className="flex flex-col h-[673px] items-center justify-center gap-2.5 relative self-stretch w-full">
          <img
            className="relative min-w-60 max-w-[740px] w-full max-h-[672.96px] h-[672.96px] object-cover"
            alt="Group"
            src="/group-36697-1.png"
          />
        </div>
      </section>

      <section className="flex flex-col h-[1312px] items-start gap-[60px] px-0 py-[72px] relative self-stretch w-full bg-white">
        <div className="flex flex-col w-full items-start gap-3 px-[200px] py-0 relative flex-[0_0_auto]">
          <h2 className="relative self-stretch mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-[#055FFD] text-5xl tracking-[0.96px] leading-[64px]">
            Why Lumi？ <br />
            Because your thoughts matter.
          </h2>
        </div>

        <div className="flex flex-col w-full h-[922px] items-center gap-2.5 px-[200px] py-0 relative">
          <div className="relative w-[1040px] h-[922px]">
            <div className="flex gap-9 w-full">
              {whyLumiFeatures.slice(0, 2).map((feature, index) => (
                <Card
                  key={index}
                  ref={el => cardRefs.current[index] = el}
                  className={`w-[501px] h-[443px] p-8 ${index === 0 ? "absolute top-0 left-0" : "absolute top-0 left-[539px]"} bg-[#f7f7f7] rounded-[20px] opacity-0`}
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
              className="w-[1040px] p-8 absolute top-[479px] left-0 bg-[#f7f7f7] rounded-[20px] opacity-0"
            >
              <CardContent className="flex-col h-[379px] gap-5 p-0 flex items-start">
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
    </div>
  );
};