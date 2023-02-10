import { Configuration, OpenAIApi } from 'openai';
import Config from '../config';

export default class OpenAI {
  private openai: OpenAIApi;
  private config = new Config();

  constructor() {
    let configuration = new Configuration({ apiKey: this.config.apiKey });

    this.openai = new OpenAIApi(configuration);
    this.checkConfig();
  }

  async checkConfig() {
    if (!this.config.apiKey) {
      console.error('No API key provided');
      process.exit(1);
    }

    if (!this.config.model) {
      console.error('No model provided');
      process.exit(1);
    }

    if (!this.config.max_tokens) {
      console.error('No max tokens provided');
      process.exit(1);
    }
  }

  async complete(prompt: string) {
    try {
      let completion = await this.openai.createCompletion({
        model: this.config.model,
        prompt: prompt,
        temperature: this.config.temperature,
        max_tokens: this.config.max_tokens
      });

      if (!completion.data.choices[0].text) {
        console.error('No response from OpenAI');
        process.exit(1);
      }

      let res = completion.data.choices[0].text.replace(/\n/g, ' ');
      res = res.replace(/^\s+/, '');

      return res;
    } catch (error: Error | any) {
      if (error.response) {
        console.error(error.response.status);
        console.error(error.response.data);
      } else {
        return console.error(error.message);
      }

      process.exit(1);
    }
  }
}

export let write = () => {
  process.stdin.write('  > ');
};
