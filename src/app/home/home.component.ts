import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { DataSharingService } from '../data-sharing.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private router: Router, private api: ApiService, private dataSharingService: DataSharingService) { }

    loadPage: boolean = false

    ngOnInit(): void {
        this.api.getCurrentUser().subscribe((res: any ) => {
            if (res === null) {
                this.router.navigate(['/login']);
            } else {
                this.loadPage = true
                this.dataSharingService.isUserLoggedIn.next(true)
            }
        },(error) => {})
    }
}
