import { useEffect, useState } from 'react';

interface ReadingTimeProps {
  content?: string;
}

export default function ReadingTime({ content }: ReadingTimeProps) {
  const [time, setTime] = useState(0);

  useEffect(() => {
    let minutes = 0;
    const contentString = JSON.stringify(content);
    const words = contentString.split(' ').length;
    const wordsPerMinute = 200;
    minutes = Math.ceil(words / wordsPerMinute);
    setTime(minutes);
  }, []);

  return <>{time} min read</>;
}
