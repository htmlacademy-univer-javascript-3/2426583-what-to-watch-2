import './video-player.css';
import {useEffect, useRef} from 'react';

type VideoPlayerProps = {
  poster: string;
  src: string;
}

const startVideoTimeout = 1000;
export function VideoPlayer({poster, src}: VideoPlayerProps): JSX.Element {
  const videoRef = useRef<HTMLVideoElement | null>(null);

  useEffect(() => {
    setTimeout(() => {
      if (videoRef.current) {
        videoRef.current.play();
      }
    }, startVideoTimeout);
  }, []);

  return (
    <video
      ref={videoRef}
      poster={poster}
      src={src}
      muted
      className="video-player"/>
  );
}
