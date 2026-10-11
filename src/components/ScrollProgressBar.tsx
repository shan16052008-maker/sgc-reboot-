import { useState, useEffect } from "react";

export default function ScrollProgressBar() {
  const [scrollProgress, setScrollProgress] = useState(0);

  useEffect(() => {
    const handleScroll = () => {
      const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
      if (totalHeight > 0) {
        const progress = Math.min(100, Math.max(0, (window.scrollY / totalHeight) * 100));
        setScrollProgress(progress);
      }
    };

    window.addEventListener("scroll", handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="fixed top-0 left-0 right-0 z-[100] h-[3px] bg-neutral-200/40 pointer-events-none">
      <div
        className="h-full bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 transition-[width] duration-75 ease-out"
        style={{ width: `${scrollProgress}%` }}
      />
    </div>
  );
}
