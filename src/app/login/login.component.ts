import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private router: Router, private api: ApiService) {}

    email = new FormControl('', [Validators.required, Validators.email]);
    password = new FormControl('', [Validators.required, Validators.minLength(8)]);

    getErrorMessageEmail() {
        if (this.email.hasError('required')) {
            return 'You must enter a value';
        }

        return this.email.hasError('email') ? 'Not a valid email' : '';
    }

    getErrorMessagePassword() {
        if (this.password.hasError('required')) {
            return 'You must enter a value';
        }

        return this.password.value.length < 8 ? 'Not a valid password' : '';
    }

    onLogin() {
        if (this.getErrorMessageEmail() === '' && this.getErrorMessagePassword() === '') {
            this.api.login(this.email.value, this.password.value).subscribe((res: any ) => {
                alert(res.message)
                this.router.navigate(['']);
            },(error) => {
                alert(error.error.message)
            });
        }
    }


    ngOnInit(): void {
        this.api.getCurrentUser().subscribe((res: any ) => {
            if (res !== null) {
                this.router.navigate(['']);
            }
        });
    }

}
