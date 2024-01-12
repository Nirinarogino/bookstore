declare var google: any
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-signin',
  templateUrl: './signin.component.html',
  styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {
  constructor(
    private router: Router,
  ) {}
 ngOnInit(): void{
  // initialize a google account
  google.accounts.id.initialize({
      client_id:'369981562513-82lmsgcorjn9itgkfdktgocgprm95btc.apps.googleusercontent.com',
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
}
