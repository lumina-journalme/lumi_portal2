import React, { useEffect, useRef, useState } from "react";
import { Button } from "../../components/ui/button";
import { Card, CardContent } from "../../components/ui/card";
import { Input } from "../../components/ui/input";
import { Checkbox } from "../../components/ui/checkbox";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "../../components/ui/dialog";
import { Label } from "../../components/ui/label";

// Feature card data for "Why Lumi?" section
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

// Feature card data for "Try Lumi free!" section
const tryLumiFeatures = [
  {
    title: "Speak Or Type",
    description: "Easily input your thoughts.",
  },
  {
    title: "Automatic Organization",
    description: "Lumi categorizes your thoughts into meaningful themes.",
  },
  {
    title: "Smart Recall",
    description: "Access insights exactly when you need them.",
  },
];

// Trust card data
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

// Social media links data
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
      }, 50); // Faster typing speed

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
                delay={index * 1000} // Delay start of each line
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
  
  // Form state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: ''
  });

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Save to localStorage
    const waitlist = JSON.parse(localStorage.getItem('waitlist') || '[]');
    waitlist.push({
      ...formData,
      timestamp: new Date().toISOString()
    });
    localStorage.setItem('waitlist', JSON.stringify(waitlist));
    
    // Reset form
    setFormData({ name: '', email: '', phone: '' });
    
    // Close dialog
    document.dispatchEvent(new KeyboardEvent('keydown', { key: 'Escape' }));
  };

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('animate-fade-in-up');
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

    return () => observer.disconnect();
  }, []);

  // Waitlist form dialog component
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
    <div className="flex flex-col items-start relative bg-[#0055ff]">
      {/* Header/Navigation */}
      <header className="flex h-[60px] items-center justify-between px-9 py-[9px] fixed top-0 left-0 right-0 w-full bg-white z-50">
        <img
          className="relative w-[100px] h-[17px]"
          alt="Lumi"
          src="/lumi.svg"
        />

        <Dialog>
          <DialogTrigger asChild>
            <Button className="h-9 px-4 py-2.5 bg-[#0055ff] rounded-lg">
              <span className="[font-family:'Raleway',Helvetica] font-semibold text-white text-base tracking-[-0.32px]">
                Join Waitlist
              </span>
            </Button>
          </DialogTrigger>
          <WaitlistForm />
        </Dialog>
      </header>

      {/* Add padding to account for fixed header */}
      <div className="h-[60px] w-full"></div>

      {/* Hero Section */}
      <section className="flex items-center gap-12 pt-[72px] pb-[118px] px-[200px] relative self-stretch w-full flex-[0_0_auto] bg-[#004be2]">
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
                    <span className="text-[#0055ff] [font-family:'Inter',Helvetica] font-medium text-xl tracking-[-0.40px]">
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
          <div className="absolute w-[455px] h-[204px] top-0 left-0">
            <div className="relative h-[202px] bg-[url(/union-1.svg)] bg-[100%_100%]">
              <img
                className="absolute w-[425px] h-[129px] top-[15px] left-[15px]"
                alt="Vector"
                src="/vector.svg"
              />
            </div>
          </div>

          <div className="absolute w-[243px] h-[101px] top-56 left-[245px] bg-[url(/union.svg)] bg-[100%_100%]">
            <div className="relative h-[87px]">
              <div className="absolute w-[243px] h-20 top-0 left-0 rounded-[749.25px] bg-[url(/objects.svg)] bg-[100%_100%]" />

              <img
                className="absolute w-[9px] h-[87px] top-0 left-44"
                alt="Vector"
                src="/vector-1.svg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Feeling Overwhelmed Section */}
      <section className="flex flex-col items-start px-0 py-[72px] relative self-stretch w-full flex-[0_0_auto]">
        <div className="flex flex-col items-start gap-[11px] px-[200px] py-0 relative self-stretch w-full flex-[0_0_auto]">
          <h2 className="relative w-fit mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-white text-5xl tracking-[0.96px] leading-[64px] opacity-0 animate-fade-up">
            Feeling overwhelmed, anxious, <br />
            or emotionally scattered?
          </h2>
        </div>

        <div className="flex flex-col items-center gap-2.5 px-[200px] py-0 relative self-stretch w-full flex-[0_0_auto]">
          <img
            className="relative self-stretch w-full h-[457.89px] object-cover"
            alt="Group"
            src="/group-39922-1.png"
          />
        </div>
      </section>

      {/* You're Not Alone Section */}
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

      {/* Why Lumi Section */}
      <section className="flex flex-col h-[1312px] items-start gap-[60px] px-0 py-[72px] relative self-stretch w-full bg-white">
        <div className="flex flex-col w-full items-start gap-3 px-[200px] py-0 relative flex-[0_0_auto]">
          <h2 className="relative self-stretch mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-[#0055ff] text-5xl tracking-[0.96px] leading-[64px]">
            Why Lumi？ <br />
            Because your thoughts matter.
          </h2>
        </div>

        <div className="flex flex-col w-full h-[922px] items-center gap-2.5 px-[200px] py-0 relative">
          <div className="relative w-[1040px] h-[922px]">
            {/* First row of feature cards */}
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

                    <div className="relative flex-1 self-stretch w-full grow bg-white rounded-lg" />
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* Bottom feature card */}
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

                <div className="relative flex-1 self-stretch w-full grow bg-white rounded-lg" />
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Try Lumi Free Section */}
      <section className="flex flex-col items-center justify-center gap-9 px-0 py-[72px] relative self-stretch w-full flex-[0_0_auto] bg-[#0055ff]">
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
                  alt="Frame"
                  src="/frame.svg"
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

      {/* Lumi Can Be Trusted Section */}
      <section className="flex flex-col items-center gap-9 px-0 py-[72px] relative self-stretch w-full flex-[0_0_auto] bg-white">
        <h2 className="relative w-full mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-[#0055ff] text-5xl text-center tracking-[0.96px] leading-[64px]">
          Lumi can be trusted
        </h2>

        <div className="inline-flex items-center justify-center gap-[19px] relative flex-[0_0_auto]">
          {trustCards.map((card, index) => (
            <Card
              key={index}
              ref={el => trustCardRefs.current[index] = el}
              className={`flex flex-col w-[520px] h-[530px] items-start gap-20 p-9 relative ${card.bgColor} rounded-3xl ${card.borderClass} opacity-0`}
            >
              <CardContent className="flex flex-col items-start gap-8 p-0 flex-1 self-stretch w-full grow">
                <h3
                  className={`relative w-[499px] mt-[-1.00px] mr-[-51.00px] [font-family:'Raleway',Helvetica] font-bold ${card.textColor} text-[32px] tracking-[0] leading-10`}
                >
                  {card.title}
                </h3>

                <p
                  className={`relative self-stretch [font-family:'Raleway',Helvetica] font-normal ${card.descriptionColor || card.textColor} text-base tracking-[0] leading-6`}
                >
                  {card.description}
                </p>

                <div
                  className={`relative flex-1 self-stretch w-full grow ${index === 0 ? "bg-white" : "bg-[#e9e9e9]"} rounded-lg`}
                />
              </CardContent>
            </Card>
          ))}
        </div>
      </section>

      {/* Call to Action Section */}
      <section className="flex flex-col h-[403px] items-start gap-2.5 px-0 py-[72px] relative self-stretch w-full">
        <div className="absolute w-full h-[403px] top-0 left-0">
          <div className="relative h-[403px]">
            <div className="absolute w-full h-[210px] top-[193px] left-0 bg-[#0055ff]" />
            <div className="absolute w-full h-[195px] top-0 left-0 bg-white" />
          </div>
        </div>

        <Card className="mx-auto w-[1280px] flex flex-wrap items-start justify-center gap-[100px_100px] px-[52px] py-14 relative bg-white rounded-3xl shadow-[0px_8px_24px_#0000001a]">
          <CardContent className="p-0 flex flex-wrap items-start justify-center gap-[100px_100px] w-full">
            <h2 className="w-[448.79px] leading-[46px] relative mt-[-1.00px] [font-family:'Raleway',Helvetica] font-bold text-[#000000cc] text-[32px] tracking-[0]">
              Ready for a clearer mind?
              <br />
              Jion waitlist!
            </h2>

            <div className="relative w-[535px] h-[116px]">
              <div className="absolute w-[373px] h-[26px] top-[90px] left-[78px] flex items-center gap-2">
                <Checkbox
                  checked={checked}
                  onCheckedChange={setChecked}
                  className="h-[26px] w-[26px] border-[#0055ff] data-[state=checked]:bg-[#0055ff]"
                />

                <p className="[font-family:'Raleway',Helvetica] font-bold text-[#00000099] text-lg tracking-[0] leading-[18px] whitespace-nowrap">
                  Join the 10,000 users in our newsletter
                </p>
              </div>

              <div className="absolute w-[289px] h-14 top-0 left-0 rounded-[99px]">
                <div className="absolute w-[135px] h-[18px] top-[19px] left-0" />

                <Input
                  className="absolute w-[289px] h-14 top-0 left-0 bg-[#f0f0f0] rounded-[99px] px-[29px] py-[18px] [font-family:'Raleway',Helvetica] font-normal text-black text-lg tracking-[0] leading-[18px]"
                  placeholder="enter your e-mail"
                />
              </div>

              <div className="inline-flex flex-col items-start gap-4 absolute top-0 left-[305px]">
                <Dialog>
                  <DialogTrigger asChild>
                    <Button className="bg-[#0055ff] w-[230px] h-14 px-9 py-2.5 rounded-[99px]">
                      <span className="text-white [font-family:'Inter',Helvetica] font-medium text-xl tracking-[-0.40px]">
                        Join Waitlist
                      </span>
                    </Button>
                  </DialogTrigger>
                  <WaitlistForm />
                </Dialog>
              </div>
            </div>
          </CardContent>
        </Card>
      </section>

      {/* Footer */}
      <footer className="flex flex-col items-start gap-3 px-[120px] py-8 relative self-stretch w-full flex-[0_0_auto] bg-black">
        <div className="relative w-[1194px] h-9">
          <p className="absolute top-[9px] left-0 font-text-single-200-regular font-[number:var(--text-single-200-regular-font-weight)] text-white text-[length:var(--text-single-200-regular-font-size)] text-center tracking-[var(--text-single-200-regular-letter-spacing)] leading-[var(--text-single-200-regular-line-height)] whitespace-nowrap [font-style:var(--text-single-200-regular-font-style)]">
            Copyright © 2025 Lumi.me | All Rights Reserved
          </p>

          <div className="inline-flex items-start gap-4 absolute top-0 left-[948px]">
            {socialLinks.map((social, index) => (
              <div
                key={index}
                className="relative w-9 h-9 bg-[#f2f1f9] rounded-lg"
              >
                <img
                  className="absolute w-auto h-auto top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
                  alt={social.alt}
                  src={social.icon}
                />
              </div>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};