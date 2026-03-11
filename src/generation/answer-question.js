import { generateCompletion } from "./openrouter-client.js";

export async function answerQuestion(config, request, question, context) {
  return generateCompletion(config, request, question, context);
}
