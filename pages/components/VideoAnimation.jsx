import { useEffect, useRef } from 'react';



const VideoAnimation = () => {
  const canvasRef = useRef(null);
  const frames = [];

for (let i = 1; i <= 146; i++) {
  const frameNumber = String(i).padStart(3, '0');
  const url = `/video/frames/ezgif-frame-${frameNumber}.jpg`;
  frames.push(url);
}
const frameRate = 10; // Frames per second
const isAnimating = useRef(false);

useEffect(() => {
  const canvas = canvasRef.current;
  const ctx = canvas.getContext('2d');
  let currentFrame = 0;
  let requestId;
  let startTime = 0;
  const frameDuration = 1000 / frameRate; // Duration of each frame in milliseconds

  const renderFrame = (timestamp) => {
    if (!startTime) {
      startTime = timestamp;
    }

    const elapsed = timestamp - startTime;
    const frameIndex = Math.floor(elapsed / frameDuration) % frames.length;
    const frame = new Image();
    frame.src = frames[frameIndex];
    frame.onload = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(frame, 0, 0, canvas.width, canvas.height);

      requestId = requestAnimationFrame(renderFrame);
    };
  };

  const startAnimation = () => {
    if (!isAnimating) {
      isAnimating.current = true;
      startTime = 0;
      renderFrame(performance.now());
    }
  };

  const stopAnimation = () => {
    if (isAnimating.current) {
      isAnimating.current = false;
      cancelAnimationFrame(requestId);
      requestId = undefined;
    }
  };

  const updateCanvasSize = () => {
    const frame = new Image();
    frame.src = frames[0];
    frame.onload = () => {
      canvas.width = frame.width;
      canvas.height = frame.height;
    };
  };

  updateCanvasSize();
  startAnimation();

  // Intersection Observer configuration
  const options = {
    root: null,
    rootMargin: '0px',
    threshold: 0,
  };

  const handleIntersection = (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        startAnimation();
      } else {
        stopAnimation();
      }
    });
  };

  const observer = new IntersectionObserver(handleIntersection, options);
  observer.observe(canvas);

  return () => {
    stopAnimation();
    observer.unobserve(canvas);
  };
}, [frames.length, frameRate]);

return <canvas ref={canvasRef}  className='z-20 relative w-full h-full object-cover'/>;
};



export default VideoAnimation;