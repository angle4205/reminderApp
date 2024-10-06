import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private apiURL = ''; // Cant get shit in LA

  constructor(private http:HttpClient) { }

  request(): Observable<any> {
    return this.http.get(this.apiURL);
  }
}
