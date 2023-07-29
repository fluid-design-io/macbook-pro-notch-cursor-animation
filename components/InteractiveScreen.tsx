"use client";
import { motion } from "framer-motion";

function InteractiveScreen({ x, y }: { x: number; y: number }) {
  return (
    <div
      style={{
        filter: "url(#gooey)", // Apply the gooey effect SVG filter
      }}
    ></div>
  );
}

export default InteractiveScreen;
