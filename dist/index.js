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
const MemoryStore_1 = require("./lib/MemoryStore");
const OpenAI_1 = require("./lib/OpenAI");
(() => __awaiter(void 0, void 0, void 0, function* () {
    const AI = new OpenAI_1.default();
    if (process.argv.length > 2) {
        let prompt = '';
        for (let i = 2; i < process.argv.length; i++) {
            prompt += process.argv[i] + ' ';
        }
        let res = yield AI.complete(prompt);
        console.log(`Prompt: ${prompt}`);
        console.log(`Response: ${res}`);
        process.exit(0);
    }
    const stdin = process.openStdin();
    (0, OpenAI_1.write)();
    stdin.addListener('data', (d) => __awaiter(void 0, void 0, void 0, function* () {
        let input = d.toString().trim();
        MemoryStore_1.default.writeMemory(`User: ${input}`);
        const memories = MemoryStore_1.default.getMemory();
        const prompt = `\nHuman: ${input}`;
        const final = memories + prompt;
        let res = yield AI.complete(final);
        MemoryStore_1.default.writeMemory(`Bot: ${res}`);
        console.log(` => ${res}`);
        (0, OpenAI_1.write)();
    }));
}))();
