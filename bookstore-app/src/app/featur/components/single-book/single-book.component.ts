import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { Book } from 'src/app/models/book.model';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-single-book',
  templateUrl: './single-book.component.html',
  styleUrls: ['./single-book.component.scss']
})
export class SingleBookComponent implements OnInit{
  isClicked!: boolean;
  oneBook$!: Observable<Book>
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute
  ) { }
  id = +this.route.snapshot.params['id'];

  getBookById(): Observable<Book>{
    this.oneBook$=this.http.post<Book>(`http://localhost:3000/book/${this.id}`,{})  
    console.log(this.oneBook$.subscribe(res=>{
      console.log(res)
    }))
    return this.oneBook$
  }
  ngOnInit(): void {
   this.getBookById()
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
}
