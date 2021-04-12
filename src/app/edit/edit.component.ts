import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.scss']
})
export class EditComponent implements OnInit {

    constructor(private router: Router, private api: ApiService) {}

    password = new FormControl('', [Validators.required, Validators.minLength(8)]);
    passwordConfirm = new FormControl('', [Validators.required, Validators.minLength(8)]);

    getErrorMessagePassword() {
        if (this.password.hasError('required')) {
            return 'You must enter a value';
        }

        return this.password.value.length < 8 ? 'Not a valid password' : '';
    }

    getErrorMessagePasswordConfirm() {
        if (this.passwordConfirm.hasError('required')) {
            return 'You must enter a value';
        }

        return this.passwordConfirm.value.length < 8 ? 'Not a valid password' : '';
    }

    onChangePassword() {
        if (this.getErrorMessagePassword() === '' && this.getErrorMessagePasswordConfirm() === '') {
            if (this.password.value !== this.passwordConfirm.value) {
                alert('passwords do not match')
            } else {
                this.api.updateUser(this.password.value).subscribe((res: any ) => {
                    alert(res.message)
                    this.router.navigate(['']);
                },(error) => {
                    alert(error.error.message)
                });
            }
        }
    }

    ngOnInit(): void {
        this.api.getCurrentUser().subscribe((res: any ) => {
            if (res === null) {
                this.router.navigate(['']);
            }
        });
    }

}
