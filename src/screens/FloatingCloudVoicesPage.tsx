import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

const cloudIcon = (
  <svg width="90" height="88" viewBox="0 0 194 190" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="93.93" cy="96.16" r="83.58" fill="#6EC7FF" />
    <circle cx="106.48" cy="72.48" r="43.30" transform="rotate(29.9 106.48 72.48)" fill="white" />
    <circle cx="65.64" cy="64.04" r="30.47" transform="rotate(29.9 65.64 64.04)" fill="white" />
    <circle cx="61.75" cy="105.26" r="41.00" transform="rotate(29.9 61.75 105.26)" fill="white" />
    <circle cx="96.03" cy="133.07" r="33.98" transform="rotate(29.9 96.03 133.07)" fill="white" />
    <circle cx="136.61" cy="103.99" r="33.61" transform="rotate(29.9 136.61 103.99)" fill="white" />
    <circle cx="97.51" cy="93.44" r="46.91" transform="rotate(29.9 97.51 93.44)" fill="white" />
    <rect x="76" y="84" width="9" height="18" rx="4.5" fill="black" />
    <rect x="99" y="84" width="9" height="18" rx="4.5" fill="black" />
  </svg>
);

const cloudShapes = [
  // 绿色大云朵
  (
    <svg width="120" height="60" viewBox="0 0 120 60" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="40" cy="40" r="24" fill="#38D430" />
      <circle cx="60" cy="32" r="18" fill="#38D430" />
      <circle cx="80" cy="40" r="16" fill="#38D430" />
    </svg>
  ),
  // 灰蓝色云朵
  (
    <svg width="90" height="44" viewBox="0 0 90 44" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="30" cy="30" r="18" fill="#A6B9D8" />
      <circle cx="50" cy="22" r="13" fill="#A6B9D8" />
      <circle cx="68" cy="30" r="11" fill="#A6B9D8" />
    </svg>
  ),
  // 蓝色云朵
  (
    <svg width="100" height="48" viewBox="0 0 100 48" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="35" cy="35" r="16" fill="#5B8EF6" />
      <circle cx="55" cy="28" r="13" fill="#5B8EF6" />
      <circle cx="75" cy="35" r="11" fill="#5B8EF6" />
    </svg>
  ),
  // 灰蓝色小云朵
  (
    <svg width="80" height="38" viewBox="0 0 80 38" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="28" cy="28" r="12" fill="#A6B9D8" />
      <circle cx="44" cy="22" r="9" fill="#A6B9D8" />
      <circle cx="60" cy="28" r="8" fill="#A6B9D8" />
    </svg>
  ),
  // 蓝色小云朵
  (
    <svg width="60" height="30" viewBox="0 0 60 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <circle cx="20" cy="20" r="8" fill="#7CA9D6" />
      <circle cx="32" cy="15" r="6" fill="#7CA9D6" />
      <circle cx="44" cy="20" r="5" fill="#7CA9D6" />
    </svg>
  ),
];
const cloudTexts = [
  'I finally got up and exercised like I planned!',
  'There is still so much to explore',
  'I was scolded by my boss today',
  'I messed up again',
  '',
];
const cloudPositions = [
  { left: 10, top: 20, w: 120, h: 60 },
  { left: 170, top: 10, w: 90, h: 44 },
  { left: 210, top: 110, w: 100, h: 48 },
  { left: 60, top: 120, w: 80, h: 38 },
  { left: 20, top: 170, w: 60, h: 30 },
];

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

const CardSkeleton = () => (
  <div style={{ width: '100%', height: 260, background: '#ededed', borderRadius: 16 }} />
);

const FloatingCloudVoicesPage = () => {
  return (
    <div className="w-full min-h-screen flex items-center justify-center" style={{ background: '#FAF7F2', padding: '0 0 64px 0' }}>
      <div className="w-full max-w-7xl flex flex-row items-start justify-between gap-8 px-6 md:px-12 lg:px-20 py-20">
        {/* 左侧主卡片区 */}
        <div className="flex-1 min-w-[250px] max-w-[600px] mr-12" style={{marginLeft: 0}}>
          <div className="flex flex-row items-center mb-4">
            <div style={{ width: 64, height: 64 }}>{cloudIcon}</div>
            <span className="ml-3 text-lg font-semibold text-gray-400" style={{fontFamily: 'Montserrat'}}>Features</span>
          </div>
          <div className="text-4xl md:text-5xl font-extrabold text-gray-900 leading-tight mb-8" style={{fontFamily: 'Montserrat'}}>
            Your journey inward unfolds in three gentle steps
          </div>
          <div className="bg-white rounded-2xl shadow-md border border-[#E3E3E3] p-8">
            <div className="text-2xl font-bold text-gray-900 mb-2" style={{fontFamily: 'Montserrat'}}>Just One Tap</div>
            <div className="text-base text-gray-700 mb-6" style={{fontFamily: 'Montserrat'}}>Then allow every <b>unfiltered</b> or incomplete thought to be let out</div>
            <div className="rounded-xl border border-[#E3E3E3] bg-[#FAF7F2] p-6" style={{height: 260, position: 'relative', overflow: 'hidden'}}>
              {cloudShapes.map((cloudSvg, i) => (
                <div key={i} style={{
                  position: 'absolute',
                  left: cloudPositions[i].left,
                  top: cloudPositions[i].top,
                  width: cloudPositions[i].w,
                  height: cloudPositions[i].h,
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  flexDirection: 'column',
                  zIndex: 2,
                  pointerEvents: 'none',
                }}>
                  {cloudSvg}
                  {cloudTexts[i] && (
                    <span style={{
                      position: 'absolute',
                      left: 0,
                      right: 0,
                      top: '50%',
                      transform: 'translateY(-50%)',
                      color: '#222',
                      fontWeight: 500,
                      fontSize: 13,
                      fontFamily: 'Montserrat, sans-serif',
                      textAlign: 'center',
                      whiteSpace: 'pre-line',
                      zIndex: 3,
                      width: '100%',
                      padding: '0 8px',
                    }}>{cloudTexts[i]}</span>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FloatingCloudVoicesPage; 