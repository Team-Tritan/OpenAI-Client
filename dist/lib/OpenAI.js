"use strict";
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
exports.write = void 0;
const openai_1 = require("openai");
const config_1 = require("../config");
class OpenAI {
    constructor() {
        this.config = new config_1.default();
        let configuration = new openai_1.Configuration({ apiKey: this.config.apiKey });
        this.openai = new openai_1.OpenAIApi(configuration);
        this.checkConfig();
    }
    checkConfig() {
        return __awaiter(this, void 0, void 0, function* () {
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
        });
    }
    complete(prompt) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                let completion = yield this.openai.createCompletion({
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
exports.default = OpenAI;
let write = () => {
    process.stdin.write('  > ');
};
exports.write = write;
