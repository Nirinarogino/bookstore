declare var google: any
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { environement } from 'src/environements/environement';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  constructor(
      private router: Router,
      private formBuilder: FormBuilder
  ) {}
  // ========= VARIABLE ===========

  logForm!: FormGroup;
  usernameCtrl!: FormControl;
  passwordCtrl!: FormControl;

  // ======= CONSTANTE =============
  
  envId = environement.client_id


  //========= METHODE ===========
  unitForm(){
    this.usernameCtrl = this.formBuilder.control('');
    this.usernameCtrl.updateValueAndValidity()
    this.usernameCtrl.addValidators([Validators.email, Validators.required])

    this.passwordCtrl = this.formBuilder.control('')
    this.passwordCtrl.updateValueAndValidity()
    this.passwordCtrl.addValidators([Validators.required, Validators.minLength(8)])
        updateOne: 'blur'
    this.passwordCtrl.updateValueAndValidity()
    this.logForm = this.formBuilder.group({
      username: this.usernameCtrl,
      password: this.passwordCtrl
    })
  }

  // intialised the google account
  unitGoogle(){
    google.accounts.id.initialize({
      client_id: this.envId,
      callback:(resp: any)=> this.handleLogin(resp)
    });
  google.accounts.id.renderButton(document.getElementById('social_media'),{
      theme: 'filled_blue',
      size: 'large',
      shape:'rectangle',
      width: 100,
    })
  }

  private decodeToken(token: string){
    return JSON.parse(atob(token.split('.')[1]));
  }
  handleLogin(resp: any) {
    if(resp){
      //decoder le token
      const paylod = this.decodeToken(resp.credential)
      //enregistrer le token
      sessionStorage.setItem('loggedInUser', JSON.stringify(paylod));
      //redirection vers l'accueil
      this.router.navigate(['/teste']);     
    }
  }

 ngOnInit(): void{
  // initialize the formGroup 
  this.unitForm()
  // initialize a google account
  this.unitGoogle()
 }
 onSubmit(): void{
 const infouser =  this.logForm.value
  console.log(infouser);
 }
}
