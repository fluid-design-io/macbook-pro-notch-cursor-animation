import { useState, useEffect } from "react";

const useMousePosition = (ref: React.RefObject<HTMLDivElement>) => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  let animationFrameId: number | null = null;

  // Event listener to update mouse position
  const handleMouseMove = (e: MouseEvent) => {
    if (!animationFrameId && ref.current) {
      animationFrameId = requestAnimationFrame(() => {
        const { left, top } = ref.current!.getBoundingClientRect();
        const x = e.clientX - left;
        const y = e.clientY - top;
        setMousePosition({ x, y });
        animationFrameId = null;
      });
    }
  };

  useEffect(() => {
    // Add event listener when the component mounts
    document.addEventListener("mousemove", handleMouseMove);

    // Clean up the event listener when the component unmounts
    return () => {
      document.removeEventListener("mousemove", handleMouseMove);
      // Make sure to cancel the animation frame when unmounting to avoid any potential errors
      if (animationFrameId) {
        cancelAnimationFrame(animationFrameId);
      }
    };
  }, [ref]);

  return mousePosition;
};

export default useMousePosition;
