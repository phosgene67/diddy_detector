import { useEffect, useState } from "react";
import confetti from "canvas-confetti";
import detectSound from "../assets/detect.mp3";

interface DisplayDiddyProps {
  name?: string; // optional now
}

export default function DisplayDiddy({ name }: DisplayDiddyProps) {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!name) return;

    const timer = setTimeout(() => setShow(true), 50); // async setState

    // Confetti
    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.5 },
      scalar: window.innerWidth < 768 ? 0.6 : 1,
    });

    // Play detection sound
    const audio = new Audio(detectSound);
    audio.volume = 0.7;
    audio.play().catch(() => {});

    return () => {
      clearTimeout(timer);
      setShow(false); // reset for next detection
    };
  }, [name]);

  if (!name) return null;

  return (
    <div
      className={`mt-6 text-center space-y-2 transform transition-all duration-500 ${
        show ? "scale-100 opacity-100 animate-pop" : "scale-90 opacity-0"
      }`}
    >
      <div className="text-2xl sm:text-3xl md:text-4xl font-bold text-yellow-400 drop-shadow-lg">
        🕵️‍♂️ {name} IS THE DIDDY 🔍
      </div>
      <div className="text-lg sm:text-xl md:text-2xl text-pink-300 italic drop-shadow-md">
        😈 "{name} needs diddy massage"
      </div>
    </div>
  );
}
