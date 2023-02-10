import Memory from './lib/memory';
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
    Memory.writeMemory(`User: ${input}`);

    let msg = '';

    const memories = Memory.getMemory();

    if (memories !== '') {
      msg = memories;
    }

    const prompt = `\nHuman: ${input}`;

    const final = msg + prompt;

    let res = await AI.complete(final);
    Memory.writeMemory(`Bot: ${res}`);

    console.log(` => ${res}`);

    console.log(Memory.getMemory());
    write();
  });
})();
