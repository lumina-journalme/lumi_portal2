import { Navbar } from "../components/Navbar";
import { useEffect, useRef } from "react";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { MotionPathPlugin } from "gsap/MotionPathPlugin";

gsap.registerPlugin(ScrollTrigger, MotionPathPlugin);

// --- Data & Types ---
const doodles = [
	// Arranged to fill corners and avoid overlap, based on user feedback
	// Top-Left Cluster
	{ id: 1, src: "/Frame 18.svg", x: "5vw", y: "8vh", rotate: -20, size: 160 },
	{ id: 2, src: "/Frame 16.svg", x: "18vw", y: "25vh", rotate: -10, size: 150 },
	{ id: 5, src: "/Frame 13.svg", x: "8vw", y: "30vh", rotate: 25, size: 180 },

	// Top-Right Cluster
	{ id: 3, src: "/Frame 15.svg", x: "75vw", y: "10vh", rotate: 10, size: 210 },
	{ id: 10, src: "/Frame 17.svg", x: "65vw", y: "5vh", rotate: -15, size: 150 },
	{ id: 9, src: "/Frame 12.svg", x: "85vw", y: "30vh", rotate: 20, size: 130 },

	// Bottom-Left Cluster
	{ id: 4, src: "/Frame 14.svg", x: "5vw", y: "60vh", rotate: -15, size: 280 },
	{ id: 8, src: "/Frame 6.svg", x: "25vw", y: "80vh", rotate: 10, size: 140 },

	// Bottom-Right Cluster
	{ id: 6, src: "/Frame 11.svg", x: "80vw", y: "65vh", rotate: 25, size: 190 },
	{ id: 7, src: "/Frame 8.svg", x: "65vw", y: "85vh", rotate: -5, size: 170 },
	{ id: 11, src: "/Frame 4.svg", x: "85vw", y: "80vh", rotate: -20, size: 160 },

	// Additional doodles to fill empty space
	{ id: 13, src: "/Frame 18.svg", x: "35vw", y: "20vh", rotate: 45, size: 130 },
	{ id: 14, src: "/Frame 11.svg", x: "20vw", y: "50vh", rotate: -5, size: 170 },
	{ id: 15, src: "/Frame 16.svg", x: "70vw", y: "45vh", rotate: 30, size: 160 },
	{ id: 16, src: "/Frame 8.svg", x: "45vw", y: "75vh", rotate: -25, size: 150 },
	{ id: 17, src: "/Frame 6.svg", x: "60vw", y: "25vh", rotate: 5, size: 190 },
];

export default () => {
	const containerRef = useRef<HTMLDivElement>(null);
	const stageRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const ctx = gsap.context(() => {
			const doodlesEl = gsap.utils.toArray<HTMLElement>(".doodle-item");
			const screenCenterX = window.innerWidth / 2;
			// Final Y position for the cloud, slightly above center
			const cloudFinalY = window.innerHeight * 0.45;
			const orbitRadius = Math.min(window.innerWidth, window.innerHeight) * 0.25; // Tighter orbit

			// --- INTRO ANIMATIONS ---
			// 1. Staggered "pop-in" animation for doodles
			gsap.from(doodlesEl, {
				duration: 0.8,
				scale: 0,
				opacity: 0,
				ease: "elastic.out(1, 0.5)",
				stagger: 0.1,
			});

			// 2. Continuous "flowing around" animation
			const flowingTweens = doodlesEl.map(doodle => 
				gsap.to(doodle, {
					x: `+=${gsap.utils.random(-20, 20)}`,
					y: `+=${gsap.utils.random(-20, 20)}`,
					rotation: `+=${gsap.utils.random(-15, 15)}`,
					duration: gsap.utils.random(3, 5),
					ease: "sine.inOut",
					repeat: -1,
					yoyo: true,
				})
			);

			const masterTl = gsap.timeline({
				scrollTrigger: {
					trigger: containerRef.current,
					start: "top top",
					end: "bottom bottom",
					scrub: 1,
					onEnter: () => {
						// Stop the initial flowing animation when scroll starts
						flowingTweens.forEach(tween => tween.pause());
					},
					onLeaveBack: () => {
						// Resume the flowing animation if user scrolls back to top
						flowingTweens.forEach(tween => tween.resume());
					}
				}
			});

			// --- ACT 1 to ACT 2: Transition ---
			// Fade out Act 1 text. This happens over the first 10% of the scroll.
			masterTl.to("#act1-text", { opacity: 0, duration: 0.1 }, 0);

			// The animations for Act 2 start at the 10% mark, after Act 1 text is gone.
			const act2StartTime = 0.1;

			// Doodles move to orbit the cloud's final position
			doodlesEl.forEach((doodle, i) => {
				const angle = (i / doodlesEl.length) * 360;
				const doodleOrbitRadius = orbitRadius + gsap.utils.random(-40, 40); // Organic radius
				const targetX = screenCenterX + doodleOrbitRadius * Math.cos(angle * (Math.PI / 180));
				const targetY = cloudFinalY + doodleOrbitRadius * Math.sin(angle * (Math.PI / 180));

				masterTl.to(doodle, {
					x: targetX - doodle.offsetWidth / 2,
					y: targetY - doodle.offsetHeight / 2,
					rotation: 0,
					ease: "power1.inOut"
				}, act2StartTime);
			});

			// Blue background and cloud fade in
			masterTl.to("#act2-bg", { opacity: 1, ease: "power1.in" }, act2StartTime);
			masterTl.fromTo("#cloud-container", 
				{ y: "100vh", opacity: 0 },
				{ y: cloudFinalY - (window.innerHeight / 2) , opacity: 1, ease: "power1.out" }, 
				act2StartTime
			);
			
			const settleTime = act2StartTime + 0.2;
			const lingerTime = settleTime + 0.4; // Time for the user to "linger" on the scene

			// Fade in #GatherThem text
			masterTl.fromTo("#act2-text",
				{ opacity: 0, y: 30 },
				{ opacity: 1, y: 0, ease: "power1.out" },
				settleTime
			);

			// Orbit animation
			masterTl.to("#doodles-container", {
				rotation: 360,
				transformOrigin: `${screenCenterX}px ${cloudFinalY}px`, // Orbit around the cloud's center
				ease: "none",
			}, settleTime);

			// --- FINAL ACT: Scroll group up ---
			// Use a single container for the final move to ensure perfect sync
			masterTl.to("#final-scene-container", {
				y: "-150vh",
				ease: "power1.in"
			}, lingerTime); // Start the exit animation after the linger time

		}, containerRef);

		return () => ctx.revert();
	}, []);

	return (
		<div ref={containerRef} style={{ height: "600vh" }} className="bg-white">
			<Navbar />

			<div ref={stageRef} className="h-screen w-full fixed top-0 left-0 overflow-hidden">
				
				{/* Act 1 Content */}
				<div id="act1-text" className="absolute inset-0 flex items-center justify-center z-10">
					<h1 className="text-8xl font-extrabold text-black">#TooManyThoughts</h1>
				</div>

				{/* Act 2/3 Background */}
				<div id="act2-bg" className="absolute inset-0 bg-[#0055FF] opacity-0 z-0" />

				{/* This container will hold all elements of the final scene to move them together */}
				<div id="final-scene-container" className="absolute inset-0">
					{/* Doodles are behind the cloud */}
					<div id="doodles-container" className="absolute inset-0 z-30 pointer-events-none">
						{doodles.map((doodle) => (
							<div
								key={doodle.id}
								className="doodle-item absolute"
								style={{ top: 0, left: 0, transform: `translate(${doodle.x}, ${doodle.y}) rotate(${doodle.rotate}deg)`, width: doodle.size }}
							>
								<img src={doodle.src} alt="Doodle" className="w-full h-auto" />
							</div>
						))}
					</div>
					
					{/* Cloud is on top */}
					<div id="cloud-container" className="absolute inset-0 flex flex-col items-center justify-center z-40 pointer-events-none">
						<img src="/big cloud.svg" alt="Lumi Cloud" className="w-[40vw] h-auto" />
						<div id="act2-text" className="mt-4">
							<h2 className="text-white text-[96px] font-extrabold text-center">
								#GatherThem
							</h2>
						</div>
					</div>
				</div>

			</div>
		</div>
	);
};
