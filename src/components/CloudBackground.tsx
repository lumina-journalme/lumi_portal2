import React from 'react';

export const CloudBackground = () => {
  return (
    <div
      style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        overflow: 'visible',
        zIndex: 0,
      }}
    >
      <svg 
        width="100%" 
        height="100%" 
        viewBox="0 0 1920 1078" 
        preserveAspectRatio="xMidYMid slice"
        fill="none" 
        xmlns="http://www.w3.org/2000/svg"
        style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            transform: 'translate(-50%, -50%)',
            minWidth: '100%',
            minHeight: '100%',
            width: 'auto',
            height: 'auto',
            overflow: 'visible'
        }}
      >
        {/* Static Bottom Clouds */}
        <g>
            <circle cx="260.41" cy="260.41" r="260.41" transform="matrix(-0.988108 0.153763 0.153763 0.988108 239.058 489.889)" fill="#F3F0EB"/>
            <circle cx="260.41" cy="260.41" r="260.41" transform="matrix(-0.988108 0.153763 0.153763 0.988108 403.406 1070.69)" fill="#F3F0EB"/>
            <circle cx="409.763" cy="409.763" r="409.763" transform="matrix(-0.988108 0.153763 0.153763 0.988108 632.117 821.943)" fill="#F3F0EB"/>
            <ellipse cx="331.939" cy="352.644" rx="331.939" ry="352.644" transform="matrix(-0.989436 0.144969 0.144969 0.989436 1011.99 847.202)" fill="#F3F0EB"/>
            <circle cx="176.16" cy="176.16" r="176.16" transform="matrix(-0.988108 0.153763 0.153763 0.988108 742.776 762.647)" fill="#F3F0EB"/>
            <circle cx="168.77" cy="168.77" r="168.77" transform="matrix(-0.99434 0.10625 0.10625 0.99434 469.938 743.852)" fill="#F3F0EB"/>
            <circle cx="2058.77" cy="903.632" r="270.606" transform="rotate(20.3678 2058.77 903.632)" fill="#FAF7F2"/>
            <circle cx="1627.06" cy="1346.13" r="425.806" transform="rotate(20.3678 1627.06 1346.13)" fill="#FAF7F2"/>
            <ellipse cx="1231.93" cy="1224.76" rx="395.904" ry="366.451" transform="rotate(19.8582 1231.93 1224.76)" fill="#FAF7F2"/>
            <circle cx="1793.04" cy="830.448" r="71.631" transform="rotate(20.3678 1793.04 830.448)" fill="#FAF7F2"/>
            <circle cx="1391.52" cy="927.306" r="183.057" transform="rotate(20.3678 1391.52 927.306)" fill="#FAF7F2"/>
            <circle cx="1610.16" cy="951.45" r="200.965" transform="rotate(20.3678 1610.16 951.45)" fill="#FAF7F2"/>
            <circle cx="797.718" cy="1333.25" r="324.329" transform="rotate(20.3678 797.718 1333.25)" fill="#FAF7F2"/>
            <circle cx="214.704" cy="1318.03" r="432.279" transform="rotate(20.3678 214.704 1318.03)" fill="#FAF7F2"/>
        </g>
      </svg>
    </div>
  );
}; 