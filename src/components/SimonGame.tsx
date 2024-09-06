import React, { useState, useEffect } from "react";
import "./game.css";

const colors = ["green", "red", "yellow", "blue"];

const soundMap: { [key: string]: string[] } = {
  green: ["/sounds/blue.mp3", "/sounds/green.mp3", "/sounds/red.mp3", "/sounds/green.mp3"],
  red: ["/sounds/blue.mp3", "/sounds/green.mp3", "/sounds/red.mp3", "/sounds/green.mp3"],
  yellow: ["/sounds/blue.mp3", "/sounds/green.mp3", "/sounds/red.mp3", "/sounds/green.mp3"],
  blue: ["/sounds/blue.mp3", "/sounds/green.mp3", "/sounds/red.mp3", "/sounds/green.mp3"],
};

const getRandomSound = (color: string) => {
  const sounds = soundMap[color];
  const randomIndex = Math.floor(Math.random() * sounds.length);
  return sounds[randomIndex];
};

const SimonGame: React.FC = () => {
  const [sequence, setSequence] = useState<string[]>([]);
  const [playing, setPlaying] = useState<boolean>(false);
  const [playingIdx, setPlayingIdx] = useState<number>(0);
  const [highlightedColor, setHighlightedColor] = useState<string | null>(null);
  const [isGameOver, setIsGameOver] = useState<boolean>(false);

  // เสียงสุ่มสี
  const playSound = (color: string) => {
    const randomSound = getRandomSound(color); 
    const audio = new Audio(randomSound);
    audio.play();
  };

  // เสียงคลิก
  const ClickSound = () => {
    const audio = new Audio(`/sounds/click-21156.mp3`); // ไฟล์เสียงคลิก
    audio.play();
  };

  const addNewColor = () => {
    const color = colors[Math.floor(Math.random() * 4)];
    const newSequence = [...sequence, color];
    setSequence(newSequence);
  };

  const handleNextLevel = () => {
    ClickSound();
    if (!playing && !isGameOver) {
      setPlaying(true);
      addNewColor();
    }
  };

  const playSequence = () => {
    let i = 0;
    const interval = setInterval(() => {
      const color = sequence[i];
      setHighlightedColor(color);
      playSound(color);  

      setTimeout(() => setHighlightedColor(null), 500);

      i++;
      if (i >= sequence.length) {
        clearInterval(interval);
        setPlayingIdx(0);
      }
    }, 1000);
  };

  useEffect(() => {
    if (playing) {
      playSequence();
    }
  }, [sequence]);

  const handleColorClick = (color: string) => {
    if (playing && !isGameOver) {
      setHighlightedColor(color);

      ClickSound(); 
      
      setTimeout(() => {
        setHighlightedColor(null);

        if (sequence[playingIdx] === color) {
          if (playingIdx === sequence.length - 1) {
            setTimeout(() => {
              setPlayingIdx(0);
              addNewColor();
            }, 250);
          } else {
            setPlayingIdx(playingIdx + 1);
          }
        } else {
          setIsGameOver(true);
        }
      }, 250);
    }
  };

  const resetGame = () => {
    ClickSound();
    setSequence([]);
    setPlaying(false);
    setPlayingIdx(0);
    setIsGameOver(false);
  };

  return (
    <div className="container">
      {isGameOver ? (
        <div className="game-over">
          <button className="restart-button" onClick={resetGame}>
            Restart bro!
          </button>
        </div>
      ) : (
        <>
          <div className="button-container">
            {colors.map((color) => (
              <button
                key={color}
                data-color={color}
                className={`game-button ${color} ${highlightedColor === color ? "highlight" : ""}`}
                onClick={() => handleColorClick(color)}
              />
            ))}
          </div>
          <button className="play-button" onClick={handleNextLevel}>
            {sequence.length === 0 ? "Play" : sequence.length}
          </button>
        </>
      )}
    </div>
  );
};

export default SimonGame;
