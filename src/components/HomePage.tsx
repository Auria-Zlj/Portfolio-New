import { motion, AnimatePresence, useSpring, useMotionValue } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import './HomePage.css';



const descriptions = [
  "I design complex systems into clear, operable end-to-end workflows.",
  "I translate technical constraints and pipeline complexity into product decisions and UI states.",
  "I integrate AI as a probabilistic subsystem—confidence signals, human override, and safe fallback.",
  "I make uncertainty explicit so teams can act quickly with accountability.",
  "I design for reliability: edge cases, handoffs, traceability, and recovery."
];

const descriptionVariant = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 },
  transition: { duration: 0.5, ease: "easeInOut" as const }
};

const HomePage = () => {
  const [currentDescriptionIndex, setCurrentDescriptionIndex] = useState(0);
  const [isCharacterZoneHovered, setIsCharacterZoneHovered] = useState(false);
  const [showDogBubble, setShowDogBubble] = useState(false);
  const [showCharBubble, setShowCharBubble] = useState(false);

  // Use MotionValues for high-performance mouse tracking without re-renders
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  // Smooth pupil movement
  const pupilSpringConfig = { stiffness: 150, damping: 15, mass: 0.1 };
  const leftPupilX = useSpring(0, pupilSpringConfig);
  const leftPupilY = useSpring(0, pupilSpringConfig);
  const rightPupilX = useSpring(0, pupilSpringConfig);
  const rightPupilY = useSpring(0, pupilSpringConfig);

  const leftEyeRef = useRef<HTMLDivElement>(null);
  const rightEyeRef = useRef<HTMLDivElement>(null);

  // Refs for bubbles to update position directly
  const dogBubbleRef = useRef<HTMLDivElement>(null);
  const charBubbleRef = useRef<HTMLDivElement>(null);

  const handleDogMouseMove = (e: React.MouseEvent) => {
    if (dogBubbleRef.current) {
      dogBubbleRef.current.style.transform = `translate(${e.clientX + 16}px, ${e.clientY - 52}px)`;
    }
  };

  const handleDogMouseEnter = () => setShowDogBubble(true);
  const handleDogMouseLeave = () => setShowDogBubble(false);

  const handleCharacterMouseMove = (e: React.MouseEvent) => {
    if (charBubbleRef.current) {
      charBubbleRef.current.style.transform = `translate(${e.clientX + 16}px, ${e.clientY - 64}px)`;
    }
  };

  const handleCharacterMouseEnter = () => {
    setIsCharacterZoneHovered(true);
    setShowCharBubble(true);
  };

  const handleCharacterMouseLeave = () => {
    setIsCharacterZoneHovered(false);
    setShowCharBubble(false);
  };

  // Eye tracking: move pupils toward mouse using useMotionValue
  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      mouseX.set(e.clientX);
      mouseY.set(e.clientY);

      const updatePupil = (eyeRef: React.RefObject<HTMLDivElement>, pupilX: any, pupilY: any) => {
        if (!eyeRef.current) return;
        const rect = eyeRef.current.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        const dx = e.clientX - centerX;
        const dy = e.clientY - centerY;

        let angle = Math.atan2(dy, dx);
        // Limit angle if necessary, but full rotation usually looks fine for these eyes
        // The original code had limits: (-150 * Math.PI) / 180 to (150 * Math.PI) / 180
        const minAngle = (-150 * Math.PI) / 180;
        const maxAngle = (150 * Math.PI) / 180;
        angle = Math.max(minAngle, Math.min(maxAngle, angle));

        const radius = rect.width * 0.15;

        pupilX.set(Math.cos(angle) * radius);
        pupilY.set(Math.sin(angle) * radius);
      };

      updatePupil(leftEyeRef, leftPupilX, leftPupilY);
      updatePupil(rightEyeRef, rightPupilX, rightPupilY);
    };

    const onLeave = () => {
      leftPupilX.set(0);
      leftPupilY.set(0);
      rightPupilX.set(0);
      rightPupilY.set(0);
    };

    window.addEventListener('mousemove', onMove);
    window.addEventListener('mouseleave', onLeave);

    return () => {
      window.removeEventListener('mousemove', onMove);
      window.removeEventListener('mouseleave', onLeave);
    };
  }, [leftPupilX, leftPupilY, rightPupilX, rightPupilY, mouseX, mouseY]);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentDescriptionIndex((prevIndex) => (prevIndex + 1) % descriptions.length);
    }, 4000); // Change every 4 seconds

    return () => clearInterval(interval);
  }, []);

  const currentVariant = descriptionVariant;

  return (
    <motion.div className={`home-section${isCharacterZoneHovered ? ' character-zone-hovered' : ''}`}>
      <div className="home-main-wrapper">
        <div className="glass-container">
          <motion.div
            className="home-content"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
          >
            <motion.h1
              className="home-title"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
            >
              Auria Zhang
            </motion.h1>
            <div className="home-description-wrapper">
              <AnimatePresence mode="wait">
                <motion.p
                  key={currentDescriptionIndex}
                  className="home-description"
                  initial={currentVariant.initial}
                  animate={currentVariant.animate}
                  exit={currentVariant.exit}
                  transition={currentVariant.transition}
                >
                  {descriptions[currentDescriptionIndex]}
                </motion.p>
              </AnimatePresence>
            </div>
          </motion.div>
        </div>
      </div>
      {/* 透明悬停层：盖在背景里的人物（豆袋椅+电脑）上，hover 显示提示 */}
      <div
        className="home-character-zone"
        aria-hidden
        onMouseEnter={handleCharacterMouseEnter}
        onMouseMove={handleCharacterMouseMove}
        onMouseLeave={handleCharacterMouseLeave}
      >
        <div
          ref={charBubbleRef}
          className="home-hero-bubble"
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            opacity: showCharBubble ? 1 : 0,
            pointerEvents: 'none',
            // Default transform is set in CSS, but we override it inline for motion
            // We need to match the CSS 'translate' offset logic or build it into the calculation
            // logic above. The CSS has `transform: translate(16px, -64px);`. 
            // In handleCharacterMouseMove we use setTransform with clientX/Y.
            // So we can remove the CSS transform or handle it in JS.
          }}
        >
          Designing in progress…
          <br />
          Feel free to play with my dog.
        </div>
      </div>
      <div
        className="home-dog"
        aria-hidden
        onMouseEnter={handleDogMouseEnter}
        onMouseMove={handleDogMouseMove}
        onMouseLeave={handleDogMouseLeave}
      >
        <div
          ref={dogBubbleRef}
          className="home-dog-bubble"
          style={{
            position: 'fixed',
            left: 0,
            top: 0,
            opacity: showDogBubble ? 1 : 0,
            pointerEvents: 'none',
          }}
        >
          This is my dog Pepsi
        </div>
        <img src="/images/dog1.png" alt="" className="home-dog-image" />
        <img src="/images/dog1tail.png" alt="" className="home-dog-tail" />
        <div ref={leftEyeRef} className="home-dog-eye left-eye">
          <motion.div
            className="home-dog-pupil"
            style={{
              x: leftPupilX,
              y: leftPupilY,
              // We need to keep the centering transform from CSS
              translateX: '-50%',
              translateY: '-50%'
            }}
          />
        </div>
        <div ref={rightEyeRef} className="home-dog-eye right-eye">
          <motion.div
            className="home-dog-pupil"
            style={{
              x: rightPupilX,
              y: rightPupilY,
              translateX: '-50%',
              translateY: '-50%'
            }}
          />
        </div>
      </div>
      <motion.div
        className="home-scroll-indicator"
        animate={{ y: [0, 10, 0] }}
        transition={{
          duration: 1.8,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 1
        }}
      >
        <svg width="96" height="96" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
          <circle cx="12" cy="6" r="1.5" fill="currentColor" opacity="0.9" />
          <circle cx="12" cy="10" r="1.5" fill="currentColor" opacity="1" />
          <path d="M8 14L12 18L16 14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </motion.div>
    </motion.div>
  );
};

export default HomePage;
