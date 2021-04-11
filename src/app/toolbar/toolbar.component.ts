import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-toolbar',
  templateUrl: './toolbar.component.html',
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent implements OnInit {

    isUserLoggedIn: boolean = false;

    constructor(private router: Router, private api: ApiService, private dataSharingService: DataSharingService) {
        this.dataSharingService.isUserLoggedIn.subscribe( value => {
            this.isUserLoggedIn = value
        });
    }

    logout() {
        this.api.logout().subscribe((res: any ) => {
            if (res !== null) {
                this.dataSharingService.isUserLoggedIn.next(false)
                alert(res.message)
                this.router.navigate(['/login']);
            }
        });
    }

    ngOnInit(): void {
        this.api.getCurrentUser().subscribe((res: any ) => {
            if (res !== null) {
                this.dataSharingService.isUserLoggedIn.next(true)
            }
        });
    }

}
