import { Configuration, OpenAIApi } from 'openai';
import Config from './config';

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

const write = () => {
  process.stdin.write('  > ');
};

const handlePrompt = async () => {
  const AI = new OpenAI();

  if (process.argv.length > 2) {
    let prompt = '' as string;

    for (let i = 2; i < process.argv.length; i++) {
      prompt += process.argv[i] + ' ';
    }

    let res = await AI.complete(prompt);

    console.log(`Prompt: ${prompt}`);
    console.log(`Response: ${res}`);

    process.exit(0);
  }

  const stdin = process.openStdin();

  write();

  stdin.addListener('data', async d => {
    let input = d.toString().trim();

    let res = await AI.complete(input);

    console.log(` => ${res}`);

    write();
  });
};

handlePrompt();
