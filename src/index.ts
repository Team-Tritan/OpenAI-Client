"use strict";

import { Configuration, OpenAIApi } from "openai";
import { apiKey } from "./config";

let configuration = new Configuration({ apiKey: apiKey });

let openai = new OpenAIApi(configuration);

if (process.argv.length < 2) {
  console.error("Bad Usage: node index.ts <prompt>");
  process.exit(1);
}

let prompt = "";
for (let i = 2; i < process.argv.length; i++) {
  prompt += process.argv[i] + " ";
}

(async () => {
  try {
    const completion = await openai.createCompletion({
      model: "text-davinci-003",
      prompt: prompt,
      temperature: 0,
      max_tokens: 4096,
    });

    console.log("Prompt: " + prompt);
    console.log(completion.data.choices[0].text);
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status);
      return console.error(error.response.data);
    } else {
      return console.error(error.message);
    }
  }
})();
