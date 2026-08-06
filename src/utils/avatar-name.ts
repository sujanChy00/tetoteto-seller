export function getAvatarName(word?: string | null) {
  if (!word) return;

  if (word.includes(" ")) {
    return word.split(" ")[0].charAt(0) + word.split(" ").at(-1)?.charAt(0);
  }

  return word.charAt(0);
}
