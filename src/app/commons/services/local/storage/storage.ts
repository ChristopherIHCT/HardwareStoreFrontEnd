import { IItems } from "../../api/items/home-api.interface";

export abstract class StorageService implements Storage {
  get length(): number {
    return this.api.length;
  }

  constructor(protected readonly api: Storage) {}

  setItem(key: string, value: unknown): void {
    this.api.setItem(key, JSON.stringify(value));
  }

  getItem<T>(key: string): T | undefined;
  getItem<T>(key: string, otherwise: T): T;
  getItem<T>(key: string, otherwise?: T): T | undefined {
    const data: string | null = this.api.getItem(key);

    if (data !== null) {
      return JSON.parse(data) as T;
    }

    if (otherwise) {
      return otherwise;
    }

    return undefined;
  }

  removeItem(key: string): void {
    this.api.removeItem(key);
  }

  clear(): void {
    this.api.clear();
  }

  key(index: number): string | null {
    return this.api.key(index);
  }

  getItems(): IItems[] {
    const itemsString = sessionStorage.getItem('items');
    return itemsString ? JSON.parse(itemsString) : [];
  }

  setItems(items: IItems[]): void {
    sessionStorage.setItem('items', JSON.stringify(items));
  }
}
