import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book.model';

@Injectable({
  providedIn: 'root'
})
export class SingleServiceService {
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
    ){}

   token = sessionStorage.getItem('token');
  borrowedBook(bookId: any){
    const book = {
      BookId: bookId
    }
    return  this.http.post('http://localhost:3000/book-borrowed', book ,{
      headers: {
        "Authorization": `Bearer ${this.token}`
      }
    }).subscribe()
  }
  async getAllBookBorrowebByOneUser(){
    return  this.http.get('http://localhost:3000/book-borrowed',{
      headers: {
        "Authorization": `Bearer ${this.token}`
      }
    })
  }
}
