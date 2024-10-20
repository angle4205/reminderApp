import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  // They Said So API: https://quotes.rest/
  private apiURL = '/api/qod?category=inspire';
  private apiKey = 'nGrGHdBxeuIGRgmTdzZYsB5M3t9krYqpUqGxKscya038e9b8';

  constructor(private http: HttpClient) { }

  getQuoteOfTheDay(): Observable<any> {
    const headers = new HttpHeaders({
      'X-Theysaidso-Api-Secret': this.apiKey,
      'Content-Type': 'application/json'
    });
    return this.http.get(this.apiURL, { headers });
  }
}
