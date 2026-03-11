export function normalizeText(input) {
  return String(input)
    .replace(/\r/g, "\n")
    .replace(/\n{3,}/g, "\n\n")
    .replace(/[ \t]+/g, " ")
    .replace(/\u00A0/g, " ")
    .trim();
}
