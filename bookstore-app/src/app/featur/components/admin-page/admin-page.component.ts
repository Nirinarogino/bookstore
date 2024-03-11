import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit{
  AlluserAndBook!: any;
  token = sessionStorage.getItem('token');     
   constructor(
      private http: HttpClient
    ){}

 
  getAllUserAndBokk(){
     this.AlluserAndBook =  this.http.get('http://localhost:3000/admin',{
      headers: {
        "Authorization": `Bearer ${this.token}`
      }
     })
     console.log(this.AlluserAndBook.subscribe());

     return this.AlluserAndBook;
      
   }
   ngOnInit(): void {
    this.getAllUserAndBokk()
  }
}
