"use strict";

import { Configuration, OpenAIApi } from "openai";
import { apiKey } from "./config";

let configuration = new Configuration({ apiKey: apiKey });

let openai = new OpenAIApi(configuration);

if (process.argv.length > 1) {
  console.error("Bad Usage: node index.js <prompt>");
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
    });

    console.log(completion.data.choices[0].text);
  } catch (error: any) {
    if (error.response) {
      console.error(error.response.status);
      console.error(error.response.data);
    } else {
      console.error(error.message);
    }
  }
})();
