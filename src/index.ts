import OpenAI, { write } from './lib/OpenAI';

(async () => {
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
})();
