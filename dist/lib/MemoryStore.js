"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class MemoryStore {
    static writeMemory(message) {
        this.chats.push(message);
        if (this.chats.length > this.limit) {
            this.chats.pop();
        }
    }
    static getMemory() {
        if (this.chats.length === 0) {
            return '';
        }
        return this.chats.join('\n');
    }
    static clearMemory() {
        this.chats = [];
    }
}
exports.default = MemoryStore;
MemoryStore.chats = [];
MemoryStore.limit = 30;
// ok so the issue is that we exit after each command ran so technically memory is not percistent. We can store in json, or we can somehow make the shell interactive?
