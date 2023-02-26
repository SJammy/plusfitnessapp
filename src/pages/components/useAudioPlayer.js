import { useState, useEffect } from 'react';
import start1 from '../../audio/beep-start-1.mp3'
// import start2 from '../../audio/beep-start-1.mp3'
import end1 from '../../audio/beep-start-1.mp3'

function useAudioPlayer(initialTime, timeleft, exerciseType) {
  const [audioStart1] = useState(new Audio(start1));
  // const [audioStart2] = useState(new Audio(start2));
  const [audioEnd1] = useState(new Audio(end1));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Interval Start Play Audio
    if (timeleft > initialTime - 2 && exerciseType === 'exercise') {
      setIsPlaying(true);
      audioStart1.currentTime = 0;
      audioStart1.play();
      // setTimeout(() => {
      //   audioStart2.currentTime = 0;
      //   audioStart2.play();
      // }, 1000);
    } else {
      setIsPlaying(false);
      audioStart1.pause();
      // audioStart2.pause();
    }

    // Interval End Play Audio
    if (timeleft <= 2 && exerciseType === 'exercise') {
      setIsPlaying(true);
      audioEnd1.currentTime = 0;
      audioEnd1.play();
    } else {
      setIsPlaying(false);
      audioEnd1.pause();
    }
  }, [audioEnd1, audioStart1, timeleft, initialTime, exerciseType]);

  return { isPlaying };
}

export default useAudioPlayer;
