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
const openai_1 = require("openai");
const config_1 = require("./config");
let configuration = new openai_1.Configuration({ apiKey: config_1.apiKey });
let openai = new openai_1.OpenAIApi(configuration);
if (process.argv.length < 2) {
    console.error("Bad Usage: npm start <prompt>");
    process.exit(1);
}
let prompt = "";
for (let i = 2; i < process.argv.length; i++) {
    prompt += process.argv[i] + " ";
}
(() => __awaiter(void 0, void 0, void 0, function* () {
    try {
        const completion = yield openai.createCompletion({
            model: "text-davinci-003",
            prompt: prompt,
            temperature: 0,
            max_tokens: 1024,
        });
        console.log("Prompt: " + prompt);
        console.log(completion.data.choices[0].text);
    }
    catch (error) {
        if (error.response) {
            console.error(error.response.status);
            return console.error(error.response.data);
        }
        else {
            return console.error(error.message);
        }
    }
}))();
