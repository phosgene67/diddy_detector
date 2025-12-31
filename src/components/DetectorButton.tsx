interface Props {
  onClick: () => void;
}

export default function DetectorButton({ onClick }: Props) {
  return (
    <button
      onClick={onClick}
      className="mt-5 w-full py-2 sm:py-3 bg-pink-500 text-white font-bold rounded-xl shadow-md transition-transform active:scale-95"
    >
      🔍 Detect Diddy
    </button>
  );
}
