import React, { useEffect, useRef } from "react";
import "./circle.css";

const colors = [
  "#ffb56b", "#fdaf69", "#f89d63", "#f59761", "#ef865e", "#ec805d",
  "#e36e5c", "#df685c", "#d5585c", "#d1525c", "#c5415d", "#c03b5d",
  "#b22c5e", "#ac265e", "#9c155f", "#950f5f", "#830060", "#7c0060",
  "#680060", "#60005f", "#48005f", "#3d005e"
];

const CircleAnimation = () => {
  const circlesRef = useRef([]);
  const coords = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const circles = circlesRef.current;

    // Assign background colors and initialize position for each circle.
    circles.forEach((circle, index) => {
      circle.style.backgroundColor = colors[index % colors.length];
      circle.x = 0;
      circle.y = 0;
    });

    const handleMouseMove = (e) => {
      coords.current.x = e.clientX;
      coords.current.y = e.clientY;
    };

    const animateCircles = () => {
      let x = coords.current.x;
      let y = coords.current.y;

      circles.forEach((circle, index) => {
        circle.style.left = `${x - 12}px`;
        circle.style.top = `${y - 12}px`;

        // Scale circles gradually smaller
        circle.style.transform = `scale(${(circles.length - index) / circles.length})`;

        const nextCircle = circles[index + 1] || circles[0];
        x += (nextCircle.x - x) * 0.3;
        y += (nextCircle.y - y) * 0.3;

        circle.x = x;
        circle.y = y;
      });

      requestAnimationFrame(animateCircles);
    };

    window.addEventListener("mousemove", handleMouseMove);
    animateCircles();

    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  return (
    <>
      {Array.from({ length: 22 }).map((_, index) => (
        <div
          key={index}
          className="circle"
          ref={(el) => (circlesRef.current[index] = el)}
        ></div>
      ))}
    </>
  );
};

export default CircleAnimation;
