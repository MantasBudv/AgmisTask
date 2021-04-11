import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
    constructor(private httpClient: HttpClient) { }

    API_SERVER = "http://localhost:3000";

    public addUrl(full_url: string) {
        return this.httpClient.post(`${this.API_SERVER}/url/create`, { 
            full_url 
        });
    }

    public getAllUrls() {
        return this.httpClient.get(`${this.API_SERVER}/url/all`);
    }

    public getFullUrl(tiny_url: string) {
        return this.httpClient.get(`${this.API_SERVER}/url/${tiny_url}`);
    }

    public register(email: string, password: string) {
        return this.httpClient.post(`${this.API_SERVER}/user/register`, { 
            'email': email,
            'password': password 
        });
    }

    public login(email: string, password: string) {
        return this.httpClient.post(`${this.API_SERVER}/user/login`, { 
            'email': email,
            'password': password 
        });
    }

    public logout() {
        return this.httpClient.post(`${this.API_SERVER}/user/logout`, {});
    }

    public getCurrentUser() {
        return this.httpClient.get(`${this.API_SERVER}/user`);
    }

    public updateUser(password: string) {
        return this.httpClient.patch(`${this.API_SERVER}/user`, password);
    }
}

interface Url {
    id: string;
    tiny_url: string;
    full_url: string;
    created_by: string;
}

interface User {
    id: string;
    email: string;
    password: string;
}