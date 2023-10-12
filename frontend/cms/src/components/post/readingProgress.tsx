import { useEffect, useState } from 'react';

export default function ReadingProgress() {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const updateProgress = () => {
      const el = document.scrollingElement || document.documentElement;
      const _progress = el.scrollTop / (el.scrollHeight - el.clientHeight);
      if (_progress > 1) {
        setProgress(1);
      } else if (_progress < 0) {
        setProgress(0);
      } else {
        setProgress(_progress);
      }
    };

    document.addEventListener('scroll', updateProgress);
    return () => {
      document.removeEventListener('scroll', updateProgress);
    };
  }, []);

  return (
    <div
      className="progress-bar width-full"
    >
      <div
        className="bar"
        style={{
          transform: `translate3d(-${(1 - progress) * 100}%, 0, 0)`,
        }}
      ></div>
    </div>
  );
}
