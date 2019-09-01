import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders, HttpParams } from "@angular/common/http";

@Injectable({
  providedIn: 'root'
})
export class GroupService {

  constructor(private http: HttpClient) { }

  createGroup(data) {
    return this.http.post('http://localhost:3000/api/addgroup', data, httpOptions);
  }

  removeGroup(data) {
    return this.http.post('http://localhost:3000/api/removegroup', data, httpOptions);
  }

  createChannel(data) {
    return this.http.post('http://localhost:3000/api/addchannel', data, httpOptions);
  }

  getChannels(data) {
    return this.http.post('http://localhost:3000/api/channel', data, httpOptions);
  }

  removeChannel(data) {
    return this.http.post('http://localhost:3000/api/removechannel', data, httpOptions);
  }

  addUtoChannel(data) {
    return this.http.post('http://localhost:3000/api/adduserchannel', data, httpOptions);
  }

  removeUFromChannel(data) {
    return this.http.post('http://localhost:3000/api/removeuserchannel', data, httpOptions);
  }
}

var httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json'
  })
};
