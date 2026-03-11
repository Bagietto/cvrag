import { parsePdf } from "./parsers/pdf.parser.js";
import { parseDocx } from "./parsers/docx.parser.js";
import { parseMd } from "./parsers/md.parser.js";

export async function extractTextFromFile(buffer, extension) {
  switch (extension) {
    case "pdf":
      return parsePdf(buffer);
    case "docx":
      return parseDocx(buffer);
    case "md":
      return parseMd(buffer);
    default:
      throw new Error(`Unsupported extension for parsing: ${extension}`);
  }
}
