"use client";

import useMousePosition from "@/hooks/useMousePosition";
import React, { useRef } from "react";
import { motion } from "framer-motion";

const GooeyEffect = () => {
  const mouseCircleRef = useRef(null);

  const { x, y } = useMousePosition(mouseCircleRef);
  console.log(x, y);
  return (
    <div
      style={{
        filter: "url(#gooey)", // Apply the gooey effect SVG filter
      }}
    >
      <svg className='w-0 h-0'>
        <filter id='gooey'>
          <feGaussianBlur in='SourceGraphic' stdDeviation='10' />
          <feColorMatrix values='1 0 0 0 0 0 1 0 0 0 0 0 1 0 0 0 0 0 20 -10' />
        </filter>
      </svg>
      <div
        className='inset-0 m-auto'
        style={{
          background: "#03a9f4",
          width: "300px",
          height: "100px",
          borderRadius: "8rem",
          zIndex: 2,
        }}
      ></div>
      <motion.div
        ref={mouseCircleRef}
        style={{
          background: "linear-gradient(45deg, #c7eeff, #03a9f4)",
          width: "80px",
          height: "80px",
          borderRadius: "50%",
          zIndex: 1,
          x: x - 40,
          y: y - 40,
        }}
      ></motion.div>
    </div>
  );
};

export default GooeyEffect;
