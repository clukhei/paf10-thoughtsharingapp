import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import {CameraService} from '../camera.service';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {

	imagePath = '/assets/cactus.png'
	form : FormGroup
	imgLinkRef
	constructor(private authSvc: AuthService,private cameraSvc: CameraService, private fb: FormBuilder, private http: HttpClient, private router: Router) { }

	ngOnInit(): void {
		this.form = this.fb.group({
			image: this.fb.control('', Validators.required),
			title: this.fb.control('', Validators.required),
			comments: this.fb.control('', Validators.required)
		})
	  if (this.cameraSvc.hasImage()) {
		  const img = this.cameraSvc.getImage()
		  this.imagePath = img.imageAsDataUrl
		  this.form.get('image').setValue(img.imageData)
	  }
	
	}

	clear() {
		this.imagePath = '/assets/cactus.png'
		this.form.reset()
	}

	share(){
		const formData = new FormData()
		formData.set('image',this.form.get('image').value)
		formData.set('title', this.form.get('title').value)
		formData.set('comments',this.form.get('comments').value )
		this.authSvc.authAndSubmit(formData)
			.then(()=> {
				this.form.reset()
				this.imagePath = '/assets/cactus.png'
			})
			.catch(err=> {
		
				if(err.status == 401){
					this.form.reset()
					this.imagePath = '/assets/cactus.png'
					this.router.navigate(['/'])
					
				}
				console.log(err)
			})
		
	}
}
