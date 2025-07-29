import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { TypeAnimation } from 'react-type-animation';
import FloatingCloudVoicesPage from "./FloatingCloudVoicesPage";

// Custom NavBar for this page, now supports scroll state
const FinalRedesignNavbar = ({ onJoinWaitlistClick, scrolled }: { onJoinWaitlistClick?: () => void, scrolled: boolean }) => (
  <header
    className={`fixed top-0 left-0 w-full flex items-center px-4 py-4 sm:px-9 z-50 transition-all duration-300 ${scrolled ? 'bg-white shadow text-[#6EC7FF]' : 'bg-[rgba(255,255,255,0.20)] text-white'}`}
    style={{
      boxShadow: scrolled
        ? '0 2px 24px 0 rgba(0,0,0,0.08)'
        : '5px 5px 100px 0px rgba(0,0,0,0.10)',
      transition: 'all 0.3s cubic-bezier(.4,2,.6,1)',
      backdropFilter: !scrolled ? 'blur(0px)' : undefined,
    }}
  >
    <div className="flex items-center justify-between w-full">
      <Link to="/" className="flex items-center gap-2">
        <img
          className="w-24 h-8 sm:w-32 sm:h-10 object-contain"
          alt="Lumi"
          src="https://assets.lumime.ai/primary_icon_1.png"
          style={{ filter: scrolled ? 'none' : 'drop-shadow(0 0 2px #fff)' }}
        />
      </Link>
      <div className="flex items-center gap-4">
        <Link
          to="/blog"
          className={`px-4 py-2 rounded-lg font-semibold text-base transition-all hover:underline ${scrolled ? 'text-[#6EC7FF]' : 'text-white'}`}
        >
          Blog
        </Link>
        {/* 这里可以加按钮，比如 Join Waitlist，如果需要的话 */}
      </div>
    </div>
  </header>
);

// Add keyframes for slow rotation
const rotatingStyle = `
@keyframes slow-rotate {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`;

const rightCards = [
  {
    title: 'Every Restless Night',
    desc: 'Your thoughts are deeply personal. Lumi is built with privacy at its core, and we truly prioritize that your thoughts and data remain secure and private, so everything you share remains yours and yours alone.',
  },
  {
    title: 'Every New Day',
    desc: 'A new day brings new thoughts. Lumi helps you capture and reflect on them, so you can grow and understand yourself better.',
  },
  {
    title: 'Every Small Victory',
    desc: 'Celebrate your progress, no matter how small. Lumi is here to remind you of your journey and achievements.',
  },
];

const FinalRedesignPage: React.FC = () => {
  const location = useLocation();
  const featuresRef = useRef<HTMLDivElement>(null);
  const section3Ref = useRef<HTMLDivElement>(null);
  const [showRightCards, setShowRightCards] = useState(false);
  // Preset eye positions: left-up, center, right-up, left-up, left-down
  const eyePositions = [
    { x: -12, y: -10 }, // left-up
    { x: 0, y: 0 },     // center
    { x: 18, y: -10 },  // right-up
    { x: -12, y: -10 }, // left-up (repeat for more left bias)
    { x: -10, y: 14 },  // left-down
  ];
  const [eyeIndex, setEyeIndex] = useState(0);
  const [eyeOffset, setEyeOffset] = useState(eyePositions[0]);
  const [showIdea, setShowIdea] = useState(false);
  const eyeTimeout = useRef<number | null>(null);

  // Map each eye position to a cloud rotation (degrees)
  const cloudRotations = [-8, 0, 8, -8, -6];

  // Navbar scroll state
  const [navScrolled, setNavScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => {
      // 计算hero高度（假设hero section高度为100vh-72px）
      const heroHeight = window.innerHeight - 72;
      setNavScrolled(window.scrollY > heroHeight - 10);
    };
    window.addEventListener('scroll', onScroll);
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    // Animate eyes to move randomly every 2-4 seconds
    function animateEyes() {
      // Pick a random index different from the current
      let nextIndex = Math.floor(Math.random() * eyePositions.length);
      if (nextIndex === eyeIndex) {
        nextIndex = (nextIndex + 1) % eyePositions.length;
      }
      setEyeIndex(nextIndex);
      setEyeOffset(eyePositions[nextIndex]);
      // 1/5 概率显示 idea 星星
      if (Math.random() < 0.2) {
        setShowIdea(true);
        setTimeout(() => setShowIdea(false), 1200); // 星星显示 1.2 秒
      } else {
        setShowIdea(false);
      }
      eyeTimeout.current = setTimeout(animateEyes, 1800 + Math.random() * 1800);
    }
    animateEyes();
    return () => {
      if (eyeTimeout.current) clearTimeout(eyeTimeout.current);
    };
  }, []);

  useEffect(() => {
    if (location.pathname !== '/final-redesign') return;
    const ref = section3Ref.current;
    if (!ref) return;
    const observer = new window.IntersectionObserver(
      ([entry]) => {
        setShowRightCards(entry.intersectionRatio >= 0.93);
      },
      { threshold: Array.from({length: 101}, (_, i) => i / 100), rootMargin: '0px' }
    );
    observer.observe(ref);
    return () => observer.disconnect();
  }, [location.pathname]);

  const [flipped, setFlipped] = React.useState([false, false, false, false, false]);
  const [activeFlipped, setActiveFlipped] = React.useState(-1);

  const handleFlip = (idx: number) => {
    setFlipped((prev) => {
      if (activeFlipped === idx) {
        setActiveFlipped(-1);
        return prev.map(() => false);
      }
      setActiveFlipped(idx);
      return prev.map((_, i) => i === idx);
    });
  };

  useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.emotional-card')) {
        setFlipped([false, false, false, false, false]);
        setActiveFlipped(-1);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);

  return (
    <div className="relative min-h-screen w-full flex flex-col bg-[#6EC7FF] overflow-x-hidden">
      <style>{rotatingStyle}</style>
      <FinalRedesignNavbar scrolled={navScrolled} />
      <div className="h-[72px] w-full" />
      <section
        id="hero"
        className="relative flex flex-col items-center justify-center h-[calc(100vh-72px)] w-full px-4"
      >
        {/* Animated Circles + Cloud Centerpiece */}
        <div className="relative flex flex-col items-center justify-center w-full" style={{minHeight: 400, minWidth: 320}}>
          {/* Rotating Circles */}
          <div
            className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none select-none"
            style={{ zIndex: 1, width: 'min(90vw, 600px)', height: 'min(90vw, 600px)' }}
          >
            <svg
              width="100%"
              height="100%"
              viewBox="0 0 1259 1259"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
              style={{
                animation: 'slow-rotate 32s linear infinite',
                transformOrigin: '50% 50%'
              }}
            >
              <circle cx="629.5" cy="629.5" r="629.5" fill="white" fillOpacity="0.2" />
              <circle cx="629.5" cy="629.5" r="373.99" fill="white" fillOpacity="0.2" />
            </svg>
          </div>
          {/* Center Cloud */}
          <div
            className="relative flex items-center justify-center"
            style={{ zIndex: 2, width: 'min(80vw, 340px)', height: 'min(70vw, 320px)' }}
          >
            {/* Idea Star ("有idea了") */}
            <div
              style={{
                position: 'absolute',
                top: '8%',
                right: '10%',
                opacity: showIdea ? 1 : 0,
                transition: 'opacity 0.5s',
                pointerEvents: 'none',
                zIndex: 10,
              }}
            >
              <svg width="21" height="21" viewBox="0 0 21 21" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M9.65525 0.857403C9.84049 0.411047 10.2762 0.120117 10.7595 0.120117C11.2428 0.120117 11.6785 0.411047 11.8638 0.857403L13.4579 4.76637C13.9428 5.95531 14.886 6.89517 16.0716 7.38006L19.9806 8.97419C20.4269 9.15943 20.7179 9.59518 20.7179 10.0784C20.7179 10.5617 20.4269 10.9975 19.9806 11.1827L16.0716 12.7769C14.8827 13.2651 13.9428 14.2049 13.4579 15.3939L11.8638 19.3028C11.6785 19.7492 11.2428 20.0401 10.7595 20.0401C10.2762 20.0401 9.84049 19.7492 9.65525 19.3028L8.06112 15.3939C7.5759 14.2061 6.6325 13.2639 5.44407 12.7802L1.53514 11.186C1.08879 11.0008 0.797852 10.5651 0.797852 10.0818C0.797852 9.59849 1.08879 9.16278 1.53514 8.9775L5.44407 7.38337C6.63305 6.89517 7.57291 5.95531 8.05781 4.76637L9.65525 0.857403Z" fill="white"/>
              </svg>
            </div>
            <div
              style={{
                width: '100%',
                height: '100%',
                transition: 'transform 0.7s cubic-bezier(.4,2,.6,1)',
                transform: `rotate(${cloudRotations[eyeIndex]}deg)`
              }}
            >
              <svg
                width="100%"
                height="100%"
                viewBox="0 0 414 414"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <circle cx="227.668" cy="154.967" r="92.5863" transform="rotate(29.9019 227.668 154.967)" fill="white"/>
                <circle cx="140.342" cy="136.914" r="65.1554" transform="rotate(29.9019 140.342 136.914)" fill="white"/>
                <circle cx="132.019" cy="225.054" r="87.6636" transform="rotate(29.9019 132.019 225.054)" fill="white"/>
                <circle cx="205.324" cy="284.52" r="72.6581" transform="rotate(29.9019 205.324 284.52)" fill="white"/>
                <circle cx="292.091" cy="222.358" r="71.8684" transform="rotate(29.9019 292.091 222.358)" fill="white"/>
                {/* Eyes group, animated for thinking effect */}
                <g transform={`translate(${135 + eyeOffset.x}, ${125 + eyeOffset.y}) scale(1.25)`} style={{transition: 'transform 0.5s cubic-bezier(.4,2,.6,1)'}}>
                  <path d="M17.9331 33.3111C17.9331 28.9981 21.4533 25.5017 25.7957 25.5017C30.1381 25.5017 33.6583 28.9981 33.6584 33.3111L33.6584 57.9304C33.6584 62.2435 30.1381 65.7398 25.7957 65.7398C21.4533 65.7398 17.9331 62.2435 17.9331 57.9304L17.9331 33.3111Z" fill="black"/>
                  <path d="M60.9462 33.3111C60.9462 28.9981 64.4664 25.5017 68.8088 25.5017C73.1512 25.5017 76.6714 28.9981 76.6714 33.3111L76.6714 57.9304C76.6714 62.2435 73.1512 65.7398 68.8088 65.7398C64.4664 65.7398 60.9462 62.2435 60.9462 57.9304L60.9462 33.3111Z" fill="black"/>
                </g>
              </svg>
            </div>
          </div>
        </div>
        {/* Headline and description below the cloud */}
        <div className="flex flex-col items-center justify-center mt-8 w-full">
          <TypeAnimation
            sequence={[
              'Welcome Home, to Your Thoughts',
              500,
            ]}
            wrapper="h1"
            speed={50}
            className="w-full font-bold text-white text-xl sm:text-3xl md:text-5xl leading-tight tracking-[-0.5px] text-center whitespace-nowrap"
            style={{ whiteSpace: 'nowrap' }}
            cursor={false}
          />
        </div>
        {/* Clouds at the bottom of the hero section only */}
        <div className="absolute left-0 bottom-0 w-full pointer-events-none select-none" style={{zIndex: 2, bottom: '-200px'}}>
          <svg width="100vw" height="auto" viewBox="0 0 2400 1400" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            {/* Additional clouds (now at the very bottom) */}
            <circle cx="260.41" cy="260.41" r="260.41" transform="matrix(-0.988108 0.153763 0.153763 0.988108 341.057 663.8889)" fill="#F3F0EB"/>
            <circle cx="409.763" cy="409.763" r="409.763" transform="matrix(-0.988108 0.153763 0.153763 0.988108 734.116 995.944)" fill="#F3F0EB"/>
            <ellipse cx="331.939" cy="352.644" rx="331.939" ry="352.644" transform="matrix(-0.989436 0.144969 0.144969 0.989436 1113.99 1021.202)" fill="#F3F0EB"/>
            <circle cx="176.16" cy="176.16" r="176.16" transform="matrix(-0.988108 0.153763 0.153763 0.988108 844.776 936.648)" fill="#F3F0EB"/>
            <circle cx="168.77" cy="168.77" r="168.77" transform="matrix(-0.99434 0.10625 0.10625 0.99434 571.937 917.852)" fill="#F3F0EB"/>
            <circle cx="2160.77" cy="1055.632" r="270.606" transform="rotate(20.3678 2160.77 1055.632)" fill="#FAF7F2"/>
            <circle cx="1729.06" cy="1498.13" r="425.806" transform="rotate(20.3678 1729.06 1498.13)" fill="#FAF7F2"/>
            <ellipse cx="1333.93" cy="1376.76" rx="395.904" ry="366.451" transform="rotate(19.8582 1333.93 1376.76)" fill="#FAF7F2"/>
            <circle cx="1895.04" cy="982.448" r="71.631" transform="rotate(20.3678 1895.04 982.448)" fill="#FAF7F2"/>
            <circle cx="1493.52" cy="1079.306" r="183.057" transform="rotate(20.3678 1493.52 1079.306)" fill="#FAF7F2"/>
            <circle cx="1712.16" cy="1103.45" r="200.965" transform="rotate(20.3678 1712.16 1103.45)" fill="#FAF7F2"/>
            <circle cx="899.718" cy="1485.25" r="324.329" transform="rotate(20.3678 899.718 1485.25)" fill="#FAF7F2"/>
            <circle cx="316.704" cy="1470.03" r="432.279" transform="rotate(20.3678 316.704 1470.03)" fill="#FAF7F2"/>
          </svg>
        </div>
      </section>
      {/* New Features Section */}
      <section ref={featuresRef} className="w-full flex flex-col items-center justify-center py-24" style={{ background: '#FAF7F2', minHeight: '100vh', position: 'relative' }}>
        <div className="flex flex-row items-start w-full max-w-6xl mx-auto mb-12" style={{gap: 32}}>
          {/* Cloud icon and Features label */}
          <div className="flex flex-col items-center" style={{ minWidth: 90 }}>
            <svg
              width="90"
              height="88"
              viewBox="0 0 194 190"
              fill="none"
              xmlns="http://www.w3.org/2000/svg"
            >
              <circle cx="93.9257" cy="96.1552" r="83.581" fill="#6EC7FF"/>
              <circle cx="106.481" cy="72.479" r="43.3031" transform="rotate(29.9019 106.481 72.479)" fill="white"/>
              <circle cx="65.6386" cy="64.0355" r="30.4735" transform="rotate(29.9019 65.6386 64.0355)" fill="white"/>
              <circle cx="61.7459" cy="105.259" r="41.0007" transform="rotate(29.9019 61.7459 105.259)" fill="white"/>
              <circle cx="96.0315" cy="133.071" r="33.9826" transform="rotate(29.9019 96.0315 133.071)" fill="white"/>
              <circle cx="136.612" cy="103.998" r="33.6132" transform="rotate(29.9019 136.612 103.998)" fill="white"/>
              <circle cx="97.5138" cy="93.4449" r="46.9108" transform="rotate(29.9019 97.5138 93.4449)" fill="white"/>
              <rect x="76" y="84" width="9" height="18" rx="4.5" fill="black" />
              <rect x="99" y="84" width="9" height="18" rx="4.5" fill="black" />
            </svg>
            <span className="text-base font-semibold font-montserrat" style={{ color: '#B7B8BA', marginTop: 8, letterSpacing: 0 }}>
              Features
            </span>
          </div>
          {/* Main title right of icon */}
          <div className="flex flex-col justify-center ml-8 flex-1">
            <div className="text-5xl font-bold font-montserrat text-[#232323] leading-tight">
              Your journey inward unfolds<br/>in three gentle steps
            </div>
          </div>
        </div>
        {/* Three cards horizontally */}
        <div className="flex flex-row justify-center items-stretch w-full max-w-6xl mx-auto gap-10 overflow-x-auto md:overflow-x-visible overflow-y-visible" style={{ WebkitOverflowScrolling: 'touch' }}>
          {/* Card 1 */}
          <div className="flex flex-col bg-white rounded-[32px] shadow-lg p-10 w-[400px] min-h-[340px] items-start overflow-y-visible" style={{maxHeight: 'none'}}>
            <div className="text-2xl font-bold font-montserrat text-[#232323] mb-4">The Open Page</div>
            <div className="text-base font-medium font-montserrat text-[#232323] mb-6">Just one tap, then allow every unfiltered or incomplete thought to be captured</div>
            <svg width="100%" height="120" viewBox="0 0 629 328" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full max-w-[180px] mx-auto block">
              <circle cx="511.469" cy="185" r="30.4688" fill="#617FD9"/>
              <circle cx="559.609" cy="180.734" r="34.7344" fill="#617FD9"/>
              <circle cx="606.531" cy="193.531" r="21.9375" fill="#617FD9"/>
              <rect x="510.25" y="181.344" width="97.5" height="34.125" fill="#617FD9"/>
              <circle cx="230.105" cy="137.894" r="17.1053" fill="#617FD9"/>
              <circle cx="257.132" cy="135.5" r="19.5" fill="#617FD9"/>
              <circle cx="283.474" cy="142.684" r="12.3158" fill="#617FD9"/>
              <rect x="229.421" y="135.842" width="54.7368" height="19.1579" fill="#617FD9"/>
              <circle cx="30.4688" cy="62" r="30.4688" fill="#46CC37"/>
              <circle cx="78.6094" cy="57.7344" r="34.7344" fill="#46CC37"/>
              <circle cx="125.531" cy="70.5312" r="21.9375" fill="#46CC37"/>
              <rect x="29.25" y="58.3438" width="97.5" height="34.125" fill="#46CC37"/>
              <path d="M258.146 233C281.893 233 301.554 250.483 304.965 273.279C309.817 269.88 315.725 267.885 322.099 267.885C338.612 267.885 352 281.271 352 297.785C352 313.741 339.503 326.775 323.763 327.639V327.687H190.869V327.65C168.703 326.779 151 308.537 151 286.157C151 263.221 169.593 244.628 192.529 244.628C202.499 244.628 211.647 248.142 218.806 253.998C227.303 241.335 241.751 233 258.146 233Z" fill="#A2B7D7"/>
              <path d="M353.175 0C363.848 0.000165625 372.792 7.39527 375.167 17.3408C376.169 17.1179 377.212 17 378.281 17C386.168 17.0001 392.562 23.3941 392.562 31.2812C392.562 39.1683 386.168 45.5624 378.281 45.5625C376.901 45.5625 375.566 45.3656 374.303 45H356.354C355.315 45.1462 354.254 45.2236 353.175 45H320.958C319.324 45.4358 317.607 45.6699 315.835 45.6699C304.881 45.6699 296 36.7894 296 25.835C296 14.8805 304.88 6 315.835 6C322.554 6.00004 328.492 9.34166 332.08 14.4531C335.353 5.997 343.563 0 353.175 0Z" fill="#A2B7D7"/>
            </svg>
          </div>
          {/* Card 2 */}
          <div className="flex flex-col bg-white rounded-[32px] shadow-lg p-10 w-[400px] min-h-[340px] items-start">
            <div className="text-2xl font-bold font-montserrat text-[#232323] mb-4">The Sounding Board</div>
            <div className="text-base font-medium font-montserrat text-[#232323] mb-6">See your thoughts beyond the surface, with emotional patterns and hidden beliefs</div>
            <svg width="100%" height="100" viewBox="0 0 500 500" className="w-full max-w-[180px] mx-auto block" xmlns="http://www.w3.org/2000/svg">
              <rect width="100%" height="100%" fill="#87E8DE" />
              <rect x="100" y="100" width="300" height="300" rx="30" fill="#C1F0F6" />
              <rect x="150" y="150" width="200" height="200" fill="#D2B48C" stroke="#A0522D" stroke-width="2" />
              <circle cx="160" cy="160" r="4" fill="#C0C0C0" stroke="#999" stroke-width="1" />
              <circle cx="340" cy="160" r="4" fill="#C0C0C0" stroke="#999" stroke-width="1" />
              <circle cx="160" cy="340" r="4" fill="#C0C0C0" stroke="#999" stroke-width="1" />
              <circle cx="340" cy="340" r="4" fill="#C0C0C0" stroke="#999" stroke-width="1" />
              <path d="M220,120 Q240,100 260,120 Q280,140 260,120 Z" fill="#87E8DE" />
              <path d="M320,200 Q340,180 360,200 Q380,220 360,200 Z" fill="#87E8DE" />
              <path d="M220,320 Q240,340 260,320 Q280,300 260,320 Z" fill="#87E8DE" />
              <path d="M320,280 Q340,300 360,280 Q380,260 360,280 Z" fill="#87E8DE" />
              <path d="M100,250 C120,260 180,260 200,250 C220,240 280,240 300,250 C320,260 380,260 400,250" stroke="#87E8DE" stroke-width="3" fill="none" />
            </svg>
          </div>
          {/* Card 3 */}
          <div className="flex flex-col bg-white rounded-[32px] shadow-lg p-10 w-[400px] min-h-[340px] items-start">
            <div className="text-2xl font-bold font-montserrat text-[#232323] mb-4">The Gental Reminder</div>
            <div className="text-base font-medium font-montserrat text-[#232323] mb-6">Remember your past reflections at the right time, just when you need them most.</div>
            <svg width="100%" height="100" viewBox="0 0 500 500" className="w-full max-w-[180px] mx-auto block" xmlns="http://www.w3.org/2000/svg">
              <defs>
                <linearGradient id="bgGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="0%" stop-color="#87e8de" />
                  <stop offset="100%" stop-color="#ffe6b3" />
                </linearGradient>
                <linearGradient id="ringGrad" x1="0" y1="0" x2="1" y2="1">
                  <stop offset="0%" stop-color="#ffe6b3" />
                  <stop offset="100%" stop-color="#f8bbd0" />
                </linearGradient>
                <radialGradient id="ballGrad1" cx="50%" cy="50%" r="50%" fx="50%" fy="30%">
                  <stop offset="0%" stop-color="rgba(255,255,255,0.8)" />
                  <stop offset="100%" stop-color="rgba(255,255,255,0.2)" />
                </radialGradient>
                <radialGradient id="ballGrad2" cx="50%" cy="50%" r="50%" fx="50%" fy="30%">
                  <stop offset="0%" stop-color="rgba(255,255,255,0.8)" />
                  <stop offset="100%" stop-color="rgba(255,255,255,0.2)" />
                </radialGradient>
                <radialGradient id="ballGrad3" cx="50%" cy="50%" r="50%" fx="50%" fy="30%">
                  <stop offset="0%" stop-color="rgba(255,255,255,0.8)" />
                  <stop offset="100%" stop-color="rgba(255,255,255,0.2)" />
                </radialGradient>
              </defs>
              <rect width="100%" height="100%" fill="url(#bgGrad)" />
              <path d="M250,50 C120,50 50,120 50,250 C50,380 120,450 250,450 C380,450 450,380 450,250 C450,120 380,50 250,50 Z" fill="url(#ringGrad)" stroke="#ddd" stroke-width="2" />
              <circle cx="180" cy="180" r="50" fill="url(#ballGrad1)">
                <circle cx="170" cy="170" r="3" fill="#f8bbd0" />
                <circle cx="190" cy="170" r="3" fill="#f8bbd0" />
                <circle cx="170" cy="190" r="3" fill="#f8bbd0" />
                <circle cx="190" cy="190" r="3" fill="#f8bbd0" />
              </circle>
              <circle cx="120" cy="320" r="40" fill="url(#ballGrad2)">
                <circle cx="110" cy="310" r="3" fill="#f8bbd0" />
                <circle cx="130" cy="310" r="3" fill="#f8bbd0" />
                <circle cx="110" cy="330" r="3" fill="#f8bbd0" />
                <circle cx="130" cy="330" r="3" fill="#f8bbd0" />
              </circle>
              <circle cx="300" cy="350" r="45" fill="url(#ballGrad3)">
                <circle cx="290" cy="340" r="3" fill="#f8bbd0" />
                <circle cx="310" cy="340" r="3" fill="#f8bbd0" />
                <circle cx="290" cy="360" r="3" fill="#f8bbd0" />
                <circle cx="310" cy="360" r="3" fill="#f8bbd0" />
              </circle>
              <rect x="420" y="420" width="30" height="25" fill="#fff" stroke="#f8bbd0" stroke-width="2">
                <rect x="425" y="415" width="20" height="5" fill="#f8bbd0" />
                <line x1="422" y1="428" x2="448" y2="428" stroke="#f8bbd0" stroke-width="1" />
                <line x1="435" y1="422" x2="435" y2="435" stroke="#f8bbd0" stroke-width="1" />
              </rect>
              <path d="M435,445 C400,430 350,380 330,350" stroke="#f8bbd0" stroke-width="3" fill="none" />
            </svg>
          </div>
        </div>
        {/* 右侧堆叠卡片区，fixed到屏幕最右侧，只在features section进入视口时显示 */}
        {location.pathname === '/final-redesign' && (
          <div style={{
            position: 'fixed',
            right: -40,
            top: 120,
            zIndex: 20,
            width: 600,
            height: 800,
            pointerEvents: 'none',
            opacity: showRightCards ? 1 : 0,
            transition: 'opacity 0.4s cubic-bezier(.4,2,.6,1)'
          }}>
            {rightCards.slice(1).map((card, idx) => {
              const left = idx === 1 ? -70 : -40 + idx * 20;
              const top = idx === 1 ? -50 : -30 + idx * 15;
              return (
                <div
                  key={card.title}
                  className="bg-white rounded-2xl border border-[#E3E3E3] px-8 py-7 flex flex-col absolute"
                  style={{
                    width: 600,
                    height: 800,
                    left,
                    top,
                    transform: `rotate(${-15 * (idx + 1)}deg)` ,
                    zIndex: 2 - idx,
                    boxShadow: 'none',
                    opacity: 1,
                    pointerEvents: 'auto',
                  }}
                >
                  <div className="text-2xl font-bold text-gray-900 mb-2" style={{fontFamily: 'Montserrat'}}>{card.title}</div>
                  <div className="text-base text-gray-700 mb-6" style={{fontFamily: 'Montserrat'}}>{card.desc}</div>
                  {/* 这里可以放CardSkeleton或其它内容 */}
                </div>
              );
            })}
            {/* 主卡片 */}
            <div
              className="bg-white rounded-2xl border border-[#E3E3E3] px-8 py-7 flex flex-col absolute"
              style={{
                width: 600,
                height: 800,
                left: 0,
                top: 0,
                transform: 'rotate(0deg)',
                zIndex: 10,
                boxShadow: 'none',
                opacity: 1,
                pointerEvents: 'auto',
              }}
            >
              <div className="text-2xl font-bold text-gray-900 mb-2" style={{fontFamily: 'Montserrat'}}>{rightCards[0].title}</div>
              <div className="text-base text-gray-700 mb-6" style={{fontFamily: 'Montserrat'}}>{rightCards[0].desc}</div>
              {/* 这里可以放CardSkeleton或其它内容 */}
            </div>
          </div>
        )}
      </section>
      {/* Section3 区域加ref用于卡片堆叠显示判断 */}
      <div ref={section3Ref} className="min-h-screen" style={{ background: '#FAF7F2' }}>
        <div
          className={showRightCards ? 'animate-fadeInUp' : 'animate-fadeOutDown'}
        >
          <Section3 />
        </div>
      </div>
      <EmotionalTrendsSection />
      {/* 蓝色背景+底部白云的新section */}
      <section className="relative w-full min-h-screen flex flex-col items-center justify-center bg-[#6EC7FF] overflow-hidden">
        {/* 中间的云脸SVG */}
        <div className="flex items-center justify-center w-full" style={{zIndex: 2, minHeight: 420}}>
          <svg width="414" height="406" viewBox="0 0 414 406" fill="none" xmlns="http://www.w3.org/2000/svg" style={{maxWidth: 414, width: '100%', height: 'auto'}}>
            <circle cx="227.668" cy="154.967" r="92.5863" transform="rotate(29.9019 227.668 154.967)" fill="white"/>
            <circle cx="140.342" cy="136.914" r="65.1554" transform="rotate(29.9019 140.342 136.914)" fill="white"/>
            <circle cx="132.019" cy="225.054" r="87.6636" transform="rotate(29.9019 132.019 225.054)" fill="white"/>
            <circle cx="205.324" cy="284.52" r="72.6581" transform="rotate(29.9019 205.324 284.52)" fill="white"/>
            <circle cx="292.091" cy="222.358" r="71.8684" transform="rotate(29.9019 292.091 222.358)" fill="white"/>
            <circle cx="208.496" cy="199.794" r="100.3" transform="rotate(29.9019 208.496 199.794)" fill="white"/>
            <path d="M164.933 181.311C164.933 176.998 168.453 173.501 172.796 173.501C177.138 173.501 180.658 176.998 180.658 181.311L180.658 205.93C180.658 210.243 177.138 213.74 172.796 213.74C168.453 213.74 164.933 210.243 164.933 205.93L164.933 181.311Z" fill="black"/>
            <path d="M207.946 181.311C207.946 176.998 211.466 173.501 215.809 173.501C220.151 173.501 223.671 176.998 223.671 181.311L223.671 205.93C223.671 210.243 220.151 213.74 215.809 213.74C211.466 213.74 207.946 210.243 207.946 205.93L207.946 181.311Z" fill="black"/>
          </svg>
        </div>
        {/* bubbles + 底部白云SVG */}
        <div style={{position: 'absolute', left: 0, bottom: 0, width: '100%', zIndex: 1, pointerEvents: 'none'}}>
          {/* bubbles */}
          <div style={{position: 'absolute', left: 0, bottom: 0, width: '100%', height: '100%', pointerEvents: 'none'}}>
            {/* 左上黄气泡 */}
            <div style={{position: 'absolute', left: '6%', bottom: '32%', width: 140, transform: 'rotate(-7deg)', opacity: 0.98}}>
              {/* 用户SVG1 */}
              {/* ...SVG内容... */}
            </div>
            {/* 左中黑气泡 */}
            <div style={{position: 'absolute', left: '13%', bottom: '22%', width: 170, transform: 'rotate(-4deg)', opacity: 0.96}}>
              {/* 用户SVG2 */}
              {/* ...SVG内容... */}
            </div>
            {/* 左下粉气泡 */}
            <div style={{position: 'absolute', left: '20%', bottom: '10%', width: 150, transform: 'rotate(2deg)', opacity: 0.93}}>
              {/* 用户SVG3 */}
              {/* ...SVG内容... */}
            </div>
            {/* 右下蓝气泡 */}
            <div style={{position: 'absolute', right: '18%', bottom: '12%', width: 140, transform: 'rotate(5deg)', opacity: 0.92}}>
              {/* 用户SVG4 */}
              {/* ...SVG内容... */}
            </div>
            {/* 右中灰气泡 */}
            <div style={{position: 'absolute', right: '10%', bottom: '28%', width: 160, transform: 'rotate(8deg)', opacity: 0.9}}>
              {/* 用户SVG5 */}
              {/* ...SVG内容... */}
            </div>
            {/* 右上蓝气泡 */}
            <div style={{position: 'absolute', right: '4%', bottom: '40%', width: 120, transform: 'rotate(-6deg)', opacity: 0.88}}>
              {/* 用户SVG6 */}
              {/* ...SVG内容... */}
            </div>
          </div>
          {/* 白云SVG */}
          <svg width="1920" height="1078" viewBox="0 0 1920 1078" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
            <circle cx="2147.77" cy="712.632" r="270.606" transform="rotate(20.3678 2147.77 712.632)" fill="white"/>
            <circle cx="1805.82" cy="1256.37" r="270.606" transform="rotate(20.3678 1805.82 1256.37)" fill="white"/>
            <circle cx="1716.06" cy="1155.13" r="425.806" transform="rotate(20.3678 1716.06 1155.13)" fill="white"/>
            <ellipse cx="1320.93" cy="1033.76" rx="395.904" ry="366.451" transform="rotate(19.8582 1320.93 1033.76)" fill="white"/>
            <circle cx="1882.04" cy="639.448" r="71.631" transform="rotate(20.3678 1882.04 639.448)" fill="white"/>
            <circle cx="1480.52" cy="736.306" r="183.057" transform="rotate(20.3678 1480.52 736.306)" fill="white"/>
            <circle cx="1699.16" cy="760.45" r="200.965" transform="rotate(20.3678 1699.16 760.45)" fill="white"/>
            <circle cx="886.718" cy="1142.25" r="324.329" transform="rotate(20.3678 886.718 1142.25)" fill="white"/>
            <circle cx="303.704" cy="1127.03" r="432.279" transform="rotate(20.3678 303.704 1127.03)" fill="white"/>
          </svg>
        </div>
      </section>
      {/* 渐显+上移动画样式 */}
      <style>
      {`
        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(40px) scale(0.98); }
          to   { opacity: 1; transform: translateY(0) scale(1); }
        }
        @keyframes fadeOutDown {
          from { opacity: 1; transform: translateY(0) scale(1); }
          to   { opacity: 0; transform: translateY(40px) scale(0.98); }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.6s cubic-bezier(.4,2,.6,1) both;
        }
        .animate-fadeOutDown {
          animation: fadeOutDown 0.5s cubic-bezier(.4,2,.6,1) both;
        }
      `}
      </style>
    </div>
  );
};

// Section 3: A Whisper from Your Past (The Constellation)
function Section3() {
  return <FloatingCloudVoicesPage />;
}

function EmotionalTrendsSection() {
  const [flipped, setFlipped] = React.useState([false, false, false, false, false]);
  const [hovered, setHovered] = React.useState<number | null>(null);
  const [activeFlipped, setActiveFlipped] = React.useState(-1);
  const handleFlip = (idx: number) => {
    setFlipped((prev) => {
      if (activeFlipped === idx) {
        setActiveFlipped(-1);
        return prev.map(() => false);
      }
      setActiveFlipped(idx);
      return prev.map((_, i) => i === idx);
    });
  };
  React.useEffect(() => {
    const handleClick = (e: MouseEvent) => {
      if (!(e.target as HTMLElement).closest('.emotional-card')) {
        setFlipped([false, false, false, false, false]);
        setActiveFlipped(-1);
      }
    };
    document.addEventListener('mousedown', handleClick);
    return () => document.removeEventListener('mousedown', handleClick);
  }, []);
  const cards = [
    { front: 'Emotional Trend #1', sub: 'Emotional trend one analysis', back: 'Backside 1' },
    { front: 'Emotional Trend #2', sub: 'Emotional trend two analysis', back: 'Backside 2' },
    { front: 'Emotional Trend #3', sub: 'Exploring the impact of nostalgia in marketing', back: 'Backside 3' },
    { front: 'Emotional Trend #4', sub: 'The rise of authenticity in brand communication', back: 'Backside 4' },
    { front: 'Emotional Trend #5', sub: 'The influence of fear and urgency on consumer behavior', back: 'Backside 5' },
  ];
  // 弧形排布参数
  const arc = [
    { x: -320, y: 60, scale: 0.88, z: 1, rotate: -12 },
    { x: -160, y: 20, scale: 0.94, z: 2, rotate: -6 },
    { x: 0,    y: 0,  scale: 1.08, z: 3, rotate: 0 },
    { x: 160,  y: 20, scale: 0.94, z: 2, rotate: 6 },
    { x: 320,  y: 60, scale: 0.88, z: 1, rotate: 12 },
  ];
  return (
    <section className="relative w-full flex flex-col items-center justify-center min-h-screen bg-[#FAF7F2] overflow-hidden">
      {/* 云朵SVG顶部 */}
      <div
        style={{
          position: 'absolute',
          left: 0,
          top: 0,
          width: '100%',
          zIndex: 1,
        }}
      >
        <svg width="1920" height="442" viewBox="0 0 1920 442" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-auto">
          <circle cx="367.52" cy="367.52" r="367.52" transform="matrix(-0.988108 0.153763 0.153763 0.988108 532.299 -671.139)" fill="#6EC7FF"/>
          <circle cx="367.52" cy="367.52" r="367.52" transform="matrix(-0.988108 0.153763 0.153763 0.988108 1463.3 -577)" fill="#6EC7FF"/>
          <circle cx="367.52" cy="367.52" r="367.52" transform="matrix(-0.988108 0.153763 0.153763 0.988108 1985.95 -671.139)" fill="#6EC7FF"/>
          <circle cx="248.617" cy="248.617" r="248.617" transform="matrix(-0.988108 0.153763 0.153763 0.988108 1084.32 -236)" fill="#6EC7FF"/>
          <circle cx="305.056" cy="305.056" r="305.056" transform="matrix(-0.99434 0.10625 0.10625 0.99434 885.659 -402)" fill="#6EC7FF"/>
        </svg>
      </div>
      {/* 内容区flex垂直居中 */}
      <div className="relative z-10 flex flex-col items-center w-full justify-center" style={{marginTop: 120}}>
        <h2 className="text-white text-4xl md:text-5xl font-extrabold mb-10 drop-shadow-lg" style={{letterSpacing: 1, marginTop: 40}}>See Your Innerself</h2>
        {/* 弧形堆叠卡片组 */}
        <div className="relative z-10 w-full flex items-end justify-center" style={{height: 340, marginBottom: 32}}>
          <div className="flex flex-row items-end justify-center w-full px-6" style={{maxWidth: '100vw'}}>
            {cards.map((card, idx) => {
              // 弧形排布：整体下移60px
              const arcY = [140, 92, 60, 92, 140][idx];
              const arcRotate = [-8, -4, 0, 4, 8][idx];
              const arcScale = [0.98, 1.04, 1.12, 1.04, 0.98][idx];
              const isHovered = hovered === idx;
              // 让卡片有5%宽度的重叠
              const overlap = idx === 0 ? 0 : '-5%';
              return (
                <div
                  key={idx}
                  className="transition-all duration-300 cursor-pointer [perspective:1200px] emotional-card"
                  style={{
                    transform: `translateY(${arcY}px) scale(${isHovered ? arcScale * 1.08 : arcScale}) rotate(${arcRotate}deg)` ,
                    boxShadow: isHovered ? '0 8px 32px 0 rgba(80,120,200,0.18)' : '0 2px 12px 0 rgba(80,120,200,0.08)',
                    transition: 'all 0.35s cubic-bezier(.4,2,.6,1)',
                    width: 'min(20vw, 400px)',
                    minWidth: 220,
                    height: 380,
                    zIndex: isHovered ? 10 : 1,
                    marginLeft: overlap,
                  }}
                  onMouseEnter={() => setHovered(idx)}
                  onMouseLeave={() => setHovered(null)}
                  onClick={() => handleFlip(idx)}
                >
                  <div
                    className={`w-full h-full relative [transform-style:preserve-3d] transition-transform duration-500 ${flipped[idx] ? 'rotate-y-180' : ''}`}
                  >
                    {/* 正面 */}
                    <div className="absolute inset-0 flex flex-col items-start justify-start bg-white rounded-2xl border border-[#D6E6F7] shadow-lg px-7 pt-7 pb-5 [backface-visibility:hidden]" style={{fontFamily: 'Montserrat'}}>
                      <div className="text-2xl font-extrabold text-[#232323] mb-2">{card.front}</div>
                      <div className="text-base text-[#232323] mb-4">{card.sub}</div>
                      <div className="w-full h-[120px] bg-[#ededed] rounded-xl mt-auto" />
                    </div>
                    {/* 反面 */}
                    <div className="absolute inset-0 flex flex-col items-center justify-center bg-[#0854e4] rounded-2xl shadow-lg text-2xl font-bold text-white px-7 pt-7 pb-5 [backface-visibility:hidden] rotate-y-180" style={{fontFamily: 'Montserrat'}}>
                      {card.back}
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
      <style>{`
        .rotate-y-180 { transform: rotateY(180deg); }
      `}</style>
    </section>
  );
}

export { FinalRedesignPage }; 