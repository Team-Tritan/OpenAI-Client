export default class Memory {
  // Initialize
  static chats: string[] = [];
  static limit: number = 30;

  public static writeMemory(message: string) {
    // "rolling memory" function that will keep the last 30 messages in memory
    this.chats.push(message);
    if (this.chats.length > this.limit) {
      this.chats.pop();
    }
  }

  public static getMemory(): string {
    // If there are no chats, return an empty string
    if (this.chats.length === 0) {
      return '';
    }

    // Separate each chat with a newline
    return this.chats.join('\n');
  }

  public static clearMemory() {
    this.chats = [];
  }
}
