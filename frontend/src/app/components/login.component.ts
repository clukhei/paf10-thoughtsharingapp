import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Subject } from 'rxjs';
import { takeUntil } from 'rxjs/operators';
import { Router } from '@angular/router';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage = ''
  loginForm: FormGroup
  notifier = new Subject()
  

	constructor(private fb: FormBuilder, private authSvc : AuthService ,private router: Router ) { }

	ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: this.fb.control('', [Validators.required]),
      password: this.fb.control('', [Validators.required])
    })
    
   }

   auth() {
    console.log(this.loginForm.value)
    this.authSvc.authLogin(this.loginForm.value)
      .then(res=> {
        this.router.navigate(['/main'])
      })
      .catch(err => {
       this.errorMessage = err.error.message + "( " + err.status + " )"
      console.log(err)
      })

   }

 
}
