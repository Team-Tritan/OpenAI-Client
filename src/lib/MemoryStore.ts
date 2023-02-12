export default class MemoryStore {
  static chats: string[] = [];
  static limit: number = 30;

  public static writeMemory(message: string): void {
    this.chats.push(message);

    if (this.chats.length > this.limit) {
      this.chats.pop();
    }
  }

  public static getMemory(): string {
    if (this.chats.length === 0) {
      return '';
    }

    return this.chats.join('\n');
  }

  public static clearMemory(): void {
    this.chats = [];
  }
}
