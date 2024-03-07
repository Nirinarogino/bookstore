import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router'
import { SingleServiceService } from '../../services/single-service.service';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit{
  isClicked!: boolean;
  oneBook$!: Observable<Book>;
  borrowed$!: any;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute,
    private router: Router,
    private singleService: SingleServiceService
  ) { }
  id = +this.route.snapshot.params['id'];
  getBookById(): Observable<Book>{
    this.oneBook$=this.http.post<Book>(`http://localhost:3000/book/${this.id}`,{})  
    console.log(this.oneBook$.subscribe(res=>{
      console.log(res)
    }))
    return this.oneBook$
  }

  goback(){
    this.router.navigate(['./bookstore'])
  }

 
  click() {
    if(this.isClicked){
      this.isClicked = false;
      console.log(this.isClicked);
      
    } else{
      this.isClicked = true;
      console.log(this.isClicked);
    }
  }

  borrowedBook(){
    console.log(this.id);
   return this.singleService.borrowedBook(this.id)
  }
  async getBookBorrowedByOneUser(){
    this.borrowed$ = await this.singleService.getAllBookBorrowebByOneUser()
    return this.borrowed$;
  }
  ngOnInit(): void {
    this.getBookById()
    this.getBookBorrowedByOneUser()
   }
}
