import { Component, OnInit } from '@angular/core';
import { ApiService } from '../api.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    urls: any = [];

    constructor(private apiService: ApiService) { }

    ngOnInit(): void {
        this.apiService.getAllUrls().subscribe((result) => {
            this.urls = result;
            console.log(result)
        },(error) => {
            location.replace('login');
        })
    }
}
