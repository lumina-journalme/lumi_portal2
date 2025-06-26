import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { EffectCoverflow, Mousewheel } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/effect-coverflow';

// 英文卡片数据，去掉图片
const cards = [
  {
    id: 1,
    story: 'I failed my interview again. I feel so lost, but I know I have to keep going.',
  },
  {
    id: 2,
    story: 'Sometimes I wish I could just disappear for a while and come back stronger.',
  },
  {
    id: 3,
    story: 'I miss my family. Living alone in a new city is harder than I thought.',
  },
  {
    id: 4,
    story: 'Today I finally stood up for myself. My hands were shaking, but I did it.',
  },
  {
    id: 5,
    story: 'I laughed so hard with my friends tonight. For a moment, I forgot all my worries.',
  },
  {
    id: 6,
    story: 'I feel like everyone else is moving forward, and I am stuck in place.',
  },
  {
    id: 7,
    story: 'I am learning to forgive myself for my mistakes. It is not easy, but I am trying.',
  },
];

// 云朵SVG组件
const CloudSVG = ({ style = {}, className = '' }) => (
  <svg width="180" height="60" viewBox="0 0 180 60" fill="none" xmlns="http://www.w3.org/2000/svg" style={style} className={className}>
    <ellipse cx="50" cy="40" rx="40" ry="18" fill="#fff" fillOpacity="0.18" />
    <ellipse cx="110" cy="30" rx="30" ry="14" fill="#fff" fillOpacity="0.13" />
    <ellipse cx="150" cy="45" rx="18" ry="9" fill="#fff" fillOpacity="0.10" />
  </svg>
);

// 手绘风SVG边框组件
const HandDrawnCard = ({ children }: { children: React.ReactNode }) => (
  <div style={{ position: 'relative', width: '100%', height: '100%' }}>
    <svg
      viewBox="0 0 800 900"
      width="100%"
      height="100%"
      style={{ position: 'absolute', top: 0, left: 0, zIndex: 1, pointerEvents: 'none' }}
    >
      <path
        d="M40,60 Q20,400 60,850 Q400,890 760,850 Q780,400 760,60 Q400,20 40,60 Z"
        fill="#fff"
        stroke="#ffe6b3"
        strokeWidth="12"
        strokeLinejoin="round"
        strokeLinecap="round"
        style={{ filter: 'drop-shadow(0 4px 24px #ffe6b366)' }}
      />
      <path
        d="M60,80 Q40,400 80,820 Q400,860 740,820 Q760,400 740,80 Q400,40 60,80 Z"
        fill="none"
        stroke="#f7c873"
        strokeWidth="4"
        strokeDasharray="32 18 12 24"
        strokeLinejoin="round"
        strokeLinecap="round"
      />
    </svg>
    <div style={{ position: 'relative', zIndex: 2, width: '100%', height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'flex-end', padding: '64px 48px 48px 48px' }}>
      {children}
    </div>
  </div>
);

const FloatingCloudVoicesPage = () => {
  return (
    <div
      className="w-full min-h-screen relative flex flex-col items-center justify-start"
      style={{
        background: 'linear-gradient(120deg, #fffbe6 0%, #ffe6b3 30%, #aee2ff 100%)',
        zIndex: 0,
        overflow: 'hidden',
      }}
    >
      {/* 云朵点缀 */}
      <CloudSVG style={{ position: 'absolute', top: '8%', left: '10%', zIndex: 1 }} />
      <CloudSVG style={{ position: 'absolute', top: '18%', left: '60%', zIndex: 1, transform: 'scale(0.7)' }} />
      <CloudSVG style={{ position: 'absolute', top: '60%', left: '20%', zIndex: 1, transform: 'scale(0.5)' }} />
      <CloudSVG style={{ position: 'absolute', top: '75%', left: '70%', zIndex: 1, transform: 'scale(0.8)' }} />
      {/* 顶部引导文案 */}
      <div className="w-full flex flex-col items-start mt-12 mb-6 z-10 px-8">
        <h1 className="font-bold text-[#e6b800] text-4xl md:text-5xl tracking-wide mb-2" style={{fontFamily: 'cursive'}}>人生长廊</h1>
        <div className="text-[#e6b800] text-lg md:text-xl font-medium drop-shadow-lg">每个人都有自己的故事，滑动看看不同的人生片段</div>
      </div>
      {/* 横向全屏重叠滑动卡片区 */}
      <div className="w-full flex-1 flex items-center z-10 px-0 pb-12" style={{overflow: 'visible'}}>
        <Swiper
          effect="coverflow"
          grabCursor={true}
          centeredSlides={true}
          slidesPerView={1.15}
          spaceBetween={-120}
          modules={[EffectCoverflow, Mousewheel]}
          mousewheel={{ forceToAxis: true }}
          coverflowEffect={{
            rotate: 0,
            stretch: 0,
            depth: 220,
            modifier: 1.2,
            slideShadows: true,
          }}
          style={{width: '100vw', height: '92vh', paddingBottom: 40}}
        >
          {cards.map((card, idx) => {
            // 错落排布参数
            const offsets = [
              { rotate: -6, translateY: -32 },
              { rotate: 4, translateY: 24 },
              { rotate: -2, translateY: -16 },
              { rotate: 7, translateY: 36 },
              { rotate: -4, translateY: 18 },
              { rotate: 3, translateY: -28 },
              { rotate: 5, translateY: 12 },
            ];
            const { rotate, translateY } = offsets[idx % offsets.length];
            return (
              <SwiperSlide key={card.id}>
                <div
                  className="relative min-w-[80vw] max-w-[88vw] h-[88vh] mx-auto flex items-center justify-center"
                  style={{
                    transform: `rotate(${rotate}deg) translateY(${translateY}px)`,
                    transition: 'transform 0.5s cubic-bezier(.4,2,.6,1)',
                  }}
                >
                  <HandDrawnCard>
                    {/* 只保留英文故事文本 */}
                    <div className="flex flex-col items-center justify-center w-full h-full">
                      <div className="text-lg md:text-2xl text-[#e6b800] text-opacity-90 text-center leading-relaxed px-2 mb-2 font-serif" style={{letterSpacing: 1}}>
                        {card.story}
                      </div>
                    </div>
                  </HandDrawnCard>
                </div>
              </SwiperSlide>
            );
          })}
        </Swiper>
      </div>
    </div>
  );
};

export default FloatingCloudVoicesPage; 