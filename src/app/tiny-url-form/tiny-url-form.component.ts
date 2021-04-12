import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { DataSharingService } from '../data-sharing.service';

@Component({
  selector: 'app-tiny-url-form',
  templateUrl: './tiny-url-form.component.html',
  styleUrls: ['./tiny-url-form.component.scss']
})
export class TinyUrlFormComponent implements OnInit {

    constructor(private router: Router, private api: ApiService, private dataSharingService: DataSharingService) { }

    reg: string = '(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'
    fullUrl = new FormControl('', [Validators.required, Validators.pattern(this.reg)])
    shortUrl: string = ''
    
    getErrorMessageFullUrl() {
        if (this.fullUrl.hasError('required')) {
            return 'You must enter a value';
        }
        return this.fullUrl.invalid ? 'Enter a valid url' : '';
    }
    
    onCreateUrl() {
        if (this.getErrorMessageFullUrl() === '') {
            this.api.addUrl(this.fullUrl.value).subscribe((res: any ) => {
                this.dataSharingService.urls.next([...this.dataSharingService.urls.value, res])
                this.shortUrl = 'http://localhost:4200/' + res.tiny_url
                alert('created tinyUrl')
            },(error) => {
                alert(error.error.message)
            });
        }
    }
    
    ngOnInit(): void {
    } 

}
