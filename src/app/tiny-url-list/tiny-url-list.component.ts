import { Component, OnInit } from '@angular/core';
import { PageEvent } from '@angular/material/paginator';
import { ApiService } from '../api.service';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-tiny-url-list',
  templateUrl: './tiny-url-list.component.html',
  styleUrls: ['./tiny-url-list.component.scss']
})
export class TinyUrlListComponent implements OnInit {

    urls: any = []
    length = 0;
    pageSize = 7;
    pageIndex = 0;

    constructor(private api: ApiService, private dataSharingService: DataSharingService) {
        this.dataSharingService.urls.subscribe( value => {
            this.urls = value
            this.length = value.length
        });
     }

    updatePaginatorValues(event: PageEvent) {
        this.pageIndex = event.pageIndex
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
        this.api.getAllUrls().subscribe((result: any) => {
            this.urls = result.urls;
            this.dataSharingService.urls.next(result.urls)
            this.length = this.urls.length
        },(error) => {})
    }

}
