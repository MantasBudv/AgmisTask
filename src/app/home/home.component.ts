import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { DataSharingService } from '../data-sharing.service';
import { PageEvent } from '@angular/material/paginator';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

    constructor(private router: Router, private api: ApiService, private dataSharingService: DataSharingService) { }

    urls: any = []
    loadPage: boolean = false
    reg: string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
    fullUrl = new FormControl('', [Validators.required, Validators.pattern(this.reg)])
    shortUrl: string = ''
    length = 0;
    pageSize = 7;
    pageIndex = 0;

    getErrorMessageFullUrl() {
        if (this.fullUrl.hasError('required')) {
            return 'You must enter a value';
        }
        return this.fullUrl.invalid ? 'Enter a valid url' : '';
    }

    updatePaginatorValues(event: PageEvent) {
        this.pageIndex = event.pageIndex
    }

    onCreateUrl() {
        if (this.getErrorMessageFullUrl() === '') {
            this.api.addUrl(this.fullUrl.value).subscribe((res: any ) => {
                this.urls = [...this.urls, res]
                this.length = this.urls.length
                this.shortUrl = 'http://localhost:4200/' + res.tiny_url
                alert('created tinyUrl')
            },(error) => {
                alert(error.error.message)
            });
        }
    }

    getUrls() {
        return this.urls.slice(this.pageIndex * this.pageSize, this.pageIndex * this.pageSize + this.pageSize)
    }

    redirect(url: string) {
        location.href = 'http://' + url
    }

    deleteUrl(tiny_url: string) {
        this.api.deleteUrl(tiny_url).subscribe((res: any ) => {
            const index = this.urls.findIndex((url: any) => url.tiny_url === tiny_url)
            this.urls.splice(index, 1)
            this.length = this.urls.length
            if (this.length !== 0 && this.getUrls().length === 0) {
                this.pageIndex--
            }
            alert(res.message)
        },(error) => {
            alert(error.error.message)
        });
    }

    ngOnInit(): void {
        this.api.getCurrentUser().subscribe((res: any ) => {
            if (res === null) {
                this.router.navigate(['/login']);
            } else {
                this.loadPage = true
                this.dataSharingService.isUserLoggedIn.next(true)
                this.api.getAllUrls().subscribe((result: any) => {
                    this.urls = result.urls;
                    this.length = this.urls.length
                },(error) => {})
            }
        },(error) => {})
    }
}
