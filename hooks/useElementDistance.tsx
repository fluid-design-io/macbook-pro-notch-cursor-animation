import { useState, useEffect, useRef, RefObject, Ref } from "react";

const useElementDistance = (
  targetRef: RefObject<any>,
  parentRef: RefObject<HTMLElement>
) => {
  const [distance, setDistance] = useState<{
    x: number;
    y: number;
    width: number;
    height: number;
  } | null>(null);

  useEffect(() => {
    const updateDistance = () => {
      const targetElement = targetRef.current;
      const parentElement = parentRef.current;

      if (targetElement && parentElement) {
        const targetRect = targetElement.getBoundingClientRect();
        const parentRect = parentElement.getBoundingClientRect();

        const distanceX = targetRect.left - parentRect.left;
        const distanceY = targetRect.top - parentRect.top;

        setDistance({
          x: distanceX,
          y: distanceY,
          width: targetRect.width,
          height: targetRect.height,
        });
      }
    };

    // Initial calculation on mount
    updateDistance();

    // Recalculate on resize
    const handleResize = () => {
      updateDistance();
    };
    window.addEventListener("resize", handleResize);

    // Cleanup event listener on unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [targetRef, parentRef]);

  if (typeof window === "undefined") {
    return null;
  }

  return distance;
};

export default useElementDistance;
