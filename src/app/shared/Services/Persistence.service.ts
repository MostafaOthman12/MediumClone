import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class PersistenceService {
  set(key: string, value: unknown): void {
    try {
      localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.log('Error setting item', error);
    }
  }
  get(key: string): unknown | null {
    try {
      return JSON.parse(localStorage.getItem(key) || '{}');
    } catch (error) {
      console.log('Error getting item', error);
      return null;
    }
  }
  remove(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.log('Error removing item', error);
    }
  }
}
