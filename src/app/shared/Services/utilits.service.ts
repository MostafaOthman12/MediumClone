import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UtilitService {
  range(start: number, end: number) {
    return Array.from({ length: end - start + 1 }, (_, i) => start + i);
  }
}
