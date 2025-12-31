import type { Dispatch, SetStateAction } from "react";
import { useRef } from "react";

interface Props {
  names: string[];
  setNames: Dispatch<SetStateAction<string[]>>;
  onSubmit: () => void;
}

export default function InputList({ names, setNames, onSubmit }: Props) {
  const inputRefs = useRef<Array<HTMLInputElement | null>>([]);

  return (
    <div className="flex flex-col gap-3">
      {names.map((name, i) => (
        <input
          key={i}
          ref={(el) => { inputRefs.current[i] = el; }}
          className="p-2 sm:p-3 rounded-xl border border-gray-300 text-black shadow-sm focus:outline-none focus:ring-2 focus:ring-pink-500"
          placeholder={`Nickname ${i + 1}`}
          value={name}
          onChange={(e) => {
            const newNames = [...names];
            newNames[i] = e.target.value;
            setNames(newNames);
          }}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              if (i < names.length - 1) {
                inputRefs.current[i + 1]?.focus();
              } else {
                onSubmit();
              }
            }
          }}
        />
      ))}
    </div>
  );
}
