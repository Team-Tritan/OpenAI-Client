export default class Config {
  apiKey = '' as string;
  model = 'text-davinci-003' as string;
  temperature = 0 as number;
  max_tokens = 1024 as number;

  constructor() {
    return this;
  }
}
