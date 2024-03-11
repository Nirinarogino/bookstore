import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-admin-page',
  templateUrl: './admin-page.component.html',
  styleUrls: ['./admin-page.component.scss']
})
export class AdminPageComponent implements OnInit{
  AlluserAndBook: any;
   constructor(private http: HttpClient){}
  ngOnInit(): void {
    this.getAllUserAndBokk()
  }
  getAllUserAndBokk(){
     const token = sessionStorage.getItem('token');     
     this.AlluserAndBook = this.http.get('http://localhost:3000/admin',{
      headers: {
        "Authorization": `Bearer ${token}`
      }
     }).subscribe()
     console.log('okok',this.AlluserAndBook);
   }
}
