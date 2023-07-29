"use client";

import useMousePosition from "@/hooks/useMousePosition";
import InteractiveScreen from "./InteractiveScreen";
import { useEffect, useMemo, useRef, useState } from "react";
import useElementDistance from "@/hooks/useElementDistance";
import { motion, useMotionValue, useSpring } from "framer-motion";
import Notch from "./Notch";
import NotchOutline from "./NotchOutline";
import MacBody from "./MacBody";

function MacBookFrame() {
  const [devMode, setDevMode] = useState(false);
  const [isSafari, setIsSafari] = useState(false);
  const refContainer = useRef<HTMLDivElement>(null);
  const refNotch = useRef<any>(null);
  const { x, y } = useMousePosition(refContainer);
  const distance = useElementDistance(refNotch, refContainer);
  const mouseScale = useSpring(1, {
    stiffness: 100,
    damping: 10,
  });
  // distance between mouse and notch
  const calculateDistanceAroundNotch = useMemo(() => {
    if (distance) {
      const centerX = distance.x + distance.width / 2 - 16;

      const notchWidth = distance.width;
      const notchHeight = distance.height;

      const notchLeft = centerX - notchWidth / 2;
      const notchRight = centerX + notchWidth / 2;
      const notchBottom = distance.y + notchHeight - 10;

      const left = x - notchLeft;
      const right = notchRight - x;
      const bottom = notchBottom - y;

      // make mouse bigger if the mouse is near the notch
      if (
        (x < centerX &&
          left > -12 &&
          bottom > -10 &&
          right < notchWidth + 12) ||
        (x > centerX && left < notchWidth + 12 && bottom > -10 && right > -12)
      ) {
        mouseScale.set(1.5);
      } else {
        mouseScale.set(1);
      }

      return {
        cx: centerX,
        left,
        right,
        bottom,
      };
    }
    return {
      cx: 0,
      left: 0,
      right: 0,
      bottom: 0,
    };
  }, [distance, x, y]);
  useEffect(() => {
    if (typeof window !== "undefined") {
      setIsSafari(/^((?!chrome|android).)*safari/i.test(navigator.userAgent));
    }
  }, []);
  return (
    <div className='w-full h-full flex flex-col justify-center items-stretch max-w-5xl mx-auto min-w-[24rem]'>
      <div className='p-8 md:p-12 lg:p-16 pb-0 md:pb-0 lg:pb-0 w-full !cursor-none'>
        <motion.div
          className='aspect-[1.56/1] bg-black w-full h-full rounded-t-[2.125rem] border-[1rem] border-zinc-800 dark:border-zinc-900 relative !overflow-hidden'
          ref={refContainer}
          onMouseDown={() => {
            mouseScale.set(0.9);
          }}
          onMouseUp={() => {
            mouseScale.set(1);
          }}
        >
          {/* DEBUG PANEL */}
          <motion.div
            className='absolute top-0 left-0 z-50 bg-zinc-800/20 backdrop-blur-3xl rounded-lg mx-2 mt-10 p-6 text-zinc-100/80 text-xs'
            initial={{
              opacity: 0,
            }}
            animate={{
              opacity: devMode ? 1 : 0,
              scale: devMode ? 1 : 0.98,
            }}
          >
            <div className='flex flex-col gap-2'>
              <div className='flex gap-2'>
                <div>x: {x}</div>
                <div>y: {y}</div>
              </div>
              <div className='flex gap-2 flex-col'>
                <div>dx: {distance?.x}</div>
                <div>dy: {distance?.y}</div>
                <div>width: {distance?.width}</div>
                <div>height: {distance?.height}</div>
              </div>
              <div className='flex gap-2 flex-col'>
                <div>left: {calculateDistanceAroundNotch.left}</div>
                <div>right: {calculateDistanceAroundNotch.right}</div>
                <div>bottom: {calculateDistanceAroundNotch.bottom}</div>
              </div>
            </div>
          </motion.div>
          {/* Notch Outline */}
          <NotchOutline
            className='-top-[9px] z-[9] absolute inset-x-0 mx-auto blur-[3px]'
            cx={calculateDistanceAroundNotch.left / (135 / 2)}
            cy={
              calculateDistanceAroundNotch.bottom > -8
                ? 1 - Math.abs(calculateDistanceAroundNotch.bottom) / 33
                : -1
            }
          />
          {/* Toolbar */}
          <div className='absolute top-0 z-[8] left-0 w-full h-[1.875rem] backdrop-blur-2xl transition-colors bg-white/20 dark:bg-zinc-900/20 flex items-center justify-between px-4'>
            <div className='flex gap-2'>
              <div className='w-3 h-3 bg-zinc-50/30 rounded-full'></div>
              <div className='w-3 h-3 bg-zinc-50/30 rounded-full'></div>
              <div className='w-3 h-3 bg-zinc-50/30 rounded-full'></div>
            </div>
            <div className='flex gap-2'>
              <div className='w-3 h-3 bg-zinc-50/30 rounded-full'></div>
              <div className='w-3 h-3 bg-zinc-50/30 rounded-full'></div>
            </div>
          </div>
          {/* Gooey Area */}
          <div
            className='isolate absolute inset-x-0 top-0 z-10'
            style={{
              filter: "url(#gooey)", // Apply the gooey effect SVG filter
            }}
          >
            {/* Notch */}
            <Notch
              className='-top-[10px] z-20 absolute inset-x-0 mx-auto fill-zinc-800 dark:fill-zinc-900'
              ref={refNotch}
            />
            {/* MacOS Mouse */}
            <motion.div
              className='w-3 h-3 bg-zinc-900/30 rounded-full transform-gpu -translate-x-2 -translate-y-2 absolute pointer-events-none z-[15]'
              style={{
                left: x,
                top: y,
                zIndex: 19,
                pointerEvents: "none",
                scale: mouseScale,
              }}
              transition={{
                type: "spring",
                damping: 10,
              }}
            >
              {/* <div className='w-3 h-3 bg-zinc-900/30 rounded-full absolute pointer-events-none mix-blend-difference' /> */}
            </motion.div>
          </div>
          {/* Fake Clock Widget */}
          <motion.img
            className='absolute top-10 right-2 w-28 h-28 z-[8] object-contain'
            src='/images/clock.png'
            initial={{
              scale: 0.95,
              opacity: 0,
            }}
            animate={{
              scale: 1,
              opacity: 1,
            }}
            transition={{
              duration: 2,
              delay: 0.5,
            }}
          />
          {/* Static BG */}
          <motion.div
            className='absolute inset-0 w-full h-full transform-gpu'
            style={{
              background: `url('/images/bg.png')`,
              backgroundSize: "cover",
              backgroundPosition: "center",
            }}
            initial={{
              scale: 1,
              opacity: 0,
            }}
            animate={{
              scale: 1.05,
              opacity: 1,
            }}
            transition={{
              duration: 2,
            }}
          />
          {/* dynamic glow */}
          <div
            className='absolute inset-0 w-full h-full mix-blend-soft-light'
            style={{
              background: `radial-gradient(circle at ${x}px ${y}px, rgba(255, 255, 255, 0.25) 0%, rgba(255, 255, 255, 0) 60%)`,
            }}
          />
          {/* Dev mode button */}
          <motion.button
            className='absolute bottom-4 left-4 z-[7] bg-zinc-900/30 backdrop-blur-3xl rounded-lg p-2 text-zinc-100/70 text-sm font-semibold cursor-none hover:bg-zinc-900/40'
            onClick={() => {
              setDevMode(!devMode);
            }}
          >
            <div className='h-8 w-full absolute -top-4 -left-4' />
            {devMode ? "Exit" : "Enter"} Dev Mode
          </motion.button>
          {/* Author */}
          <div className='absolute bottom-4 right-4 z-[7] text-white/40 text-sm'>
            Credit: Oliver Pan
          </div>
        </motion.div>
        <div className='h-8 w-full bg-zinc-700 rounded-b-[0.75rem]' />
      </div>
      {/* Mac Body */}
      <MacBody className='-mt-1' />
      {/* Filter */}
      <svg className='w-0 h-0'>
        <filter id='gooey'>
          {/* Disable effect on Safari */}
          {!isSafari && (
            <>
              <feGaussianBlur in='SourceGraphic' stdDeviation='3' />
              <feColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 1500 -150' />
            </>
          )}
        </filter>
      </svg>
    </div>
  );
}

export default MacBookFrame;
