"use strict";

import { Configuration, OpenAIApi } from "openai";
import Config from "./config";

class OpenAI {
  private openai: OpenAIApi;
  private config = new Config();

  constructor() {
    let configuration = new Configuration({ apiKey: this.config.apiKey });
    this.openai = new OpenAIApi(configuration);
  }

  async complete(prompt: string) {
    try {
      let completion = await this.openai.createCompletion({
        model: "text-davinci-003",
        prompt: prompt,
        temperature: 0,
        max_tokens: 1024,
      });

      let res = completion.data.choices[0].text.replace(/\n/g, " ");
      res = res.replace(/^\s+/, "");

      return res;
    } catch (error: Error | any) {
      if (error.response) {
        console.error(error.response.status);
        return console.error(error.response.data);
      } else {
        return console.error(error.message);
      }
    }
  }
}

function handlePrompt() {
  if (process.argv.length < 2) {
    console.error("Bad Usage: npm start <prompt>");
    process.exit(1);
  }

  let prompt = "" as string;
  for (let i = 2; i < process.argv.length; i++) {
    prompt += process.argv[i] + " ";
  }

  new OpenAI().complete(prompt).then((res) => {
    console.log(`Prompt: ${prompt}` + "\n" + `Response: ${res}`);
  });
}

handlePrompt();
