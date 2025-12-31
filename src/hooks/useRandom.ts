import { useState } from "react";

export function useRandom() {
  const [selectedName, setSelectedName] = useState<string | null>(null);

  const pick = (names: string[]) => {
    if (!names.length) return;

    // Calculate score for each name
    const scoredNames = names.map((name) => {
      let score = Math.random() * 50; // Base randomness

      // Bonus points for vowels
      const vowels = name.match(/[aeiouAEIOU]/g)?.length || 0;
      score += vowels * 5;

      // Bonus for repeated letters
      const repeatBonus = Object.values(
        name.split("").reduce((acc: Record<string, number>, char) => {
          acc[char] = (acc[char] || 0) + 1;
          return acc;
        }, {})
      )
        .filter((count) => count > 1)
        .reduce((a, b) => a + b, 0);
      score += repeatBonus * 3;

      // Short names get slight bonus
      if (name.length <= 4) score += 2;

      return { name, score };
    });

    // Sort by score descending
    scoredNames.sort((a, b) => b.score - a.score);

    // Pick top 1-3 names and randomly select among them for fun
    const top = scoredNames.slice(0, Math.min(3, scoredNames.length));
    const winner = top[Math.floor(Math.random() * top.length)];

    setSelectedName(winner.name);
  };

  return { selectedName, pick };
}
