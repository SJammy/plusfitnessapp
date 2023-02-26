import React, { useState, useEffect } from 'react';

function AudioPlayer({initialTime, timeleft}) {
  const [audioStart1] = useState(new Audio('src/audio/beep-start-1.mp3'));
  const [audioStart2] = useState(new Audio('src/audio/beep-start-2.mp3'));
  const [audioEnd1] = useState(new Audio('src/audio/beep-end-1.mp3'));
  const [isPlaying, setIsPlaying] = useState(false);

  useEffect(() => {
    // Interval Start Play Audio
    if (timeleft === initialTime) {
      setIsPlaying(true);
      audioStart1.currentTime = 0;
      audioStart1.play();
      setTimeout(() => {
        audioStart2.currentTime = 0;
        audioStart2.play();
      }, 500);
    } else {
      setIsPlaying(false);
      audioStart1.pause();
      audioStart2.pause();
    }

    // Interval End Play Audio
    if (timeleft === 0) {
      setIsPlaying(true);
      audioEnd1.currentTime = 0;
      audioEnd1.play();
    } else {
      setIsPlaying(false);
      audioEnd1.pause();
    }
  }, [audioEnd1, audioStart1, audioStart2, timeleft, initialTime]);

  return (
    <div>
      <p>Time left: {timeleft}</p>
      {isPlaying && <p>Playing audio...</p>}
    </div>
  );
}

export default AudioPlayer;
