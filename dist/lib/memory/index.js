"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// A really scuffed caching library
class Memory {
    /**
     * Write a message to memory
     * @param message The message to write to memory
     * @example
     * let message = 'Hello, world!';
     * Memory.writeMemory(message);
     * // => void
  
    * Memory.getMemory(); // => 'Hello, world!'
     *
     */
    static writeMemory(message) {
        // "rolling memory" function that will keep the last 30 messages in memory
        this.chats.push(message);
        if (this.chats.length > this.limit) {
            this.chats.pop();
        }
    }
    /**
     * Returns the memory
     * @returns The memory
     * @example
     * Memory.writeMemory('Hello, world!');
     *
     * console.log(Memory.getMemory());
     * // => 'Hello, world!'
     */
    static getMemory() {
        // If there are no chats, return an empty string
        if (this.chats.length === 0) {
            return '';
        }
        // Separate each chat with a newline
        return this.chats.join('\n');
    }
    /**
     * Clears the memory
     * @example
     * Memory.writeMemory('Hello, world!');
     *
     * console.log(Memory.getMemory());
     * // => 'Hello, world!'
     *
     * Memory.clear();
     *
     * Memory.getMemory();
     * // => ''
     */
    static clearMemory() {
        this.chats = [];
    }
}
exports.default = Memory;
// Initialize
Memory.chats = [];
Memory.limit = 30;