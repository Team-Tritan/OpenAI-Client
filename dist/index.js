'use strict';
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const openai_1 = require("openai");
const config_1 = require("./config");
class OpenAI {
    constructor() {
        this.config = new config_1.default();
        let configuration = new openai_1.Configuration({ apiKey: this.config.apiKey });
        this.openai = new openai_1.OpenAIApi(configuration);
    }
    complete(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let completion = yield this.openai.createCompletion({
                    model: 'text-davinci-003',
                    prompt: prompt,
                    temperature: 0,
                    max_tokens: 1024
                });
                let res = completion.data.choices[0].text.replace(/\n/g, ' ');
                res = res.replace(/^\s+/, '');
                return res;
            }
            catch (error) {
                if (error.response) {
                    console.error(error.response.status);
                    console.error(error.response.data);
                }
                else {
                    return console.error(error.message);
                }
                process.exit(1);
            }
        });
    }
}
const write = () => {
    process.stdin.write(' > ');
};
const handlePrompt = () => __awaiter(void 0, void 0, void 0, function* () {
    // Init OpenAI
    const AI = new OpenAI();
    if (process.argv.length > 2) {
        let prompt = '';
        for (let i = 2; i < process.argv.length; i++) {
            prompt += process.argv[i] + ' ';
        }
        let res = yield AI.complete(prompt);
        console.log(`Prompt: ${prompt}` + '\n' + `Response: ${res}`);
        process.exit(0);
    }
    // Active CLI
    const stdin = process.openStdin();
    write();
    stdin.addListener('data', (d) => __awaiter(void 0, void 0, void 0, function* () {
        let input = d.toString().trim();
        let res = yield AI.complete(input);
        console.log(` => Response: ${res}`);
        write();
    }));
});
handlePrompt();
