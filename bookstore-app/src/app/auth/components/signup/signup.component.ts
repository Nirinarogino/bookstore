import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent  implements OnInit {
 constructor(
  private formBuilder: FormBuilder,
  private http: HttpClient,
  private router: Router
  ){}
// =========== VARIABLE =========

  SignupForm!: FormGroup;
  LastNameCtrl!: FormControl;
  FirstNameCtrl!: FormControl;
  UserNameCtrl!: FormControl;
  EmailCtrl!: FormControl;
  UsertypeCtrl!: FormControl;
  PasswordCtrl!: FormControl;
//=========== METHODE==========

unitForm() {
  this.FirstNameCtrl = this.formBuilder.control('')
  this.FirstNameCtrl.updateValueAndValidity()
  this.FirstNameCtrl.addValidators([Validators.required])

  this.LastNameCtrl = this.formBuilder.control('')
  this.LastNameCtrl.updateValueAndValidity()
  this.LastNameCtrl.addValidators([Validators.required])

  this.UserNameCtrl = this.formBuilder.control('')
  this.UserNameCtrl.updateValueAndValidity()
  this.UserNameCtrl.addValidators([Validators.required])

  this.EmailCtrl = this.formBuilder.control('')
  this.EmailCtrl.updateValueAndValidity()
  this.EmailCtrl.addValidators([Validators.required, Validators.email])

  this.UsertypeCtrl= this.formBuilder.control('')
  this.UsertypeCtrl.updateValueAndValidity()
  this.UsertypeCtrl.addValidators([Validators.required])

  this.PasswordCtrl= this.formBuilder.control('')
  this.PasswordCtrl.updateValueAndValidity()
  this.PasswordCtrl.addValidators([Validators.required])

  this.SignupForm = this.formBuilder.group({
    userName: this.UserNameCtrl,
    firstName: this.FirstNameCtrl,
    lastName: this.LastNameCtrl,
    email: this.EmailCtrl,
    role: this.UsertypeCtrl,
    password: this.PasswordCtrl,
  })
}

onSignUp(){
  console.log(this.SignupForm.value);
  this.http.post('http://localhost:3000/user/create',this.SignupForm.value ).subscribe(res => {
   this.router.navigate([''])
  }
  )
  

}
//============INITIATION========
  ngOnInit(): void {
    this.unitForm()
  }
}
