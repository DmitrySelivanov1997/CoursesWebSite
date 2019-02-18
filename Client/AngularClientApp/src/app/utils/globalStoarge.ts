import { Injectable } from '@angular/core';

@Injectable({
    providedIn: "root"
  })
export class GlobalApp {

    constructor() {}
    
    public localStorageItem(id: string): string {
        return localStorage.getItem(id);
    }
}