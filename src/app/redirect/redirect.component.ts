import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-redirect',
  templateUrl: './redirect.component.html',
  styleUrls: ['./redirect.component.scss']
})
export class RedirectComponent implements OnInit {

  constructor(private router: Router, private api: ApiService) { }

  ngOnInit(): void {
    const tinyUrl = this.router.url.slice(1, this.router.url.length)
    this.api.getFullUrl(tinyUrl).subscribe((res: any ) => {
        console.log(res.fullUrl)
        location.href = 'http://' + res.fullUrl
    },(error) => {
        console.log(error.error.message)
    });
  }

}
