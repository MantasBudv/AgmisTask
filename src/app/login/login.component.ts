import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

    constructor(private api: ApiService, private formBuilder: FormBuilder) {}

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
                console.log(res.message)
                alert(res.message)
                location.replace('')
            },(error) => {
                console.log(error)
                alert(error.error.message)
            });
        }
    }


    ngOnInit(): void {
    }

}
