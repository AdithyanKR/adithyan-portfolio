"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useSpring } from "framer-motion";

const TOTAL_FRAMES = 192;

export default function ScrollyCanvas() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const containerRef = useRef<HTMLDivElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loaded, setLoaded] = useState(false);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const rawFrameIndex = useTransform(scrollYProgress, [0, 1], [0, TOTAL_FRAMES - 1]);

  // Adding smooth spring transition to the frame index
  const frameIndex = useSpring(rawFrameIndex, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  // Preload images
  useEffect(() => {
    const loadedImages: HTMLImageElement[] = [];
    let loadCount = 0;

    for (let i = 0; i < TOTAL_FRAMES; i++) {
      const img = new Image();
      const frameString = i.toString().padStart(3, "0");
      img.src = `/sequence/frame_${frameString}_delay-0.041s.webp`;
      img.onload = () => {
        loadCount++;
        if (loadCount === TOTAL_FRAMES) {
          setLoaded(true);
        }
      };
      // Important to also handle errors so it doesn't get stuck indefinitely
      img.onerror = () => {
        loadCount++;
        if (loadCount === TOTAL_FRAMES) {
          setLoaded(true);
        }
      }
      loadedImages.push(img);
    }
    setImages(loadedImages);
  }, []);

  // Update canvas
  useEffect(() => {
    if (!loaded || !canvasRef.current) return;

    const renderFrame = (index: number) => {
      const canvas = canvasRef.current;
      const ctx = canvas?.getContext("2d");
      if (!canvas || !ctx) return;

      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;

      const img = images[Math.round(index)];
      if (!img || !img.width) return;

      const imageAspect = img.width / img.height;
      const canvasAspect = canvas.width / canvas.height;
      let drawWidth = canvas.width;
      let drawHeight = canvas.height;
      let offsetX = 0;
      let offsetY = 0;

      if (imageAspect > canvasAspect) {
        drawWidth = canvas.height * imageAspect;
        offsetX = (canvas.width - drawWidth) / 2;
      } else {
        drawHeight = canvas.width / imageAspect;
        offsetY = (canvas.height - drawHeight) / 2;
      }

      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(img, offsetX, offsetY, drawWidth, drawHeight);
    };

    renderFrame(frameIndex.get());

    const unsubscribe = frameIndex.on("change", (latest) => {
      requestAnimationFrame(() => renderFrame(latest));
    });

    const handleResize = () => renderFrame(frameIndex.get());
    window.addEventListener("resize", handleResize);

    return () => {
      unsubscribe();
      window.removeEventListener("resize", handleResize);
    };
  }, [loaded, frameIndex, images]);

  return (
    <div ref={containerRef} className="relative h-[500vh] bg-[#121212]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {!loaded && (
          <div className="absolute inset-0 flex items-center justify-center text-white/50 text-sm tracking-widest uppercase">
            Loading sequence...
          </div>
        )}
        <canvas
          ref={canvasRef}
          className="block h-full w-full object-cover"
        />
      </div>
    </div>
  );
}
