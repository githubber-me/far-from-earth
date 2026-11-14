/**
 * Best-effort Latin to Kannada transliteration for names.
 * The result is always shown to the player for confirmation,
 * so imperfect guesses can be fixed by hand before launch.
 */

const VOWELS: [string, string][] = [
  ["aa", "\u0c86"],
  ["ee", "\u0c88"],
  ["ii", "\u0c88"],
  ["oo", "\u0c8a"],
  ["uu", "\u0c8a"],
  ["ai", "\u0c90"],
  ["au", "\u0c94"],
  ["ou", "\u0c94"],
  ["ow", "\u0c94"],
  ["a", "\u0c85"],
  ["i", "\u0c87"],
  ["u", "\u0c89"],
  ["e", "\u0c8e"],
  ["o", "\u0c92"],
];

const VOWEL_SIGNS: [string, string][] = [
  ["aa", "\u0cbe"],
  ["ee", "\u0cc0"],
  ["ii", "\u0cc0"],
  ["oo", "\u0cc2"],
  ["uu", "\u0cc2"],
  ["ai", "\u0cc8"],
  ["au", "\u0ccd"],
  ["ou", "\u0ccc"],
  ["ow", "\u0ccc"],
  ["a", ""],
  ["i", "\u0cbf"],
  ["u", "\u0cc1"],
  ["e", "\u0cc6"],
  ["o", "\u0cc8"],
];

const CONSONANTS: [string, string][] = [
  ["kh", "\u0c16"],
  ["gh", "\u0c18"],
  ["chh", "\u0c9b"],
  ["ch", "\u0c9a"],
  ["jh", "\u0c9d"],
  ["th", "\u0ca5"],
  ["dh", "\u0ca7"],
  ["ph", "\u0cab"],
  ["bh", "\u0cad"],
  ["sh", "\u0cb6"],
  ["ng", "\u0c82"],
  ["k", "\u0c95"],
  ["g", "\u0c97"],
  ["j", "\u0c9c"],
  ["z", "\u0c9c"],
  ["t", "\u0ca4"],
  ["d", "\u0ca6"],
  ["n", "\u0ca8"],
  ["m", "\u0cae"],
  ["p", "\u0caa"],
  ["f", "\u0cab"],
  ["b", "\u0cac"],
  ["y", "\u0caf"],
  ["r", "\u0cb0"],
  ["l", "\u0cb2"],
  ["v", "\u0cb5"],
  ["w", "\u0cb5"],
  ["s", "\u0cb8"],
  ["h", "\u0cb9"],
  ["x", "\u0c95\u0ccd\u0cb8"],
  ["q", "\u0c95"],
  ["c", "\u0c95"],
];

function longestMatch(
  rest: string,
  table: [string, string][],
): [string, string] | null {
  for (const [key, value] of table) {
    if (rest.startsWith(key)) return [key, value];
  }
  return null;
}

export function looksKannada(text: string): boolean {
  return /[\u0c80-\u0cff]/.test(text);
}

export function transliterateToKannada(input: string): string {
  const text = input.trim().toLowerCase();
  if (!text) return "";
  if (looksKannada(text)) return input.trim();

  let out = "";
  let i = 0;
  while (i < text.length) {
    const ch = text[i];
    if (!/[a-z]/.test(ch)) {
      out += ch;
      i += 1;
      continue;
    }

    const cons = longestMatch(text.slice(i), CONSONANTS);
    if (cons) {
      i += cons[0].length;
      const rest = text.slice(i);
      const sign = longestMatch(rest, VOWEL_SIGNS);
      const isEnd = i >= text.length;
      if (sign && !isEnd) {
        out += cons[1] + sign[1];
        i += sign[0].length;
      } else if (sign && sign[0] === "a" && isEnd) {
        // word-final consonant: close the syllable with a virama
        out += cons[1] + "\u0ccd";
      } else if (sign) {
        out += cons[1] + sign[1];
        i += sign[0].length;
      } else if (isEnd) {
        out += cons[1] + "\u0ccd";
      } else {
        out += cons[1];
      }
      continue;
    }

    const vow = longestMatch(text.slice(i), VOWELS);
    if (vow) {
      out += vow[1];
      i += vow[0].length;
      continue;
    }

    out += ch;
    i += 1;
  }
  return out;
}
