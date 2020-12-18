import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = ''
  loginForm: FormGroup

	constructor(private fb: FormBuilder, private authSvc : AuthService) { }

	ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    })
    
   }

   auth() {
    console.log(this.loginForm.value)
    this.authSvc.authLogin(this.loginForm.value)
      .then(res=> console.log(res))

   }

}
