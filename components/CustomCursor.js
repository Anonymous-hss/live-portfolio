import React, { useEffect, useState } from "react";
import { motion } from "framer-motion";

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({
    x: 0,
    y: 0,
  });
  const [cursorVariant, setCursorVariant] = useState("default");
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  useEffect(() => {
    const mouseMove = (e) => {
      setMousePosition({
        x: e.clientX,
        y: e.clientY,
      });
    };

    window.addEventListener("mousemove", mouseMove);

    return () => {
      window.removeEventListener("mousemove", mouseMove);
    };
  }, []);

  useEffect(() => {
    const handleMouseOver = (e) => {
      // Check if hovering over a link, button, or element with data-cursor="hover"
      if (
        e.target.closest("a") ||
        e.target.closest("button") ||
        e.target.closest('[data-cursor="hover"]')
      ) {
        setCursorVariant("hover");
      } else {
        setCursorVariant("default");
      }
    };

    window.addEventListener("mouseover", handleMouseOver);
    window.addEventListener("mouseout", () => setCursorVariant("default"));

    return () => {
      window.removeEventListener("mouseover", handleMouseOver);
      window.removeEventListener("mouseout", () => setCursorVariant("default"));
    };
  }, []);

  const variants = {
    default: {
      x: mousePosition.x - 16,
      y: mousePosition.y - 16,
      backgroundColor: "rgba(255, 255, 255, 0.1)",
      border: "1px solid rgba(255,255,255, 0.5)",
      mixBlendMode: "difference",
      transition: {
        type: "tween",
        ease: "linear",
        duration: 0,
      },
    },
    hover: {
      height: 64,
      width: 64,
      x: mousePosition.x - 32,
      y: mousePosition.y - 32,
      backgroundColor: "rgba(255, 255, 255, 1)",
      mixBlendMode: "difference",
      border: "none",
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 20,
        x: { type: "tween", duration: 0 },
        y: { type: "tween", duration: 0 }
      },
    },
  };

  if (!isMounted) return null;

  return (
    <>
      <style>{`
        body {
          cursor: none;
        }
        a, button, [data-cursor="hover"] {
          cursor: none;
        }
      `}</style>
      <motion.div
        className="fixed top-0 left-0 w-8 h-8 rounded-full pointer-events-none z-[100] flex items-center justify-center"
        variants={variants}
        animate={cursorVariant}
      />
    </>
  );
};

export default CustomCursor;
