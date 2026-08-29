import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  private apiUrl = 'http://colegiosite.runasp.net';

  getApiUrl(): string {
    return this.apiUrl;
  }
}
