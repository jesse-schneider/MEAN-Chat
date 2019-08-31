import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  getChannels(data) {
    return this.http.post('http://localhost:3000/api/channel', data, httpOptions);
  }

  removeChannel(data) {
    return this.http.post('http://localhost:3000/api/removechannel', data, httpOptions);
  }
}

var httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
