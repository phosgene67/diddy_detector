import { useState, useRef, useEffect } from "react";
import Tilt from "react-parallax-tilt";
import InputList from "./components/InputList";
import DetectorButton from "./components/DetectorButton";
import { useRandom } from "./hooks/useRandom";
import confetti from "canvas-confetti";

// Assets
import bgDefault from "./assets/bg-default.jpg";
import bgMusic from "./assets/bg-music.mp3";
import logo from "./assets/logo.png"; // <-- your logo here

export default function App() {
  const [names, setNames] = useState<string[]>(Array(5).fill(""));
  const { selectedName, pick } = useRandom();

  const bgAudioRef = useRef<HTMLAudioElement | null>(null);
  const [muted, setMuted] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  // Submit & start music
  const handleSubmit = () => {
    if (!bgAudioRef.current) {
      const audio = new Audio(bgMusic);
      audio.loop = true;
      audio.volume = muted ? 0 : 0.4;
      audio.play().catch(() => {});
      bgAudioRef.current = audio;
    }

    pick(names);
  };

  // Toggle mute
  const toggleMute = () => {
    if (!bgAudioRef.current) return;
    bgAudioRef.current.volume = muted ? 0.4 : 0;
    setMuted(!muted);
  };

  // Confetti and show popup safely
  useEffect(() => {
    if (!selectedName) return;

    confetti({
      particleCount: 200,
      spread: 120,
      origin: { y: 0.5 },
      scalar: window.innerWidth < 768 ? 0.6 : 1,
    });

    const timer = setTimeout(() => setShowPopup(true), 50);
    return () => clearTimeout(timer);
  }, [selectedName]);

  return (
    <div
      className="relative min-h-screen w-screen flex flex-col items-center justify-center px-4 py-4 text-white bg-cover bg-center bg-no-repeat transition-all duration-500"
      style={{ backgroundImage: `url(${bgDefault})` }}
    >
      <div className="absolute inset-0 bg-black/50 -z-10"></div>

      {/* Main Content */}
      <div className="w-full max-w-sm sm:max-w-md md:max-w-lg lg:max-w-xl flex flex-col items-center justify-center gap-6 z-10">
        {/* Logo Header */}
        <div className="flex items-center justify-center gap-2">
          <span className="text-2xl sm:text-3xl">🕵️‍♂️</span>
          <img
            src={logo}
            alt="Diddy Detector Logo"
            className="w-36 sm:w-48 md:w-56 lg:w-64 drop-shadow-lg"
          />
        </div>

        {/* Tilt Card */}
        <Tilt
          tiltMaxAngleX={5}
          tiltMaxAngleY={5}
          perspective={1000}
          scale={1.02}
          transitionSpeed={400}
          glareEnable={false}
          gyroscope={true}
          className="w-full"
        >
          <div className="relative w-full p-6 flex flex-col items-center gap-4
                          rounded-xl bg-white/90 shadow-md border border-gray-200">
            {/* Eye-catching title */}
            <h2 className="text-xl sm:text-2xl md:text-3xl font-extrabold text-center
                           bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
                           drop-shadow-lg">
              Enter your friends name
            </h2>

            <div className="w-full">
              <InputList names={names} setNames={setNames} onSubmit={handleSubmit} />
            </div>

            <div className="flex flex-col items-center gap-2 w-full">
              <DetectorButton onClick={handleSubmit} />
              <button
                onClick={toggleMute}
                className="text-xs sm:text-sm text-gray-600 hover:text-black transition"
              >
                {muted ? "🔇 Muted" : "🔊 Sound On"}
              </button>
            </div>
          </div>
        </Tilt>
      </div>

      {/* Diddy Popup */}
      {showPopup && selectedName && (
        <div className="fixed inset-0 flex items-center justify-center z-50 p-2">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setShowPopup(false)}
          ></div>

          {/* Gradient + glowing popup */}
          <div
            className="relative w-full max-w-sm sm:max-w-md md:max-w-lg rounded-xl p-6 flex flex-col items-center gap-4 animate-pop border-4"
            style={{
              background: "linear-gradient(135deg, #ff6ec4, #7873f5, #42e695)",
              boxShadow: "0 0 30px 10px rgba(255, 255, 255, 0.6)",
              borderColor: "rgba(255,255,255,0.3)",
              borderRadius: "1rem",
            }}
          >
            {/* Main result */}
            <h3
              className="text-2xl sm:text-3xl md:text-4xl font-extrabold text-center
                         bg-clip-text text-transparent bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500
                         drop-shadow-[0_0_2px_black]"
            >
              {selectedName} is the Diddy!
            </h3>

            {/* Diddy massage message with 💦 emoji */}
            <p className="text-lg sm:text-xl md:text-2xl font-semibold text-center text-black/90 drop-shadow-md">
              💦 {selectedName} needs Diddy massage
            </p>

            {/* Buttons */}
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 mt-4 w-full justify-center">
              <button
                className="px-4 py-2 rounded-lg bg-black text-white hover:bg-gray-800 transition w-full sm:w-auto"
                onClick={() => setShowPopup(false)}
              >
                Close
              </button>

              <button
                className="px-4 py-2 rounded-lg bg-blue-600 text-white hover:bg-blue-700 transition w-full sm:w-auto"
                onClick={() => {
                  const shareData = {
                    title: "Diddy Detector",
                    text: `💦 ${selectedName} needs Diddy massage!`,
                    url: window.location.href,
                  };

                  if (navigator.share) {
                    navigator.share(shareData).catch(console.error);
                  } else {
                    navigator.clipboard.writeText(`${shareData.text} ${shareData.url}`);
                    alert("Link copied to clipboard!");
                  }
                }}
              >
                Share
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer */}
      <footer className="mt-6 text-center text-[8px] sm:text-[10px] md:text-xs text-black/80 font-semibold select-none leading-relaxed z-10">
        <div>
          © {new Date().getFullYear()} <span className="font-bold">phosgene67</span>. All rights reserved.
        </div>
        <div className="italic">Disclaimer: This website is for entertainment purposes only.</div>
        <div className="opacity-80">Diddy Detector™ – Not affiliated with any real person or entity.</div>
      </footer>

      {/* Pop animation */}
      <style>
        {`
          @keyframes pop {
            0% { transform: scale(0.8); opacity: 0; }
            50% { transform: scale(1.1); opacity: 1; }
            100% { transform: scale(1); }
          }
          .animate-pop {
            animation: pop 0.5s ease-out;
          }
        `}
      </style>
    </div>
  );
}
