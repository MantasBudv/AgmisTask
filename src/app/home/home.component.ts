import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { DataSharingService } from '../data-sharing.service';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    urls: any = [];
    user: any = {};
    reg: string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?';
    fullUrl = new FormControl('', [Validators.required, Validators.pattern(this.reg)]);
    shortUrl: string = '';

    getErrorMessageFullUrl() {
        if (this.fullUrl.hasError('required')) {
            return 'You must enter a value';
        }
        return this.fullUrl.invalid ? 'Enter a valid url' : '';
    }

    constructor(private router: Router, private api: ApiService, private dataSharingService: DataSharingService) { }

    onCreateUrl() {
        if (this.getErrorMessageFullUrl() === '') {
            this.api.addUrl(this.fullUrl.value).subscribe((res: any ) => {
                this.urls = [...this.urls, res]
                this.shortUrl = 'http://localhost:4200/' + res.tiny_url
            },(error) => {
                alert(error.error.message)
            });
        }
    }

    ngOnInit(): void {
        this.api.getCurrentUser().subscribe((res: any ) => {
            if (res === null) {
                this.router.navigate(['/login']);
            } else {
                this.user = res;
                this.dataSharingService.isUserLoggedIn.next(true)
                this.api.getAllUrls().subscribe((result: any) => {
                    this.urls = result.urls;
                },(error) => {})
            }
        },(error) => {})
    }
}
