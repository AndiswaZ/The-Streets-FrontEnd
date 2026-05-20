import { Injectable } from '@angular/core';

export type DevRole = 'User' | 'SuperAdmin';

export interface DevUser {
  id: string;
  name?: string;
  role?: DevRole;
}

const KEY = 'dev-user';

@Injectable({ providedIn: 'root' })
export class DevUserService {
  private current: DevUser | null = null;

  // SSR-safe check: don't ever touch window/localStorage unless they truly exist.
  private readonly hasStorage =
    typeof globalThis !== 'undefined' &&
    typeof (globalThis as any).localStorage !== 'undefined';

  constructor() {
    if (this.hasStorage) {
      try {
        const raw = (globalThis as any).localStorage.getItem(KEY);
        if (raw) {
          this.current = JSON.parse(raw) as DevUser;
        }
      } catch {
        // ignore storage parsing errors
      }
    }
  }

  set(user: DevUser) {
    this.current = user;
    if (this.hasStorage) {
      try {
        (globalThis as any).localStorage.setItem(KEY, JSON.stringify(user));
      } catch {
        // ignore storage write errors
      }
    }
  }

  get(): DevUser | null {
    return this.current;
  }

  clear() {
    this.current = null;
    if (this.hasStorage) {
      try {
        (globalThis as any).localStorage.removeItem(KEY);
      } catch {
        // ignore
      }
    }
  }
}
